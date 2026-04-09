import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Clock, 
  ClipboardList, 
  Target, 
  BarChart3, 
  Map, 
  Lock, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Building2, 
  User,
  AlertCircle,
  RefreshCcw,
  Construction,
  Users,
  Zap,
  TrendingUp,
  Shuffle,
  Trophy,
  Link as LinkIcon,
  Lightbulb
} from 'lucide-react';

// --- Types ---
interface Option {
  t: string;
  s: number;
}

interface Question {
  d: string;
  q: string;
  h: string;
  o: Option[];
}

interface UserData {
  name: string;
  phone: string;
  email: string;
  co: string;
}

interface Dimension {
  c: string;
  max: number;
}

// --- Constants ---
const QUESTIONS: Question[] = [
  { d: "Chiến lược & Lãnh đạo", q: "Ban lãnh đạo cấp cao có coi AI là ưu tiên chiến lược không?", h: "Đánh giá mức độ cam kết từ lãnh đạo trong việc thúc đẩy chuyển đổi AI.", o: [{ t: "Chưa đặt vấn đề AI vào hội nghị chiến lược", s: 0 }, { t: "Có quan tâm nhưng chưa có kế hoạch cụ thể", s: 2 }, { t: "Đã có mục tiêu AI rõ ràng, đang lập kế hoạch", s: 3 }, { t: "AI là ưu tiên hàng đầu, có ngân sách và roadmap", s: 4 }] },
  { d: "Dữ liệu & Hạ tầng", q: "Dữ liệu vận hành của doanh nghiệp đang ở trạng thái nào?", h: "Chất lượng và mức độ số hóa dữ liệu là nền tảng quan trọng nhất cho AI.", o: [{ t: "Chủ yếu lưu trên giấy tờ, Excel rời rạc", s: 0 }, { t: "Một phần số hóa nhưng phân tán, không đồng nhất", s: 2 }, { t: "Tập trung trong hệ thống ERP/CRM nhưng chưa sạch", s: 3 }, { t: "Dữ liệu số hóa đầy đủ, có cấu trúc và chất lượng tốt", s: 4 }] },
  { d: "Năng lực Nhân sự", q: "Mức độ hiểu biết về AI của đội ngũ nhân sự hiện tại?", h: "Con người là yếu tố quyết định thành bại của bất kỳ dự án AI nào.", o: [{ t: "Đa số nhân viên chưa từng tiếp xúc với AI", s: 0 }, { t: "Một vài cá nhân đã tìm hiểu, dùng thử các tool AI", s: 2 }, { t: "Có nhóm nòng cốt được đào tạo, đang thử nghiệm", s: 3 }, { t: "Toàn công ty được đào tạo, có chuyên gia AI nội bộ", s: 4 }] },
  { d: "Quy trình & Vận hành", q: "Các quy trình vận hành cốt lõi đã được chuẩn hóa và tài liệu hóa chưa?", h: "AI chỉ có thể tối ưu những gì đã được định nghĩa rõ ràng và đo lường được.", o: [{ t: "Vận hành theo kinh nghiệm, chưa có văn bản hóa", s: 0 }, { t: "Có SOP cho một số quy trình chính, phần lớn chưa chuẩn", s: 2 }, { t: "Hầu hết quy trình có SOP, đang review và cải tiến", s: 3 }, { t: "Tất cả quy trình chuẩn hóa, đo lường bằng KPI rõ ràng", s: 4 }] },
  { d: "Công nghệ & Hệ thống", q: "Doanh nghiệp hiện đang sử dụng công cụ/phần mềm quản lý nào?", h: "Nền tảng công nghệ hiện tại ảnh hưởng lớn đến tốc độ triển khai AI.", o: [{ t: "Chủ yếu Excel, email và các công cụ offline", s: 0 }, { t: "Dùng một vài phần mềm rời rạc (kế toán, bán hàng...)", s: 2 }, { t: "Có hệ thống ERP/CRM tích hợp một phần", s: 3 }, { t: "Hệ sinh thái công nghệ đồng bộ, API-ready, cloud-based", s: 4 }] },
  { d: "Năng lực Nhân sự", q: "Doanh nghiệp có ngân sách riêng cho đào tạo và chuyển đổi số không?", h: "Đầu tư vào con người và năng lực thường quyết định tốc độ chuyển đổi.", o: [{ t: "Chưa có ngân sách cụ thể cho mảng này", s: 0 }, { t: "Có xem xét nhưng chưa phân bổ chính thức", s: 2 }, { t: "Có ngân sách hàng năm dưới 5% tổng chi phí vận hành", s: 3 }, { t: "Đầu tư bài bản trên 5%, có kế hoạch tăng dần", s: 4 }] },
  { d: "Chiến lược & Lãnh đạo", q: "Doanh nghiệp đã xác định được bài toán cụ thể muốn giải bằng AI chưa?", h: "Thành công với AI đòi hỏi bắt đầu từ vấn đề thực tế, không phải từ công nghệ.", o: [{ t: "Chưa xác định được vấn đề cụ thể nào", s: 0 }, { t: "Có ý tưởng mơ hồ nhưng chưa phân tích kỹ", s: 2 }, { t: "Đã xác định 1–2 bài toán cụ thể, đang đánh giá khả thi", s: 3 }, { t: "Có danh sách ưu tiên rõ ràng, đánh giá ROI đầy đủ", s: 4 }] },
  { d: "Dữ liệu & Hạ tầng", q: "Doanh nghiệp có chính sách bảo mật và quản lý dữ liệu không?", h: "Quản trị dữ liệu là yêu cầu bắt buộc khi triển khai AI an toàn và bền vững.", o: [{ t: "Chưa có quy định gì về dữ liệu", s: 0 }, { t: "Có ý thức bảo mật cơ bản nhưng chưa thành chính sách", s: 2 }, { t: "Có chính sách bảo mật, phân quyền truy cập cơ bản", s: 3 }, { t: "Có framework quản trị dữ liệu toàn diện, audit định kỳ", s: 4 }] },
  { d: "Quy trình & Vận hành", q: "Mức độ sẵn sàng thay đổi (change readiness) của tổ chức như thế nào?", h: "Kháng cự thay đổi nội bộ là rào cản lớn nhất khi triển khai AI trong thực tế.", o: [{ t: "Nhân viên và quản lý thường kháng cự thay đổi mạnh mẽ", s: 0 }, { t: "Chấp nhận thay đổi nhưng cần nhiều thời gian thuyết phục", s: 2 }, { t: "Văn hóa cởi mở, sẵn sàng thử nghiệm điều mới", s: 3 }, { t: "Văn hóa đổi mới liên tục, nhân viên chủ động đề xuất cải tiến", s: 4 }] },
  { d: "Công nghệ & Hệ thống", q: "Doanh nghiệp đã từng thực hiện dự án chuyển đổi số nào thành công chưa?", h: "Kinh nghiệm dự án số hóa trước đây là tín hiệu mạnh cho AI readiness.", o: [{ t: "Chưa từng thực hiện dự án số hóa nào", s: 0 }, { t: "Đã thử nhưng gặp nhiều khó khăn, kết quả chưa như kỳ vọng", s: 2 }, { t: "Đã hoàn thành 1–2 dự án số hóa với kết quả tốt", s: 3 }, { t: "Có track record chuyển đổi số thành công nhiều lần", s: 4 }] }
];

