import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ShortLinkRecord {
  id: string;
  originalUrl: string;
  shortSlug: string;
  shortUrl: string;
  createdAt: string;
  clicks: number;
  title?: string;
}

const LINKS_FILE_PATH = path.join(process.cwd(), 'shortened_links.json');

const DEFAULT_SERVER_LINKS: ShortLinkRecord[] = [
  {
    id: 'demo-ebook-ai',
    originalUrl: 'https://signup.base.vn/ebook-ai-trong-quan-tri-doanh-nghiep/?utm_source=marketing',
    shortSlug: 'ebook-ai',
    shortUrl: '/s/ebook-ai',
    createdAt: new Date().toISOString(),
    clicks: 12,
    title: 'Ebook AI trong Quản trị Doanh nghiệp'
  },
  {
    id: 'demo-1',
    originalUrl: 'https://base.vn/dang-ky-demo?utm_source=survey&utm_medium=website_tool',
    shortSlug: 'demo-base-ai',
    shortUrl: '/s/demo-base-ai',
    createdAt: new Date().toISOString(),
    clicks: 142,
    title: 'Đăng ký Demo Base AI Solution'
  },
  {
    id: 'demo-2',
    originalUrl: 'https://base.vn/blog/prompt-library-for-ceos',
    shortSlug: 'prompt-ceo-2026',
    shortUrl: '/s/prompt-ceo-2026',
    createdAt: new Date().toISOString(),
    clicks: 89,
    title: 'Thư viện Prompt AI Doanh nghiệp'
  },
  {
    id: 'demo-3',
    originalUrl: 'https://base.vn/solutions/digital-transformation',
    shortSlug: 'dx-framework',
    shortUrl: '/s/dx-framework',
    createdAt: new Date().toISOString(),
    clicks: 215,
    title: 'Khung Chuyển đổi số Base.vn'
  }
];

function loadServerLinks(): ShortLinkRecord[] {
  try {
    if (fs.existsSync(LINKS_FILE_PATH)) {
      const data = fs.readFileSync(LINKS_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading shortened_links.json:', err);
  }
  return DEFAULT_SERVER_LINKS;
}

function saveServerLinks(links: ShortLinkRecord[]) {
  try {
    fs.writeFileSync(LINKS_FILE_PATH, JSON.stringify(links, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving shortened_links.json:', err);
  }
}

let serverLinksStore: ShortLinkRecord[] = loadServerLinks();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', environment: process.env.NODE_ENV || 'development' });
  });

  // API to get all shortened links
  app.get('/api/links', (req, res) => {
    res.json({ success: true, links: serverLinksStore });
  });

  // API to get single link by slug
  app.get('/api/links/:slug', (req, res) => {
    const slug = (req.params.slug || '').trim().toLowerCase();
    const found = serverLinksStore.find(l => l.shortSlug.toLowerCase() === slug);
    if (found) {
      res.json({ success: true, link: found });
    } else {
      res.status(404).json({ success: false, message: 'Link not found' });
    }
  });

  // API to create a new shortened link
  app.post('/api/shorten', (req, res) => {
    try {
      const { originalUrl, shortSlug, title, id, shortUrl } = req.body;
      if (!originalUrl || !shortSlug) {
        return res.status(400).json({ success: false, message: 'originalUrl and shortSlug are required' });
      }

      const cleanSlug = shortSlug.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-');

      // Check if duplicate
      const existingIndex = serverLinksStore.findIndex(l => l.shortSlug.toLowerCase() === cleanSlug);
      if (existingIndex >= 0) {
        return res.status(409).json({
          success: false,
          message: `Mã rút gọn "${cleanSlug}" đã tồn tại trên hệ thống.`,
          link: serverLinksStore[existingIndex]
        });
      }

      const newRecord: ShortLinkRecord = {
        id: id || ('link-' + Date.now()),
        originalUrl,
        shortSlug: cleanSlug,
        shortUrl: shortUrl || `/s/${cleanSlug}`,
        createdAt: new Date().toISOString(),
        clicks: 0,
        title: title || cleanSlug
      };

      serverLinksStore.unshift(newRecord);
      saveServerLinks(serverLinksStore);

      console.log(`[Server URL Shortener] Saved new link: /s/${cleanSlug} -> ${originalUrl}`);

      res.json({ success: true, link: newRecord });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  // Short URL server-side redirect endpoint
  app.get('/s/:slug', (req, res, next) => {
    const slug = (req.params.slug || '').trim().toLowerCase();

    const matched = serverLinksStore.find(l => l.shortSlug.toLowerCase() === slug);

    if (matched) {
      console.log(`[ShortLink Server Redirect] Redirecting /s/${slug} -> ${matched.originalUrl}`);
      matched.clicks = (matched.clicks || 0) + 1;
      saveServerLinks(serverLinksStore);
      return res.redirect(302, matched.originalUrl);
    }

    // Fallback to SPA static handling
    next();
  });

  // API Route for quiz submission
  app.post('/api/submit-quiz', async (req, res) => {
    try {
      const { userData, answers, totalScore, percentageScore, dimensionScores, survey_type, utm_source } = req.body;
      const utmSourceValue = utm_source || 'organic';

      // Supabase Integration
      const supabaseUrl = process.env.SUPABASE_URL || "https://irrjgqhxtfzwjjzdonyp.supabase.co";
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (!supabaseKey) {
        throw new Error('SUPABASE_SERVICE_ROLE_KEY is missing in Secrets. Please add it to the Secrets panel.');
      }

      const supabase = createClient(supabaseUrl, supabaseKey);

      console.log(`Attempting to save to Supabase table 'quiz_submissions' at ${supabaseUrl}`);

      const { data, error: supabaseError } = await supabase
        .from('quiz_submissions')
        .insert([
          {
            name: userData.name,
            phone: userData.phone,
            email: userData.email,
            company: userData.co,
            total_score: totalScore,
            percentage_score: percentageScore,
            dimension_scores: dimensionScores,
            answers: survey_type ? { ...answers, survey_type } : answers,
            survey_type: survey_type || null,
            utm_source: utmSourceValue,
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (supabaseError) {
        console.error('Supabase Insert Error:', supabaseError);
        throw new Error(`Supabase Error: ${supabaseError.message} (Code: ${supabaseError.code})`);
      }

      console.log('Successfully saved to Supabase:', data);

      res.json({ 
        success: true, 
        message: 'Data saved to Supabase',
        id: data?.[0]?.id 
      });
    } catch (error: any) {
      console.error('Error saving to Supabase:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to save data', 
        error: error.message 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
