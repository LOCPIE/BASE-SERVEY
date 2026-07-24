import React from 'react';
import { ChevronRight } from 'lucide-react';

interface HeaderProps {
  onNavigate: (path: string) => void;
  activeRoute?: string;
}

export default function Header({ onNavigate, activeRoute }: HeaderProps) {
  const handleAssessmentsClick = () => {
    onNavigate('/');
    setTimeout(() => {
      const el = document.getElementById('featured-assessments');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={() => onNavigate('/')}>
          <div className="bg-white px-3.5 py-2.5 rounded-xl flex items-center justify-center shadow-sm border border-slate-100 hover:border-slate-200 transition-colors">
            <img 
              src="https://static-gcdn.basecdn.net/landing/base.vn/image/v2/logo/base.png" 
              alt="Base.vn" 
              className="h-6 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={handleAssessmentsClick} 
            className={`text-sm font-semibold transition-colors cursor-pointer bg-transparent border-none ${
              activeRoute === 'assessments' 
                ? 'text-slate-900 font-bold' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Đánh giá doanh nghiệp
          </button>
          
          <button 
            onClick={() => onNavigate('/tool')} 
            className={`text-sm transition-colors cursor-pointer bg-transparent border-none flex items-center gap-1.5 ${
              activeRoute === '/tool' 
                ? 'text-slate-900 font-bold' 
                : 'text-slate-600 hover:text-slate-900 font-semibold'
            }`}
          >
            Tool
            <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider">Free</span>
          </button>

          <button 
            onClick={() => onNavigate('/prompt-library')} 
            className={`text-sm transition-colors cursor-pointer bg-transparent border-none ${
              activeRoute === '/prompt-library' 
                ? 'text-slate-900 font-bold' 
                : 'text-slate-600 hover:text-slate-900 font-semibold'
            }`}
          >
            Thư viện Prompt
          </button>

          <button 
            onClick={() => window.open('https://base.vn/blog/', '_blank', 'noopener,noreferrer')} 
            className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer bg-transparent border-none"
          >
            Tin tức
          </button>

          <button 
            onClick={() => window.open('https://base.vn/dang-ky-demo?utm_source=base-survey-contact', '_blank', 'noopener,noreferrer')} 
            className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer bg-transparent border-none"
          >
            Liên hệ
          </button>
        </nav>

        <button 
          onClick={() => window.open('https://base.vn/dang-ky-demo?utm_source=base-survey', '_blank', 'noopener,noreferrer')}
          className="bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:shadow-md flex items-center gap-1.5 cursor-pointer"
        >
          Đăng Ký Demo <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
