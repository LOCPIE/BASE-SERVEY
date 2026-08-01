import React, { useState, useEffect, useMemo } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Link as LinkIcon, 
  Copy, 
  Check, 
  ExternalLink, 
  Trash2, 
  Sparkles, 
  BarChart2, 
  Search, 
  Globe, 
  ArrowRight, 
  QrCode, 
  ChevronLeft, 
  MousePointerClick, 
  Calendar,
  AlertCircle,
  RefreshCw,
  Zap,
  ShieldCheck,
  Share2,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  LogOut
} from 'lucide-react';

interface ShortenedLink {
  id: string;
  originalUrl: string;
  shortSlug: string;
  shortUrl: string;
  createdAt: string;
  clicks: number;
  title?: string;
}

interface UrlShortenerProps {
  onNavigate: (path: string) => void;
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

export default function UrlShortener({ onNavigate }: UrlShortenerProps) {
  const [links, setLinks] = useState<ShortenedLink[]>(() => {
    try {
      const saved = localStorage.getItem('base_url_shortener_links');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingSlugs = new Set(parsed.map((l: ShortenedLink) => l.shortSlug?.toLowerCase()));
          const missingDefaults = DEFAULT_DEMO_LINKS.filter(d => !existingSlugs.has(d.shortSlug.toLowerCase()));
          return [...parsed, ...missingDefaults];
        }
      }
    } catch (e) {
      console.error('Failed to load saved links', e);
    }
    return DEFAULT_DEMO_LINKS;
  });

  const [longUrl, setLongUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successLink, setSuccessLink] = useState<ShortenedLink | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeQrLink, setActiveQrLink] = useState<ShortenedLink | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Authentication State with Password MKTBASE
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('base_url_shortener_auth') === 'true' || localStorage.getItem('base_url_shortener_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === 'MKTBASE') {
      setIsAuthenticated(true);
      setPasswordError(null);
      try {
        sessionStorage.setItem('base_url_shortener_auth', 'true');
        localStorage.setItem('base_url_shortener_auth', 'true');
      } catch (err) {
        console.error('Storage auth error', err);
      }
    } else {
      setPasswordError('Mật khẩu không chính xác. Vui lòng thử lại.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
    setPasswordError(null);
    try {
      sessionStorage.removeItem('base_url_shortener_auth');
      localStorage.removeItem('base_url_shortener_auth');
    } catch (e) {
      console.error('Storage logout error', e);
    }
  };

  // Fetch server links on mount to keep links synced across browsers
  useEffect(() => {
    const fetchServerLinks = async () => {
      try {
        const res = await fetch('/api/links');
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.links)) {
            setLinks(prev => {
              const combinedMap = new Map<string, ShortenedLink>();
              // Put server links first
              data.links.forEach((l: ShortenedLink) => combinedMap.set(l.shortSlug.toLowerCase(), l));
              // Put local state if not present
              prev.forEach(l => {
                if (!combinedMap.has(l.shortSlug.toLowerCase())) {
                  combinedMap.set(l.shortSlug.toLowerCase(), l);
                }
              });
              return Array.from(combinedMap.values());
            });
          }
        }
      } catch (err) {
        console.error('Failed to fetch links from server', err);
      }
    };

    fetchServerLinks();
  }, []);

  // Save links to LocalStorage whenever modified
  useEffect(() => {
    try {
      localStorage.setItem('base_url_shortener_links', JSON.stringify(links));
    } catch (e) {
      console.error('Failed to save links to LocalStorage', e);
    }
  }, [links]);

  // Set page title
  useEffect(() => {
    document.title = "URL Shortener - Rút gọn link chuyên nghiệp | Base.vn";
  }, []);

  // Utility to generate random slug
  const generateRandomSlug = (length = 6): string => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Sanitize URL
  const normalizeUrl = (url: string): string => {
    let trimmed = url.trim();
    if (!trimmed) return '';
    if (!/^https?:\/\//i.test(trimmed)) {
      trimmed = 'https://' + trimmed;
    }
    return trimmed;
  };

  // Validate URL format
  const isValidUrl = (urlStr: string): boolean => {
    try {
      const parsed = new URL(urlStr);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  };

  // Check if a slug is already taken in state or storage
  const checkIsSlugTaken = (slugToCheck: string): boolean => {
    if (!slugToCheck.trim()) return false;
    const clean = slugToCheck.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    if (!clean) return false;

    // 1. Check current state
    if (links.some(l => l.shortSlug.toLowerCase() === clean)) {
      return true;
    }

    // 2. Check localStorage storage
    try {
      const saved = localStorage.getItem('base_url_shortener_links');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some((l: ShortenedLink) => l.shortSlug && l.shortSlug.toLowerCase() === clean)) {
          return true;
        }
      }
    } catch (e) {
      console.error('Storage read error', e);
    }

    // 3. Check default links list
    if (DEFAULT_DEMO_LINKS.some(d => d.shortSlug.toLowerCase() === clean)) {
      return true;
    }

    return false;
  };

  // Handle URL Shortening
  const handleShorten = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessLink(null);

    const formattedUrl = normalizeUrl(longUrl);

    if (!formattedUrl) {
      setError('Vui lòng nhập đường dẫn URL dài cần rút gọn.');
      return;
    }

    if (!isValidUrl(formattedUrl)) {
      setError('Định dạng URL không hợp lệ. Vui lòng kiểm tra lại (VD: https://example.com/page)');
      return;
    }

    let finalSlug = customSlug.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-');

    if (!finalSlug) {
      // Generate random slug that is not taken
      let randomSlug = generateRandomSlug();
      while (checkIsSlugTaken(randomSlug)) {
        randomSlug = generateRandomSlug();
      }
      finalSlug = randomSlug;
    } else {
      // Check duplicate custom slug in database/storage before saving
      const isTaken = checkIsSlugTaken(finalSlug);
      if (isTaken) {
        setError(`Mã rút gọn "${finalSlug}" đã tồn tại trong cơ sở dữ liệu/bộ nhớ. Vui lòng nhập mã custom slug khác!`);
        return;
      }
    }

    setIsGenerating(true);

    setTimeout(async () => {
      const domainOrigin = window.location.origin;
      const fullShortUrl = `${domainOrigin}/s/${finalSlug}`;

      let title = '';
      try {
        const parsed = new URL(formattedUrl);
        title = parsed.hostname + parsed.pathname.slice(0, 20);
      } catch {
        title = finalSlug;
      }

      const newLinkItem: ShortenedLink = {
        id: 'link-' + Date.now(),
        originalUrl: formattedUrl,
        shortSlug: finalSlug,
        shortUrl: fullShortUrl,
        createdAt: new Date().toISOString(),
        clicks: 0,
        title
      };

      // Save link to server
      try {
        await fetch('/api/shorten', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newLinkItem)
        });
      } catch (err) {
        console.error('Failed to post shortened link to server', err);
      }

      setLinks(prev => [newLinkItem, ...prev.filter(l => l.shortSlug.toLowerCase() !== finalSlug)]);
      setSuccessLink(newLinkItem);
      setLongUrl('');
      setCustomSlug('');
      setIsGenerating(false);
    }, 300);
  };

  // Copy to clipboard helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Increment click count & open target URL
  const handleOpenLink = (linkItem: ShortenedLink) => {
    // Update local clicks
    setLinks(prev => prev.map(l => l.id === linkItem.id ? { ...l, clicks: l.clicks + 1 } : l));
    if (successLink && successLink.id === linkItem.id) {
      setSuccessLink(prev => prev ? { ...prev, clicks: prev.clicks + 1 } : null);
    }
    // Open destination in new tab
    window.open(linkItem.originalUrl, '_blank', 'noopener,noreferrer');
  };

  // Delete link
  const handleDeleteLink = (id: string) => {
    setLinks(prev => prev.filter(l => l.id !== id));
    if (successLink?.id === id) {
      setSuccessLink(null);
    }
  };

  // Clear all links
  const handleResetAll = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa toàn bộ danh sách link đã rút gọn không?')) {
      setLinks([]);
      setSuccessLink(null);
    }
  };

  // Filtered links
  const filteredLinks = useMemo(() => {
    if (!searchQuery.trim()) return links;
    const q = searchQuery.toLowerCase();
    return links.filter(l => 
      l.shortSlug.toLowerCase().includes(q) ||
      l.originalUrl.toLowerCase().includes(q) ||
      (l.title && l.title.toLowerCase().includes(q))
    );
  }, [links, searchQuery]);

  // Overall Statistics
  const totalClicks = useMemo(() => {
    return links.reduce((sum, l) => sum + l.clicks, 0);
  }, [links]);

  const topLink = useMemo(() => {
    if (links.length === 0) return null;
    return [...links].sort((a, b) => b.clicks - a.clicks)[0];
  }, [links]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white flex flex-col justify-between">
        <Header onNavigate={onNavigate} activeRoute="/tool" />

        <main className="flex-grow flex items-center justify-center p-6 my-12">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 max-w-md w-full text-center shadow-2xl relative overflow-hidden backdrop-blur-xl">
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-sky-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="w-16 h-16 rounded-2xl bg-indigo-950 border border-indigo-800/80 text-indigo-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-950/50">
              <Lock className="w-8 h-8 text-indigo-400" />
            </div>

            <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-amber-400 bg-amber-950/80 border border-amber-800/60 px-3.5 py-1 rounded-full mb-3 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Yêu cầu Mật khẩu Bảo vệ
            </div>

            <h1 className="text-2xl font-black text-white mb-2">
              Rút Gọn Link Base.vn
            </h1>

            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Vui lòng nhập mật khẩu xác thực dành riêng cho đội ngũ Marketing & Admin để tiếp tục.
            </p>

            <form onSubmit={handlePasswordSubmit} className="space-y-4 text-left relative z-10">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-2">
                  Nhập mật khẩu (Password)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (passwordError) setPasswordError(null);
                    }}
                    placeholder="••••••••"
                    autoFocus
                    className="w-full pl-10 pr-10 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 font-mono transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {passwordError && (
                <div className="p-3.5 bg-rose-950/80 border border-rose-800/80 rounded-2xl text-rose-300 text-xs flex items-center gap-2.5 animate-shake">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" /> Xác nhận Mật khẩu
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
              <button
                onClick={() => onNavigate('/tool')}
                className="text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer inline-flex items-center gap-1 font-medium"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Quay lại Free Tools
              </button>
              <span className="font-mono text-[10px] text-slate-600">Base.vn MKT Tool</span>
            </div>
          </div>
        </main>

        <Footer onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
      <Header onNavigate={onNavigate} activeRoute="/tool" />

      {/* Main Dark Content Wrapper */}
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <button 
            onClick={() => onNavigate('/tool')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800"
          >
            <ChevronLeft className="w-4 h-4" /> Quay lại Free Tools
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">
              /tool/rut-gon-link
            </span>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-rose-400 transition-colors bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 cursor-pointer"
              title="Khóa công cụ"
            >
              <LogOut className="w-3.5 h-3.5 text-amber-400" /> Khóa
            </button>
          </div>
        </div>

        {/* Hero Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-indigo-400 bg-indigo-950/80 border border-indigo-800/60 px-4 py-1.5 rounded-full mb-4 shadow-sm shadow-indigo-500/10">
            <Zap className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" /> Modern Dark URL Shortener
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Rút Gọn Link Chuyên Nghiệp
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Tạo liên kết ngắn gọn, tùy chỉnh mã slug nhận diện thương hiệu và theo dõi lượt click thời gian thực dành riêng cho CEO, Marketer & Nhà quản trị.
          </p>
        </div>

        {/* Shortener Form Card */}
        <div className="max-w-3xl mx-auto mb-14">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/40 relative overflow-hidden backdrop-blur-xl">
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-sky-600/15 rounded-full blur-3xl pointer-events-none" />

            <form onSubmit={handleShorten} className="relative z-10 space-y-6">
              {/* Input 1: Long URL */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-2 flex items-center justify-between">
                  <span>1. Nhập đường dẫn URL cần rút gọn <span className="text-rose-400">*</span></span>
                  <span className="text-[11px] font-normal text-slate-500 lowercase">hỗ trợ https://</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                    <Globe className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder="https://base.vn/dang-ky-demo?utm_source=facebook_campaign_2026..."
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-2xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm font-mono transition-all"
                  />
                </div>
              </div>

              {/* Input 2: Custom Slug */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-2 flex items-center justify-between">
                  <span>2. Tùy chỉnh mã ngắn gọn (Custom Slug) <span className="text-slate-500 font-normal lowercase">(không bắt buộc)</span></span>
                  {customSlug.trim() && checkIsSlugTaken(customSlug) && (
                    <span className="text-[11px] font-bold text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Mã đã được sử dụng
                    </span>
                  )}
                </label>
                <div className="flex flex-col sm:flex-row items-stretch gap-2">
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs font-mono text-slate-500 flex items-center whitespace-nowrap">
                    {window.location.host}/s/
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={customSlug}
                      onChange={(e) => {
                        setCustomSlug(e.target.value);
                        if (error) setError(null);
                      }}
                      placeholder="e.g. demo-ai-2026"
                      className={`w-full px-4 py-3 bg-slate-950 border ${
                        customSlug.trim() && checkIsSlugTaken(customSlug)
                          ? 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20'
                          : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                      } rounded-2xl text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 text-sm font-mono transition-all`}
                    />
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  💡 Để trống nếu muốn hệ thống tự động sinh mã ngẫu nhiên 6 ký tự. Chỉ nhận chữ cái, số và dấu gạch ngang (-).
                </p>
              </div>

              {/* Error Message Display */}
              {error && (
                <div className="p-4 bg-rose-950/60 border border-rose-800/80 rounded-2xl text-rose-300 text-xs flex items-center gap-2.5 animate-shake">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white font-extrabold py-4 px-6 rounded-2xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer text-sm sm:text-base disabled:opacity-60"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" /> Đang tạo liên kết...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 fill-white/20" /> Rút Gọn Link Ngay
                  </>
                )}
              </button>
            </form>

            {/* Active Shortened Link Success Card */}
            <AnimatePresence>
              {successLink && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-8 pt-8 border-t border-slate-800"
                >
                  <div className="bg-indigo-950/50 border border-indigo-800/80 rounded-2xl p-5 sm:p-6 relative">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/50 px-2.5 py-1 rounded-lg">
                        <Check className="w-3.5 h-3.5" /> Tạo link ngắn thành công!
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Slug: /{successLink.shortSlug}
                      </span>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
                      <span className="font-mono text-sm sm:text-base font-bold text-sky-400 break-all select-all text-center sm:text-left">
                        {successLink.shortUrl}
                      </span>
                      <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                        <button
                          onClick={() => handleCopy(successLink.shortUrl, 'success')}
                          className="flex-1 sm:flex-none px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          {copiedId === 'success' ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-300" /> Đã Copy!
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" /> Copy Link
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => handleOpenLink(successLink)}
                          className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          title="Mở link thử"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-indigo-900/40">
                      <div className="truncate max-w-md">
                        <span className="text-slate-500">Đích đến:</span>{' '}
                        <span className="font-mono text-slate-300">{successLink.originalUrl}</span>
                      </div>
                      <div className="font-mono text-indigo-300 font-bold">
                        {successLink.clicks} lượt click
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-5xl mx-auto">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-950/80 border border-indigo-800/50 flex items-center justify-center text-indigo-400 shrink-0">
              <LinkIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Tổng link đã tạo</div>
              <div className="text-2xl font-black text-white font-mono mt-0.5">{links.length}</div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-800/50 flex items-center justify-center text-emerald-400 shrink-0">
              <MousePointerClick className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-medium">Tổng lượt click theo dõi</div>
              <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">{totalClicks}</div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-950/80 border border-amber-800/50 flex items-center justify-center text-amber-400 shrink-0">
              <BarChart2 className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-slate-400 font-medium">Link hot nhất</div>
              <div className="text-sm font-bold text-amber-300 font-mono mt-0.5 truncate">
                {topLink ? `/${topLink.shortSlug} (${topLink.clicks})` : 'Chưa có'}
              </div>
            </div>
          </div>
        </div>

        {/* History Table & Filter List */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
            {/* Table Header Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-indigo-400" /> Danh sách Link đã rút gọn
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Lưu tạm thời trên trình duyệt (LocalStorage). Tự động đếm số lần nhấp chuột.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Search Bar */}
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm slug / URL..."
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Reset button */}
                {links.length > 0 && (
                  <button
                    onClick={handleResetAll}
                    className="p-2 bg-slate-950 border border-slate-800 hover:border-rose-800 hover:text-rose-400 text-slate-400 rounded-xl text-xs transition-colors cursor-pointer shrink-0"
                    title="Xóa tất cả danh sách"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Links List */}
            {filteredLinks.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl">
                <Globe className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                <p className="text-sm text-slate-400 font-medium">Chưa có liên kết nào phù hợp</p>
                <p className="text-xs text-slate-600 mt-1">Hãy nhập URL ở form trên để tạo link ngắn đầu tiên!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLinks.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-950/80 border border-slate-800/90 hover:border-indigo-800/80 rounded-2xl p-4 sm:p-5 transition-all group hover:shadow-lg hover:shadow-indigo-950/30"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Left: Short Link & Original URL */}
                      <div className="space-y-1.5 min-w-0 flex-1">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="font-mono font-bold text-sm sm:text-base text-sky-400 bg-sky-950/60 border border-sky-800/40 px-3 py-1 rounded-xl flex items-center gap-1.5">
                            <LinkIcon className="w-3.5 h-3.5" />
                            {item.shortUrl}
                          </span>

                          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-900 border border-slate-800 text-indigo-300 px-2.5 py-1 rounded-lg">
                            /{item.shortSlug}
                          </span>

                          <span className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                          </span>
                        </div>

                        {/* Original URL */}
                        <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                          <span className="text-slate-500 shrink-0">Target:</span>
                          <span className="font-mono text-slate-300 truncate max-w-xl" title={item.originalUrl}>
                            {item.originalUrl}
                          </span>
                        </div>
                      </div>

                      {/* Right: Clicks Counter Badge & Actions */}
                      <div className="flex items-center justify-between lg:justify-end gap-3 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-900">
                        {/* Clicks count */}
                        <div className="bg-indigo-950/80 border border-indigo-800/60 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-300">
                          <MousePointerClick className="w-3.5 h-3.5 text-indigo-400" />
                          <span>{item.clicks} clicks</span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopy(item.shortUrl, item.id)}
                            className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                            title="Copy short URL"
                          >
                            {copiedId === item.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-300" /> Đã Copy
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" /> Copy
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => handleOpenLink(item)}
                            className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs rounded-xl transition-colors flex items-center gap-1 cursor-pointer"
                            title="Truy cập link (tăng click count)"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => setActiveQrLink(item)}
                            className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded-xl text-xs transition-colors cursor-pointer"
                            title="Tạo mã QR"
                          >
                            <QrCode className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeleteLink(item.id)}
                            className="p-2 bg-slate-900 hover:bg-rose-950 border border-slate-800 hover:border-rose-800 text-slate-500 hover:text-rose-400 rounded-xl text-xs transition-colors cursor-pointer"
                            title="Xóa link"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* QR Code Modal */}
      <AnimatePresence>
        {activeQrLink && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full text-center relative shadow-2xl"
            >
              <h3 className="text-lg font-bold text-white mb-2">Mã QR Link Rút Gọn</h3>
              <p className="text-xs text-slate-400 font-mono mb-4 break-all">
                {activeQrLink.shortUrl}
              </p>

              <div className="bg-white p-4 rounded-2xl inline-block mb-4 border border-slate-200 shadow-inner">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(activeQrLink.shortUrl)}`}
                  alt="QR Code"
                  className="w-48 h-48 object-contain"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(activeQrLink.shortUrl, 'qr')}
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  {copiedId === 'qr' ? 'Đã Copy!' : 'Copy Link'}
                </button>
                <button
                  onClick={() => setActiveQrLink(null)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
