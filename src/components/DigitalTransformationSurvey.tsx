import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../supabaseClient';
import { 
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
  AlertCircle,
  RefreshCcw,
  Construction,
  Users,
  Zap,
  TrendingUp,
  Shuffle,
  Trophy,
  Link as LinkIcon,
  Lightbulb,
  Building2,
  ShieldCheck,
  Check,
  TrendingDown,
  Compass,
  Sparkles,
  ArrowRight,
  Activity,
  Award,
  ShieldAlert
} from 'lucide-react';

interface UserData {
  name: string;
  phone: string;
  email: string;
  co: string;
}

interface DXOption {
  text: string;
  score: number;
  hasInput?: boolean;
}

interface DXQuestion {
  id: string;
  section: string;
  text: string;
  helpText?: string;
  type: 'single' | 'multi';
  options: DXOption[];
}

const QUESTIONS_DX: DXQuestion[] = [
  {
    id: "2.1",
    section: "Hạ tầng & Công nghệ",
    text: "Doanh nghiệp Anh/Chị có sử dụng giải pháp đám mây (cloud) để lưu trữ hoặc vận hành không? Của nhà cung cấp nào?",
    helpText: "Sử dụng đám mây là chỉ báo quan trọng cho tính linh hoạt và sẵn sàng hạ tầng số.",
    type: 'multi',
    options: [
      { text: "Không sử dụng cloud", score: 0 },
      { text: "VNPT", score: 1 },
      { text: "Viettel", score: 1 },
      { text: "FPT", score: 1 },
      { text: "Google", score: 1 },
      { text: "Microsoft", score: 1 },
      { text: "Amazon", score: 1 },
      { text: "Khác", score: 1, hasInput: true }
    ]
  },
  {
    id: "2.2",
    section: "Hạ tầng & Công nghệ",
    text: "Trình độ tự động hóa trong quy trình kinh doanh tại doanh nghiệp Anh/Chị hiện tại ở mức nào?",
    helpText: "Mức độ tự động hóa định hình khả năng loại bỏ lãng phí và tối ưu hiệu suất vận hành.",
    type: 'single',
    options: [
      { text: "Không có", score: 0 },
      { text: "Thấp", score: 1 },
      { text: "Trung bình", score: 2 },
      { text: "Cao", score: 3 },
      { text: "Hoàn toàn tự động hóa", score: 4 }
    ]
  },
  {
    id: "2.3",
    section: "Hạ tầng & Công nghệ",
    text: "Doanh nghiệp Anh/Chị có sử dụng công cụ phân tích dữ liệu để hỗ trợ ra quyết định không?",
    helpText: "Quản trị bằng dữ liệu giúp doanh nghiệp ra quyết định nhanh, chính xác và có cơ sở.",
    type: 'single',
    options: [
      { text: "Không", score: 0 },
      { text: "Có, thủ công (Excel, bảng thống kê)", score: 1 },
      { text: "Có, hệ thống báo cáo, dashboard", score: 2 },
      { text: "Có, sử dụng phân tích nâng cao (AI, ML)", score: 4 }
    ]
  },
  {
    id: "2.4",
    section: "Hạ tầng & Công nghệ",
    text: "Doanh nghiệp Anh/Chị có triển khai các biện pháp an toàn thông tin/cybersecurity không?",
    helpText: "Bảo mật thông tin bảo vệ tài sản dữ liệu của doanh nghiệp và niềm tin của khách hàng.",
    type: 'multi',
    options: [
      { text: "Không có", score: 0 },
      { text: "Chỉ dùng phần mềm diệt virus cơ bản", score: 1 },
      { text: "Có backup dữ liệu định kỳ", score: 1 },
      { text: "Có chính sách bảo mật và phân quyền", score: 1 },
      { text: "Có giải pháp bảo mật toàn diện (MFA, encryption, giám sát hệ thống)", score: 2 }
    ]
  },
  {
    id: "2.5",
    section: "Hạ tầng & Công nghệ",
    text: "Anh/Chị đang sử dụng các kênh giao tiếp nào với khách hàng?",
    helpText: "Sử dụng đa kênh giúp tối ưu trải nghiệm khách hàng trong hành trình số.",
    type: 'multi',
    options: [
      { text: "Email", score: 1 },
      { text: "Mạng xã hội (Facebook, Instagram...)", score: 1 },
      { text: "Ứng dụng di động riêng", score: 1 },
      { text: "Tích hợp chatbot hoặc chăm sóc tự động", score: 1 },
      { text: "Website hỗ trợ đặt hàng/CSKH", score: 1 }
    ]
  },
  {
    id: "2.6",
    section: "Hạ tầng & Công nghệ",
    text: "Anh/Chị tự đánh giá sự thâm nhập của công nghệ số vào doanh nghiệp mình đang ở mức độ nào?",
    helpText: "Đánh giá chủ quan nhưng phản ánh chân thực nhịp đập công nghệ nội bộ.",
    type: 'single',
    options: [
      { text: "Không có", score: 0 },
      { text: "Thấp", score: 1 },
      { text: "Trung bình", score: 2 },
      { text: "Cao", score: 3 },
      { text: "Hoàn toàn số hóa", score: 4 }
    ]
  },
  {
    id: "3.1",
    section: "Nhận thức & Chiến lược",
    text: "Anh/Chị hiểu về chuyển đổi số và lợi ích của nó đến mức nào?",
    helpText: "Nhận thức của lãnh đạo/nhân sự là bánh lái cho lộ trình chuyển đổi số.",
    type: 'single',
    options: [
      { text: "Không biết", score: 0 },
      { text: "Biết sơ sơ", score: 1 },
      { text: "Hiểu khái niệm cơ bản", score: 2 },
      { text: "Hiểu khá rõ", score: 3 },
      { text: "Hiểu rõ và chủ động áp dụng", score: 4 }
    ]
  },
  {
    id: "3.2",
    section: "Nhận thức & Chiến lược",
    text: "Doanh nghiệp Anh/Chị có kế hoạch hay chiến lược cho chuyển đổi số không?",
    helpText: "Chiến lược cụ thể quyết định việc phân bổ tài nguyên hiệu quả mục tiêu dài hạn.",
    type: 'single',
    options: [
      { text: "Chưa có", score: 0 },
      { text: "Đang cân nhắc", score: 1 },
      { text: "Đã lên kế hoạch sơ bộ", score: 2 },
      { text: "Đang triển khai", score: 3 },
      { text: "Có chiến lược rõ ràng", score: 4 }
    ]
  },
  {
    id: "3.3",
    section: "Nhận thức & Chiến lược",
    text: "Ai đang phụ trách chuyển đổi số tại doanh nghiệp Anh/Chị?",
    helpText: "Vai trò chịu trách nhiệm rõ ràng giúp dự án chuyển đổi số không bị bỏ dở hoặc trì trệ.",
    type: 'single',
    options: [
      { text: "Không có ai", score: 0 },
      { text: "Chủ doanh nghiệp tự làm", score: 2 },
      { text: "Có bộ phận IT phụ trách", score: 3 },
      { text: "Có đội ngũ chuyên trách", score: 4 }
    ]
  },
  {
    id: "3.4",
    section: "Nhận thức & Chiến lược",
    text: "Doanh nghiệp có ngân sách riêng cho chuyển đổi số không?",
    helpText: "Dùng để đánh giá mức độ cam kết tài chính, giúp xếp loại mức độ sẵn sàng.",
    type: 'single',
    options: [
      { text: "Không có", score: 0 },
      { text: "Có nhưng không rõ ràng", score: 1 },
      { text: "Có ngân sách riêng theo từng quý/năm", score: 3 },
      { text: "Có kế hoạch đầu tư rõ ràng, có kỳ vọng hoàn vốn đầu tư", score: 4 }
    ]
  },
  {
    id: "4.1",
    section: "Cam kết & Hỗ trợ",
    text: "Rào cản lớn nhất khi chuyển đổi số tại doanh nghiệp Anh/Chị là gì?",
    helpText: "Dùng để xác định yếu tố cản trở lớn nhất nhằm tìm hướng tháo gỡ.",
    type: 'multi',
    options: [
      { text: "Thiếu ngân sách", score: 0 },
      { text: "Thiếu kiến thức/kỹ năng", score: 0 },
      { text: "Thiếu nhân lực", score: 0 },
      { text: "Không thấy cần thiết", score: 0 },
      { text: "Không có hỗ trợ từ bên ngoài", score: 0 },
      { text: "Không tìm được đối tác phù hợp", score: 0 },
      { text: "Khác", score: 0, hasInput: true }
    ]
  },
  {
    id: "4.2",
    section: "Cam kết & Hỗ trợ",
    text: "Anh/Chị cần hỗ trợ gì để thúc đẩy quá trình chuyển đổi số?",
    helpText: "Xác định nhu cầu chính để xây dựng chính sách/giải pháp hỗ trợ phù hợp.",
    type: 'multi',
    options: [
      { text: "Đào tạo kỹ năng", score: 0 },
      { text: "Tư vấn giải pháp", score: 0 },
      { text: "Hỗ trợ tài chính", score: 0 },
      { text: "Cung cấp công cụ/phần mềm miễn phí", score: 0 },
      { text: "Kết nối với chuyên gia/đối tác công nghệ", score: 0 }
    ]
  },
  {
    id: "4.3",
    section: "Cam kết & Hỗ trợ",
    text: "Anh/Chị có sẵn sàng đầu tư vào công nghệ số trong 12 tháng tới không?",
    helpText: "'Có' thể hiện mức độ cam kết, là dấu hiệu chuyển sang giai đoạn đang phát triển hoặc cao hơn.",
    type: 'single',
    options: [
      { text: "Có", score: 4 },
      { text: "Không", score: 0 },
      { text: "Còn phân vân", score: 2 }
    ]
  },
  {
    id: "4.4",
    section: "Cam kết & Hỗ trợ",
    text: "Doanh nghiệp có từng nhận hỗ trợ từ các chương trình quốc gia hoặc hiệp hội (nếu có)?",
    helpText: "Mức tương tác với các nguồn lực bổ trợ từ chính phủ hoặc hiệp hội.",
    type: 'single',
    options: [
      { text: "Không", score: 0 },
      { text: "Có nghe nhưng chưa tham gia", score: 1 },
      { text: "Đã từng nộp đăng ký", score: 3 },
      { text: "Đang tham gia chương trình hỗ trợ (ví dụ: RDX, SMEdx...)", score: 4 }
    ]
  },
  {
    id: "5.1",
    section: "Năng lực & Định hướng",
    text: "Mục tiêu chính khi chuyển đổi số của doanh nghiệp Anh/Chị là gì?",
    helpText: "Xác định đích đến kỳ vọng giúp tùy chọn trọng tâm công nghệ ưu tiên.",
    type: 'multi',
    options: [
      { text: "Tăng doanh thu", score: 0 },
      { text: "Tối ưu chi phí", score: 0 },
      { text: "Nâng cao hiệu quả nhân viên", score: 0 },
      { text: "Tăng trải nghiệm khách hàng", score: 0 },
      { text: "Mở rộng thị trường", score: 0 },
      { text: "Đổi mới sản phẩm/dịch vụ", score: 0 }
    ]
  },
  {
    id: "5.2",
    section: "Năng lực & Định hướng",
    text: "Anh/Chị đánh giá mức độ sẵn sàng chuyển đổi số của doanh nghiệp mình ở mức nào?",
    helpText: "Cảm quan tự đánh giá tổng quát của doanh nghiệp.",
    type: 'single',
    options: [
      { text: "Rất thấp", score: 0 },
      { text: "Thấp", score: 1 },
      { text: "Trung bình", score: 2 },
      { text: "Cao", score: 3 },
      { text: "Rất cao", score: 4 }
    ]
  },
  {
    id: "5.3",
    section: "Năng lực & Định hướng",
    text: "Những nỗ lực chuyển đổi số trước đây của Anh/Chị có hiệu quả không?",
    helpText: "Kinh nghiệm thực tiễn giúp đúc rút bài học cho hành trình tiếp theo.",
    type: 'single',
    options: [
      { text: "Không thành công", score: 0 },
      { text: "Rất ít hiệu quả", score: 1 },
      { text: "Tạm ổn", score: 2 },
      { text: "Tương đối thành công", score: 3 },
      { text: "Rất thành công", score: 4 }
    ]
  }
];

