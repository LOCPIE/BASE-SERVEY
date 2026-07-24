import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Cpu, 
  Users, 
  CheckCircle2, 
  Award, 
  Activity, 
  FileText, 
  X, 
  TrendingUp, 
  BarChart3, 
  Zap, 
  Shuffle, 
  Target,
  FileSpreadsheet,
  Wrench,
  Calculator,
  Copy,
  Check,
  Sliders,
  Clock,
  ExternalLink,
  Map,
  ShieldCheck,
  Briefcase,
  PieChart
} from 'lucide-react';

interface HomeProps {
  onNavigate: (path: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [showMockReport, setShowMockReport] = useState(false);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  // 1. Featured Enterprise Assessments
  const assessments = [
    {
      title: "Chỉ số chuyển đổi số doanh nghiệp",
      desc: "Đánh giá mức độ chuyển đổi số toàn diện trên các khía cạnh vận hành, công nghệ và tư duy quản trị.",
      icon: <Layers className="w-6 h-6 text-purple-600" />,
      tag: "Dành cho CEO/COO",
      colorBg: "bg-purple-100/60 border-purple-200",
      route: "/khao-sat-chuyen-doi-so"
    },
    {
      title: "Chỉ số sẵn sàng ứng dụng AI",
      desc: "Đo lường mức độ trưởng thành của dữ liệu, hạ tầng kỹ thuật và con người để tích hợp AI vào quy trình.",
      icon: <Cpu className="w-6 h-6 text-cyan-600" />,
      tag: "Trọng tâm & Nổi bật",
      colorBg: "bg-cyan-100/60 border-cyan-200",
      route: "/khao-sat-chuyen-doi-ai"
    },
    {
      title: "Chỉ số trưởng thành quản trị nhân sự",
      desc: "Xác định khả năng thích ứng, đào tạo nguồn lực và văn hóa học hỏi của nhân tài trước làn sóng số.",
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      tag: "HR / Quản trị",
      colorBg: "bg-emerald-100/60 border-emerald-200",
      route: "/chi-so-quan-tri-nhan-su"
    },
    {
      title: "Chỉ số tự động hóa quy trình",
      desc: "Khảo sát mức độ số hóa các quy trình (SOPs), loại bỏ các điểm nghẽn thủ công bằng tự động hóa.",
      icon: <Shuffle className="w-6 h-6 text-amber-600" />,
      tag: "Tối ưu vận hành",
      colorBg: "bg-amber-100/60 border-amber-200",
      route: "/chi-so-tu-dong-hoa-quy-trinh"
    }
  ];

  // 2. Free Business Tools Hub
  const freeTools = [
    {
      id: "scoring-matrix",
      title: "Ma trận Đánh giá & Xếp hạng Dự án",
      desc: "Công cụ chấm điểm ưu tiên các dự án Chuyển đổi số & AI dựa trên ROI, tính khả thi và mức độ phù hợp chiến lược.",
      icon: <PieChart className="w-6 h-6 text-indigo-600" />,
      tag: "Độc quyền CEO",
      actionText: "Mở ma trận chấm điểm",
      route: "/tool/danh-gia-va-xep-hang-du-an"
    },
    {
      id: "roi-calc",
      title: "Máy tính ROI Tự động hóa & AI",
      desc: "Mô phỏng ngân sách & số giờ tiết kiệm được khi tự động hóa các quy trình lập lại thủ công trong doanh nghiệp.",
      icon: <Calculator className="w-6 h-6 text-emerald-600" />,
      tag: "Tài chính & Vận hành",
      actionText: "Mở máy tính ROI",
      route: "/tool"
    },
    {
      id: "raci",
      title: "Mô hình Phân định Trách nhiệm RACI",
      desc: "Xác định rõ ràng ai là người Thực hiện (R), Trách nhiệm (A), Tư vấn (C) và Nhận thông tin (I) cho dự án.",
      icon: <Target className="w-6 h-6 text-cyan-600" />,
      tag: "SOP & Quản trị",
      actionText: "Khám phá công cụ",
      route: "/tool"
    },
    {
      id: "turnover",
      title: "Tính toán Chi phí Ẩn Nghỉ việc",
      desc: "Đo lường tổng chi phí thiệt hại gián tiếp và trực tiếp khi nhân sự thôi việc để lên kế hoạch giữ chân nhân tài.",
      icon: <BarChart3 className="w-6 h-6 text-rose-600" />,
      tag: "Quản trị Nhân sự",
      actionText: "Xem công cụ",
      route: "/tool"
    }
  ];

  // 3. Featured AI Prompts Preview
  const featuredPrompts = [
    {
      id: "ceo-swot-dx",
      dept: "Ban Giám đốc & CEO",
      title: "Phân tích SWOT & Ma trận Ưu tiên Chuyển đổi số",
      desc: "Đánh giá toàn diện điểm mạnh, điểm yếu và cơ hội ứng dụng công nghệ/AI cho doanh nghiệp theo ngành nghề.",
      prompt: "Tôi là CEO công ty [Tên công ty] hoạt động trong ngành [Ngành nghề], quy mô [Số nhân sự] nhân viên. Hãy đóng vai Chuyên gia Chuyển đổi số hàng đầu, phân tích SWOT cho doanh nghiệp tôi về năng lực công nghệ và đề xuất Ma trận ưu tiên (Priority Matrix) 5 dự án số hóa/AI cần làm ngay."
    },
    {
      id: "hr-kpi-ai",
      dept: "Nhân sự & Văn hóa",
      title: "Xây dựng Khung KPI & Điểm thưởng Tích hợp AI",
      desc: "Thiết lập chỉ số hiệu suất làm việc (KPI/OKR) khuyến khích nhân viên chủ động dùng AI tăng năng suất.",
      prompt: "Hãy đóng vai Chuyên gia HRD, xây dựng bộ chỉ số KPI/OKR quý cho phòng ban [Tên phòng ban] tích hợp yêu cầu sử dụng các công cụ AI (ChatGPT, Copilot, Automation) để cắt giảm 30% thời gian xử lý công việc."
    },
    {
      id: "mkt-content-matrix",
      dept: "Marketing & Bán hàng",
      title: "Lập Ma trận Content Marketing & Funnel Sales 30 ngày",
      desc: "Tạo kế hoạch nội dung đa kênh và kịch bản chăm sóc khách hàng tự động sát với hành vi người mua.",
      prompt: "Tôi bán sản phẩm/dịch vụ [Tên sản phẩm] cho đối tượng [Khách hàng mục tiêu]. Hãy lập ma trận nội dung 30 ngày theo phễu chuyển đổi (AIDA) và viết 3 mẫu email chăm sóc khách hàng tự động."
    }
  ];

  // 4. Roadmap Steps
  const roadmapPhases = [
    {
      phase: "Giai đoạn 1",
      title: "Số hóa & Chuẩn hóa Dữ liệu",
      time: "Tháng 01 - Tháng 03",
      desc: "Số hóa giấy tờ, chuyển từ Excel rời rạc sang phần mềm quản trị tập trung. Chuẩn hóa quy trình SOPs cốt lõi.",
      icon: <FileSpreadsheet className="w-5 h-5 text-indigo-600" />
    },
    {
      phase: "Giai đoạn 2",
      title: "Đào tạo Nhận thức & AI Quick-Wins",
      time: "Tháng 04 - Tháng 06",
      desc: "Huấn luyện nhân sự sử dụng ChatGPT/Gemini/Prompt chuẩn. Triển khai các trợ lý AI thử nghiệm cho Sale & CSKH.",
      icon: <Zap className="w-5 h-5 text-amber-500" />
    },
    {
      phase: "Giai đoạn 3",
      title: "Tự động hóa Quy trình Workflows",
      time: "Tháng 07 - Tháng 09",
      desc: "Tích hợp API giữa các hệ thống CRM/ERP/Task. Loại bỏ 80% các tác vụ nhập liệu và phê duyệt thủ công.",
      icon: <Shuffle className="w-5 h-5 text-emerald-600" />
    },
    {
      phase: "Giai đoạn 4",
      title: "Quản trị Dựa trên Dữ liệu (Data-Driven)",
      time: "Tháng 10 - Tháng 12+",
      desc: "Xây dựng Dashboard báo cáo thời gian thực cho Ban Giám đốc. Tối ưu hóa chi phí vận hành và nhân rộng ROI.",
      icon: <TrendingUp className="w-5 h-5 text-cyan-600" />
    }
  ];

  // Benefits
  const benefits = [
    {
      title: "Điểm số & Vị thế Doanh nghiệp",
      desc: "Nhận chỉ số đánh giá rõ ràng tương ứng với tốc độ sẵn sàng của doanh nghiệp bạn so với chuẩn mực thị trường.",
      icon: <Award className="w-8 h-8 text-indigo-600" />
    },
    {
      title: "Phân tích Rào cản & Cơ hội",
      desc: "Báo cáo tự động chỉ rõ những điểm nghẽn kỹ thuật lớn nhất và các cơ hội tăng trưởng vượt bậc.",
      icon: <Activity className="w-8 h-8 text-cyan-600" />
    },
    {
      title: "Bộ Tool & Prompt Áp dụng Ngay",
      desc: "Thực thi ngay lập tức với kho Prompt AI tối ưu sẵn cho CEO và bộ công cụ tính toán ROI tinh gọn.",
      icon: <Wrench className="w-8 h-8 text-amber-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header Navigation */}
      <Header onNavigate={onNavigate} activeRoute="assessments" />

      {/* Hero Section */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white">
        {/* Background Decorative Element */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Top Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-indigo-200 text-xs font-bold px-4 py-2 rounded-full mb-6 shadow-inner"
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Nền tảng Quản trị & Chuyển đổi số Toàn diện từ Base.vn</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6"
            >
              Nền tảng hỗ trợ <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-300 to-amber-300">
                Chuyển đổi số & Ứng dụng AI
              </span> Doanh nghiệp
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-8 font-normal"
            >
              Đo lường mức độ trưởng thành số, bộ công cụ quản trị miễn phí, và khai thác kho prompt AI chuẩn hóa dành riêng cho CEO & Nhà quản trị.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 mb-12"
            >
              <button 
                onClick={() => document.getElementById('featured-assessments')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center gap-2 cursor-pointer text-sm sm:text-base"
              >
                <Layers className="w-5 h-5" />
                <span>Khảo sát Doanh nghiệp</span>
              </button>

              <button 
                onClick={() => document.getElementById('free-tools-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold px-7 py-3.5 rounded-xl border border-slate-700 transition-all flex items-center gap-2 cursor-pointer text-sm sm:text-base"
              >
                <Wrench className="w-5 h-5 text-amber-400" />
                <span>Free Business Tools</span>
              </button>

              <button 
                onClick={() => onNavigate('/prompt-library')}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold px-7 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer text-sm sm:text-base"
              >
                <Zap className="w-5 h-5 fill-slate-950" />
                <span>Kho Prompt AI</span>
              </button>
            </motion.div>

            {/* Quick Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 max-w-4xl mx-auto text-left"
            >
              <div className="p-3">
                <div className="text-2xl sm:text-3xl font-black text-indigo-400 font-mono">4+</div>
                <div className="text-xs text-slate-300 font-medium">Bộ chỉ số khảo sát</div>
              </div>
              <div className="p-3 border-l border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">5+</div>
                <div className="text-xs text-slate-300 font-medium">Free Business Tools</div>
              </div>
              <div className="p-3 border-l border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">50+</div>
                <div className="text-xs text-slate-300 font-medium">Prompt AI thực chiến</div>
              </div>
              <div className="p-3 border-l border-white/10">
                <div className="text-2xl sm:text-3xl font-black text-sky-400 font-mono">1.000+</div>
                <div className="text-xs text-slate-300 font-medium">Doanh nghiệp tin dùng</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 1: Featured Enterprise Assessments */}
      <section id="featured-assessments" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3.5 py-1 rounded-md mb-3">
              <Layers className="w-3.5 h-3.5" /> Khảo sát & Đo lường Sức mạnh Số
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Các bộ chỉ số đánh giá doanh nghiệp
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
              Hoàn thành khảo sát trắc nghiệm trong 5-10 phút để nhận ngay điểm số trực quan và báo cáo chiến lược từ chuyên gia.
            </p>
            <div className="mt-4 flex items-center justify-center">
              <button 
                onClick={() => setShowMockReport(true)}
                className="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer hover:underline"
              >
                <FileText className="w-4 h-4" /> Xem báo cáo mẫu <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {assessments.map((a, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group cursor-pointer"
                onClick={() => onNavigate(a.route)}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${a.colorBg}`}>
                    {a.icon}
                  </div>
                  <span className="inline-block text-[10px] bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded-md mb-3 uppercase tracking-wide">
                    {a.tag}
                  </span>
                  <h3 className="font-display font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2 text-base leading-snug">
                    {a.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {a.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                  <span>Khảo sát miễn phí</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Free Business Tools Hub & Interactive ROI Calculator */}
      <section id="free-tools-section" className="py-20 bg-slate-100/60 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-3.5 py-1 rounded-md mb-3">
              <Wrench className="w-3.5 h-3.5" /> Bộ công cụ Quản trị Miễn phí (Free Tools)
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Công cụ hỗ trợ ra quyết định dành riêng cho CEO
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Các template, máy tính ROI và ma trận xếp hạng dự án giúp tối ưu hoá nguồn lực và tiết kiệm hàng trăm triệu chi phí vận hành.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {freeTools.map((tool) => (
              <div 
                key={tool.id}
                onClick={() => {
                  if (tool.route) {
                    onNavigate(tool.route);
                  }
                }}
                className="bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
                    {tool.icon}
                  </div>
                  <span className="inline-block text-[10px] font-extrabold uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded mb-2">
                    {tool.tag}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-emerald-700 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {tool.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
                  <span>{tool.actionText}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Featured Prompt AI Library Highlight */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-3.5 py-1 rounded-md mb-3">
                <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-600" /> Thư viện Prompt AI Chuẩn hóa
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Kho câu lệnh AI thực chiến cho CEO & Doanh nghiệp
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
                Hơn 50+ câu lệnh đã được tối ưu sẵn cho ChatGPT, Claude & Gemini. Sao chép và điền thông số doanh nghiệp áp dụng ngay.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('/prompt-library')}
              className="mt-4 md:mt-0 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Xem tất cả 50+ Prompt</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Featured Prompts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredPrompts.map((p) => {
              const isCopied = copiedPromptId === p.id;
              return (
                <div 
                  key={p.id}
                  className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-amber-300 hover:shadow-md transition-all group"
                >
                  <div>
                    <span className="text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800 px-2.5 py-1 rounded-md mb-3 inline-block">
                      {p.dept}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-amber-700 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {p.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                    <button 
                      onClick={() => copyToClipboard(p.prompt, p.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-amber-50 hover:border-amber-300 text-slate-700 rounded-lg text-xs font-bold transition-all cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600">Đã Copy</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy nhanh</span>
                        </>
                      )}
                    </button>

                    <button 
                      onClick={() => onNavigate('/prompt-library')}
                      className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Tùy biến <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: Digital Transformation & AI Implementation Roadmap */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-sky-400 bg-sky-950/80 border border-sky-800/50 px-3.5 py-1 rounded-md mb-3">
              <Map className="w-3.5 h-3.5" /> Lộ Trình Thực Chiến
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight">
              Lộ trình chuyển đổi số & ứng dụng AI cho SME
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              Khung triển khai 4 giai đoạn tinh gọn giúp doanh nghiệp đạt lợi nhuận và ROI rõ ràng, tránh lãng phí ngân sách.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmapPhases.map((phase, idx) => (
              <div 
                key={idx}
                className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 flex flex-col justify-between hover:border-sky-500/50 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-sky-400 bg-sky-950 border border-sky-800/50 px-2.5 py-1 rounded-md">
                      {phase.phase}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{phase.time}</span>
                  </div>

                  <h3 className="font-bold text-white text-base mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {phase.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-700/60 flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Chuẩn hóa & đo lường KPI</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Benefits Section */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Doanh nghiệp nhận được gì khi tham gia?
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Báo cáo chiến lược trực quan kết hợp bộ công cụ thực thi hỗ trợ đắc lực cho các quyết sách của nhà lãnh đạo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((b, idx) => (
              <div 
                key={idx}
                className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-md hover:bg-white"
              >
                <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-6 shadow-sm">
                  {b.icon}
                </div>
                <h3 className="font-bold text-slate-900 mb-2 text-lg">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Footer CTA */}
      <section className="py-20 bg-slate-900 text-white text-center relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold mb-4 tracking-tight">
            Sẵn sàng nâng tầm năng lực quản trị doanh nghiệp?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Khám phá ngay các bài khảo sát miễn phí hoặc trải nghiệm hệ sinh thái phần mềm quản trị Base.vn.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => document.getElementById('featured-assessments')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all cursor-pointer text-sm"
            >
              Bắt đầu đánh giá ngay
            </button>
            <button 
              onClick={() => window.open('https://base.vn/dang-ky-demo?utm_source=base-survey', '_blank', 'noopener,noreferrer')}
              className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-8 py-4 rounded-xl transition-all cursor-pointer text-sm flex items-center gap-2"
            >
              <span>Đăng ký Demo Base.vn</span>
              <ExternalLink className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />

      {/* Mock Report Modal */}
      <AnimatePresence>
        {showMockReport && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-slate-100"
            >
              {/* Modal header */}
              <div className="sticky top-0 bg-slate-900 text-white p-6 flex justify-between items-center z-10">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setShowMockReport(false); onNavigate('/'); }}>
                  <div className="bg-white px-2 py-1 rounded-md flex items-center justify-center border border-slate-100">
                    <img 
                      src="https://static-gcdn.basecdn.net/landing/base.vn/image/v2/logo/base.png" 
                      alt="Base.vn" 
                      className="h-4 object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="text-slate-500 font-bold">|</span>
                  <span className="font-display font-bold text-xs tracking-wide text-slate-300">BÁO CÁO MẪU • CHỈ SỐ AI SẴN SÀNG</span>
                </div>
                <button 
                  onClick={() => setShowMockReport(false)}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal content */}
              <div className="p-8 overflow-y-auto flex-1 space-y-8 bg-slate-50/50">
                {/* Visual score card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-32 h-32 rounded-full border-8 border-indigo-200 border-t-indigo-600 flex items-center justify-center shrink-0">
                    <span className="font-display text-3xl font-black text-slate-900">74%</span>
                  </div>
                  <div>
                    <span className="inline-block bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2.5 py-1 rounded-md mb-2">ĐÁNH GIÁ: SẴN SÀNG CAO</span>
                    <h3 className="font-bold text-slate-900 text-lg mb-1.5">Giai đoạn Triển khai AI (Deploy Stage)</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Nền tảng hạ tầng và tổ chức của bạn đã sẵn sàng tiếp nhận các quy trình số hóa dựa trên mô hình học máy. Hãy tập trung bắt đầu từ một vài dự án thử nghiệm nhỏ mang lại hiệu quả trực tiếp.
                    </p>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-4 text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" /> Khuyến nghị Lộ trình Thực thi
                  </h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-xl text-xs text-indigo-900 font-medium">
                      1. Thử nghiệm AI Agent cho CSKH & Sale tự động trong 30 ngày.
                    </div>
                    <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-xl text-xs text-emerald-900 font-medium">
                      2. Chuẩn hóa quy trình tài liệu hóa SOPs và phân quyền truy cập dữ liệu.
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal footer */}
              <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-white">
                <button 
                  onClick={() => setShowMockReport(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Đóng lại
                </button>
                <button 
                  onClick={() => {
                    setShowMockReport(false);
                    onNavigate('/khao-sat-chuyen-doi-ai');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md hover:bg-indigo-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  Bắt đầu Khảo sát thực tế <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
