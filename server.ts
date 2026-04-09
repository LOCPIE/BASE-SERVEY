import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Google Sheets submission
  app.post('/api/submit-quiz', async (req, res) => {
    try {
      const { userData, answers, totalScore, percentageScore, dimensionScores } = req.body;

      // Supabase Integration
      const supabaseUrl = process.env.SUPABASE_URL || "https://irrjgqhxtfzwjjzdonyp.supabase.co";
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (!supabaseKey) {
        throw new Error('SUPABASE_SERVICE_ROLE_KEY is missing in Secrets. Please add it to the Secrets panel.');
      }

      const supabase = createClient(supabaseUrl, supabaseKey);

      const { error: supabaseError } = await supabase
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
            answers: answers,
            created_at: new Date().toISOString()
          }
        ]);

      if (supabaseError) {
        throw supabaseError;
      }

      res.json({ success: true, message: 'Data saved to Supabase' });
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