const DIMENSIONS_DX = {
  "Hạ tầng & Công nghệ": { c: "#67e8f9", max: 12 },
  "Nhận thức & Chiến lược": { c: "#34d399", max: 16 },
  "Cam kết & Hỗ trợ": { c: "#fbbf24", max: 8 },
  "Năng lực & Định hướng": { c: "#f87171", max: 8 }
};

interface SurveyProps {
  onNavigate: (path: string) => void;
}

export default function DigitalTransformationSurvey({ onNavigate }: SurveyProps) {
  const [step, setStep] = useState<'start' | 'contact' | 'quiz' | 'result'>('start');
  const [userData, setUserData] = useState<UserData>({ name: '', phone: '', email: '', co: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof UserData, string>>>({});
  
  // Storage of answers
  // For single-choice questions: { [questionId: string]: string (the selected answer option text) }
  // For multi-choice questions: { [questionId: string]: string[] (the array of selected option texts) }
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [inputs, setInputs] = useState<Record<string, string>>({}); // holds the "Khác" text inputs
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Validate only scorable questions (13 scorable questions in total)
  const scorableQuestions = useMemo(() => {
    return QUESTIONS_DX.filter(q => q.type === 'single');
  }, []);

  const totalScore = useMemo(() => {
    let scoreSum = 0;
    scorableQuestions.forEach(q => {
      const ansText = answers[q.id];
      if (ansText) {
        const option = q.options.find(o => o.text === ansText);
        if (option) {
          scoreSum += option.score;
        }
      }
    });
    return scoreSum;
  }, [answers, scorableQuestions]);

  const percentageScore = Math.round((totalScore / 44) * 100);

  const dimensionScores = useMemo(() => {
    const scores: Record<string, number> = {};
    Object.keys(DIMENSIONS_DX).forEach(d => scores[d] = 0);
    
    scorableQuestions.forEach(q => {
      const ansText = answers[q.id];
      if (ansText) {
        const option = q.options.find(o => o.text === ansText);
        if (option) {
          scores[q.section] += option.score;
        }
      }
    });
    return scores;
  }, [answers, scorableQuestions]);

  const resultData = useMemo(() => {
    if (percentageScore < 35) {
      return {
        lvl: "🌱 Giai đoạn Bắt đầu (Digital Starter)",
        lc: "#fca5a5",
        rc: "#ef4444",
        desc: "Doanh nghiệp đang ở giai đoạn sơ khởi của quá trình chuyển đổi số. Việc áp dụng công nghệ chủ yếu là tự phát, thủ công, quy trình chưa được chuẩn hóa và hạ tầng công nghệ còn rời rạc.",
        recos: [
          { ic: <Construction className="w-6 h-6" />, bg: "rgba(239,68,68,0.1)", t: "Số hóa tài liệu & Quy trình cốt lõi", p: "Chuyển đổi các quy trình thủ công thiết yếu (như đề xuất, ký duyệt, lưu trữ) sang môi trường trực tuyến." },
          { ic: <Users className="w-6 h-6" />, bg: "rgba(239,68,68,0.1)", t: "Nâng cao nhận thức nội bộ", p: "Tổ chức các buổi chia sẻ về lợi ích của công nghệ số để tạo sự đồng thuận từ ban quản lý tới toàn thể nhân viên." },
          { ic: <Target className="w-6 h-6" />, bg: "rgba(239,68,68,0.1)", t: "Đầu tư giải pháp SaaS cơ bản", p: "Sử dụng các công cụ làm việc nhóm, giao tiếp nội bộ và quản trị công việc đám mây có chi phí thấp để tích lũy kinh nghiệm số." }
        ]
      };
    } else if (percentageScore < 60) {
      return {
        lvl: "🔧 Giai đoạn Phát triển (Digital Explorer)",
        lc: "#fcd34d",
        rc: "#f59e0b",
        desc: "Doanh nghiệp đã nhận thức rõ giá trị của chuyển đổi số và bắt đầu áp dụng công nghệ vào một số phòng ban chính. Tuy nhiên, các giải pháp chưa tích hợp sâu và dữ liệu còn phân tán.",
        recos: [
          { ic: <BarChart3 className="w-6 h-6" />, bg: "rgba(245,158,11,0.1)", t: "Tích hợp và đồng bộ hệ thống", p: "Liên kết dữ liệu giữa các phần mềm đơn lẻ (CRM, bán hàng, kế toán) để dòng chảy luồng thông tin thông suốt." },
          { ic: <RefreshCcw className="w-6 h-6" />, bg: "rgba(245,158,11,0.1)", t: "Chuẩn hóa và Tự động hóa quy trình", p: "Xác lập các quy trình vận hành SOP bằng văn bản và tự động hóa các khâu duyệt trực tuyến giảm chồng chéo." },
          { ic: <Lock className="w-6 h-6" />, bg: "rgba(245,158,11,0.1)", t: "Thiết lập phân quyền & Bảo mật", p: "Áp dụng các chính sách an toàn thông tin chuyên sâu hơn, phân quyền dữ liệu chặt chẽ và backup định kỳ." }
        ]
      };
    } else if (percentageScore < 80) {
      return {
        lvl: "🚀 Giai đoạn Tăng tốc (Digital Adapter)",
        lc: "#7dd3fc",
        rc: "#0ea5e9",
        desc: "Doanh nghiệp sở hữu hệ thống số tương đối đồng bộ, quy trình vận hành được theo dõi và đánh giá chính xác qua các chỉ số. Sự thâm nhập công nghệ sâu rộng giúp nâng bổng hiệu quả của mọi phòng ban.",
        recos: [
          { ic: <Zap className="w-6 h-6" />, bg: "rgba(14,165,233,0.1)", t: "Quản trị dựa trên dữ liệu (Data-driven)", p: "Ứng dụng hệ thống báo cáo thông minh (Dashboard) để phân tích trực tuyến và đưa ra quyết định quản trị tức thì." },
          { ic: <TrendingUp className="w-6 h-6" />, bg: "rgba(14,165,233,0.1)", t: "Tối ưu hóa trải nghiệm đa kênh", p: "Tích hợp công nghệ chăm sóc khách hàng tự động (auto-responder, chatbot) để đồng nhất điểm chạm và nâng cao mức độ hài lòng." },
          { ic: <Shuffle className="w-6 h-6" />, bg: "rgba(14,165,233,0.1)", t: "Xây dựng văn hóa số đổi mới", p: "Lan tỏa tinh thần cải hoán quy trình liên tục trong tổ chức, khuyến khích nhân viên chủ động ứng dụng công cụ mới." }
        ]
      };
    } else {
      return {
        lvl: "✨ Giai đoạn Trưởng thành (Digital Leader)",
        lc: "#6ee7b7",
        rc: "#10b981",
        desc: "Xuất sắc! Doanh nghiệp đứng trong hàng ngũ những người tiên phong dẫn dắt thị trường bằng sức mạnh công nghệ số. Hệ sinh thái hoàn chỉnh, tích hợp cao và định hướng phát triển rõ ràng với khả năng đổi mới vượt bậc.",
        recos: [
          { ic: <Trophy className="w-6 h-6" />, bg: "rgba(16,185,129,0.1)", t: "Phát triển Kho dữ liệu tập trung", p: "Đồng bộ hóa dữ liệu toàn diện về Data Lake / Data Warehouse kết hợp áp dụng mô hình phân tích tiên tiến bằng AI/ML." },
          { ic: <LinkIcon className="w-6 h-6" />, bg: "rgba(16,185,129,0.1)", t: "Chuỗi cung ứng thông minh rộng mở", p: "Tận dụng API và các cổng kết nối đối tác để số hóa đa chiều hệ sinh thái chuỗi cung ứng trực tuyến." },
          { ic: <Lightbulb className="w-6 h-6" />, bg: "rgba(16,185,129,0.1)", t: "Sáng kiến sản phẩm/phân khúc số mới", p: "Thiết lập các mảng doanh thu thông qua phát triển dòng ứng dụng số, dịch vụ gia tăng tận dụng dữ liệu độc quyền." }
        ]
      };
    }
  }, [percentageScore]);

  const analysisSwot = useMemo(() => {
    // Sort dimensions by computed percentage score
    const dimensionPercentages = Object.entries(DIMENSIONS_DX).map(([name, cfg]) => {
      const score = dimensionScores[name] || 0;
      const pct = Math.round((score / cfg.max) * 100);
      return { name, score, max: cfg.max, pct };
    });

    // Sort descending by percentage
    const sorted = [...dimensionPercentages].sort((a, b) => b.pct - a.pct);

    const strengths = sorted.filter(d => d.pct >= 50);
    const weaknesses = sorted.filter(d => d.pct < 50);

    // Ensure we have at least one of each to show balance
    const finalStrengths = strengths.length > 0 ? strengths : sorted.slice(0, 2);
    const finalWeaknesses = weaknesses.length > 0 ? weaknesses : sorted.slice(-2);

    const adviceMap: Record<string, { strengthWord: string; weaknessWord: string; strengthBullet: string[]; weaknessBullet: string[] }> = {
      "Hạ tầng & Công nghệ": {
        strengthWord: "Doanh nghiệp sở hữu hệ thống hạ tầng số tương đối tốt, sẵn sàng dịch chuyển các hoạt động cộng tác lên đám mây.",
        weaknessWord: "Hệ thống số hóa hạ tầng còn phân mảnh, phụ thuộc nhiều vào thao tác thủ công, e dè trước cải tiến bảo mật đám mây.",
        strengthBullet: [
          "Tiếp tục bảo toàn và mở rộng dung lượng lưu trữ trên đám mây chuẩn tắc.",
          "Chuẩn bị kế hoạch liên thông dữ liệu giữa hạ tầng nội bộ với các kênh đối tác bên ngoài."
        ],
        weaknessBullet: [
          "Ưu tiên chuyển dịch ngay các tài liệu làm việc quan trọng lên nền tảng đám mây an toàn.",
          "Áp dụng quy chế mật khẩu mạnh, phân quyền nhân sự rõ rệt để chống lộ bí mật nội bộ."
        ]
      },
      "Nhận thức & Chiến lược": {
        strengthWord: "Lãnh đạo cam kết đồng lòng, có tinh thần đổi mới sáng tạo, nhận diện rõ tầm quan trọng sống còn của chuyển đổi số.",
        weaknessWord: "Cấp điều hành còn thiếu định hướng chiến thuật, mơ hồ về bước đi tiếp theo và chưa lượng hóa được hiệu suất đầu tư số.",
        strengthBullet: [
          "Thành lập ban chỉ đạo chuyển đổi số tập hợp các quản lý nòng cốt dẫn đầu.",
          "Lan tỏa tầm nhìn số hóa bằng các buổi họp chia sẻ định kỳ, giảm áp lực áp đặt cho nhân sự."
        ],
        weaknessBullet: [
          "Xây dựng kế hoạch hành động ngắn hạn (3-6 tháng) kiểm chứng trực tiếp bằng các thắng lợi nhanh (Quick Wins).",
          "Cụ thể hóa kỳ vọng đo lường bằng việc đặt ra các chỉ số tiến trình chuyển đổi số rõ ràng."
        ]
      },
      "Cam kết & Hỗ trợ": {
        strengthWord: "Doanh nghiệp sẵn sàng phân bổ ngân sách và thời gian, chủ động tìm kiếm sự đồng hành tư vấn từ các đối tác tin cậy.",
        weaknessWord: "Ngân sách đầu tư số hóa còn chưa rõ ràng, tâm lý e dè hoặc trì hoãn triển khai vì lo ngại xáo trộn vận hành.",
        strengthBullet: [
          "Đồng bộ hóa nguồn ngân sách công nghệ thường niên để duy trì tính liên tục của giải pháp số.",
          "Tham gia kết nối với các cộng đồng doanh nghiệp số hóa thành công của Base.vn nhằm học hỏi thiết thực."
        ],
        weaknessBullet: [
          "Bắt đầu với một hạn mức ngân sách nhỏ, linh hoạt (khoảng 1-3% doanh thu) chuyên biệt cho nâng cấp phần mềm thiết yếu.",
          "Ủy thác cho một nhân sự chuyên trách quản lý dự án số hóa để dứt điểm trong bài toán thực thi."
        ]
      },
      "Năng lực & Định hướng": {
        strengthWord: "Nhân viên sẵn lòng học hỏi công cụ mới, tổ chức sở hữu năng lực thích ứng linh hoạt và giải quyết nhanh các bài toán phát sinh.",
        weaknessWord: "Sự thâm thấu công nghệ của nhân sự còn thấp, thiếu kỹ năng khai thác chuyên sâu nên dễ quay lại lối mòn thủ công.",
        strengthBullet: [
          "Khai thác các nhân tố trẻ tiến bộ làm hạt nhân lan tỏa hướng dẫn sử dụng phần mềm trong nội bộ.",
          "Xây dựng quy chế khen thưởng thiết thực dành cho nhân sự có sáng kiến số hóa quy trình thành công."
        ],
        weaknessBullet: [
          "Tổ chức các khóa đào tạo cầm tay chỉ việc ngắn hạn từ 45-60 phút bám sát tác vụ nghiệp vụ mỗi ngày.",
          "Yêu cầu các đối tác công nghệ lớn như Base.vn cung cấp tài liệu tự học và bộ khung bài thi thực hành số."
        ]
      }
    };

    return {
      strengths: finalStrengths.map(item => ({
        ...item,
        text: adviceMap[item.name]?.strengthWord || "Sở hữu năng lực vượt trội định hướng bứt phá.",
        bullets: adviceMap[item.name]?.strengthBullet || ["Duy trì phát triển năng lực.", "Gắn kết đội ngũ nhân sự hạt nhân."]
      })),
      weaknesses: finalWeaknesses.map(item => ({
        ...item,
        text: adviceMap[item.name]?.weaknessWord || "Yếu tố cần đặc biệt bổ sung năng lực kịp thời.",
        bullets: adviceMap[item.name]?.weaknessBullet || ["Chuẩn hóa các quy trình cốt lõi.", "Bồi dưỡng chuyên môn nghiệp vụ số liên tục."]
      }))
    };
  }, [dimensionScores]);

  const expertRoadmap = useMemo(() => {
    if (percentageScore < 35) {
      return [
        {
          phase: "Chuẩn hóa Vận hành & Truyền thông",
          time: "GIAI ĐOẠN 01: Tháng 01 - Tháng 02",
          objective: "Kiến tạo văn phòng số loại bỏ giấy tờ & chat rác",
          bgColor: "rgba(239, 68, 68, 0.05)",
          borderCol: "border-rose-100",
          tagBg: "bg-rose-100 text-rose-800",
          iconColor: "text-rose-500 bg-rose-100/50",
          focus: "Khắc phục tình trạng chỉ đạo rời rạc qua Zalo/Messenger dễ trôi mất tài liệu. Số hóa toàn bộ giấy tờ phê duyệt thủ công.",
          actions: [
            "Tập trung hóa kênh giao lưu và thông tin chiến dịch của doanh nghiệp, thay thế chat rác.",
            "Số hóa 100% tờ trình hành chính: Đề xuất duyệt chi ngân quỹ, tạm ứng, xin nghỉ phép trực tuyến.",
            "Xây dựng kho biểu mẫu số, cẩm nang nhân viên, chính sách lưu giữ tập trung đám mây an toàn."
          ],
          tools: [
            { name: "Base Request", desc: "Số hóa phê duyệt, tờ trình vận hành duyệt rảnh tay 24/7." },
            { name: "Base Office", desc: "Quản trị thông báo công ty, văn bản hướng dẫn hành chính." },
            { name: "Base Message", desc: "Mạng trao đổi công việc nội bộ bảo mật, phân nhóm chuyên biệt." }
          ],
          expertAdvice: "Chìa khóa ở giai đoạn khởi động là tập trung gỡ điểm nghẽn xin phê duyệt nghỉ phép và chi tiền hằng ngày. Nhân viên được giải phóng thủ tục sẽ vô cùng hưởng ứng giải pháp số mới!"
        },
        {
          phase: "Cộng tác thông suốt & Phối hợp việc",
          time: "GIAI ĐOẠN 02: Tháng 03 - Tháng 04",
          objective: "Quản trị kế hoạch công việc và cộng tác liên phòng ban",
          bgColor: "rgba(99, 102, 241, 0.05)",
          borderCol: "border-indigo-100",
          tagBg: "bg-indigo-100 text-indigo-800",
          iconColor: "text-indigo-500 bg-indigo-100/50",
          focus: "Xác lập đầu việc rõ ràng trực quan theo Mô hình Kanban, loại trừ triệt để tình trạng quên việc, trễ hẹn, đùn đẩy trách nhiệm.",
          actions: [
            "Phân tách công việc của từng phòng ban thành các khu vực dự án chuyên biệt.",
            "Chuẩn hóa 100% việc giao nhận: Luôn có tên người đảm nhận duy nhất, thời gian hoàn thành (deadline) và tiêu chí nghiệm thu.",
            "Số hóa biên bản họp, chuyển trạng thái kết luận trong cuộc họp sang tác vụ thực thi tức thì."
          ],
          tools: [
            { name: "Base Wework", desc: "Quản trị công việc cộng tác, theo dõi sát sao tiến độ từ xa." },
            { name: "Base Meeting", desc: "Chuẩn hóa cuộc họp, tự động xuất bản biên bản số hóa." }
          ],
          expertAdvice: "Hãy cấm tuyệt đối việc giao nhận tác vụ chung chung trên nhóm chat không có người phụ trách. Cần rèn luyện nhân viên thói quen check Base Wework mỗi sáng làm kim chỉ nam."
        },
        {
          phase: "Quản trị KPIs & Bản sắc cam kết",
          time: "GIAI ĐOẠN 03: Tháng 05 - Tháng 06",
          objective: "Đo lường hiệu suất thực và bồi dưỡng văn hóa số",
          bgColor: "rgba(16, 185, 129, 0.05)",
          borderCol: "border-emerald-100",
          tagBg: "bg-emerald-100 text-emerald-800",
          iconColor: "text-emerald-500 bg-emerald-100/50",
          focus: "Đồng bộ dữ liệu chấm công, tính toán lương thưởng minh bạch tự động, thiết lập mục tiêu OKRs giữ lửa cống hiến cho nhân tài.",
          actions: [
            "Số hóa triệt để vòng đời hồ sơ nhân viên, tích hợp trực tiếp bảng chấm công vân tay/FaceID sang bảng lương rành mạch.",
            "Tuyên bố OKRs cấp doanh nghiệp và liên kết chặt chẽ với nhiệm vụ tác vụ của từng phòng ban.",
            "Thực hiện đo lường đánh giá và xếp hạng thi đua khen thưởng nhân viên định kỳ kịp thời."
          ],
          tools: [
            { name: "Base Goal", desc: "Quản trị mục tiêu OKRs đồng bộ tối đa từ trên xuống dưới." },
            { name: "Base HRM Suite", desc: "Đồng hóa dữ liệu nhân sự, công lương, hợp đồng thông tin." }
          ],
          expertAdvice: "Chuyển đổi số chỉ bứt phá ổn định nhất khi quyền lợi của con người được liên kết minh bạch với hiệu năng thực tế thông qua các số liệu đo lường công tâm bậc nhất."
        }
      ];
    } else if (percentageScore < 60) {
      return [
        {
          phase: "Đồng bộ hóa Quy trình SOP",
          time: "GIAI ĐOẠN 01: Tháng 01 - Tháng 02",
          objective: "Xây dựng dứt điểm luồng phối hợp liên phòng ban tự động",
          bgColor: "rgba(245, 158, 11, 0.05)",
          borderCol: "border-amber-100",
          tagBg: "bg-amber-100 text-amber-800",
          iconColor: "text-amber-500 bg-amber-100/50",
          focus: "Xử lý triệt để nút thắt cổ chai khi luân chuyển công việc (ví dụ: Kinh doanh chuyển hợp đồng cho Kế toán, Sản xuất chuyển kho bãi).",
          actions: [
            "Lập danh sách các quy trình phối hợp thường xuyên nhất và vẽ rõ sơ đồ luồng công việc SOP thực tế.",
            "Cấu hình các bước xử lý trực tuyến, tự động phát cảnh báo quá hạn xử lý (SLA) tại từng khâu.",
            "Giảm thiểu 90% việc chuyển giao tài liệu bản cứng bằng dữ liệu số khép kín."
          ],
          tools: [
            { name: "Base Workflow", desc: "Kiến tạo luồng vận hành đa ban bệ chuẩn quy trình đồng bộ." },
            { name: "Base Request", desc: "Tối ưu xin phê duyệt ngân quỹ kết nối trực tiếp vào chuỗi quy trình kinh doanh." }
          ],
          expertAdvice: "Bí quyết ở đây là 'tinh gọn trước, số hóa sau'. Hãy loại bỏ những bước báo cáo không cần thiết trên giấy trước khi số hóa chúng lên Base Workflow."
        },
        {
          phase: "Sắp xếp Nhân lực & Khung hiệu năng",
          time: "GIAI ĐOẠN 02: Tháng 03 - Tháng 04",
          objective: "Đẩy mạnh nền tảng quản trị con người & Lương thưởng số hóa",
          bgColor: "rgba(99, 102, 241, 0.05)",
          borderCol: "border-indigo-100",
          tagBg: "bg-indigo-100 text-indigo-800",
          iconColor: "text-indigo-500 bg-indigo-100/50",
          focus: "Nâng cao năng suất lao động cá nhân bằng các quy chế tự động tra cứu lương thưởng hàng ngày, kích nổ động lực cống hiến.",
          actions: [
            "Tự động tính lương real-time, cho phép nhân viên tra cứu minh bạch bảng công hằng ngày trên điện thoại di động.",
            "Số hóa quy trình tuyển dụng nội bộ nhằm lựa chọn chuẩn xác nhân tố số kế cận.",
            "Triển khai khung đánh giá năng lực đa chiều, công tâm thúc đẩy văn hóa thi đua số."
          ],
          tools: [
            { name: "Base HRM Suite", desc: "Bộ giải pháp quản trị vòng đời nhân tài & Công lương toàn vẹn." },
            { name: "Base Goal", desc: "Nhất quán mục tiêu OKRs thiết lập từ cá nhân tới định hướng công ty." }
          ],
          expertAdvice: "Nỗi sợ lớn của nhân viên là không rõ ràng về lương công. Khi Base HRM giúp họ kiểm soát chính xác thu nhập mỗi ngày, họ sẽ tin tuyệt đối vào sức mạnh của công nghệ số!"
        },
        {
          phase: "Hợp nhất Dữ liệu & Sales CRM",
          time: "GIAI ĐOẠN 03: Tháng 05 - Tháng 06",
          objective: "Liên kết bán hàng đa kênh & Dashboard phân tích điều hành",
          bgColor: "rgba(16, 185, 129, 0.05)",
          borderCol: "border-emerald-100",
          tagBg: "bg-emerald-100 text-emerald-800",
          iconColor: "text-emerald-500 bg-emerald-100/50",
          focus: "Kiến tạo một nguồn dữ liệu thật duy nhất (Single Source of Truth), quản lý chặt chẽ vòng đời khách hàng và ra quyết định kinh doanh đột phá bằng số liệu trực quan.",
          actions: [
            "Kết nối toàn bộ lịch sử chăm sóc khách hàng, hợp đồng, chi phí marketing tập trung.",
            "Tích hợp hệ thống quản trị khách hàng kinh doanh với bộ phận thực thi sản xuất vận hành phía sau.",
            "Cấu hình hệ thống Dashboard tài chính cập nhật tự động tức thì cho Đại hội Đồng quản trị."
          ],
          tools: [
            { name: "Base CRM", desc: "Quản lý phễu bán hàng, hợp đồng và chăm sóc khách hàng chuyên sâu." },
            { name: "Base Info / Dashboard", desc: "Kiến tạo báo cáo dữ liệu quản trị đa chiều thời gian thực." }
          ],
          expertAdvice: "Số liệu không biết nói dối, nhưng nó chỉ có giá trị khi quy chế kỷ luật nhập liệu được ban hành nghiêm túc. Lãnh đạo cần là người tiên phong ra quyết định dựa dẫm vào số liệu hệ thống."
        }
      ];
    } else {
      return [
        {
          phase: "Đồng bộ hóa OKRs & Văn hóa số",
          time: "GIAI ĐOẠN 01: Tháng 01 - Tháng 02",
          objective: "Căn chỉnh mục tiêu cao cấp OKRs & Giải phóng sức sáng tạo",
          bgColor: "rgba(14, 165, 233, 0.05)",
          borderCol: "border-sky-100",
          tagBg: "bg-sky-100 text-sky-800",
          iconColor: "text-sky-500 bg-sky-100/50",
          focus: "Căn chỉnh mục tiêu chiến lược của Ban điều hành bám sát chặt chẽ hoạt động thực tế hằng ngày của từng kỹ sư, kinh doanh.",
          actions: [
            "Thiết lập và trực quan hóa bản đồ cây mục tiêu OKRs đa tầng cấp tập đoàn số.",
            "Triển khai chế độ Check-in OKRs tuần tự để hỗ trợ kịp thời và điều chỉnh độ lệch hướng số.",
            "Lương thưởng thi đua gắn chặt với thành quả Key Results thực thi."
          ],
          tools: [
            { name: "Base Goal", desc: "Quản trị mục tiêu OKRs đồng bộ tối ưu tự động cập nhật tiến trình." },
            { name: "Base Wework", desc: "Nơi thực thi tác nghiệp bám sát chính xác các mục tiêu chiến lược." }
          ],
          expertAdvice: "Hãy chuyển đổi từ lối tư duy kiểm soát hành chính sang quản trị hiệu suất bằng OKRs để khai phóng tiềm năng bứt phá của các nhân sự tinh túy hằng ngày."
        },
        {
          phase: "Hợp nhất API & Tự động hóa",
          time: "GIAI ĐOẠN 02: Tháng 03 - Tháng 04",
          objective: "Liên kết tự động hóa luồng thông tin không điểm chạm",
          bgColor: "rgba(99, 102, 241, 0.05)",
          borderCol: "border-indigo-100",
          tagBg: "bg-indigo-100 text-indigo-800",
          iconColor: "text-indigo-500 bg-indigo-100/50",
          focus: "Loại trừ triệt để việc nhập liệu lặp lại giữa các phần mềm kế toán, ERP chuyên dụng với Base Suite nhờ nền tảng API mở liên kết đa chiều.",
          actions: [
            "Xây dựng Webhook tự động kích hoạt tiến trình tiếp theo khi bước trước hoàn thành phê duyệt.",
            "Liên kết dữ liệu giao dịch từ hệ thống lõi về mảng theo dõi dòng tiền real-time.",
            "Xây dựng cổng thông tin liên thông dữ liệu cho khối đối tác và nhà cung ứng."
          ],
          tools: [
            { name: "Base Connect", desc: "Cổng giao tiếp đám mây quản lý tích hợp API an toàn và hiệu năng." },
            { name: "Base Workflow & CRM", desc: "Kinh doanh chiến lược khép kín tự động, hạn chế tối đa can thiệp người dùng." }
          ],
          expertAdvice: "Tích hợp API sâu rộng giúp doanh nghiệp tối ưu chi phí vận hành ở quy mô lớn nhất mà không phải bóc tách thêm nhân công nhập liệu thủ công rườm rà."
        },
        {
          phase: "Đổi mới Dữ liệu & AI Insights",
          time: "GIAI ĐOẠN 03: Tháng 05 - Tháng 06",
          objective: "Khai thác tri thức số, dự báo tương lai thông minh",
          bgColor: "rgba(16, 185, 129, 0.05)",
          borderCol: "border-emerald-100",
          tagBg: "bg-emerald-100 text-emerald-800",
          iconColor: "text-emerald-500 bg-emerald-100/50",
          focus: "Khai phá khối tài sản dữ liệu khổng lồ nhằm tìm kiếm insights sâu sắc về khách hàng, dự toán rủi ro biến động nhân sự cấp cao.",
          actions: [
            "Ứng dụng mô hình Business Intelligence (BI) đa chiều tự động trích xuất báo cáo thông minh.",
            "Nghiên cứu áp dụng các sáng kiến AI chăm sóc khách hàng tự động tối đa.",
            "Thành lập trung tâm đổi mới liên tục (Innovation Hub) dẫn lối xu hướng thị trường."
          ],
          tools: [
            { name: "Base BI & Analytics", desc: "Phóng chiếu báo cáo dữ liệu quản trị cấp cao đưa quyết chính chiến lược." }
          ],
          expertAdvice: "Doanh nghiệp số vững chãi là doanh nghiệp biết lắng nghe ngôn ngữ của dữ liệu. Khả năng tự học từ dữ liệu chính là bí quyết trường tồn của các tập đoàn dẫn đầu!"
        }
      ];
    }
  }, [percentageScore]);

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
            answers: { ...answers, _custom_inputs: inputs, survey_type: 'digital_transformation' },
            created_at: new Date().toISOString()
          }
        ]);

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Network timeout')), 2000)
      );

      const { error: supabaseError } = await Promise.race([dbPromise, timeoutPromise]) as any;

      if (supabaseError) {
        throw new Error(`Supabase Error: ${supabaseError.message}`);
      }

      console.log('Submission detailed successful');
      setStep('result');
    } catch (error: any) {
      console.warn('Failed to submit DX to Supabase, falling back to local cache:', error);
      
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
          answers: { ...answers, _custom_inputs: inputs, survey_type: 'digital_transformation' },
          created_at: new Date().toISOString()
        });
        localStorage.setItem('quiz_submissions_backup', JSON.stringify(backup));
      } catch (e) {
        console.error('Failed to save fallback submission:', e);
      }

      // Non-blocking redirect so user can still see their beautiful assessment
      setStep('result');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSinglePick = (qId: string, optionText: string) => {
    setAnswers(prev => ({ ...prev, [qId]: optionText }));
  };

  const handleMultiPick = (qId: string, optionText: string) => {
    setAnswers(prev => {
      const currentSelections: string[] = prev[qId] || [];
      
      // If choosing mutual exclusive option "Không" / "Không sử dụng cloud" / "Không có"
      const isExclusive = optionText.startsWith("Không");
      
      if (isExclusive) {
        // If selecting the exclusive one, reset all other options
        if (currentSelections.includes(optionText)) {
          return { ...prev, [qId]: [] };
        } else {
          return { ...prev, [qId]: [optionText] };
        }
      } else {
        // If selecting standard option, make sure exclusive option is removed
        let updated = currentSelections.filter(text => !text.startsWith("Không"));
        if (updated.includes(optionText)) {
          updated = updated.filter(text => text !== optionText);
        } else {
          updated.push(optionText);
        }
        return { ...prev, [qId]: updated };
      }
    });

    // Automatically focus input if clicked "Khác"
    if (optionText === "Khác" || optionText.startsWith("Khác")) {
      setTimeout(() => {
        const el = document.getElementById(`input-${qId}`);
        if (el) el.focus();
      }, 50);
    }
  };

  const handleInputChange = (qId: string, val: string) => {
    setInputs(prev => ({ ...prev, [qId]: val }));
  };

  const answeredCount = useMemo(() => {
    return QUESTIONS_DX.filter(q => {
      const val = answers[q.id];
      if (!val) return false;
      if (Array.isArray(val)) return val.length > 0;
      return true;
    }).length;
  }, [answers]);

  const allAnswered = answeredCount === QUESTIONS_DX.length;

  const handleRestart = () => {
    setStep('start');
    setUserData({ name: '', phone: '', email: '', co: '' });
    setAnswers({});
    setInputs({});
    setErrors({});
  };

  return (
    <div className="min-h-screen relative overflow-hidden selection:bg-indigo-100 bg-white">
      {/* Top Accent Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 z-50 shadow-[0_0_15px_rgba(79,70,229,0.2)]" />

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
            <button onClick={() => onNavigate('/')} className="text-sm font-semibold text-slate-800 hover:text-accent transition-colors cursor-pointer bg-transparent border-none">Trang chủ</button>
            <button onClick={() => { onNavigate('/'); setTimeout(() => { document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }} className="text-sm font-semibold text-slate-600 hover:text-accent transition-colors cursor-pointer bg-transparent border-none">Doanh nghiệp nhận được gì?</button>
            <button onClick={() => { onNavigate('/'); setTimeout(() => { document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }} className="text-sm font-semibold text-slate-600 hover:text-accent transition-colors cursor-pointer bg-transparent border-none">Quy trình</button>
            <button onClick={() => { onNavigate('/'); setTimeout(() => { document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }} className="text-sm font-semibold text-slate-600 hover:text-accent transition-colors cursor-pointer bg-transparent border-none">Thống kê</button>
          </nav>

          <button 
            onClick={() => window.open('https://base.vn/dang-ky-demo?utm_source=base-survey', '_blank', 'noopener,noreferrer')}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            Đăng Ký Demo <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Decorative background blobs */}
      <div className="fixed -top-[200px] -right-[150px] w-[600px] h-[600px] rounded-full bg-indigo-500/8 blur-[100px] animate-float pointer-events-none mix-blend-multiply opacity-50" />
      <div className="fixed -bottom-[100px] -left-[150px] w-[450px] h-[450px] rounded-full bg-violet-500/8 blur-[100px] animate-float-reverse pointer-events-none mix-blend-multiply opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 relative z-10 transition-all duration-300">
        {/* Header navigation bar */}
        <header className="text-center py-6">
          <div className="flex items-center justify-start gap-3 mb-7">
            <button 
              onClick={() => onNavigate('/')}
              className="text-xs text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1 font-semibold border border-slate-200 bg-slate-50 px-3 py-1.5 rounded-lg cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Quay lại trang chủ
            </button>
          </div>
          
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-600 text-[11px] font-bold tracking-[0.08em] uppercase px-4 py-1.5 rounded-full mb-5 font-display shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse shadow-[0_0_8px_rgba(79,70,229,0.4)]" />
            Đánh giá chính xác · Kết quả tức thì
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight tracking-tight mb-4 text-slate-900 flex flex-col items-center">
            <span>Khảo sát mức độ thâm nhập</span>
            <span className="text-gradient">Chuyển Đổi Số Doanh Nghiệp</span>
          </h1>
          
          <p className="text-slate-500 text-sm leading-relaxed max-w-[540px] mx-auto mb-7">
            Hệ thống khảo sát 17 câu tiêu chuẩn chỉ ra khoảng trống hạ tầng số, trình độ tự động hóa và đề xuất hành trình cải hoán toàn phần doanh nghiệp.
          </p>

          <div className="flex justify-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm">
              <Clock className="w-3.5 h-3.5 text-indigo-500" /> ~5 phút
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm">
              <ClipboardList className="w-3.5 h-3.5 text-violet-500" /> 17 câu hỏi
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Điểm số + Lộ trình số
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
              className="max-w-4xl mx-auto bg-white border border-slate-150 rounded-[24px] p-8 sm:p-10 shadow-xl relative overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5 text-center transition-all hover:border-indigo-200 hover:bg-white hover:-translate-y-1 hover:shadow-md">
                  <BarChart3 className="w-7 h-7 text-indigo-500 mx-auto mb-3" />
                  <div className="text-sm font-bold mb-1.5 text-slate-900">Maturity Benchmarking</div>
                  <div className="text-[11px] text-slate-500 leading-relaxed">Bộ 5 danh mục chỉ số đo lường toàn cảnh</div>
                </div>
                <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5 text-center transition-all hover:border-indigo-200 hover:bg-white hover:-translate-y-1 hover:shadow-md">
                  <Target className="w-7 h-7 text-violet-500 mx-auto mb-3" />
                  <div className="text-sm font-bold mb-1.5 text-slate-900">Khuyến nghị cụ thể</div>
                  <div className="text-[11px] text-slate-500 leading-relaxed">Đề xuất bước đi thiết thực đoạt hiệu quả ROI</div>
                </div>
                <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-5 text-center transition-all hover:border-indigo-200 hover:bg-white hover:-translate-y-1 hover:shadow-md">
                  <Map className="w-7 h-7 text-emerald-500 mx-auto mb-3" />
                  <div className="text-sm font-bold mb-1.5 text-slate-900">Chiến lược tối ưu</div>
                  <div className="text-[11px] text-slate-500 leading-relaxed">Vạch kế hoạch ngân sách và phân bổ nguồn lực</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 bg-indigo-50/40 border border-indigo-100/50 rounded-2xl p-4 mb-8">
                <div className="flex -space-x-2.5 shrink-0">
                  {[4, 5, 6].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden shadow-sm">
                      <img 
                        src={`https://picsum.photos/seed/person${i}/100/100`} 
                        alt={`SME ${i}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-xs text-slate-600">
                  Hơn <strong className="text-indigo-600 font-bold">1.200+ giám đốc điều hành</strong> đã lấy chỉ số thành công.
                </div>
              </div>

              <button 
                onClick={handleStart}
                className="w-full py-4 text-base font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                Bắt đầu khảo sát nền tảng số <ChevronRight className="w-5 h-5" />
              </button>
              
              <p className="mt-4 text-center text-[12px] text-slate-400">
                🔒 An toàn dữ liệu tuyệt đối · Quy chuẩn khảo sát tiêu chuẩn
              </p>
            </motion.div>
          )}

          {step === 'quiz' && (
            <div className="space-y-8">
              {/* Sticky Progress Bar */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-lg sticky top-4 z-30"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Tiến trình khảo sát</span>
                    <span className="text-xs font-semibold text-slate-600">Mức độ hoàn thành các câu trắc nghiệm</span>
                  </div>
                  <span className="text-xs font-bold text-indigo-600 font-display bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-100">
                    Đã hoàn thành {answeredCount} / {QUESTIONS_DX.length} câu
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(answeredCount / QUESTIONS_DX.length) * 100}%` }}
                    transition={{ ease: [0.16, 1, 0.3, 1] }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"
                  />
                </div>
              </motion.div>

              {/* Questions Stream list */}
              <div className="space-y-6">
                {QUESTIONS_DX.map((q, qIdx) => {
                  const currentValue = answers[q.id];
                  const hasInputSelected = currentValue && (Array.isArray(currentValue) 
                    ? currentValue.some(text => text === "Khác" || text.startsWith("Khác"))
                    : currentValue === "Khác" || currentValue.startsWith("Khác"));

                  return (
                    <motion.div
                      key={q.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.4 }}
                      className="bg-white border border-slate-150 rounded-[22px] p-6 sm:p-8 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center bg-slate-100 text-slate-700 text-[10px] font-bold px-3 py-1 rounded-full tracking-wide uppercase font-display border border-slate-200">
                          {q.section}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                          Câu {q.id}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold leading-snug mb-1.5 text-slate-900 tracking-tight">
                        {q.text}
                      </h3>
                      {q.helpText && (
                        <p className="text-xs text-slate-500 leading-relaxed mb-6 italic">
                          {q.helpText}
                        </p>
                      )}

                      {/* Display Question Mode Notification */}
                      <p className="text-[10px] text-slate-400 font-mono mb-3 uppercase tracking-wide">
                        {q.type === 'multi' ? '💡 Cho phép chọn nhiều đáp án phù hợp' : '💡 Vui lòng duy nhất một lựa chọn'}
                      </p>

                      <div className="grid grid-cols-1 gap-2.5">
                        {q.options.map((opt, optIdx) => {
                          let isSelected = false;
                          if (q.type === 'multi') {
                            isSelected = Array.isArray(currentValue) && currentValue.includes(opt.text);
                          } else {
                            isSelected = currentValue === opt.text;
                          }

                          return (
                            <div key={optIdx} className="flex flex-col gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  if (q.type === 'multi') {
                                    handleMultiPick(q.id, opt.text);
                                  } else {
                                    handleSinglePick(q.id, opt.text);
                                  }
                                }}
                                className={`flex items-center gap-3.5 p-4 rounded-xl border transition-all text-left group cursor-pointer ${
                                  isSelected 
                                    ? 'bg-indigo-50/60 border-indigo-500 shadow-sm' 
                                    : 'bg-slate-50/60 border-slate-200 hover:border-indigo-300 hover:bg-white hover:translate-x-0.5'
                                }`}
                              >
                                {q.type === 'multi' ? (
                                  <div className={`w-5 h-5 rounded border shrink-0 flex items-center justify-center transition-all ${
                                    isSelected 
                                      ? 'border-indigo-600 bg-indigo-600 text-white' 
                                      : 'border-slate-300 bg-white group-hover:border-indigo-400'
                                  }`}>
                                    {isSelected && <Check className="w-3.5 h-3.5 font-black" />}
                                  </div>
                                ) : (
                                  <div className={`w-5 h-5 rounded-full border shrink-0 flex items-center justify-center transition-all ${
                                    isSelected 
                                      ? 'border-indigo-600 bg-indigo-600' 
                                      : 'border-slate-300 bg-white group-hover:border-indigo-400'
                                  }`}>
                                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                  </div>
                                )}
                                <span className={`text-sm tracking-tight transition-colors ${isSelected ? 'text-slate-900 font-bold' : 'text-slate-600 font-medium'}`}>
                                  {opt.text}
                                </span>
                              </button>

                              {/* Input text field for 'Khác' */}
                              {opt.hasInput && isSelected && (
                                <motion.div 
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  className="px-1 py-1"
                                >
                                  <input 
                                    id={`input-${q.id}`}
                                    type="text"
                                    placeholder="Ghi rõ thông tin hoặc ghi chú bổ sung..."
                                    value={inputs[q.id] || ''}
                                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-300 focus:border-indigo-500 focus:bg-white outline-none rounded-xl py-2.5 px-4 text-xs font-medium text-slate-800 transition-all placeholder:text-slate-400 shadow-inner"
                                  />
                                </motion.div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Submit segment */}
              {submitError && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 max-w-[500px] mx-auto">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-bold text-red-900">Lỗi ghi nhận kết quả</p>
                    <p className="text-[11px] text-red-700 leading-relaxed">{submitError}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 pb-12 max-w-[500px] mx-auto">
                <button 
                  onClick={() => setStep('contact')}
                  className="flex-1 py-4 text-sm font-semibold rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-705 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Sửa thông tin
                </button>
                <button 
                  disabled={!allAnswered || isSubmitting}
                  onClick={handleProceedSubmit}
                  className="flex-[2] py-4 text-base font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCcw className="w-5 h-5 animate-spin" /> Đang tính toán...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5.5 h-5.5" /> 
                      {!allAnswered 
                        ? `Hoàn thành ${QUESTIONS_DX.length - answeredCount} câu hỏi còn lại` 
                        : 'Chấm điểm & Xem báo cáo số →'}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto bg-white border border-slate-150 rounded-[24px] p-8 sm:p-10 shadow-xl"
            >
              <div className="mb-8">
                <div className="inline-flex items-center bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-bold px-3.5 py-1.5 rounded-full mb-4 tracking-wider uppercase font-display shadow-sm">
                  📋 Bước 1 / 2 — Điền Thông tin
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight mb-2 text-slate-900">Báo cáo đánh giá Chuyển Đổi Số</h2>
                <p className="text-sm text-slate-500 leading-relaxed">Hãy bổ túc thông tin nhằm nhận định biên khảo chiến lược riêng biệt phù hợp theo quy mô và ngành nghề vận hành.</p>
              </div>

              <div className="flex flex-col gap-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Họ và tên người nhận <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="Nguyễn Văn A"
                      value={userData.name}
                      onChange={e => setUserData({ ...userData, name: e.target.value })}
                      className={`w-full bg-slate-50 border ${errors.name ? 'border-red-400 bg-red-50/30' : 'border-slate-200'} rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all focus:border-indigo-500 focus:bg-white`}
                    />
                    {errors.name && <span className="text-[11px] text-red-500 flex items-center gap-1 font-medium"><AlertCircle className="w-3 h-3" /> {errors.name}</span>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700">
                      Tên doanh nghiệp / Đơn vị <span className="text-slate-400 font-normal">(Tùy chọn)</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="TechLink Corp (SME)"
                      value={userData.co}
                      onChange={e => setUserData({ ...userData, co: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:shadow-inner outline-none rounded-xl py-3 px-4 text-sm font-medium transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="tel" 
                        placeholder="0901 234 567"
                        value={userData.phone}
                        onChange={e => setUserData({ ...userData, phone: e.target.value })}
                        className={`w-full bg-slate-50 border ${errors.phone ? 'border-red-400 bg-red-50/30' : 'border-slate-200'} rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white`}
                      />
                    </div>
                    {errors.phone && <span className="text-[11px] text-red-500 flex items-center gap-1 font-medium"><AlertCircle className="w-3 h-3" /> {errors.phone}</span>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="email" 
                        placeholder="ten@congty.com"
                        value={userData.email}
                        onChange={e => setUserData({ ...userData, email: e.target.value })}
                        className={`w-full bg-slate-50 border ${errors.email ? 'border-red-400 bg-red-50/30' : 'border-slate-200'} rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white`}
                      />
                    </div>
                    {errors.email && <span className="text-[11px] text-red-500 flex items-center gap-1 font-medium"><AlertCircle className="w-3 h-3" /> {errors.email}</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mb-6">
                <Lock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-800 leading-relaxed">
                  <strong className="text-emerald-900">Mật điều tin cậy:</strong> Doanh nghiệp hoàn toàn sở hữu bảo mật dữ liệu theo quy chế an ninh SSL. Không spam, tuyệt tôn bảo hộ quyền riêng tư.
                </p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setStep('start')}
                  className="flex-1 py-4 text-sm font-semibold rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Quay lại
                </button>

                <button 
                  onClick={handleProceedToQuiz}
                  className="flex-[2] py-4 text-base font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  Tiếp tục câu hỏi khảo sát →
                </button>
              </div>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-10 text-slate-800"
            >
              {/* BRAND HEADER */}
              <div className="text-center space-y-2 mb-4">
                <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1 text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" /> Báo cáo độc quyền từ Base.vn
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  KẾT QUẢ ĐÁNH GIÁ NĂNG LỰC SỐ
                </h2>
                <p className="text-slate-500 text-sm max-w-xl mx-auto">
                  Dựa trên câu trả lời khảo sát thực tế của doanh nghiệp <span className="font-semibold text-slate-700">{userData.co || "quý anh/chị"}</span>, các chuyên gia Base.vn phân tích chân dung số hóa hiện thời như sau:
                </p>
              </div>

              {/* PART 1: OVERALL EVALUATION SCORE (ĐIỂM ĐÁNH GIÁ TỔNG THỂ) */}
              <div className="bg-white border border-slate-200 rounded-[28px] p-6 sm:p-8 lg:p-10 shadow-xl space-y-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-650 via-indigo-600 to-cyan-400" />
                
                {/* SECTION TITLE HEADER */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">1</div>
                  <h3 className="text-lg font-extrabold text-slate-900 uppercase tracking-tight">I. Điểm đánh giá tổng thể & Chân dung chuyển đổi số</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Gauge Card (Left) */}
                  <div className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-white border border-slate-150 rounded-[24px] p-6 lg:p-8 text-center flex flex-col items-center justify-center relative shadow-sm">
                    <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-slate-400 mb-5 font-mono">
                      CHỈ SỐ TRƯỞNG THÀNH SỐ (DX INDEX)
                    </div>

                    <div className="relative w-40 h-40 mx-auto mb-5">
                      <svg viewBox="0 0 148 148" className="w-full h-full -rotate-90">
                        <circle className="fill-none stroke-slate-100 cx-[74] cy-[74] r-[62] stroke-[8]" cx="74" cy="74" r="62" />
                        <motion.circle 
                          initial={{ strokeDashoffset: 389.6 }}
                          animate={{ strokeDashoffset: 389.6 - (percentageScore / 100) * 389.6 }}
                          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                          className="fill-none stroke-[10] stroke-linecap-round"
                          style={{ stroke: resultData.rc }}
                          cx="74" cy="74" r="62" 
                          strokeDasharray="389.6"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-5xl font-black font-display tracking-tighter text-slate-900"
                        >
                          {percentageScore}
                        </motion.div>
                        <div className="text-xs text-slate-400 font-bold mt-0.5">/100 ĐIỂM</div>
                      </div>
                    </div>

                    <h4 className="text-lg font-black tracking-tight mb-2.5 transition-all" style={{ color: resultData.rc }}>
                      {resultData.lvl}
                    </h4>
                    
                    <p className="text-xs text-slate-500 leading-relaxed max-w-[280px]">
                      Hệ số hoàn thành chuyển đổi số đạt mức trung bình khá, điểm số này phản ánh nỗ lực bước đầu số hóa quy trình hoạt động của doanh nghiệp bạn.
                    </p>

                    {/* SPECTRUM REGION GRAPH */}
                    <div className="w-full mt-6 pt-5 border-t border-slate-100 flex flex-col gap-1.5">
                      <div className="flex justify-between text-[9px] font-bold text-slate-400 font-mono tracking-wider">
                        <span>STARTER</span>
                        <span>EXPLORER</span>
                        <span>ADAPTER</span>
                        <span>LEADER</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full relative overflow-visible">
                        <div className="absolute top-0 bottom-0 left-0 rounded-full bg-gradient-to-r from-rose-450 via-amber-400 to-emerald-500" style={{ width: '100%' }} />
                        {/* Selector Indicator */}
                        <motion.div 
                          initial={{ left: '0%' }}
                          animate={{ left: `${percentageScore}%` }}
                          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute w-4 h-4 rounded-full border-2 border-white bg-slate-900 -top-1 shadow-[0_2px_5px_rgba(0,0,0,0.3)] flex items-center justify-center -ml-2"
                        >
                          <div className="w-1 h-1 bg-white rounded-full" />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Level Details & 4 Dimension progress (Right) */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-150">
                      <div className="text-[10px] font-bold tracking-[0.1em] text-slate-450 uppercase mb-1.5 font-mono">Báo cáo đánh giá sơ bộ</div>
                      <p className="text-sm text-slate-650 leading-relaxed font-medium">
                        {resultData.desc}
                      </p>
                    </div>

                    {/* Categories detail list */}
                    <div className="space-y-4">
                      <div className="text-xs font-bold text-slate-400 tracking-wider uppercase font-mono">
                        Điểm số chi tiết theo 4 khía cạnh trọng tâm:
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {Object.entries(DIMENSIONS_DX).map(([d, cfg]) => {
                          const s = dimensionScores[d] || 0;
                          const pct = Math.round((s / cfg.max) * 100);
                          
                          // Custom Icon for each dimension
                          let catIcon = <Building2 className="w-4 h-4" />;
                          if (d === "Hạ tầng & Công nghệ") catIcon = <Lock className="w-4 h-4" />;
                          else if (d === "Nhận thức & Chiến lược") catIcon = <Compass className="w-4 h-4" />;
                          else if (d === "Cam kết & Hỗ trợ") catIcon = <Target className="w-4 h-4" />;
                          else if (d === "Năng lực & Định hướng") catIcon = <Activity className="w-4 h-4" />;

                          return (
                            <div key={d} className="bg-white border border-slate-150 hover:border-slate-300 rounded-xl p-4 transition-all shadow-sm">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="p-1 px-1.5 rounded-md" style={{ backgroundColor: `${cfg.c}15`, color: cfg.c }}>
                                  {catIcon}
                                </div>
                                <div className="text-xs font-bold text-slate-700 truncate">{d}</div>
                              </div>
                              <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-2xl font-black font-mono tracking-tight" style={{ color: cfg.c }}>{s}</span>
                                <span className="text-[10px] text-slate-400 font-bold">/{cfg.max} điểm</span>
                                <span className="ml-auto text-[10px] font-black text-slate-500 bg-slate-50 border border-slate-100 rounded px-1.5 py-0.5 tracking-tight font-mono">{pct}%</span>
                              </div>
                              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${pct}%` }}
                                  transition={{ duration: 1.2, delay: 0.4 }}
                                  className="h-full rounded-full"
                                  style={{ backgroundColor: cfg.c }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PART 2: STRENGTHS & WEAKNESSES (PHÂN TÍCH ĐIỂM MẠNH, ĐIỂM YẾU) */}
              <div className="space-y-4">
                {/* Section Title */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">2</div>
                  <h3 className="text-lg font-extrabold text-slate-900 uppercase tracking-tight">II. Phân tích chi tiết Điểm mạnh & Điểm yếu của doanh nghiệp</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* STRENGTHS (ĐIỂM MẠNH) */}
                  <div className="bg-emerald-50/50 border border-emerald-150/80 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100/10 rounded-full -mr-8 -mt-8 pointer-events-none" />
                    
                    <div className="flex items-center gap-3 border-b border-emerald-100 pb-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-extrabold text-emerald-900">Điểm mạnh cốt lõi</h4>
                        <p className="text-[11px] text-emerald-600 font-semibold uppercase tracking-wider font-mono">Core Strengths</p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      {analysisSwot.strengths.map((item, idx) => (
                        <div key={item.name} className="bg-white border border-emerald-150 rounded-xl p-4 shadow-xs space-y-3">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <span className="text-xs font-bold text-slate-800">{item.name}</span>
                            <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">{item.pct}% hoàn thiện</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {item.text}
                          </p>
                          <div className="space-y-1.5 pt-1">
                            <div className="text-[9px] font-black tracking-wider text-emerald-600 uppercase font-mono">Chuyên gia khuyên nên tận dụng:</div>
                            {item.bullets.map((bullet, bIdx) => (
                              <div key={bIdx} className="flex items-start gap-1.5 text-xs text-slate-650 leading-relaxed">
                                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{bullet}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* WEAKNESSES (ĐIỂM YẾU CẦN KHẮC PHỤC) */}
                  <div className="bg-rose-50/50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-rose-100/10 rounded-full -mr-8 -mt-8 pointer-events-none" />
                    
                    <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                        <ShieldAlert className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-base font-extrabold text-slate-950">Khoảng trống cải thiện</h4>
                        <p className="text-[11px] text-slate-600 font-semibold uppercase tracking-wider font-mono">Critical Gaps to Fix</p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      {analysisSwot.weaknesses.map((item, idx) => (
                        <div key={item.name} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <span className="text-xs font-bold text-slate-800">{item.name}</span>
                            <span className="text-xs font-extrabold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">{item.pct}% hoàn thiện</span>
                          </div>
                          <p className="text-xs text-slate-650 leading-relaxed">
                            {item.text}
                          </p>
                          <div className="space-y-1.5 pt-1">
                            <div className="text-[9px] font-black tracking-wider text-rose-500 uppercase font-mono">Giải pháp khắc phục tức thì:</div>
                            {item.bullets.map((bullet, bIdx) => (
                              <div key={bIdx} className="flex items-start gap-1.5 text-xs text-slate-650 leading-relaxed">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                                <span>{bullet}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* PART 3: DETAILED EXPERT IMPROVEMENT ROADMAP (LỘ TRÌNH CẢI THIỆN TỪ CHUYÊN GIA BASE) */}
              <div className="space-y-6">
                {/* Section Title */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">3</div>
                  <h3 className="text-lg font-extrabold text-slate-900 uppercase tracking-tight">III. Lộ trình cải thiện từng giai đoạn đề xuất bởi chuyên gia Base</h3>
                </div>

                {/* TIMELINE TIMELINE WRAPPER */}
                <div className="relative pt-4 pl-0 sm:pl-4 space-y-8">
                  {/* Visual central vertical border line in desktop screens */}
                  <div className="absolute left-4 sm:left-10 top-0 bottom-10 w-0.5 bg-slate-100 pointer-events-none ml-[-1px] hidden sm:block" />

                  {expertRoadmap.map((phaseData, pIdx) => {
                    return (
                      <motion.div 
                        key={pIdx}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: pIdx * 0.1 }}
                        className="relative grid grid-cols-1 sm:grid-cols-12 gap-4 items-start"
                      >
                        {/* Phase Number Circular Icon (Aligned onto timeline) */}
                        <div className="sm:col-span-1 flex justify-start sm:justify-center relative z-10">
                          <div className="w-11 h-11 rounded-full flex items-center justify-center font-extrabold border-2 border-white shadow-md bg-slate-900 text-white font-mono text-sm leading-none">
                            {pIdx + 1}
                          </div>
                        </div>

                        {/* Phase main wrapper card */}
                        <div 
                          className="sm:col-span-11 border rounded-[22px] p-6 sm:p-8 space-y-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
                          style={{ 
                            backgroundColor: phaseData.bgColor,
                            borderColor: phaseData.borderCol ? undefined : '#e2e8f0'
                          }}
                        >
                          {/* Inner soft header bar */}
                          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                            <div className="space-y-0.5">
                              <span className="text-[10px] font-black uppercase text-slate-500 font-mono tracking-wider">{phaseData.time}</span>
                              <h4 className="text-base sm:text-lg font-black text-slate-900">{phaseData.phase}</h4>
                            </div>
                            <span className="text-[11px] font-bold bg-white-55 border border-slate-200 shadow-xs rounded-full px-3 py-1 text-slate-700">
                              Trọng tâm: {phaseData.objective}
                            </span>
                          </div>

                          {/* Phase Challenge Focus */}
                          <div className="space-y-2">
                            <div className="text-[10px] font-black tracking-wider text-slate-400 uppercase font-mono">Bối cảnh & Thách thức hiện thời:</div>
                            <p className="text-xs sm:text-sm text-slate-650 leading-relaxed font-semibold">
                              {phaseData.focus}
                            </p>
                          </div>

                          {/* List of actions items */}
                          <div className="space-y-3">
                            <div className="text-[10px] font-black tracking-wider text-indigo-600 uppercase font-mono">Hành động trọng tâm đề xuất:</div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {phaseData.actions.map((act, aIdx) => (
                                <div key={aIdx} className="bg-white border border-slate-150/60 rounded-xl p-4 flex gap-2.5 items-start">
                                  <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center text-[10px] font-extrabold text-indigo-600 shrink-0 mt-0.5">
                                    {aIdx + 1}
                                  </div>
                                  <span className="text-xs text-slate-700 leading-relaxed font-medium">{act}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Suggested Software from Base Suite */}
                          <div className="bg-white border border-slate-150 rounded-xl p-4 sm:p-5 space-y-3 shadow-2xs">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                              Bộ giải pháp công nghệ kiến nghị từ Base.vn:
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                              {phaseData.tools.map((t, tIdx) => (
                                <div key={tIdx} className="border border-slate-100 bg-slate-50/50 rounded-lg p-3 group hover:bg-white hover:border-indigo-155 transition-all">
                                  <div className="text-xs font-black text-indigo-600 mb-1 flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                    {t.name}
                                  </div>
                                  <p className="text-[11px] text-slate-500 leading-normal">
                                    {t.desc}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Practical wisdom from expert */}
                          <div className="border-l-4 border-indigo-550 pl-3.5 py-1 bg-white/40">
                            <span className="text-[9px] font-black tracking-widest text-indigo-500 uppercase font-mono block mb-1">💡 Lời khuyên sâu sắc từ Base Expert:</span>
                            <p className="text-xs text-slate-650 italic leading-relaxed font-medium">
                              "{phaseData.expertAdvice}"
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Consultation CTA banner */}
              <div className="bg-slate-50 border border-slate-200 rounded-[24px] p-10 sm:p-12 text-center shadow-lg relative overflow-hidden mt-8">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3C/g%3E%3C/svg%3E")` }} />
                
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 tracking-tight relative">
                  {userData.name ? `${userData.name.split(' ').pop()}, sẵn sàng số hóa vận hành thông suốt?` : 'Xây dựng Lộ trình Số hóa Toàn diện?'}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed max-w-[450px] mx-auto mb-8 relative border-b border-dashed border-slate-200 pb-5">
                  Ban cố vấn điều hành mảng chuyển đổi số của Base.vn sẵn sàng hỗ trợ tư vấn trực tuyến và chuyển giao bộ giải pháp nâng hiệu suất vượt trội cho doanh nghiệp của bạn.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
                  <a 
                    href="tel:0877724333"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 text-sm font-bold rounded-xl shadow-lg transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-white" /> Hotline tư vấn cố vấn: 0877.724.333
                  </a>
                  <button 
                    onClick={handleRestart}
                    className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 px-7 py-3.5 text-sm font-semibold rounded-xl transition-all hover:border-slate-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RefreshCcw className="w-4 h-4 text-slate-405" /> Thực hiện lại khảo sát
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
