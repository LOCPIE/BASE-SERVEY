import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from './supabaseClient';
import { getUtmSource } from './utils/utm';
import Home from './components/Home';
import DigitalTransformationSurvey from './components/DigitalTransformationSurvey';
import HRMaturitySurvey from './components/HRMaturitySurvey';
import ProcessAutomationSurvey from './components/ProcessAutomationSurvey';
import BusinessTools from './components/BusinessTools';
import ProjectScoringMatrix from './components/ProjectScoringMatrix';
import PromptLibrary from './components/PromptLibrary';
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
  const getRouteFromUrl = () => {
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    const hash = window.location.hash;
    if (path === '/tool/danh-gia-va-xep-hang-du-an' || hash === '#/tool/danh-gia-va-xep-hang-du-an' || hash === '#tool/danh-gia-va-xep-hang-du-an') return '/tool/danh-gia-va-xep-hang-du-an';
    if (hash === '#prompt-library' || hash === '#/prompt-library' || path === '/prompt-library' || hash === '#tool-prompt' || hash === '#/tool-prompt' || path === '/tool-prompt') return '/prompt-library';
    if (hash === '#tool' || hash === '#/tool' || path === '/tool') return '/tool';
    if (hash === '#khao-sat-chuyen-doi-so' || hash === '#/khao-sat-chuyen-doi-so' || path === '/khao-sat-chuyen-doi-so') return '/khao-sat-chuyen-doi-so';
    if (hash === '#khao-sat-chuyen-doi-ai' || hash === '#/khao-sat-chuyen-doi-ai' || path === '/khao-sat-chuyen-doi-ai') return '/khao-sat-chuyen-doi-ai';
    if (hash === '#chi-so-quan-tri-nhan-su' || hash === '#/chi-so-quan-tri-nhan-su' || path === '/chi-so-quan-tri-nhan-su') return '/chi-so-quan-tri-nhan-su';
    if (hash === '#chi-so-tu-dong-hoa-quy-trinh' || hash === '#/chi-so-tu-dong-hoa-quy-trinh' || path === '/chi-so-tu-dong-hoa-quy-trinh') return '/chi-so-tu-dong-hoa-quy-trinh';
    return '/';
  };

  const [route, setRoute] = useState(getRouteFromUrl);

  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    setRoute(to);
    window.scrollTo(0, 0);
    if (to === '/') {
      setStep('start');
      setUserData({ name: '', phone: '', email: '', co: '' });
      setAnswers({});
      setCurrentQuestion(0);
      setErrors({});
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const activeRoute = getRouteFromUrl();
      setRoute(activeRoute);
      if (activeRoute === '/') {
        setStep('start');
        setUserData({ name: '', phone: '', email: '', co: '' });
        setAnswers({});
        setCurrentQuestion(0);
        setErrors({});
      }
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const [step, setStep] = useState<'start' | 'contact' | 'quiz' | 'result' | 'success'>('start');
  const [userData, setUserData] = useState<UserData>({ name: '', phone: '', email: '', co: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof UserData, string>>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  const analysisData = useMemo(() => {
    // Determine highest and lowest dimensions
    const dimensionPercentages = Object.entries(DIMENSIONS).map(([name, cfg]) => {
      const score = dimensionScores[name] || 0;
      const pct = Math.round((score / cfg.max) * 100);
      return { name, score, max: cfg.max, pct };
    });

    const sorted = [...dimensionPercentages].sort((a, b) => b.pct - a.pct);
    const highest = sorted[0];
    const lowest = sorted[sorted.length - 1];

    const adviceByDimension: Record<string, {
      strengthTitle: string;
      strengthDesc: string;
      strengthTips: string[];
      weaknessTitle: string;
      weaknessDesc: string;
      weaknessTips: string[];
    }> = {
      "Chiến lược & Lãnh đạo": {
        strengthTitle: "Lãnh đạo cam kết & Tư duy đổi mới cao",
        strengthDesc: "Ban quản lý doanh nghiệp sẵn sàng đầu tư và quyết liệt đưa AI vào mục tiêu dài hạn. Đây là ngòi nổ quan trọng nhất thúc đẩy sự đồng thuận của nhân sự.",
        strengthTips: [
          "Xây dựng KPIs cụ thể liên quan đến tỷ lệ áp dụng AI trong các bộ phận.",
          "Chuẩn hóa ngân sách thử nghiệm R&D định kỳ hàng năm cho các sáng kiến AI."
        ],
        weaknessTitle: "Thiếu Chiến lược Định hướng AI rõ ràng",
        weaknessDesc: "Mặc dù ban điều hành quan tâm, nhưng doanh nghiệp chưa xác định được đầu ra cụ thể, thiếu KPIs lượng hóa và dễ rơi vào bẫy 'sốt sắng công nghệ' mà không thực chất.",
        weaknessTips: [
          "Bắt đầu thiết kế Framework Khảo sát ROI cốt lõi cho mọi bài toán nghiệp vụ.",
          "Xây dựng cẩm nang định vị chiến lược AI thiết thực bám sát mục tiêu tăng trưởng."
        ]
      },
      "Dữ liệu & Hạ tầng": {
        strengthTitle: "Hạ tầng dữ liệu số hóa tương đồng tốt",
        strengthDesc: "Doanh nghiệp sở hữu cấu trúc dữ liệu khá tốt, hệ thống thông tin rõ ràng, sẵn sàng làm nguyên liệu tinh sạch để huấn luyện hoặc nạp vào các mô hình AI.",
        strengthTips: [
          "Từ bước đồng bộ, tiến hành thiết kế Data Lake chuyên sâu cho dữ liệu khách hàng.",
          "Bắt đầu ứng dụng các kỹ thuật Vector Database phục vụ cho các hệ thống RAG (Retrieval-Augmented Generation) nội bộ."
        ],
        weaknessTitle: "Dữ liệu rời rạc & Chưa quy chuẩn",
        weaknessDesc: "Phần lớn dữ liệu nằm rải rác trên file cá nhân hoặc Excel thủ công. Không có dữ liệu sạch đồng nghĩa các mô hình AI khi đưa vào sẽ phản hồi sai số lớn (Garbage in, Garbage out).",
        weaknessTips: [
          "Thực hiện chiến dịch chuẩn hóa dọn dẹp dữ liệu (Data Cleansing) trên một phòng ban trước.",
          "Đồng nhất dữ liệu thông tin khách hàng từ các kênh về một trục CRM tập trung."
        ]
      },
      "Năng lực Nhân sự": {
        strengthTitle: "Nhân sự cởi mở & Thích nghi tốt",
        strengthDesc: "Đội ngũ nhân sự đầy tinh thần chủ động tìm hiểu công cụ mới, ít rào cản tâm lý kháng cự và phản ứng tích cực với các trợ lý thông minh.",
        strengthTips: [
          "Bổ nhiệm các nhóm nòng cốt (AI Champions) tại mỗi phòng ban để nhân rộng kỹ năng.",
          "Ban hành quy chế khen thưởng thiết thực cho sáng kiến ứng dụng AI giảm tải giờ làm."
        ],
        weaknessTitle: "Thiếu kỹ năng số & Sợ hãi công nghệ",
        weaknessDesc: "Nhân viên chưa khai thác công cụ AI, lo sợ sự thay đổi hoặc lo ngại bị AI thay thế. Kỹ năng prompt và khai thác dữ liệu còn rất thô sơ.",
        weaknessTips: [
          "Tổ chức khóa huấn luyện thực chiến 'Khai thác Trợ lý AI thế hệ mới' thời lượng ngắn hằng tuần.",
          "Cung cấp các prompt-template mẫu giải quyết công việc hành chính trực tiếp cho nhân viên."
        ]
      },
      "Quy trình & Vận hành": {
        strengthTitle: "Quy trình SOP chuẩn hóa hoàn chỉnh",
        strengthDesc: "Doanh nghiệp có hệ thống quy trình vận hành rõ nét, được ghi chép kỹ lưỡng. Đây là nền tảng vàng vì AI cực kỳ hiệu quả khi tự động hoá các quy trình có logic chuẩn.",
        strengthTips: [
          "Phân tích chuỗi quy trình để định vị các điểm nghẽn của con người có thể thay thế bằng AI Agent.",
          "Đóng gói quy trình thành tài liệu nguồn (Knowledge Base) để huấn luyện Chatbot nội bộ giải đáp SOP tự động."
        ],
        weaknessTitle: "Vận hành theo lối mòn cảm tính",
        weaknessDesc: "Quy trình vận hành chưa quy chuẩn hóa, xử lý theo kinh nghiệm cá nhân. Nếu đưa AI vào hệ thống lộn xộn, chỉ tạo ra lỗi nhanh hơn với quy mô lớn hơn.",
        weaknessTips: [
          "Sơ đồ hóa luồng phối hợp phòng ban cốt lõi trước khi tìm cách tích hợp công cụ thông minh.",
          "Áp dụng đo lường thời gian ở mỗi khâu (SLA) để xác định điểm nghẽn thực."
        ]
      },
      "Công nghệ & Hệ thống": {
        strengthTitle: "Hệ sinh thái công nghệ đồng bộ, hiện đại",
        strengthDesc: "Hạ tầng phần mềm của bạn hầu hết là cloud-based, hỗ trợ API mở, cực kỳ dễ dàng kết nối và nhúng các giải pháp trí tuệ nhân tạo một cách mượt mà.",
        strengthTips: [
          "Tìm kiếm các nhà cung cấp phần mềm SaaS có sẵn tích hợp AI sẵn (nhu Base AI) để kích hoạt dùng ngay mà không cần lập trình lại.",
          "Tận dụng Zapier, Make hoặc Webhook để liên kết dữ liệu thời gian thực giữa các hệ sinh thái."
        ],
        weaknessTitle: "Hệ thống công nghệ lỗi thời, phân mảnh",
        weaknessDesc: "Doanh nghiệp chủ yếu dùng công cụ offline, tệp rời rạc khiến việc đồng bộ dữ liệu thời gian thực trở nên cực kỳ phức tạp và đắt đỏ.",
        weaknessTips: [
          "Dịch chuyển các công tác cốt lõi lên nền tảng số hóa SaaS trước khi mơ mộng các công nghệ AI phức tạp.",
          "Thay thế phần mềm cũ không hỗ trợ API bằng các nền tảng mở."
        ]
      }
    };

    const defaultAdvice = {
      strengthTitle: "Nguồn lực sẵn sàng đổi mới",
      strengthDesc: "Doanh nghiệp có cơ chế phản ứng linh hoạt trước sự tiến bộ khoa học công nghệ.",
      strengthTips: ["Duy trì mức độ cải tiến.", "Khuyến khích nhân rộng mô hình tốt."],
      weaknessTitle: "Khoảng trống vận hành kỹ thuật",
      weaknessDesc: "Năng lực phối hợp đa giải pháp còn hạn chế cần được sắp xếp tuần tự bài bản.",
      weaknessTips: ["Tìm hiểu chuẩn hóa bước đi nhỏ.", "Tập trung thắt chặt bảo mật thông tin."]
    };

    return {
      highest: {
        name: highest?.name || "Chiến lược & Lãnh đạo",
        pct: highest?.pct || 0,
        advice: adviceByDimension[highest?.name] || defaultAdvice
      },
      lowest: {
        name: lowest?.name || "Dữ liệu & Hạ tầng",
        pct: lowest?.pct || 0,
        advice: adviceByDimension[lowest?.name] || defaultAdvice
      },
      roadmap: percentageScore < 30 ? [
        { phase: "Giai đoạn 1: Số hóa & Kiến tạo Dữ liệu Sạch", desc: "Tập trung dọn dẹp tệp dữ liệu hỗn loạn, chuyển đổi file Excel rời rạc lên CRM/ERP tập trung. Không có dữ liệu sạch thì không thể làm AI.", time: "Tháng 01 - Tháng 03" },
        { phase: "Giai đoạn 2: Đào tạo Nhận thức & Thử nghiệm Quick-Wins", desc: "Huấn luyện nhân viên cách sử dụng ChatGPT/Gemini bồi đắp tác vụ hành chính thường nhật. Triển khai 1 chatbot nội bộ đơn giản giải đáp câu hỏi thường gặp.", time: "Tháng 04 - Tháng 06" },
        { phase: "Giai đoạn 3: Tự động hóa kết hợp Trí tuệ Nhân tạo", desc: "Kết nối dữ liệu qua APIs, ứng dụng các mô hình ngôn ngữ lớn (LLMs/GenAI) vào bộ phận Chăm sóc khách hàng hoặc Phân tích dữ liệu tự động.", time: "Tháng 07 trở đi" }
      ] : percentageScore < 60 ? [
        { phase: "Giai đoạn 1: Chuẩn hóa Quy trình SOP & API hóa Hệ thống", desc: "Số hóa dòng chảy quy trình phê duyệt trực tuyến, cấu hình hệ thống hỗ trợ API. Tạo tiền đề gán các AI Agent vào từng bước công việc.", time: "Tháng 01 - Tháng 02" },
        { phase: "Giai đoạn 2: Triển khai Thử nghiệm Trợ lý AI Chuyên sâu", desc: "Ứng dụng GenAI vào việc tự động soạn thảo email bán hàng, tóm tắt hợp đồng pháp lý, hoặc dịch vụ phản hồi khách hàng tự động.", time: "Tháng 03 - Tháng 05" },
        { phase: "Giai đoạn 3: Phân tích Dự báo dựa trên Dữ liệu lớn", desc: "Sử dụng Machine Learning phân tích hành vi mua hàng, dự phòng rủi ro tài chính hoặc dự đoán biến động tỷ lệ nghỉ việc.", time: "Tháng 06 trở đi" }
      ] : [
        { phase: "Giai đoạn 1: Đồng bộ hóa Dữ liệu quy mô lớn (Data Lake)", desc: "Xây dựng hạ tầng dữ liệu tập trung thông minh, đảm bảo cập nhật thời gian thực từ mọi điểm chạm và ứng dụng cơ chế an toàn thông tin chuyên sâu.", time: "Tháng 01 - Tháng 02" },
        { phase: "Giai đoạn 2: Tự động hóa thông minh (Agentic Workflow)", desc: "Xây dựng các AI Agent tự chủ có khả năng phối hợp đa quy trình, tự động ra quyết định phê duyệt cấp thấp và phản hồi tác vụ phức tạp.", time: "Tháng 03 - Tháng 05" },
        { phase: "Giai đoạn 3: Sáng kiến Mô hình AI độc quyền", desc: "Phát triển và tinh chỉnh (Fine-tuning) mô hình trí tuệ nhân tạo riêng biệt ứng dụng sâu vào lợi thế kinh doanh cốt lõi của doanh nghiệp.", time: "Tháng 06 trở đi" }
      ],
      suggestedUseCases: percentageScore < 50 ? [
        { title: "🤖 Trợ lý sếp bằng RAG (Chatbot nội bộ)", desc: "Huấn luyện một chatbot chuyên biệt sử dụng văn liệu nội bộ (SOPs, chính sách, hướng dẫn công việc) giúp nhân viên tự tra cứu câu hỏi chuẩn xác, bảo mật." },
        { title: "✍️ Tự động hóa soạn thảo nội dung (GenAI Content)", desc: "Sử dụng các API AI thế hệ mới để hỗ trợ phòng Marketing & Sales tự sinh các nội dung email cá nhân hóa chăm sóc khách hàng hàng loạt." }
      ] : [
        { title: "📊 Phân tích Kinh doanh thông minh (AI Predictive Analytics)", desc: "Liên kết dữ liệu kinh doanh cũ với mô hình học máy để tự động dự đoán doanh thu, phân bổ chỉ tiêu bán hàng và cảnh báo hàng tồn kho tự động." },
        { title: "⚡ Quy trình phê duyệt tích hợp AI Agent", desc: "Một trợ lý ảo tự động đọc hiểu đề xuất phê duyệt, đối chiếu với ngân sách thực tế và quy định hiện hành, đưa ra kiến nghị Duyệt/Từ chối chính xác cho sếp." }
      ]
    };
  }, [dimensionScores, percentageScore]);

  const validateContact = () => {
    const newErrors: Partial<Record<keyof UserData, string>> = {};
    if (!userData.name.trim()) {
      newErrors.name = 'Vui lòng điền họ và tên';
    }
    if (!userData.phone.trim() || !/^(0|\+84)[0-9]{9}$/.test(userData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'SĐT không hợp lệ (10 số)';
    }
    if (!userData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStart = () => setStep('contact');
  const handleProceedToQuiz = () => {
    if (validateContact()) {
      setStep('quiz');
    }
  };

  const handleProceedSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    const utmSourceValue = getUtmSource();
    try {
      // 1. Try to submit via the API server endpoint first
      const apiResponse = await fetch('/api/submit-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userData,
          answers,
          totalScore,
          percentageScore,
          dimensionScores,
          survey_type: 'ai_transformation',
          utm_source: utmSourceValue,
        }),
      });

      if (apiResponse.ok) {
        const resData = await apiResponse.json();
        if (resData.success) {
          console.log('Submission successful via API server:', resData);
          setStep('result');
          return;
        }
      }
      
      throw new Error(`API server returned non-success response`);
    } catch (apiError: any) {
      console.warn('API submission failed, trying direct client-side Supabase insert:', apiError);
      
      // 2. Client-side fallback if backend API is not available or failed
      try {
        const dbPromise = supabase
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
              answers: { ...answers, survey_type: 'ai_transformation' },
              survey_type: 'ai_transformation',
              utm_source: utmSourceValue,
              created_at: new Date().toISOString()
            }
          ]);

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Network timeout')), 4000)
        );

        const { error: supabaseError } = await Promise.race([dbPromise, timeoutPromise]) as any;

        if (supabaseError) {
          throw new Error(`Supabase Error: ${supabaseError.message}`);
        }

        console.log('Submission successful via direct client-side');
        setStep('result');
      } catch (clientError: any) {
        console.warn('Direct client-side Supabase insert also failed, caching locally:', clientError);
        // 3. Local Cache fallback
        try {
          const backup = JSON.parse(localStorage.getItem('quiz_submissions_backup') || '[]');
          backup.push({
            name: userData.name,
            phone: userData.phone,
            email: userData.email,
            company: userData.co,
            total_score: totalScore,
            percentage_score: percentageScore,
            dimension_scores: dimensionScores,
            answers: { ...answers, survey_type: 'ai_transformation' },
            survey_type: 'ai_transformation',
            utm_source: utmSourceValue,
            created_at: new Date().toISOString()
          });
          localStorage.setItem('quiz_submissions_backup', JSON.stringify(backup));
        } catch (e) {
          console.error('Failed to save fallback submission:', e);
        }
        setStep('result');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePick = (qi: number, s: number) => {
    setAnswers(prev => ({ ...prev, [qi]: s }));
  };
  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
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

  if (route === '/') {
    return <Home onNavigate={navigate} />;
  }

  if (route === '/tool') {
    return <BusinessTools onNavigate={navigate} />;
  }

  if (route === '/prompt-library' || route === '/tool-prompt') {
    return <PromptLibrary onNavigate={navigate} />;
  }

  if (route === '/tool/danh-gia-va-xep-hang-du-an') {
    return <ProjectScoringMatrix onNavigate={navigate} />;
  }

  if (route === '/khao-sat-chuyen-doi-so') {
    return <DigitalTransformationSurvey onNavigate={navigate} />;
  }

  if (route === '/chi-so-quan-tri-nhan-su') {
    return <HRMaturitySurvey onNavigate={navigate} />;
  }

  if (route === '/chi-so-tu-dong-hoa-quy-trinh') {
    return <ProcessAutomationSurvey onNavigate={navigate} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden selection:bg-accent/30 bg-white">
      {/* Top Accent Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-secondary to-success z-50 shadow-[0_0_15px_rgba(139,92,246,0.2)]" />

      {/* Header */}
      <Header onNavigate={navigate} />

      {/* Background Blobs */}
      <div className="fixed -top-[200px] -right-[150px] w-[600px] h-[600px] rounded-full bg-accent/10 blur-[100px] animate-float pointer-events-none mix-blend-multiply opacity-40" />
      <div className="fixed -bottom-[100px] -left-[150px] w-[450px] h-[450px] rounded-full bg-accent-secondary/10 blur-[100px] animate-float-reverse pointer-events-none mix-blend-multiply opacity-40" />
      <div className="fixed bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-success/10 blur-[100px] animate-float-slow pointer-events-none mix-blend-multiply opacity-40" />
 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 relative z-10 transition-all duration-300">
        {/* Header */}
        <header className="text-center py-6">
          <div className="flex items-center justify-start gap-3 mb-7">
            <button 
              onClick={() => navigate('/')}
              className="text-xs text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1 font-semibold border border-slate-200 bg-slate-50 px-3 py-1.5 rounded-lg cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Quay lại trang chủ
            </button>
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
              className="max-w-4xl mx-auto glass-card rounded-[24px] p-8 sm:p-10 shadow-xl relative overflow-hidden"
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
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm">
                      <img 
                        src={`https://picsum.photos/seed/person${i}/100/100`} 
                        alt={`User ${i}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-xs text-slate-600">
                  Hơn <strong className="text-accent font-bold">500+ doanh nghiệp SME</strong> đã dùng đánh giá này.
                </div>
              </div>

              <button 
                onClick={handleStart}
                className="w-full py-4.5 text-base font-bold rounded-xl bg-gradient-accent text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
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
              className="max-w-4xl mx-auto glass-card rounded-[24px] p-8 sm:p-10 shadow-xl"
            >
              <div className="mb-8">
                <div className="inline-flex items-center bg-accent-secondary/10 border border-accent-secondary/20 text-accent-secondary text-[10px] font-bold px-3.5 py-1.5 rounded-full mb-4 tracking-wider uppercase font-display">
                  📋 Bước 1 / 2 — Thông tin
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight mb-2 text-slate-900">Nhập thông tin nhận kết quả</h2>
                <p className="text-sm text-slate-500">Thông tin của bạn giúp hệ thống cá nhân hóa báo cáo đánh giá năng lực AI tối ưu nhất.</p>
              </div>

              <div className="flex flex-col gap-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      Tên doanh nghiệp / Đơn vị <span className="text-slate-400 font-normal">(Tùy chọn)</span>
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="TechLink Corp"
                        value={userData.co}
                        onChange={e => setUserData({ ...userData, co: e.target.value })}
                        className="w-full bg-slate-50 border-1.5 border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none transition-all focus:border-accent focus:bg-white focus:shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              </div>

              <div className="flex items-start gap-4 bg-success/10 border border-success/20 rounded-2xl p-4 mb-6">
                <Lock className="w-5 h-5 text-success shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-800 leading-relaxed">
                  <strong className="text-emerald-950">Cam kết bảo mật:</strong> Thông tin của bạn được mã hóa chuẩn SSL 256-bit. Chúng tôi tuyệt đối không chia sẻ dữ liệu với bên thứ ba.
                </p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setStep('start')}
                  className="flex-1 py-4.5 text-sm font-semibold rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Quay lại
                </button>
                <button 
                  onClick={handleProceedToQuiz}
                  className="flex-[2] py-4.5 text-base font-bold rounded-xl bg-gradient-accent text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  Tiếp tục sang phần khảo sát →
                </button>
              </div>
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
                    <span className="text-[10px] font-bold text-accent-secondary uppercase tracking-widest">Bước 2 / 2 — Khảo sát</span>
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

              {submitError && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-bold text-red-900">Lỗi gửi dữ liệu</p>
                    <p className="text-[11px] text-red-700 leading-relaxed">{submitError}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 pb-12 max-w-[500px] mx-auto">
                <button 
                  onClick={() => setStep('contact')}
                  className="flex-1 py-4.5 text-sm font-semibold rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Sửa thông tin
                </button>
                <button 
                  disabled={Object.keys(answers).length < QUESTIONS.length || isSubmitting}
                  onClick={handleProceedSubmit}
                  className="flex-[2] py-4.5 rounded-xl text-base font-bold transition-all flex items-center justify-center gap-3 bg-gradient-success text-white shadow-xl hover:-translate-y-1 hover:shadow-2xl disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCcw className="w-5 h-5 animate-spin" /> Đang gửi...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-6 h-6" /> 
                      {Object.keys(answers).length < QUESTIONS.length 
                        ? `Hoàn thành ${QUESTIONS.length - Object.keys(answers).length} câu còn lại` 
                        : 'Xem kết quả đánh giá AI →'}
                    </>
                  )}
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

              {/* DETAILED ADVISORY REPORT */}
              <div className="flex items-center gap-3.5 my-9">
                <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-accent font-display whitespace-nowrap">
                  Báo cáo tư vấn & Quy hoạch chiến lược AI chuyên sâu
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-accent/20 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* STRENGTH */}
                <div className="bg-emerald-50/40 border border-emerald-100/50 rounded-2xl p-6 shadow-xs relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-100/10 rounded-full -mr-6 -mt-6 pointer-events-none" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-emerald-900 leading-tight">Điểm tựa dịch chuyển (Sức mạnh cốt lõi)</h4>
                      <p className="text-[10px] text-emerald-600 uppercase font-mono tracking-wider font-semibold">Core Leverage</p>
                    </div>
                  </div>
                  <div className="bg-white border border-emerald-100 rounded-xl p-4 space-y-3 shadow-2xs">
                    <div className="text-xs font-bold text-slate-850 flex items-center justify-between">
                      <span>{analysisData.highest.name}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-100">{analysisData.highest.pct}% hoàn thiện</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{analysisData.highest.advice.strengthDesc}</p>
                    <div className="space-y-1.5 pt-2.5 border-t border-slate-100">
                      <span className="text-[10px] font-black text-emerald-700 uppercase font-mono tracking-wider">Hành động gợi ý chuyển nhượng:</span>
                      {analysisData.highest.advice.strengthTips.map((tip, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                          <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* WEAKNESS */}
                <div className="bg-rose-50/40 border border-rose-100/50 rounded-2xl p-6 shadow-xs relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-rose-100/10 rounded-full -mr-6 -mt-6 pointer-events-none" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-500 shrink-0">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-rose-900 leading-tight">Rào cản bứt phá (Lỗ hổng ưu tiên khắc phục)</h4>
                      <p className="text-[10px] text-rose-600 uppercase font-mono tracking-wider font-semibold">Critical Gaps</p>
                    </div>
                  </div>
                  <div className="bg-white border border-rose-100 rounded-xl p-4 space-y-3 shadow-2xs">
                    <div className="text-xs font-bold text-slate-850 flex items-center justify-between">
                      <span>{analysisData.lowest.name}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-rose-50 text-rose-700 rounded border border-rose-100">{analysisData.lowest.pct}% hoàn thiện</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{analysisData.lowest.advice.weaknessDesc}</p>
                    <div className="space-y-1.5 pt-2.5 border-t border-slate-100">
                      <span className="text-[10px] font-black text-rose-600 uppercase font-mono tracking-wider">Giải pháp lấp khoảng trống:</span>
                      {analysisData.lowest.advice.weaknessTips.map((tip, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                          <span className="text-rose-500 font-bold shrink-0 mt-0.5">!</span>
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ROADMAP FOR AI IN APP.TSX */}
              <div className="bg-white border border-slate-200 rounded-[20px] p-6 mb-8 shadow-xs">
                <h4 className="text-sm font-extrabold text-indigo-950 mb-5 flex items-center gap-2">
                  <Map className="w-4 h-4 text-accent" /> Lộ trình 3 Giai đoạn Kích hoạt AI tối ưu
                </h4>
                <div className="relative border-l border-indigo-100 pl-6 ml-3 space-y-6">
                  {analysisData.roadmap.map((step, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-accent border-4 border-white shadow-sm flex items-center justify-center animate-pulse" />
                      <div className="text-[10px] font-bold text-accent uppercase tracking-wider font-mono">{step.time}</div>
                      <h5 className="text-xs font-extrabold text-slate-850 mt-1">{step.phase}</h5>
                      <p className="text-xs text-slate-650 mt-1.5 leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RECOMMENDED PILOT CASES */}
              <div className="bg-slate-50 border border-slate-150 rounded-[20px] p-6 mb-8 shadow-xs">
                <h4 className="text-sm font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-indigo-500 shrink-0" /> Mô hình / Bài toán AI thí điểm gợi ý hành động ngay
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {analysisData.suggestedUseCases.map((uc, idx) => (
                    <div key={idx} className="bg-white border border-slate-200/60 p-4 rounded-xl shadow-2xs">
                      <h5 className="text-xs font-extrabold text-indigo-950 flex items-center gap-2 mb-1.5">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 block shrink-0" /> {uc.title}
                      </h5>
                      <p className="text-xs text-slate-500 leading-relaxed">{uc.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-slate-50 border border-slate-200 rounded-[20px] p-6 text-center flex flex-col sm:flex-row items-center justify-between gap-4 mt-12">
                <div className="text-left">
                  <h4 className="font-bold text-slate-900 text-sm font-sans">Bạn cần tư vấn chi tiết hơn về lộ trình chuyển đổi AI?</h4>
                  <p className="text-xs text-slate-500 font-sans">Chuyên gia Base.vn hỗ trợ tư vấn khảo sát cụm doanh nghiệp hoàn toàn miễn phí.</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button 
                    onClick={handleRestart}
                    className="flex-1 sm:flex-initial bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-4 py-2.5 rounded-lg transition-all cursor-pointer font-sans"
                  >
                    Làm lại khảo sát
                  </button>
                  <button 
                    onClick={() => window.open('https://base.vn/dang-ky-demo?utm_source=base-survey-ai', '_blank', 'noopener,noreferrer')}
                    className="flex-1 sm:flex-initial bg-gradient-to-r from-accent to-indigo-600 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-all shadow-md cursor-pointer hover:opacity-90 border-none font-sans"
                  >
                    Tư vấn giải pháp
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer onNavigate={navigate} />
    </div>
  );
}