const DIMENSIONS: Record<string, Dimension> = {
  "Chiến lược & Lãnh đạo": { c: "#a78bfa", max: 8 },
  "Dữ liệu & Hạ tầng": { c: "#67e8f9", max: 8 },
  "Năng lực Nhân sự": { c: "#34d399", max: 8 },
  "Quy trình & Vận hành": { c: "#fbbf24", max: 8 },
  "Công nghệ & Hệ thống": { c: "#f87171", max: 8 }
};

// --- Components ---

export default function App() {
  const [step, setStep] = useState<'start' | 'contact' | 'quiz' | 'result'>('start');
  const [userData, setUserData] = useState<UserData>({ name: '', phone: '', email: '', co: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof UserData, string>>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState(0);

  const totalScore = useMemo(() => {
    return Object.values(answers).reduce((acc: number, s: number) => acc + s, 0);
  }, [answers]);

  const percentageScore = Math.round((totalScore / 40) * 100);

  const dimensionScores = useMemo(() => {
    const scores: Record<string, number> = {};
    Object.keys(DIMENSIONS).forEach(d => scores[d] = 0);
    QUESTIONS.forEach((q, i) => {
      const s = answers[i] || 0;
      scores[q.d] += s;
    });
    return scores;
  }, [answers]);

  const resultData = useMemo(() => {
    if (percentageScore < 25) {
      return {
        lvl: "🌱 Giai đoạn Khởi động",
        lc: "#fca5a5",
        rc: "#ef4444",
        desc: "Doanh nghiệp đang ở điểm xuất phát. Đây là thời điểm cốt lõi để xây nền tảng đúng cách — trước khi cạnh tranh bỏ quá xa.",
        recos: [
          { ic: <Construction className="w-6 h-6" />, bg: "rgba(239,68,68,0.1)", t: "Bắt đầu từ số hóa cơ bản", p: "Chuẩn hóa dữ liệu và quy trình trước. Không thể xây AI trên nền tảng rời rạc." },
          { ic: <Users className="w-6 h-6" />, bg: "rgba(239,68,68,0.1)", t: "Xây dựng nhận thức nội bộ", p: "Tổ chức workshop AI awareness cho lãnh đạo và nhân viên chủ chốt." },
          { ic: <Target className="w-6 h-6" />, bg: "rgba(239,68,68,0.1)", t: "Chọn 1 quick win để bắt đầu", p: "Tìm bài toán nhỏ (như chatbot nội bộ), dễ đo lường để thử nghiệm." }
        ]
      };
    } else if (percentageScore < 50) {
      return {
        lvl: "🔧 Giai đoạn Chuẩn bị",
        lc: "#fcd34d",
        rc: "#f59e0b",
        desc: "Doanh nghiệp đã có một số nền tảng phần mềm nhưng còn nhiều khoảng trống kỹ thuật cần thiết lập lại trước khi AI-ready.",
        recos: [
          { ic: <BarChart3 className="w-6 h-6" />, bg: "rgba(245,158,11,0.1)", t: "Tập trung vào Data Quality", p: "Đầu tư làm sạch và tổ chức hạ tầng dữ liệu — đây là tài sản cốt lõi cho AI." },
          { ic: <RefreshCcw className="w-6 h-6" />, bg: "rgba(245,158,11,0.1)", t: "Chuẩn hóa quy trình", p: "Hoàn thiện SOP, API hóa các điểm chạm dữ liệu còn thủ công." },
          { ic: <Users className="w-6 h-6" />, bg: "rgba(245,158,11,0.1)", t: "Tìm kiếm đối tác công nghệ", p: "Tham vấn Agency hoặc Vendor AI có kinh nghiệm để vạch lộ trình." }
        ]
      };
    } else if (percentageScore < 75) {
      return {
        lvl: "🚀 Giai đoạn Triển khai",
        lc: "#7dd3fc",
        rc: "#0ea5e9",
        desc: "Hệ thống đã sẵn sàng. Bạn có đủ nền tảng để triển khai ngay các tác vụ Machine Learning/AI mang lại ROI đo lường được.",
        recos: [
          { ic: <Zap className="w-6 h-6" />, bg: "rgba(14,165,233,0.1)", t: "Khởi chạy Pilot AI Project", p: "Triển khai AI (như genAI cho sales/CS) với timeline 60–90 ngày." },
          { ic: <TrendingUp className="w-6 h-6" />, bg: "rgba(14,165,233,0.1)", t: "Đo lường & Tối ưu", p: "Thiết lập metrics AI (Accuracy, Thời gian tiết kiệm) để đo đếm liên tục." },
          { ic: <Shuffle className="w-6 h-6" />, bg: "rgba(14,165,233,0.1)", t: "Scale Up", p: "Sau pilot thành công, mở rộng ứng dụng AI sang các phòng ban khác." }
        ]
      };
    } else {
      return {
        lvl: "✨ Giai đoạn Trưởng thành AI",
        lc: "#6ee7b7",
        rc: "#10b981",
        desc: "Xuất sắc! Doanh nghiệp đứng trong top dẫn đầu về cấu trúc số. Hãy dùng AI để tái định hình mô hình kinh doanh và dẫn dắt cuộc chơi.",
        recos: [
          { ic: <Trophy className="w-6 h-6" />, bg: "rgba(16,185,129,0.1)", t: "Xây dựng AI Center of Excellence", p: "Thiết lập Team AI lõi, R&D các Data models độc quyền thay vì APIs chung." },
          { ic: <LinkIcon className="w-6 h-6" />, bg: "rgba(16,185,129,0.1)", t: "Hệ sinh thái thông minh", p: "Bơm dữ liệu AI vào chuỗi cung ứng, tự động hóa dự đoán toàn phần." },
          { ic: <Lightbulb className="w-6 h-6" />, bg: "rgba(16,185,129,0.1)", t: "AI-Native Products", p: "Ra mắt dịch vụ, sản phẩm mới với core là AI để tăng giá trị cốt lõi." }
        ]
      };
    }
  }, [percentageScore]);

  const validateContact = () => {
    const newErrors: Partial<Record<keyof UserData, string>> = {};
    if (!userData.name.trim()) newErrors.name = 'Vui lòng nhập họ tên';
    if (!userData.phone.trim() || !/^(0|\+84)[0-9]{9}$/.test(userData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'SĐT không hợp lệ (10 số)';
    }
    if (!userData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStart = () => setStep('quiz');
  const handleProceed = async () => {
    if (validateContact()) {
      try {
        // Send data to Google Sheets via backend API
        await fetch('/api/submit-quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userData,
            answers,
            totalScore,
            percentageScore,
            dimensionScores
          }),
        });
      } catch (error) {
        console.error('Failed to submit to Google Sheets:', error);
      }
      setStep('result');
    }
  };
  const handlePick = (qi: number, s: number) => {
    setAnswers(prev => ({ ...prev, [qi]: s }));
  };
  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setStep('contact');
    }
  };
  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  const handleRestart = () => {
    setStep('start');
    setUserData({ name: '', phone: '', email: '', co: '' });
    setAnswers({});
    setCurrentQuestion(0);
    setErrors({});
  };

  return (
    <div className="min-h-screen relative overflow-hidden selection:bg-accent/30 bg-white">
      {/* Top Accent Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-secondary to-success z-50 shadow-[0_0_15px_rgba(139,92,246,0.2)]" />

      {/* Background Blobs */}
      <div className="fixed -top-[200px] -right-[150px] w-[600px] h-[600px] rounded-full bg-accent/10 blur-[100px] animate-float pointer-events-none mix-blend-multiply opacity-40" />
      <div className="fixed -bottom-[100px] -left-[150px] w-[450px] h-[450px] rounded-full bg-accent-secondary/10 blur-[100px] animate-float-reverse pointer-events-none mix-blend-multiply opacity-40" />
      <div className="fixed bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-success/10 blur-[100px] animate-float-slow pointer-events-none mix-blend-multiply opacity-40" />

      <div className="container max-w-[700px] mx-auto px-4 pt-14 pb-20 relative z-10">
        {/* Header */}
        <header className="text-center py-10">
          <div className="flex items-center justify-center gap-3 mb-7">
            <div className="w-10 h-10 bg-gradient-accent rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <Bot className="text-white w-6 h-6" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-slate-900">AI Readiness</span>
          </div>
          
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-[11px] font-bold tracking-[0.08em] uppercase px-4 py-1.5 rounded-full mb-5 font-display">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-blink shadow-[0_0_8px_rgba(124,58,237,0.4)]" />
            Miễn phí · Kết quả ngay
          </div>

          <h1 className="text-2xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-4 text-slate-900 flex flex-col items-center">
            <span className="whitespace-nowrap">Doanh nghiệp bạn đã sẵn sàng</span>
            <span className="text-gradient whitespace-nowrap">chuyển đổi AI chưa?</span>
          </h1>
          
          <p className="text-slate-500 text-base leading-relaxed max-w-[500px] mx-auto mb-7">
            Hoàn thành 10 câu hỏi — nhận báo cáo đánh giá năng lực AI được cá nhân hóa theo thực trạng doanh nghiệp bạn.
          </p>

          <div className="flex justify-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm">
              <Clock className="w-3.5 h-3.5" /> ~3 phút
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm">
              <ClipboardList className="w-3.5 h-3.5" /> 10 câu hỏi
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm">
              <Target className="w-3.5 h-3.5" /> Điểm số + Lộ trình
            </span>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {step === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card rounded-[24px] p-8 sm:p-10 shadow-xl relative overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center transition-all hover:border-accent/40 hover:bg-white hover:-translate-y-1 hover:shadow-md">
                  <BarChart3 className="w-7 h-7 text-accent mx-auto mb-3" />
                  <div className="text-sm font-bold mb-1.5 text-slate-900">Chấm điểm chi tiết</div>
                  <div className="text-[11px] text-slate-500 leading-relaxed">Điểm số theo 5 chiều năng lực cốt lõi</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center transition-all hover:border-accent/40 hover:bg-white hover:-translate-y-1 hover:shadow-md">
                  <Target className="w-7 h-7 text-accent-secondary mx-auto mb-3" />
                  <div className="text-sm font-bold mb-1.5 text-slate-900">Nhận xét cá nhân</div>
                  <div className="text-[11px] text-slate-500 leading-relaxed">Phân tích phù hợp thực trạng doanh nghiệp</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center transition-all hover:border-accent/40 hover:bg-white hover:-translate-y-1 hover:shadow-md">
                  <Map className="w-7 h-7 text-success mx-auto mb-3" />
                  <div className="text-sm font-bold mb-1.5 text-slate-900">Lộ trình hành động</div>
                  <div className="text-[11px] text-slate-500 leading-relaxed">Bước tiếp theo cụ thể để bắt đầu triển khai</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 bg-accent/5 border border-accent/10 rounded-2xl p-4 mb-8">
                <div className="flex -space-x-2.5">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gradient-accent flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-xs text-slate-600">
                  Hơn <strong className="text-accent font-bold">500+ doanh nghiệp SME</strong> đã dùng đánh giá này.
                </div>
              </div>

              <button 
                onClick={handleStart}
                className="w-full py-4.5 text-base font-bold rounded-xl bg-gradient-accent text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-2"
              >
                Bắt đầu đánh giá ngay <ChevronRight className="w-5 h-5" />
              </button>
              
              <p className="mt-4 text-center text-[12px] text-slate-400">
                🔒 Bảo mật 100% · Không spam
              </p>
            </motion.div>
          )}

          {step === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card rounded-[24px] p-8 sm:p-10 shadow-xl"
            >
              <div className="mb-8">
                <div className="inline-flex items-center bg-accent-secondary/10 border border-accent-secondary/20 text-accent-secondary text-[10px] font-bold px-3.5 py-1.5 rounded-full mb-4 tracking-wider uppercase font-display">
                  📋 Bước 2 / 2 — Thông tin
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight mb-2 text-slate-900">Nhập thông tin nhận kết quả</h2>
                <p className="text-sm text-slate-500">Báo cáo đánh giá chi tiết sẽ được hiển thị ngay sau khi bạn cung cấp thông tin.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    Họ và tên <span className="text-accent-secondary">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Nguyễn Văn A"
                      value={userData.name}
                      onChange={e => setUserData({ ...userData, name: e.target.value })}
                      className={`w-full bg-slate-50 border-1.5 ${errors.name ? 'border-danger bg-danger/5' : 'border-slate-200'} rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none transition-all focus:border-accent focus:bg-white focus:shadow-sm`}
                    />
                  </div>
                  {errors.name && <span className="text-[11px] text-red-500 flex items-center gap-1 font-medium"><AlertCircle className="w-3 h-3" /> {errors.name}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-700">
                    Tên doanh nghiệp <span className="text-slate-400 font-normal text-[10px]">(tùy chọn)</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Công ty TNHH ABC"
                      value={userData.co}
                      onChange={e => setUserData({ ...userData, co: e.target.value })}
                      className="w-full bg-slate-50 border-1.5 border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none transition-all focus:border-accent focus:bg-white focus:shadow-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    Số điện thoại <span className="text-accent-secondary">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="tel" 
                      placeholder="0901 234 567"
                      value={userData.phone}
                      onChange={e => setUserData({ ...userData, phone: e.target.value })}
                      className={`w-full bg-slate-50 border-1.5 ${errors.phone ? 'border-danger bg-danger/5' : 'border-slate-200'} rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none transition-all focus:border-accent focus:bg-white focus:shadow-sm`}
                    />
                  </div>
                  {errors.phone && <span className="text-[11px] text-red-500 flex items-center gap-1 font-medium"><AlertCircle className="w-3 h-3" /> {errors.phone}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    Email <span className="text-accent-secondary">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="email" 
                      placeholder="ten@congty.com"
                      value={userData.email}
                      onChange={e => setUserData({ ...userData, email: e.target.value })}
                      className={`w-full bg-slate-50 border-1.5 ${errors.email ? 'border-danger bg-danger/5' : 'border-slate-200'} rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none transition-all focus:border-accent focus:bg-white focus:shadow-sm`}
                    />
                  </div>
                  {errors.email && <span className="text-[11px] text-red-500 flex items-center gap-1 font-medium"><AlertCircle className="w-3 h-3" /> {errors.email}</span>}
                </div>
              </div>

              <div className="flex items-start gap-4 bg-success/10 border border-success/20 rounded-2xl p-4 mb-8">
                <Lock className="w-5 h-5 text-success shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-800 leading-relaxed">
                  <strong className="text-emerald-900">Cam kết bảo mật:</strong> Thông tin của bạn được mã hóa chuẩn SSL 256-bit. Chúng tôi tuyệt đối không chia sẻ dữ liệu với bên thứ ba.
                </p>
              </div>

              <button 
                onClick={handleProceed}
                className="w-full py-4.5 text-base font-bold rounded-xl bg-gradient-accent text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                Xem kết quả đánh giá AI →
              </button>
            </motion.div>
          )}

          {step === 'quiz' && (
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl p-4 sm:p-5 shadow-sm sticky top-4 z-30"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-accent-secondary uppercase tracking-widest">Bước 1 / 2 — Khảo sát</span>
                    <span className="text-xs font-semibold text-slate-600">Tiến độ hoàn thành</span>
                  </div>
                  <span className="text-xs font-bold text-accent font-display bg-accent/10 px-3 py-1 rounded-full">
                    Đã trả lời {Object.keys(answers).length} / {QUESTIONS.length} câu
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(Object.keys(answers).length / QUESTIONS.length) * 100}%` }}
                    className="h-full bg-gradient-to-r from-accent to-accent-secondary rounded-full"
                  />
                </div>
              </motion.div>

              <div className="space-y-6">
                {QUESTIONS.map((q, qIdx) => (
                  <motion.div
                    key={qIdx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: qIdx * 0.05 }}
                    className="glass-card rounded-[24px] p-8 sm:p-10 shadow-lg relative overflow-hidden border border-slate-100"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <span className="inline-flex items-center bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold px-3.5 py-1.5 rounded-full tracking-widest uppercase font-display">
                        {q.d}
                      </span>
                      <span className="text-xs font-bold text-slate-400 font-display bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                        Câu {qIdx + 1}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold leading-snug mb-2 tracking-tight text-slate-900">
                      {q.q}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-7">
                      {q.h}
                    </p>

                    <div className="flex flex-col gap-3">
                      {q.o.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handlePick(qIdx, opt.s)}
                          className={`flex items-center gap-4 p-4 sm:p-5 rounded-2xl border-1.5 transition-all text-left group ${
                            answers[qIdx] === opt.s 
                              ? 'bg-accent/5 border-accent shadow-sm' 
                              : 'bg-slate-50 border-slate-200 hover:border-accent/40 hover:bg-white hover:translate-x-1 hover:shadow-sm'
                          }`}
                        >
                          <div className={`w-5.5 h-5.5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                            answers[qIdx] === opt.s 
                              ? 'border-accent bg-accent' 
                              : 'border-slate-300 bg-white'
                          }`}>
                            {answers[qIdx] === opt.s && <div className="w-2 h-2 rounded-full bg-white shadow-sm" />}
                          </div>
                          <span className={`text-sm sm:text-base transition-colors ${answers[qIdx] === opt.s ? 'text-slate-900 font-semibold' : 'text-slate-600 font-medium'}`}>
                            {opt.t}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center pt-8 pb-12">
                <button 
                  disabled={Object.keys(answers).length < QUESTIONS.length}
                  onClick={() => setStep('contact')}
                  className="w-full max-w-[400px] py-5 rounded-2xl text-lg font-bold transition-all flex items-center justify-center gap-3 bg-gradient-success text-white shadow-xl hover:-translate-y-1 hover:shadow-2xl disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <CheckCircle2 className="w-6 h-6" /> 
                  {Object.keys(answers).length < QUESTIONS.length 
                    ? `Hoàn thành ${QUESTIONS.length - Object.keys(answers).length} câu còn lại` 
                    : 'Tiếp tục để nhận kết quả'}
                </button>
              </div>
            </div>
          )}

          {step === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="glass-card rounded-[24px] p-10 sm:p-12 text-center shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-secondary to-success" />
                
                <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-slate-400 mb-6 font-display">
                  Kết quả mức độ sẵn sàng AI
                </div>

                <div className="relative w-44 h-44 mx-auto mb-6">
                  <svg viewBox="0 0 148 148" className="w-full h-full -rotate-90">
                    <circle className="fill-none stroke-slate-100 stroke-[8]" cx="74" cy="74" r="62" />
                    <motion.circle 
                      initial={{ strokeDashoffset: 389.6 }}
                      animate={{ strokeDashoffset: 389.6 - (percentageScore / 100) * 389.6 }}
                      transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                      className="fill-none stroke-[10] stroke-linecap-round"
                      style={{ stroke: resultData.rc }}
                      cx="74" cy="74" r="62" 
                      strokeDasharray="389.6"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-5xl font-extrabold font-display tracking-tighter text-slate-900"
                    >
                      {percentageScore}
                    </motion.div>
                    <div className="text-[13px] text-slate-500 font-semibold mt-1">/100 điểm</div>
                  </div>
                </div>

                <h2 className="text-2xl font-extrabold tracking-tight mb-3" style={{ color: resultData.lc }}>
                  {resultData.lvl}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed max-w-[480px] mx-auto">
                  {resultData.desc}
                </p>
              </div>

              <div className="flex items-center gap-3.5 my-9">
                <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-accent font-display whitespace-nowrap">
                  Phân tích theo 5 năng lực cốt lõi
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-accent/20 to-transparent" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(DIMENSIONS).map(([d, cfg]) => {
                  const s = dimensionScores[d];
                  const pct = Math.round((s / cfg.max) * 100);
                  return (
                    <div key={d} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                      <div className="text-xs font-semibold text-slate-500 mb-2.5">{d}</div>
                      <div className="flex items-baseline gap-1 mb-3.5">
                        <div className="text-3xl font-extrabold font-display" style={{ color: cfg.c }}>{s}</div>
                        <div className="text-xs text-slate-400">/{cfg.max}</div>
                        <div className="ml-auto text-xs font-bold text-slate-600 font-display bg-slate-50 px-2 py-1 rounded-md">{pct}%</div>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: cfg.c }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-3.5 my-9">
                <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-accent font-display whitespace-nowrap">
                  Khuyến nghị ưu tiên (Top Priorities)
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-accent/20 to-transparent" />
              </div>

              <div className="glass-card rounded-[20px] overflow-hidden shadow-lg">
                {resultData.recos.map((r, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-6 border-b border-slate-100 transition-colors hover:bg-slate-50 last:border-b-0">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm" style={{ backgroundColor: r.bg }}>
                      <span className="text-accent">{r.ic}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1.5">{r.t}</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{r.p}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-[24px] p-10 sm:p-12 text-center shadow-lg relative overflow-hidden mt-8">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3C/g%3E%3C/svg%3E")` }} />
                
                <h3 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight relative">
                  {userData.name ? `${userData.name.split(' ').pop()}, đã đến lúc kích hoạt AI?` : 'Sẵn sàng kích hoạt chiến lược AI?'}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed max-w-[420px] mx-auto mb-8 relative">
                  Đội ngũ chuyên gia của chúng tôi có thể giúp bạn xây lộ trình chuyển đổi số với AI phù hợp đặc thù riêng.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
                  <button 
                    onClick={() => alert('Cảm ơn! Chuyên gia của chúng tôi sẽ liên hệ trong 24h.')}
                    className="bg-slate-900 text-white px-8 py-4 text-sm font-bold rounded-xl shadow-lg transition-all hover:-translate-y-1 hover:shadow-slate-200 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" /> Đặt lịch tư vấn ngay
                  </button>
                  <button 
                    onClick={handleRestart}
                    className="bg-white border-1.5 border-slate-200 text-slate-600 px-7 py-3.5 text-sm font-semibold rounded-xl transition-all hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <RefreshCcw className="w-4 h-4" /> Làm lại khảo sát
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
