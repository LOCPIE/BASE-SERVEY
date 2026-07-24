import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, 
  ChevronRight, 
  ChevronLeft,
  Sparkles, 
  Layers, 
  Cpu, 
  Users, 
  Shuffle, 
  Calculator, 
  FileText, 
  Copy, 
  Check, 
  Search, 
  Filter, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Zap, 
  ShieldCheck, 
  HelpCircle,
  ExternalLink,
  Bot,
  PieChart,
  Grid,
  Building2,
  ArrowRight,
  X
} from 'lucide-react';

interface BusinessToolsProps {
  onNavigate: (path: string) => void;
}

export default function BusinessTools({ onNavigate }: BusinessToolsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Interactive Calculator State
  const [employees, setEmployees] = useState<number>(30);
  const [avgSalary, setAvgSalary] = useState<number>(15); // million VND
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState<number>(8); // hours per employee per week

  // Active Tool Modal
  const [activeModal, setActiveModal] = useState<'prompt-hub' | 'raci' | 'turnover' | null>(null);
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);

  // RACI generator state
  const [raciTask, setRaciTask] = useState<string>('Phê duyệt ngân sách dự án mới');
  const [raciRoles, setRaciRoles] = useState({
    CEO: 'Approver (A)',
    'Trưởng phòng': 'Responsible (R)',
    'Kế toán': 'Consulted (C)',
    'Nhân viên': 'Informed (I)'
  });

  // Calculate ROI & Time Savings
  const calculation = useMemo(() => {
    // Assumptions:
    // Automation saves ~60% of manual repetitive tasks
    const hoursSavedPerWeek = employees * manualHoursPerWeek * 0.6;
    const hoursSavedPerMonth = hoursSavedPerWeek * 4.33;
    const hourlyRateVND = (avgSalary * 1000000) / 160; // 160 working hours/month
    const monthlyCostSavedVND = hoursSavedPerMonth * hourlyRateVND;
    const yearlyCostSavedVND = monthlyCostSavedVND * 12;

    return {
      hoursSavedPerMonth: Math.round(hoursSavedPerMonth),
      yearlyCostSavedMillion: (yearlyCostSavedVND / 1000000).toFixed(1),
      efficiencyIncrease: 35
    };
  }, [employees, avgSalary, manualHoursPerWeek]);

  // AI Prompts Data
  const aiPrompts = [
    {
      role: 'CEO / Ban Giám đốc',
      title: 'Phân tích SWOT & Chiến lược cạnh tranh',
      prompt: 'Tôi là CEO của doanh nghiệp trong ngành [Tên ngành]. Hãy đóng vai một chuyên gia tư vấn chiến lược hàng đầu. Phân tích điểm mạnh (S), điểm yếu (W), cơ hội (O) và thách thức (T) của chúng tôi trong bối cảnh chuyển đổi số năm nay, đồng thời đề xuất 3 sáng kiến ưu tiên cao nhất mang lại ROI cao trong 6 tháng.'
    },
    {
      role: 'Quản lý Vận hành / COO',
      title: 'Xây dựng Quy trình SOP Chuẩn hóa tác vụ',
      prompt: 'Hãy giúp tôi lập dàn ý Quy trình thao tác chuẩn (SOP) cho công việc: [Tên quy trình, ví dụ: Phê duyệt đề nghị thanh toán]. Hãy chia thành các bước: Chuẩn bị, Thực hiện, Kiểm tra, Phê duyệt. Chỉ rõ đầu vào, đầu ra và người chịu trách nhiệm (RACI) ở từng bước.'
    },
    {
      role: 'Trưởng phòng HR',
      title: 'Xoay xở bài toán Giữ chân Nhân tài & Văn hóa số',
      prompt: 'Tôi là Trưởng phòng HR. Doanh nghiệp đang gặp tỷ lệ nghỉ việc [X%] ở nhóm nhân sự trẻ. Hãy gợi ý 5 giải pháp cải thiện trải nghiệm nhân viên (Employee Experience), số hóa môi trường làm việc và bộ chỉ số KPI đo lường mức độ gắn kết nội bộ.'
    },
    {
      role: 'Quản lý Dự án / PM',
      title: 'Tự động tổng hợp Báo cáo Tiến độ & Rủi ro',
      prompt: 'Tôi có dữ liệu dự án như sau: [Dán dữ liệu thô hoặc cập nhật tuần]. Hãy tổng hợp thành một báo cáo 1 trang ngắn gọn gồm: Tiến độ đạt được %, 3 rủi ro tiềm ẩn nhất kèm giải pháp giảm thiểu, và danh sách công việc cần quyết định ngay tuần này.'
    }
  ];

  const categories = [
    { id: 'all', label: 'Tất cả công cụ' },
    { id: 'assessment', label: 'Bài khảo sát & Đo lường' },
    { id: 'calculator', label: 'Tính toán ROI & Chi phí' },
    { id: 'templates', label: 'Mẫu quy trình & AI Hub' },
  ];

  const tools = [
    {
      id: 'ai-assessment',
      category: 'assessment',
      title: 'Khảo sát Chỉ số Sẵn sàng Chuyển đổi AI',
      desc: 'Đánh giá 5 trụ cột: Chiến lược, Dữ liệu, Nhân sự, Quy trình & Hạ tầng công nghệ để xác định mức độ sẵn sàng tích hợp AI.',
      icon: <Cpu className="w-6 h-6 text-purple-600" />,
      badge: 'Phổ biến nhất',
      actionText: 'Bắt đầu khảo sát',
      onClick: () => onNavigate('/khao-sat-chuyen-doi-ai')
    },
    {
      id: 'dx-assessment',
      category: 'assessment',
      title: 'Khảo sát Mức độ Chuyển đổi số Doanh nghiệp',
      desc: 'Đo lường 17 chỉ số tiêu chuẩn về hạ tầng cloud, phần mềm quản trị, bảo mật và năng lực vận hành số.',
      icon: <Layers className="w-6 h-6 text-indigo-600" />,
      badge: 'Đánh giá toàn diện',
      actionText: 'Bắt đầu khảo sát',
      onClick: () => onNavigate('/khao-sat-chuyen-doi-so')
    },
    {
      id: 'hr-assessment',
      category: 'assessment',
      title: 'Khảo sát Trưởng thành Quản trị Nhân sự (HRM)',
      desc: 'Khảo sát quy trình tuyển dụng, onboarding, giữ chân nhân tài và trải nghiệm số của đội ngũ nhân sự.',
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      badge: 'Dành cho HR & CEO',
      actionText: 'Bắt đầu khảo sát',
      onClick: () => onNavigate('/chi-so-quan-tri-nhan-su')
    },
    {
      id: 'bpa-assessment',
      category: 'assessment',
      title: 'Khảo sát Chỉ số Tự động hóa Quy trình (BPA)',
      desc: 'Đo lường mức độ số hóa các luồng công việc, phê duyệt văn bản, giảm thiểu lãng phí và nút thắt thủ công.',
      icon: <Shuffle className="w-6 h-6 text-cyan-600" />,
      badge: 'Tối ưu Vận hành',
      actionText: 'Bắt đầu khảo sát',
      onClick: () => onNavigate('/chi-so-tu-dong-hoa-quy-trinh')
    },
    {
      id: 'roi-calculator',
      category: 'calculator',
      title: 'Công cụ Tính toán Tiết kiệm Chi phí Tự động hóa',
      desc: 'Nhập quy mô nhân sự và giờ làm thủ công để tính ngay số tiền (VNĐ) và số giờ làm việc tiết kiệm được hàng năm.',
      icon: <Calculator className="w-6 h-6 text-amber-600" />,
      badge: 'Công cụ Tương tác',
      actionText: 'Dùng công cụ bên trên',
      onClick: () => {
        document.getElementById('roi-calculator-widget')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'ai-prompts',
      category: 'templates',
      title: 'Thư viện Prompt AI Quản trị Doanh nghiệp',
      desc: 'Tổng hợp 50+ câu lệnh mẫu được thiết kế sẵn cho CEO & Quản lý áp dụng ChatGPT/Gemini vào công việc hàng ngày.',
      icon: <Bot className="w-6 h-6 text-violet-600" />,
      badge: 'Mẫu Prompt',
      actionText: 'Xem & Sao chép Prompt',
      onClick: () => setActiveModal('prompt-hub')
    },
    {
      id: 'raci-matrix',
      category: 'templates',
      title: 'Công cụ Khung Ma trận Trách nhiệm RACI',
      desc: 'Tạo nhanh sơ đồ phân công trách nhiệm (Responsible, Accountable, Consulted, Informed) cho các dự án phòng ban.',
      icon: <Grid className="w-6 h-6 text-blue-600" />,
      badge: 'Chuẩn hóa SOP',
      actionText: 'Tạo Ma trận RACI',
      onClick: () => setActiveModal('raci')
    },
    {
      id: 'turnover-estimator',
      category: 'calculator',
      title: 'Công cụ Ước tính Chi phí Lãng phí do Turnover',
      desc: 'Đo lường thiệt hại tài chính do thay thế nhân sự nghỉ việc (chi phí tuyển dụng, đào tạo và gián đoạn công việc).',
      icon: <PieChart className="w-6 h-6 text-rose-600" />,
      badge: 'Phân tích Chi phí',
      actionText: 'Mở công cụ tính',
      onClick: () => setActiveModal('turnover')
    }
  ];

  const filteredTools = tools.filter(tool => {
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyPrompt = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptIndex(index);
    setTimeout(() => setCopiedPromptIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 selection:bg-indigo-500/20 font-sans">
      {/* Accent Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 z-50" />

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
            <button onClick={() => onNavigate('/')} className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer bg-transparent border-none">Trang chủ</button>
            <button onClick={() => onNavigate('/tool')} className="text-sm font-bold text-indigo-600 transition-colors flex items-center gap-1.5 cursor-pointer bg-transparent border-none">
              Tool
              <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider">Free</span>
            </button>
            <button onClick={() => { onNavigate('/'); setTimeout(() => { document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }} className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer bg-transparent border-none">Doanh nghiệp nhận được gì?</button>
            <button onClick={() => { onNavigate('/'); setTimeout(() => { document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }} className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer bg-transparent border-none">Quy trình</button>
            <button onClick={() => { onNavigate('/'); setTimeout(() => { document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }} className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer bg-transparent border-none">Thống kê</button>
          </nav>

          <button 
            onClick={() => window.open('https://base.vn/dang-ky-demo?utm_source=base-survey-tools', '_blank', 'noopener,noreferrer')}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            Đăng Ký Demo <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-20 overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-slate-50/30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a05_1px,transparent_1px),linear-gradient(to_bottom,#0f172a05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold tracking-[0.08em] uppercase px-4 py-1.5 rounded-full mb-6 font-display shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            100% Miễn Phí · Dành Cho Doanh Nghiệp
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-5 max-w-4xl mx-auto">
            Danh mục các <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600">Tool Miễn Phí</span> Dành Cho Doanh Nghiệp
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Bộ công cụ trực quan giúp lãnh đạo và quản lý đo lường sức khỏe vận hành, tính toán ROI tự động hóa, ứng dụng AI và chuẩn hóa quy trình làm việc.
          </p>

          {/* Search & Filter Bar */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-3 shadow-xl border border-slate-200 flex flex-col md:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm công cụ, bài khảo sát, calculator..."
                className="w-full pl-11 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800"
              />
            </div>
            
            <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer border ${
                    activeCategory === cat.id 
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' 
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tool Widget: ROI & Time Saver Calculator */}
      <section id="roi-calculator-widget" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-16 relative z-20">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-[28px] p-6 sm:p-10 shadow-2xl border border-slate-800 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
            {/* Calculator Inputs */}
            <div className="lg:w-7/12 space-y-6">
              <div className="inline-flex items-center gap-2 bg-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/30">
                <Calculator className="w-3.5 h-3.5 text-cyan-400" /> Công cụ tính toán trực tiếp
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Tính Tiết Kiệm Chi Phí Khi Tự Động Hóa Vận Hành
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Điều chỉnh quy mô nhân sự và mức độ công việc thủ công bên dưới để xem số tiền & thời gian doanh nghiệp bạn tiết kiệm được khi chuyển đổi số.
              </p>

              <div className="space-y-5 bg-white/5 p-5 sm:p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                {/* Input 1: Employees */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-300 mb-2">
                    <span>Quy mô nhân sự:</span>
                    <span className="text-indigo-400 font-bold text-sm">{employees} nhân viên</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="500" 
                    step="5"
                    value={employees}
                    onChange={(e) => setEmployees(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                  />
                </div>

                {/* Input 2: Average Salary */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-300 mb-2">
                    <span>Lương trung bình/người/tháng:</span>
                    <span className="text-cyan-400 font-bold text-sm">{avgSalary} triệu VNĐ</span>
                  </div>
                  <input 
                    type="range" 
                    min="8" 
                    max="50" 
                    step="1"
                    value={avgSalary}
                    onChange={(e) => setAvgSalary(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                {/* Input 3: Manual Hours */}
                <div>
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-300 mb-2">
                    <span>Giờ làm thủ công (Excel, giấy tờ, duyệt mail)/người/tuần:</span>
                    <span className="text-emerald-400 font-bold text-sm">{manualHoursPerWeek} giờ/tuần</span>
                  </div>
                  <input 
                    type="range" 
                    min="2" 
                    max="20" 
                    step="1"
                    value={manualHoursPerWeek}
                    onChange={(e) => setManualHoursPerWeek(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                </div>
              </div>
            </div>

            {/* Live Output Card */}
            <div className="lg:w-5/12 bg-gradient-to-b from-indigo-900/60 to-slate-900/80 border border-indigo-500/30 rounded-2xl p-6 flex flex-col justify-between text-center relative overflow-hidden">
              <div className="space-y-6">
                <div className="text-xs uppercase tracking-wider font-bold text-indigo-300">
                  Kết quả ước tính tiết kiệm
                </div>

                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 tracking-tight mb-1">
                    ~{calculation.yearlyCostSavedMillion} Triệu VNĐ
                  </div>
                  <div className="text-xs text-emerald-200">
                    Chi phí vận hành tiết kiệm được mỗi năm
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <Clock className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                    <div className="text-xl font-bold text-white">
                      {calculation.hoursSavedPerMonth}h
                    </div>
                    <div className="text-[11px] text-slate-400">Giờ làm/tháng giải phóng</div>
                  </div>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                    <Zap className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                    <div className="text-xl font-bold text-white">
                      +{calculation.efficiencyIncrease}%
                    </div>
                    <div className="text-[11px] text-slate-400">Tốc độ xử lý phê duyệt</div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 italic leading-relaxed">
                  *Con số dựa trên số liệu thực tế từ hơn 9.000+ doanh nghiệp áp dụng giải pháp số hóa quy trình chuẩn hóa của Base.vn.
                </p>
              </div>

              <button 
                onClick={() => window.open('https://base.vn/dang-ky-demo?utm_source=base-tools-calculator', '_blank', 'noopener,noreferrer')}
                className="mt-6 w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer border-none"
              >
                Nhận tư vấn lộ trình cắt giảm chi phí <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Directory Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Danh mục Công cụ & Bài Đánh giá
            </h2>
            <p className="text-sm text-slate-500">
              Chọn công cụ phù hợp để bắt đầu đo lường và cải thiện doanh nghiệp ngay hôm nay
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
            Hiển thị {filteredTools.length} công cụ
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div 
              key={tool.id}
              className="bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl group-hover:bg-indigo-50/50 group-hover:border-indigo-100 transition-colors">
                    {tool.icon}
                  </div>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {tool.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2 leading-snug">
                  {tool.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                  {tool.desc}
                </p>
              </div>

              <button
                onClick={tool.onClick}
                className="w-full py-2.5 px-4 bg-slate-50 hover:bg-indigo-600 text-slate-700 hover:text-white font-bold text-xs rounded-xl border border-slate-200 hover:border-indigo-600 transition-all flex items-center justify-center gap-2 cursor-pointer font-sans"
              >
                {tool.actionText} <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Prompts Modal */}
      <AnimatePresence>
        {activeModal === 'prompt-hub' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Bộ Prompt AI Quản Trị & Điều Hành</h3>
                    <p className="text-xs text-slate-500">Sao chép prompt và dán vào ChatGPT / Gemini để áp dụng ngay</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-4 flex-1">
                {aiPrompts.map((item, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                        {item.role}
                      </span>
                      <button
                        onClick={() => handleCopyPrompt(item.prompt, idx)}
                        className="text-xs font-semibold text-slate-600 hover:text-indigo-600 flex items-center gap-1 cursor-pointer bg-white px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50"
                      >
                        {copiedPromptIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" /> Đã sao chép!
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" /> Sao chép prompt
                          </>
                        )}
                      </button>
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm mb-2">{item.title}</h4>
                    <p className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200 font-mono leading-relaxed select-all">
                      {item.prompt}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 cursor-pointer"
                >
                  Đóng cửa sổ
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RACI Matrix Modal */}
      <AnimatePresence>
        {activeModal === 'raci' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Grid className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-slate-900 text-base">Tạo Ma Trận Trách Nhiệm RACI</h3>
                </div>
                <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tên công việc / Tác vụ quy trình:</label>
                  <input 
                    type="text" 
                    value={raciTask}
                    onChange={(e) => setRaciTask(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold"
                  />
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold">
                      <tr>
                        <th className="p-3">Vai trò</th>
                        <th className="p-3">Vai trò RACI</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {Object.entries(raciRoles).map(([role, value]) => (
                        <tr key={role}>
                          <td className="p-3 font-semibold text-slate-800">{role}</td>
                          <td className="p-3 text-indigo-600 font-bold">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 text-[11px] text-indigo-800 leading-relaxed">
                  💡 <strong>Ghi chú RACI:</strong> R (Responsible - Trực tiếp thực hiện), A (Accountable - Phê duyệt duy nhất), C (Consulted - Cần tham vấn), I (Informed - Nhận thông báo).
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button onClick={() => setActiveModal(null)} className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer">
                  Hoàn tất
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Turnover Estimator Modal */}
      <AnimatePresence>
        {activeModal === 'turnover' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200"
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-rose-600" />
                  <h3 className="font-bold text-slate-900 text-base">Ước Tính Chi Phí Turnover Nhân Sự</h3>
                </div>
                <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <p className="text-slate-600 leading-relaxed">
                  Theo nghiên cứu quản trị nhân sự, chi phí thực tế để thay thế một nhân sự đã nghỉ việc dao động từ <strong>1.5 đến 2 lần mức lương hàng năm</strong> của vị trí đó (gồm chi phí tuyển dụng, onboard, năng suất sụt giảm).
                </p>

                <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-center">
                  <div className="text-xs text-rose-600 font-semibold mb-1">Mỗi 1 nhân sự nghỉ việc (Lương 15 triệu/tháng)</div>
                  <div className="text-2xl font-extrabold text-rose-700">~ 270 - 360 Triệu VNĐ</div>
                  <div className="text-[11px] text-rose-500 mt-1">Chi phí tổn thất ẩn thực tế cho doanh nghiệp</div>
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <button 
                  onClick={() => {
                    setActiveModal(null);
                    onNavigate('/chi-so-quan-tri-nhan-su');
                  }}
                  className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl cursor-pointer hover:bg-emerald-700"
                >
                  Làm bài khảo sát Quản trị HR ngay
                </button>
                <button onClick={() => setActiveModal(null)} className="px-4 py-2 bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer">
                  Đóng
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs space-y-4">
          <div className="flex justify-center items-center gap-2">
            <img 
              src="https://static-gcdn.basecdn.net/landing/base.vn/image/v2/logo/base.png" 
              alt="Base.vn" 
              className="h-5 brightness-0 invert opacity-80"
              referrerPolicy="no-referrer"
            />
          </div>
          <p>© {new Date().getFullYear()} Base.vn — Nền tảng quản trị & tự động hóa doanh nghiệp hàng đầu Việt Nam.</p>
        </div>
      </footer>
    </div>
  );
}
