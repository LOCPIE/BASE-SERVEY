import React, { useState } from 'react';
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
  LineChart, 
  BarChart3, 
  Zap, 
  Shuffle, 
  Target,
  FileSpreadsheet
} from 'lucide-react';

interface HomeProps {
  onNavigate: (path: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [showMockReport, setShowMockReport] = useState(false);

  // Featured assessments
  const assessments = [
    {
      title: "Chỉ số chuyển đổi số doanh nghiệp",
      desc: "Đánh giá mức độ chuyển đổi số toàn diện trên các khía cạnh vận hành, công nghệ và tư duy quản trị.",
      icon: <Layers className="w-6 h-6 text-accent" />,
      tag: "Dành cho CEO/COO",
      colorBg: "bg-purple-100/50 border-purple-200"
    },
    {
      title: "Chỉ số sẵn sàng ứng dụng AI",
      desc: "Đo lường mức độ trưởng thành của dữ liệu, hạ tầng kỹ thuật và con người để tích hợp AI vào quy trình.",
      icon: <Cpu className="w-6 h-6 text-accent-secondary" />,
      tag: "Trọng tâm và nổi bật",
      colorBg: "bg-cyan-100/50 border-cyan-200"
    },
    {
      title: "Chỉ số trưởng thành quản trị nhân sự",
      desc: "Xác định khả năng thích ứng, đào tạo nguồn lực và văn hóa học hỏi của nhân tài trước làn sóng số.",
      icon: <Users className="w-6 h-6 text-success" />,
      tag: "HR / Quản trị",
      colorBg: "bg-emerald-100/50 border-emerald-200"
    },
    {
      title: "Chỉ số tự động hóa quy trình",
      desc: "Khảo sát mức độ số hóa các quy trình (SOPs), loại bỏ các điểm nghẽn thủ công bằng tự động hóa.",
      icon: <Shuffle className="w-6 h-6 text-warning" />,
      tag: "Tối ưu vận hành",
      colorBg: "bg-amber-100/50 border-amber-200"
    }
  ];

  // Benefits
  const benefits = [
    {
      title: "Điểm đánh giá tổng thể",
      desc: "Nhận điểm số rõ ràng tương ứng với tốc độ sẵn sàng của doanh nghiệp bạn trong kỷ nguyên công nghệ mới.",
      icon: <Award className="w-8 h-8 text-accent" />
    },
    {
      title: "Phân tích điểm mạnh, điểm yếu",
      desc: "Báo cáo chi tiết chỉ ra những rào cản kỹ thuật lớn nhất và các ưu thế sẵn có cần được nhân rộng.",
      icon: <Activity className="w-8 h-8 text-accent-secondary" />
    },
    {
      title: "Lộ trình cải thiện theo từng giai đoạn",
      desc: "Đề xuất các bước đi thực tế từ số hóa cốt lõi, chuẩn hóa quy trình, đến ứng dụng AI mang lại ROI rõ rệt.",
      icon: <TrendingUp className="w-8 h-8 text-warning" />
    }
  ];

  // Steps
  const steps = [
    {
      num: "01",
      title: "Chọn bài đánh giá",
      desc: "Truy cập hệ thống và chọn bộ chỉ số phù hợp nhất với trọng tâm muốn đánh giá."
    },
    {
      num: "02",
      title: "Trả lời khảo sát",
      desc: "Hoàn thiện các câu hỏi trắc nghiệm khách quan trong vòng 5-10 phút."
    },
    {
      num: "03",
      title: "Nhận kết quả ngay",
      desc: "Hệ thống tự động phân tích và chấm điểm trực tiếp dạng biểu đồ trực quan."
    },
    {
      num: "04",
      title: "Xem khuyến nghị cải thiện",
      desc: "Tải báo cáo chi tiết đi kèm các đề xuất hành động thực tiễn phù hợp với điều kiện vận hành."
    }
  ];

  // Stats
  const stats = [
    { value: "1.000+", label: "Doanh nghiệp tham gia" },
    { value: "10.000+", label: "Lượt đánh giá" },
    { value: "20+", label: "Bộ chỉ số chuyên sâu" }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 selection:bg-accent/20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('/')}>
            <div className="bg-white px-3.5 py-2.5 rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
              <img 
                src="https://static-gcdn.basecdn.net/landing/base.vn/image/v2/logo/base.png" 
                alt="Base.vn" 
                className="h-6 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-semibold text-slate-800 hover:text-accent transition-colors">Trang chủ</a>
            <a href="#benefits" className="text-sm font-semibold text-slate-600 hover:text-accent transition-colors">Doanh nghiệp nhận được gì?</a>
            <a href="#process" className="text-sm font-semibold text-slate-600 hover:text-accent transition-colors">Quy trình</a>
            <a href="#stats" className="text-sm font-semibold text-slate-600 hover:text-accent transition-colors">Thống kê</a>
          </nav>

          <button 
            onClick={() => window.open('https://base.vn/dang-ky-demo?utm_source=base-survey', '_blank', 'noopener,noreferrer')}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            Đăng Ký Demo <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-24 overflow-hidden bg-gradient-to-b from-slate-50/80 to-white">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a05_1px,transparent_1px),linear-gradient(to_bottom,#0f172a05_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        
        {/* Background blobs */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[550px] h-[550px] bg-accent/8 rounded-full blur-[100px] pointer-events-none animate-float-slow" />
        <div className="absolute bottom-10 right-1/4 translate-x-1/2 w-[450px] h-[450px] bg-accent-secondary/8 rounded-full blur-[90px] pointer-events-none animate-float-reverse" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs font-bold px-4 py-2 rounded-full mb-6 uppercase tracking-wider font-display shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-indigo-600" /> Đóng góp nghiên cứu từ Base.vn
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5"
              >
                Khám phá mức độ trưởng thành của doanh nghiệp qua <span className="text-gradient">các bài đánh giá chuyên sâu</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 max-w-xl"
              >
                Nhận điểm số, phân tích và khuyến nghị dựa trên các bộ tiêu chí được xây dựng cho nhiều lĩnh vực quản trị và vận hành doanh nghiệp.
              </motion.p>

              {/* Quick Checklist for UX/UI reassurance */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 w-full max-w-lg"
              >
                <div className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Hoàn thành nhanh trong 5-10 phút</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Nhận kết quả và biểu đồ tức thì</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Định vị vị thế so với thị trường</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>100% Bảo mật dữ liệu khảo sát</span>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              >
                <button 
                  onClick={() => document.getElementById('featured-assessments')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-accent text-white px-8 py-4 text-base font-bold rounded-xl shadow-lg hover:shadow-xl hover:shadow-accent/10 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Bắt đầu đánh giá <ArrowRight className="w-5 h-5 animate-pulse" />
                </button>
                <button 
                  onClick={() => setShowMockReport(true)}
                  className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 px-8 py-4 text-base font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-5 h-5 text-slate-500" /> Xem báo cáo mẫu
                </button>
              </motion.div>
            </div>

            {/* Right Column: Premium Mockup/Dashboard Preview Widget */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xl max-w-md mx-auto overflow-hidden group hover:border-accent/40 hover:-translate-y-1 transition-all"
              >
                {/* Header elements */}
                <div className="flex justify-between items-start border-b border-slate-100 pb-4 mb-5">
                  <div>
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                      Mẫu kết quả
                    </span>
                    <h4 className="font-display font-black text-slate-900 mt-1.5 leading-snug text-base">
                      Chỉ số sẵn sàng ứng dụng AI
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">Doanh nghiệp: TechLink Corp</p>
                  </div>
                  <div className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-lg text-center border border-emerald-100 flex items-center gap-1 shadow-sm">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold font-mono">74/100</span>
                  </div>
                </div>

                {/* Score meters */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1.5 text-slate-700">
                      <span>Dữ liệu & Quy trình chuẩn hóa</span>
                      <span className="font-mono text-indigo-600 font-bold">85%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                        className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full rounded-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1.5 text-slate-700">
                      <span>Hạ tầng Công nghệ thông tin</span>
                      <span className="font-mono text-cyan-600 font-bold">60%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "60%" }}
                        transition={{ duration: 1.2, delay: 0.7 }}
                        className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-full rounded-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1.5 text-slate-700">
                      <span>Năng lực Con người & Đội ngũ</span>
                      <span className="font-mono text-emerald-600 font-bold">72%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "72%" }}
                        transition={{ duration: 1.2, delay: 0.9 }}
                        className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Alert/Recommendation Box */}
                <div className="mt-6 p-3 bg-indigo-50/60 border border-indigo-100/50 rounded-xl">
                  <div className="flex items-start gap-2.5">
                    <span className="text-sm shrink-0">💡</span>
                    <div>
                      <h5 className="text-[11px] font-bold text-indigo-950">Khuyến nghị trọng tâm:</h5>
                      <p className="text-[11px] text-indigo-700 leading-relaxed mt-0.5 font-medium">
                        Chuẩn hóa quy trình thu thập dữ liệu tự động trước khi triển khai các trợ lý ảo (AI Agent).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Simulated decorative status bar */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping" />
                    <span>Hệ thống phân tích trực tuyến</span>
                  </span>
                  <span>Mức độ: Khá (Silver)</span>
                </div>
              </motion.div>

              {/* Backing glow element for extra physical depth */}
              <div className="absolute inset-0 max-w-md mx-auto -z-10 bg-slate-200/30 rounded-2xl blur-xl translate-y-3 pointer-events-none" />
            </div>

          </div>
        </div>
      </section>

      {/* Featured Assessments Section */}
      <section id="featured-assessments" className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Các bài đánh giá nổi bật
            </h2>
            <p className="text-slate-600 text-sm">
              Được thiết kế dựa trên khung năng lực chuẩn quốc tế giúp đo đếm sức mạnh số của mọi phòng ban.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {assessments.map((a, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:border-accent/30 group cursor-pointer flex flex-col justify-between"
                onClick={() => onNavigate(
                  idx === 0 ? '/khao-sat-chuyen-doi-so' : 
                  idx === 2 ? '/chi-so-quan-tri-nhan-su' : 
                  idx === 3 ? '/chi-so-tu-dong-hoa-quy-trinh' :
                  '/khao-sat-chuyen-doi-ai'
                )}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${a.colorBg}`}>
                    {a.icon}
                  </div>
                  <span className="inline-block text-[10px] bg-slate-100 text-slate-600 font-bold px-2.5 py-1 rounded-md mb-3.5 uppercase tracking-wide">
                    {a.tag}
                  </span>
                  <h3 className="font-display font-bold text-slate-900 group-hover:text-accent transition-colors mb-2 text-base leading-snug">
                    {a.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {a.desc}
                  </p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-accent group-hover:translate-x-1 transition-transform">
                  <span>Khảo sát miễn phí</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Businesses Get Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Doanh nghiệp nhận được gì?
            </h2>
            <p className="text-slate-600 text-sm">
              Không chỉ là điểm số, chúng tôi mang lại báo cáo chiến lược trực quan hỗ trợ đắc lực cho các quyết sách của nhà lãnh đạo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((b, idx) => (
              <div 
                key={idx}
                className="relative bg-slate-50 border border-slate-100 rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-md hover:bg-white hover:border-accent/20"
              >
                <div className="w-14 h-14 rounded-xl bg-white border border-slate-100 flex items-center justify-center mb-6 shadow-sm">
                  {b.icon}
                </div>
                <h3 className="font-display font-bold text-slate-900 mb-3 text-lg">
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

      {/* Execution Process Section */}
      <section id="process" className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Quy trình thực hiện
            </h2>
            <p className="text-slate-600 text-sm">
              Trải nghiệm hành trình chuyển đổi số tinh gọn và tối ưu năng lực quản trị chỉ với 4 bước đơn giản.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {steps.map((s, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center text-white text-xl font-black shadow-lg mb-6 z-10">
                  {s.num}
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 border-t border-dashed border-slate-300 z-0" />
                )}
                <h3 className="font-display font-bold text-slate-900 mb-3 text-base">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-[200px]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="font-display text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-secondary via-white to-accent mb-3">
                  {stat.value}
                </span>
                <span className="text-slate-400 font-semibold text-sm">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className="py-20 md:py-28 bg-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="font-display text-3xl sm:text-4xl font-black text-slate-900 mb-4 tracking-tight">
            Bạn đã sẵn sàng đánh giá năng lực doanh nghiệp của mình?
          </h2>
          <p className="text-slate-600 text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            Bắt đầu khảo sát miễn phí và nhận báo cáo chi tiết ngay hôm nay. Chỉ với 5–10 phút để nắm giữ tương lai đổi mới.
          </p>
          <button 
            onClick={() => document.getElementById('featured-assessments')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-accent text-white px-10 py-5 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2.5 mx-auto cursor-pointer"
          >
            Bắt đầu đánh giá ngay <ArrowRight className="w-5 h-5 font-bold" />
          </button>
        </div>
      </section>

      {/* Footer info */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:flex sm:justify-between sm:items-center">
          <div className="flex items-center justify-center mb-4 sm:mb-0 cursor-pointer" onClick={() => onNavigate('/')}>
            <div className="bg-white px-3.5 py-2.5 rounded-lg flex items-center justify-center shadow-sm border border-slate-100">
              <img 
                src="https://static-gcdn.basecdn.net/landing/base.vn/image/v2/logo/base.png" 
                alt="Base.vn" 
                className="h-5.5 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <p className="text-slate-400 text-xs">
            © 2026 Base.vn. Đã đăng ký bản quyền. Công cụ quản trị doanh nghiệp hiện đại.
          </p>
        </div>
      </footer>

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
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal content */}
              <div className="p-8 overflow-y-auto flex-1 space-y-8 bg-slate-50/50">
                {/* Visual score card */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-32 h-32 rounded-full border-8 border-accent/20 border-t-accent flex items-center justify-center shrink-0">
                    <span className="font-display text-3xl font-black text-slate-900">65%</span>
                  </div>
                  <div>
                    <span className="inline-block bg-accent/10 text-accent text-[10px] font-bold px-2 py-1 rounded-md mb-2">ĐÁNH GIÁ: KHẢ QUAN</span>
                    <h3 className="font-display font-bold text-slate-900 text-lg mb-1.5">Giai đoạn Sẵn sàng Triển khai (Deploy Stage)</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Nền tảng hạ tầng và tổ chức của bạn đã sẵn sàng tiếp nhận các quy trình số hóa dựa trên mô hình học máy. Hãy tập trung bắt đầu từ một vài dự án thử nghiệm nhỏ nhưng hiệu quả cao.
                    </p>
                  </div>
                </div>

                {/* Score dimensions */}
                <div>
                  <h4 className="font-display font-bold text-slate-950 mb-4 text-xs tracking-wider uppercase">Chi tiết theo 5 chiều năng lượng phối hợp</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: "Chiến lược & Lãnh đạo", val: 80, color: "bg-purple-500" },
                      { name: "Dữ liệu & Hạ tầng", val: 50, color: "bg-cyan-500" },
                      { name: "Năng lực Nhân sự", val: 65, color: "bg-emerald-500" },
                      { name: "Quy trình & Vận hành", val: 75, color: "bg-amber-500" },
                      { name: "Công nghệ & Hệ thống", val: 60, color: "bg-red-500" }
                    ].map((d, idx) => (
                      <div key={idx} className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1.5">
                          <span>{d.name}</span>
                          <span>{d.val}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className={`h-full ${d.color}`} style={{ width: `${d.val}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200">
                  <h4 className="font-display font-bold text-slate-900 mb-4 text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-yellow-500" /> Khuyến nghị Hành động (Roadmap gợi ý từ chuyên gia)
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-purple-50/50 border border-purple-100 rounded-xl">
                      <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700 text-xs font-bold shrink-0">1</div>
                      <div>
                        <h5 className="text-xs font-bold text-purple-950 mb-1">Thiết lập Pilot Team cho giải pháp AI</h5>
                        <p className="text-[11px] text-purple-700 leading-normal">Chọn đội ngũ nòng cốt 3-5 nhân sự thành thạo công nghệ chạy thử nghiệm AI bot trả lời khách tự động (timeline 30 ngày).</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-cyan-50/50 border border-cyan-100 rounded-xl">
                      <div className="w-7 h-7 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-700 text-xs font-bold shrink-0">2</div>
                      <div>
                        <h5 className="text-xs font-bold text-cyan-950 mb-1">Chuẩn hóa cấu trúc hạ tầng dữ liệu dữ phòng</h5>
                        <p className="text-[11px] text-cyan-700 leading-normal">Lọc và định dạng lại tất cả danh bạ khách hàng tiềm năng cũng như tài liệu quy trình nội bộ trước khi cấp làm Knowledge-base cho AI.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal footer */}
              <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-white">
                <button 
                  onClick={() => setShowMockReport(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold text-xs transition-colors"
                >
                  Đóng lại
                </button>
                <button 
                  onClick={() => {
                    setShowMockReport(false);
                    onNavigate('/khao-sat-chuyen-doi-ai');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-accent text-white font-bold text-xs shadow-md hover:shadow-lg transition-colors flex items-center gap-1.5"
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
