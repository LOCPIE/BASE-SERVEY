import React from 'react';
import { 
  ArrowUpRight, 
  Layers, 
  Wrench, 
  Zap, 
  Globe, 
  Mail, 
  Phone, 
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              className="inline-flex items-center gap-2 cursor-pointer bg-white/10 p-2.5 rounded-xl border border-white/10 hover:border-white/20 transition-all"
              onClick={() => { onNavigate('/'); handleScrollTop(); }}
            >
              <img 
                src="https://static-gcdn.basecdn.net/landing/base.vn/image/v2/logo/base.png" 
                alt="Base.vn" 
                className="h-6 object-contain brightness-0 invert"
                referrerPolicy="no-referrer"
              />
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              Nền tảng Quản trị & Tự động hóa Doanh nghiệp hàng đầu Việt Nam. Giúp 10.000+ doanh nghiệp tối ưu vận hành, chuẩn hóa quy trình và tăng tốc chuyển đổi AI.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 bg-indigo-950 text-indigo-300 border border-indigo-800/60 font-semibold px-2.5 py-1 rounded-md text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" /> Enterprise-Grade AI
              </span>
              <span className="inline-flex items-center gap-1 bg-slate-900 text-slate-300 border border-slate-800 font-semibold px-2.5 py-1 rounded-md text-[11px]">
                ISO 27001 Certified
              </span>
            </div>
          </div>

          {/* Column 1: Khảo sát & Đánh giá */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 font-display">
              <Layers className="w-3.5 h-3.5 text-indigo-400" /> Khảo sát & Đánh giá
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => { onNavigate('/khao-sat-chuyen-doi-so'); handleScrollTop(); }}
                  className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 text-slate-300 hover:underline"
                >
                  Chỉ số Chuyển đổi số (DX)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('/khao-sat-chuyen-doi-ai'); handleScrollTop(); }}
                  className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 text-slate-300 hover:underline"
                >
                  Chỉ số Sẵn sàng AI
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('/chi-so-quan-tri-nhan-su'); handleScrollTop(); }}
                  className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 text-slate-300 hover:underline"
                >
                  Chỉ số Quản trị Nhân sự
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('/chi-so-tu-dong-hoa-quy-trinh'); handleScrollTop(); }}
                  className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 text-slate-300 hover:underline"
                >
                  Chỉ số Tự động hóa Quy trình
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Free Business Tools */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 font-display">
              <Wrench className="w-3.5 h-3.5 text-emerald-400" /> Free Business Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => { onNavigate('/tool/danh-gia-va-xep-hang-du-an'); handleScrollTop(); }}
                  className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 text-slate-300 hover:underline"
                >
                  Ma trận Đánh giá Dự án
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('/tool'); handleScrollTop(); }}
                  className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 text-slate-300 hover:underline"
                >
                  Máy tính ROI Tự động hóa
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('/tool'); handleScrollTop(); }}
                  className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 text-slate-300 hover:underline"
                >
                  Mô hình Phân định RACI
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('/tool'); handleScrollTop(); }}
                  className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 text-slate-300 hover:underline"
                >
                  Tính Chi phí Nghỉ việc Nhân sự
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: AI Hub & Base.vn */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 font-display">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> AI Hub & Base.vn
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => { onNavigate('/prompt-library'); handleScrollTop(); }}
                  className="hover:text-white transition-colors cursor-pointer text-left bg-transparent border-none p-0 text-slate-300 hover:underline"
                >
                  Kho Prompt AI Cho CEO
                </button>
              </li>
              <li>
                <a 
                  href="https://base.vn/blog/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1 text-slate-300 hover:underline"
                >
                  Tin tức & Báo cáo Chuyển đổi số <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a 
                  href="https://base.vn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1 text-slate-300 hover:underline"
                >
                  Trang chủ Base.vn <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a 
                  href="https://base.vn/dang-ky-demo?utm_source=base-survey-footer" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-amber-400 font-bold hover:text-amber-300 transition-colors flex items-center gap-1"
                >
                  Đăng ký Demo Miễn Phí <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-300 text-[11px]">
          <div>
            © {new Date().getFullYear()} <strong className="text-white">Base.vn</strong> — Bản quyền thuộc về Công ty Cổ phần Base Enterprise.
          </div>

          <div className="flex flex-wrap items-center gap-6 text-slate-300">
            <a href="https://base.vn" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Chính sách bảo mật
            </a>
            <a href="https://base.vn" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Điều khoản dịch vụ
            </a>
            <button onClick={handleScrollTop} className="hover:text-white transition-colors cursor-pointer font-semibold text-slate-300">
              Về đầu trang ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
