import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { ExternalLink, AlertTriangle, ArrowRight, RefreshCw, Zap, Globe, Link as LinkIcon } from 'lucide-react';

interface ShortenedLink {
  id: string;
  originalUrl: string;
  shortSlug: string;
  shortUrl: string;
  createdAt: string;
  clicks: number;
  title?: string;
}

const DEFAULT_DEMO_LINKS: ShortenedLink[] = [
  {
    id: 'demo-ebook-ai',
    originalUrl: 'https://signup.base.vn/ebook-ai-trong-quan-tri-doanh-nghiep/?utm_source=marketing',
    shortSlug: 'ebook-ai',
    shortUrl: `${window.location.origin}/s/ebook-ai`,
    createdAt: new Date().toISOString(),
    clicks: 12,
    title: 'Ebook AI trong Quản trị Doanh nghiệp'
  },
  {
    id: 'demo-1',
    originalUrl: 'https://base.vn/dang-ky-demo?utm_source=survey&utm_medium=website_tool',
    shortSlug: 'demo-base-ai',
    shortUrl: `${window.location.origin}/s/demo-base-ai`,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    clicks: 142,
    title: 'Đăng ký Demo Base AI Solution'
  },
  {
    id: 'demo-2',
    originalUrl: 'https://base.vn/blog/prompt-library-for-ceos',
    shortSlug: 'prompt-ceo-2026',
    shortUrl: `${window.location.origin}/s/prompt-ceo-2026`,
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    clicks: 89,
    title: 'Thư viện Prompt AI Doanh nghiệp'
  },
  {
    id: 'demo-3',
    originalUrl: 'https://base.vn/solutions/digital-transformation',
    shortSlug: 'dx-framework',
    shortUrl: `${window.location.origin}/s/dx-framework`,
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
    clicks: 215,
    title: 'Khung Chuyển đổi số Base.vn'
  }
];

interface ShortLinkRedirectProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export default function ShortLinkRedirect({ slug, onNavigate }: ShortLinkRedirectProps) {
  const [targetLink, setTargetLink] = useState<ShortenedLink | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [countdown, setCountdown] = useState(1);

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      return;
    }

    const cleanSlug = slug.trim().toLowerCase();

    // 1. Load from localStorage
    let allLinks: ShortenedLink[] = [];
    try {
      const saved = localStorage.getItem('base_url_shortener_links');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          allLinks = parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load local storage links', e);
    }

    // Merge default links if missing
    const existingSlugs = new Set(allLinks.map(l => l.shortSlug.toLowerCase()));
    DEFAULT_DEMO_LINKS.forEach(d => {
      if (!existingSlugs.has(d.shortSlug.toLowerCase())) {
        allLinks.push(d);
      }
    });

    // Find matching link
    const matched = allLinks.find(l => l.shortSlug.toLowerCase() === cleanSlug);

    if (matched) {
      setTargetLink(matched);
      document.title = `Chuyển hướng đến ${matched.title || matched.shortSlug} | Base.vn`;

      // Update click count in localStorage
      try {
        const updatedList = allLinks.map(l => {
          if (l.shortSlug.toLowerCase() === cleanSlug) {
            return { ...l, clicks: (l.clicks || 0) + 1 };
          }
          return l;
        });
        localStorage.setItem('base_url_shortener_links', JSON.stringify(updatedList));
      } catch (e) {
        console.error('Failed to update click count', e);
      }

      // Redirect immediately
      try {
        window.location.href = matched.originalUrl;
      } catch (err) {
        console.error('Redirect failed', err);
      }

      const timer = setTimeout(() => {
        window.location.replace(matched.originalUrl);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      // Try fetching from server API if not found in local storage
      let isMounted = true;
      fetch(`/api/links/${encodeURIComponent(cleanSlug)}`)
        .then(res => res.json())
        .then(data => {
          if (!isMounted) return;
          if (data.success && data.link && data.link.originalUrl) {
            setTargetLink(data.link);
            document.title = `Chuyển hướng đến ${data.link.title || data.link.shortSlug} | Base.vn`;
            
            // Redirect immediately
            window.location.href = data.link.originalUrl;
            setTimeout(() => {
              window.location.replace(data.link.originalUrl);
            }, 300);
          } else {
            setNotFound(true);
            document.title = "Không tìm thấy liên kết | Base.vn";
          }
        })
        .catch(() => {
          if (isMounted) {
            setNotFound(true);
            document.title = "Không tìm thấy liên kết | Base.vn";
          }
        });

      return () => {
        isMounted = false;
      };
    }
  }, [slug]);

  if (notFound) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between">
        <Header onNavigate={onNavigate} activeRoute="/tool" />
        
        <main className="flex-grow flex items-center justify-center p-6 my-12">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 max-w-lg w-full text-center shadow-2xl relative overflow-hidden">
            <div className="w-16 h-16 rounded-2xl bg-rose-950/80 border border-rose-800/60 text-rose-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-rose-950/50">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h1 className="text-2xl font-black text-white mb-3">
              Không tìm thấy liên kết
            </h1>

            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Mã rút gọn <code className="bg-slate-950 text-sky-400 px-2 py-0.5 rounded border border-slate-800 font-mono">/s/{slug}</code> không tồn tại trên hệ thống hoặc đã bị gỡ bỏ.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('/tool/rut-gon-link')}
                className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
              >
                <LinkIcon className="w-4 h-4" /> Tạo link mới tại URL Shortener
              </button>

              <button
                onClick={() => onNavigate('/')}
                className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                Về Trang Chủ
              </button>
            </div>
          </div>
        </main>

        <Footer onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between">
      <Header onNavigate={onNavigate} activeRoute="/tool" />

      <main className="flex-grow flex items-center justify-center p-6 my-12">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 max-w-xl w-full text-center shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Background Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-sky-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Spinner */}
          <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
            <Zap className="w-7 h-7 text-indigo-400 fill-indigo-400/30" />
          </div>

          <h1 className="text-2xl font-black text-white mb-2">
            Đang chuyển hướng liên kết...
          </h1>

          <p className="text-xs text-slate-400 mb-6">
            Đang đưa bạn tới trang web đích an toàn
          </p>

          {/* Target URL card */}
          {targetLink && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 mb-6 text-left relative z-10">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-indigo-400" /> Đường dẫn gốc (Destination)
              </div>
              <div className="font-mono text-xs text-sky-400 break-all leading-relaxed">
                {targetLink.originalUrl}
              </div>
            </div>
          )}

          <div className="space-y-3 relative z-10">
            {targetLink && (
              <a
                href={targetLink.originalUrl}
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
              >
                Nhấp vào đây nếu trang không tự chuyển hướng <ExternalLink className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={() => onNavigate('/tool/rut-gon-link')}
              className="text-xs text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer block mx-auto underline pt-2"
            >
              Quay lại quản lý URL Shortener
            </button>
          </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
