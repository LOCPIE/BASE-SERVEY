import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../supabaseClient';
import { getUtmSource } from '../utils/utm';
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
  Award,
  Sparkles,
  Heart,
  MessageSquare,
  Cpu,
  Workflow,
  GitFork,
  LineChart,
  Layers,
  Settings,
  Activity,
  Boxes
} from 'lucide-react';

interface UserData {
  name: string;
  phone: string;
  email: string;
  co: string;
}

interface Option {
  text: string;
  score: number;
}

interface Question {
  id: string;
  section: string;
  text: string;
  helpText: string;
  options: Option[];
}

interface ProcessAutomationSurveyProps {
  onNavigate: (path: string) => void;
}

const QUESTIONS_AUTOMATION: Question[] = [
  {
    id: "PA.1",
    section: "Chuẩn hóa & Thiết lập",
    text: "Quy trình nghiệp vụ tại doanh nghiệp hiện được mô tả và ban hành như thế nào?",
    helpText: "Chuẩn hóa quy trình là điều kiện tiên quyết trước khi áp dụng bất kỳ giải pháp công nghệ tự động hóa nào.",
    options: [
      { text: "Chưa xây dựng quy trình bằng văn bản, nhân viên làm việc hoàn toàn theo kinh nghiệm cá nhân.", score: 0 },
      { text: "Quy trình chủ yếu truyền miệng hoặc tài liệu văn bản Word rời rạc, chưa thống nhất giữa các bộ phận.", score: 2 },
      { text: "Đã chuẩn hóa bằng sơ đồ (Flowchart), tài liệu lưu trữ tập trung nhưng cập nhật thủ công.", score: 3 },
      { text: "Quy trình được vẽ động, quản trị tập trung trên phần mềm và có tự động đánh giá mức độ tuân thủ.", score: 4 }
    ]
  },
  {
    id: "PA.2",
    section: "Tự động hóa Phê duyệt",
    text: "Doanh nghiệp xử lý các yêu cầu đề xuất xin duyệt (mua hàng, thanh toán, xin phép, công tác...) thế nào?",
    helpText: "Số hóa luồng phê duyệt giúp giải phóng nút thắt cổ chai hành chính và tăng tốc độ xử lý công việc.",
    options: [
      { text: "In giấy ký tay trực tiếp, trình nộp thủ công qua nhiều phòng ban, tốn nhiều ngày để hoàn tất.", score: 0 },
      { text: "Gửi yêu cầu qua nhóm chat (Zalo, Teams, Viber) rồi người quản lý phê duyệt bằng phản hồi tin nhắn.", score: 2 },
      { text: "Sử dụng các form trực tuyến (Google Form) rồi gửi email duyệt, vẫn cần nhập liệu và theo dõi thủ công.", score: 3 },
      { text: "Sử dụng phần mềm quản lý luồng phê duyệt (Workflow) tự động thông minh đa cấp, duyệt mọi lúc trên Mobile.", score: 4 }
    ]
  },
  {
    id: "PA.3",
    section: "Giao việc & Tiến độ",
    text: "Công việc hàng ngày tại doanh nghiệp được giao nhận và giám sát tiến độ ra sao?",
    helpText: "Bảng quản lý việc tự động hóa giúp giữ nhịp độ vận hành và không bỏ quên công việc quan trọng.",
    options: [
      { text: "Gặp mặt giao việc trực tiếp hoặc gọi điện thoại, không lưu vết và không có hạn định rõ ràng.", score: 0 },
      { text: "Giao qua các nhóm chat chung (Zalo/Viber), tin tức dễ bị trôi và thường xuyên xảy ra tình trạng sót việc.", score: 2 },
      { text: "Sử dụng bảng Kanban hoặc file Excel chung để mọi người tự cập nhật trạng thái thủ công.", score: 3 },
      { text: "Quản trị tập trung trên phần mềm quản lý công việc, hệ thống tự động nhắc nhới, báo cáo tiến độ thời gian thực.", score: 4 }
    ]
  },
  {
    id: "PA.4",
    section: "Liên thông Dữ liệu",
    text: "Khi có một sự kiện xảy ra (như khách đặt hàng), dữ liệu được truyền sang kho, kế toán, giao vận như thế nào?",
    helpText: "Liên thông dữ liệu tự động giữa các bộ phận trực tiếp cắt giảm lãng phí nhập tay thủ công của nhân viên.",
    options: [
      { text: "Nhân viên tự chép bằng tay giữa các phần mềm độc lập hoặc nhập thủ công vào file Excel.", score: 0 },
      { text: "Xuất dữ liệu Excel từ hệ thống này và nạp (import) thủ công vào hệ thống kia định kỳ.", score: 2 },
      { text: "Đã liên thông cục bộ thông qua API cơ bản hoặc sử dụng công cụ tích hợp trung gian (như Zapier, Make).", score: 3 },
      { text: "Hệ thống đồng bộ dữ liệu tự động thời gian thực (Real-time) toàn diện thông qua ERP hoặc nền tảng quản trị mở.", score: 4 }
    ]
  },
  {
    id: "PA.5",
    section: "Tự động hóa Nghiệp vụ (RPA)",
    text: "Doanh nghiệp xử lý các tác vụ hành chính lặp đi lặp lại như thế nào (đối soát ngân hàng, quét hóa đơn, nhập liệu)?",
    helpText: "RPA (Robotic Process Automation) giúp tự động hóa thay thế các thao tác chuột/bàn phím đơn điệu.",
    options: [
      { text: "Hoàn toàn làm thủ công bằng nhân lực, tốn nhiều giờ làm việc mỗi ngày.", score: 0 },
      { text: "Sử dụng một số template mẫu tự động hóa Excel, macro cơ bản do nhân viên tự thiết lập.", score: 2 },
      { text: "Ứng dụng một số bot tự động hóa đơn lẻ (chatbot trả lời tự động, OCR quét hóa đơn đơn giản).", score: 3 },
      { text: "Áp dụng RPA chuyên nghiệp kết hợp AI để vận hành hàng loạt bot xử lý nghiệp vụ tự động hóa khép kín.", score: 4 }
    ]
  },
  {
    id: "PA.6",
    section: "Bán hàng & Hợp đồng",
    text: "Quy trình từ lúc tiếp cận khách hàng đến ký kết hợp đồng và xuất hóa đơn diễn ra ra sao?",
    helpText: "Tự động hóa hành trình bán hàng cải thiện tỷ lệ chuyển đổi và tăng đáng kể trải nghiệm mua sắm.",
    options: [
      { text: "Báo giá soạn tay, hợp đồng in giấy gửi bưu điện ký nhận trực tiếp mất nhiều tuần.", score: 0 },
      { text: "Lưu thông tin khách hàng trên Excel/Drive, soạn hợp đồng mẫu và scan gửi qua email.", score: 2 },
      { text: "Có phần mềm CRM quản lý leads, nhưng khâu hợp đồng và phê duyệt hóa đơn vẫn xử lý thủ công.", score: 3 },
      { text: "CRM tự động tạo báo giá, liên thông ký hợp đồng điện tử (E-signature), tự động phát hành hóa đơn khi hoàn tất.", score: 4 }
    ]
  },
  {
    id: "PA.7",
    section: "Quản lý Cung ứng & Kho",
    text: "Hệ thống cập nhật hàng tồn kho và kích hoạt quy trình mua hàng/đặt nhà cung cấp như thế nào?",
    helpText: "Kho vận tự động giảm rủi ro đứt gãy nguồn cung và tối thiểu hóa chi phí lưu kho dư thừa.",
    options: [
      { text: "Ghi chép sổ sách hoặc cập nhật Excel thủ công cuối ngày, thường xuyên lệch sổ sách.", score: 0 },
      { text: "Quản lý bằng phần mềm kho/kế toán độc lập, kiểm kho thủ công và đặt hàng khi thấy thiếu.", score: 2 },
      { text: "Sử dụng mã vạch (Barcode/QR) quét xuất nhập, hệ thống tự động báo khi hàng tồn dưới mức an toàn.", score: 3 },
      { text: "Tích hợp IoT quét tự động, ERP tự động gửi yêu cầu báo giá tới nhà cung cấp khi chạm ngưỡng tối thiểu.", score: 4 }
    ]
  },
  {
    id: "PA.8",
    section: "Cảnh báo & Sửa lỗi",
    text: "Khi một bước quy trình bị tắc nghẽn hoặc có lỗi xảy ra (quá hạn duyệt, sai số liệu), hệ thống phản ứng ra sao?",
    helpText: "Hệ thống tự động phát hiện lỗi và chuyển đổi trạng thái (Escalation) đảm bảo mạch vận hành luôn liên tục.",
    options: [
      { text: "Không có cảnh báo, chỉ phát hiện khi có khiếu nại hoặc kiểm toán định kỳ.", score: 0 },
      { text: "Nhân viên phát hiện thủ công rồi chụp màn hình gửi chat nội bộ gọi cứu trợ.", score: 2 },
      { text: "Hệ thống gửi cảnh báo đỏ qua email hoặc app notification cho người chịu trách nhiệm trực tiếp.", score: 3 },
      { text: "Hệ thống tự động phân phối lại việc hoặc nâng cấp phê duyệt (escalate) lên cấp cao hơn khi quá hạn duyệt.", score: 4 }
    ]
  },
  {
    id: "PA.9",
    section: "Báo cáo & Tối ưu",
    text: "Ban Giám đốc phân tích và đánh giá điểm nghẽn hiệu suất của các quy trình vận hành dựa trên cơ sở nào?",
    helpText: "Hiểu rõ nút thắt cổ chai thông qua dữ liệu quy trình thời gian thực giúp cải tiến hệ thống chính xác.",
    options: [
      { text: "Đánh giá theo cảm tính cá nhân, hoàn toàn không đo lường được thời gian xử lý thực tế.", score: 0 },
      { text: "Các phòng ban tự đo đạc thủ công và làm slide báo cáo hiệu suất theo chu kỳ tháng/quý.", score: 2 },
      { text: "Dashboard hiển thị thời gian xử lý trung bình (SLA) của từng luồng công việc để theo dõi.", score: 3 },
      { text: "Ứng dụng Process Mining (Khai phá Quy trình) phân tích chi tiết điểm nghẽn và mô phỏng tối ưu hóa tự động.", score: 4 }
    ]
  },
  {
    id: "PA.10",
    section: "Văn hóa Tự động hóa",
    text: "Đội ngũ nhân viên và quản lý sẵn sàng thế nào cho việc chuyển đổi sang mô hình vận hành tự động?",
    helpText: "Tư duy 'Automation-first' của đội ngũ quyết định khả năng thích ứng và mở rộng quy trình tự động lâu dài.",
    options: [
      { text: "E ngại bị công nghệ thay thế công việc hoặc không quen thao tác trên các phần mềm phức tạp.", score: 0 },
      { text: "Đồng thuận từ Ban Lãnh đạo tối cao nhưng thiếu đội ngũ chuyên trách hướng dẫn triển khai.", score: 2 },
      { text: "Nhân viên thích ứng nhanh, chủ động sử dụng nhiều công cụ cá nhân để tự động hóa công việc của mình.", score: 3 },
      { text: "Văn hóa Automation-first thấm nhuần, nhân viên liên tục kiến nghị các quy trình rườm rà cần tự động hóa.", score: 4 }
    ]
  }
];

const DIMENSIONS_AUTOMATION: Record<string, { c: string; max: number }> = {
  "Chuẩn hóa & Thiết lập": { c: "#f59e0b", max: 4 }, // Amber
  "Tự động hóa Phê duyệt": { c: "#3b82f6", max: 4 }, // Blue
  "Giao việc & Tiến độ": { c: "#10b981", max: 4 }, // Emerald
  "Liên thông Dữ liệu": { c: "#8b5cf6", max: 4 }, // Violet
  "Tự động hóa Nghiệp vụ (RPA)": { c: "#ec4899", max: 4 }, // Pink
  "Bán hàng & Hợp đồng": { c: "#06b6d4", max: 4 }, // Cyan
  "Quản lý Cung ứng & Kho": { c: "#64748b", max: 4 }, // Slate
  "Cảnh báo & Sửa lỗi": { c: "#ef4444", max: 4 }, // Red
  "Báo cáo & Tối ưu": { c: "#14b8a6", max: 4 }, // Teal
  "Văn hóa Tự động hóa": { c: "#ff7849", max: 4 } // Orange
};

export default function ProcessAutomationSurvey({ onNavigate }: ProcessAutomationSurveyProps) {
  const [step, setStep] = useState<'start' | 'contact' | 'quiz' | 'result'>('start');
  const [userData, setUserData] = useState<UserData>({ name: '', phone: '', email: '', co: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof UserData, string>>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const totalScore = useMemo(() => {
    return Object.values(answers).reduce((acc: number, s: number) => acc + s, 0);
  }, [answers]);

  const percentageScore = Math.round((totalScore / 40) * 100);

  const dimensionScores = useMemo(() => {
    const scores: Record<string, number> = {};
    Object.keys(DIMENSIONS_AUTOMATION).forEach(d => scores[d] = 0);
    QUESTIONS_AUTOMATION.forEach((q, i) => {
      const s = answers[i] || 0;
      scores[q.section] += s;
    });
    return scores;
  }, [answers]);

  const resultData = useMemo(() => {
    if (percentageScore < 25) {
      return {
        lvl: "🌱 Vận hành thủ công (Manual Execution)",
        lc: "#f59e0b",
        rc: "#d97706",
        desc: "Doanh nghiệp chủ yếu vận hành phụ thuộc vào giao tiếp trực tiếp, nhóm chat rời rạc và biểu mẫu giấy tờ. Thiếu quy chuẩn biểu mẫu hóa dẫn đến thường xuyên xảy ra tình trạng trôi đơn từ, chậm phê duyệt và quá tải đầu việc.",
        recos: [
          { ic: <Construction className="w-6 h-6 text-amber-600" />, bg: "rgba(245,158,11,0.1)", t: "Thiết lập Core Workflow cơ bản", p: "Vẽ sơ đồ và thống nhất quy trình duyệt mua hàng, duyệt nghỉ phép mẫu trước khi đưa lên phần mềm số hóa." },
          { ic: <MessageSquare className="w-6 h-6 text-amber-600" />, bg: "rgba(245,158,11,0.1)", t: "Hạn chế duyệt bằng Chat", p: "Cấm phê duyệt ngân sách hay ký duyệt qua Zalo/Viber. Chuyển sang biểu mẫu chung gửi email để tránh mất dấu." },
          { ic: <ClipboardList className="w-6 h-6 text-amber-600" />, bg: "rgba(245,158,11,0.1)", t: "Tận dụng phần mềm Quản lý dự án", p: "Thay vì giao việc mồm, hãy bắt đầu tạo thẻ việc trên bảng Trello, Notion hoặc Base Wework để lưu hạn định." }
        ]
      };
    } else if (percentageScore < 50) {
      return {
        lvl: "⚡ Bán Tự động (Semi-Automated)",
        lc: "#3b82f6",
        rc: "#2563eb",
        desc: "Doanh nghiệp đã bắt đầu số hóa quy trình trên các phần mềm chuyên biệt. Đơn từ đã được luân chuyển điện tử nhưng hệ thống dữ liệu chưa đồng bộ, nhân viên vẫn phải xuất file Excel trung gian và trao đổi thủ công định kỳ.",
        recos: [
          { ic: <Shuffle className="w-6 h-6 text-blue-600" />, bg: "rgba(59,130,246,0.1)", t: "Xây dựng luồng phê duyệt tự động (Workflow)", p: "Ứng dụng các quy tắc tự động hóa duyệt cấp 1, cấp 2 để loại bỏ thời gian chết chờ sếp ký tay." },
          { ic: <LinkIcon className="w-6 h-6 text-blue-600" />, bg: "rgba(59,130,246,0.1)", t: "Kết nối dữ liệu qua Webhook/API", p: "Sử dụng các cổng kết nối API để đồng bộ dữ liệu khách hàng CRM sang hệ thống hỗ trợ kỹ thuật hoặc xuất hóa đơn tự động." },
          { ic: <Zap className="w-6 h-6 text-blue-600" />, bg: "rgba(59,130,246,0.1)", t: "Cảnh báo quá hạn (Escalation Rule)", p: "Thiết lập hệ thống tự động nhắc nhở khi xử lý trễ hạn (SLA) vượt ngưỡng để thúc đẩy tính chịu trách nhiệm." }
        ]
      };
    } else if (percentageScore < 75) {
      return {
        lvl: "🚀 Hệ thống gắn kết chuyên sâu (Integrated Automation)",
        lc: "#10b981",
        rc: "#059669",
        desc: "Tuyệt vời! Doanh nghiệp sở hữu hệ thống quy trình liên kết chặt chẽ. Luồng phối hợp đa phòng ban diễn ra tự động thời gian thực trên một trục quản trị tập trung. Doanh nghiệp bắt đầu tối ưu và cải tiến quy trình liên tục.",
        recos: [
          { ic: <Cpu className="w-6 h-6 text-emerald-600" />, bg: "rgba(16,185,129,0.1)", t: "Triển khai RPA cho tác vụ lặp", p: "Sử dụng Robot phần mềm để vận hành tự động các khâu tải sao kê ngân hàng, nhập liệu phần mềm kế toán, gửi báo cáo định kỳ." },
          { ic: <Target className="w-6 h-6 text-emerald-600" />, bg: "rgba(16,185,129,0.1)", t: "Tự động hóa hành trình trải nghiệm", p: "Tích hợp ký số (E-sign) tự động kích hoạt tạo đơn xuất kho, tự động gửi SMS thông báo mã tracking giao hàng cho khách." },
          { ic: <LineChart className="w-6 h-6 text-emerald-600" />, bg: "rgba(16,185,129,0.1)", t: "Tối ưu hóa SLA liên tục", p: "Ứng dụng Process Analytics đo đạc thời gian chết ở từng chặng duyệt, tinh giản tối đa các tầng phê duyệt không trực diện." }
        ]
      };
    } else {
      return {
        lvl: "✨ Doanh nghiệp Tự động hóa thông minh (Hyperautomation Enterprise)",
        lc: "#8b5cf6",
        rc: "#7c3aed",
        desc: "Xin chúc mừng! Doanh nghiệp đạt cấp độ Tự động hóa Thông minh (Hyperautomation). Hệ thống kết hợp nhuần nhuyễn giữa ERP, Workflow, RPA và trí tuệ nhân tạo (AI). Quy trình có khả năng tự phát hiện điểm nghẽn và tự động điều phối nguồn lực tối ưu.",
        recos: [
          { ic: <Sparkles className="w-6 h-6 text-violet-600" />, bg: "rgba(139,92,246,0.1)", t: "Khai phá Quy trình nâng cao (Process Mining)", p: "Dùng thuật toán AI chạy trên log dữ liệu để phát hiện và phòng chống lỗi quy trình tiềm ẩn trước khi chúng xảy ra thực tế." },
          { ic: <Boxes className="w-6 h-6 text-violet-600" />, bg: "rgba(139,92,246,0.1)", t: "Tự động hóa tương tác khách hàng thông minh", p: "Ứng dụng AI Agents đàm thoại tự động trực tiếp xử lý nhu cầu khiếu nại, xuất kho và thiết lập cuộc hẹn trả kết quả tự động." },
          { ic: <Activity className="w-6 h-6 text-violet-600" />, bg: "rgba(139,92,246,0.1)", t: "Xây dựng Trung tâm Ưu việt COE", p: "Thành lập ban chuyên trách Center of Excellence (COE) để nhân bản tư duy hiệu quả số sang các công ty thành viên." }
        ]
      };
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
          survey_type: 'process_automation',
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
              answers: { ...answers, survey_type: 'process_automation' },
              survey_type: 'process_automation',
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
            answers: { ...answers, survey_type: 'process_automation' },
            survey_type: 'process_automation',
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

  const handleRestart = () => {
    setStep('start');
    setUserData({ name: '', phone: '', email: '', co: '' });
    setAnswers({});
    setCurrentQuestion(0);
    setErrors({});
  };

  return (
    <div className="min-h-screen relative overflow-hidden selection:bg-teal-500/30 bg-white">
      {/* Top Accent Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 z-50 shadow-[0_0_15px_rgba(6,182,212,0.2)]" />

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
            <button onClick={() => onNavigate('/')} className="text-sm font-semibold text-slate-800 hover:text-cyan-600 transition-colors cursor-pointer bg-transparent border-none">Trang chủ</button>
            <button onClick={() => { onNavigate('/'); setTimeout(() => { document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }} className="text-sm font-semibold text-slate-600 hover:text-cyan-600 transition-colors cursor-pointer bg-transparent border-none">Doanh nghiệp nhận được gì?</button>
            <button onClick={() => { onNavigate('/'); setTimeout(() => { document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }} className="text-sm font-semibold text-slate-600 hover:text-cyan-600 transition-colors cursor-pointer bg-transparent border-none">Quy trình</button>
            <button onClick={() => { onNavigate('/'); setTimeout(() => { document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }} className="text-sm font-semibold text-slate-600 hover:text-cyan-600 transition-colors cursor-pointer bg-transparent border-none">Thống kê</button>
          </nav>

          <button 
            onClick={() => window.open('https://base.vn/dang-ky-demo?utm_source=base-survey', '_blank', 'noopener,noreferrer')}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-all hover:shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            Đăng Ký Demo <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Background Blobs focused on Cyan/Blue colors representing Automation Flow */}
      <div className="fixed -top-[200px] -right-[150px] w-[600px] h-[600px] rounded-full bg-cyan-100/40 blur-[100px] pointer-events-none mix-blend-multiply opacity-50" />
      <div className="fixed -bottom-[100px] -left-[150px] w-[450px] h-[450px] rounded-full bg-blue-100/40 blur-[100px] pointer-events-none mix-blend-multiply opacity-50" />
      <div className="fixed bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-indigo-100/30 blur-[100px] pointer-events-none mix-blend-multiply opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 relative z-10 transition-all duration-300">
        
        {/* Breadcrumb back */}
        <header className="text-center py-6">
          <div className="flex items-center justify-start gap-3 mb-7">
            <button 
              onClick={() => onNavigate('/')}
              className="text-xs text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1 font-semibold border border-slate-200 bg-slate-50 px-3 py-1.5 rounded-lg cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Quay lại trang chủ
            </button>
          </div>
          
          <div className="inline-flex items-center gap-2 bg-cyan-50 border border-cyan-200 text-cyan-700 text-[11px] font-bold tracking-[0.08em] uppercase px-4 py-1.5 rounded-full mb-5 font-display">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-[ping_1.5s_infinite] shadow-[0_0_8px_rgba(6,182,212,0.4)]" />
            Khảo sát BPA · Nhận Kiến nghị lập tức
          </div>

          <h1 className="text-2xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-4 text-slate-900 flex flex-col items-center">
            <span>Chỉ số tự động hoá</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-500 to-indigo-600">Quy trình Doanh nghiệp</span>
          </h1>
          
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-[550px] mx-auto mb-7">
            Đánh giá hiệu suất liên thông dữ liệu, luồng giải quyết đề xuất duyệt tự động, xử lý giấy tờ hàng ngày và cơ sở tối ưu hóa quy trình.
          </p>

          <div className="flex justify-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm font-sans">
              <Clock className="w-3.5 h-3.5 text-cyan-600" /> ~3-5 phút
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm font-sans">
              <ClipboardList className="w-3.5 h-3.5 text-cyan-600" /> 10 Câu hỏi trọng tâm
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm font-sans">
              <Target className="w-3.5 h-3.5 text-cyan-600" /> Định vị & Bản kế hoạch
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
              className="max-w-4xl mx-auto bg-white border border-slate-100 rounded-[24px] p-8 sm:p-10 shadow-xl relative overflow-hidden"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center transition-all hover:border-cyan-300 hover:bg-cyan-50/10 hover:-translate-y-1 hover:shadow-md">
                  <Workflow className="w-7 h-7 text-cyan-600 mx-auto mb-3" />
                  <div className="text-sm font-bold mb-1.5 text-slate-900">Xóa bỏ Điểm nghẽn</div>
                  <div className="text-[11px] text-slate-500 leading-relaxed">Định vị các mắt xích làm mất thời gian phê duyệt nội bộ</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center transition-all hover:border-cyan-300 hover:bg-cyan-50/10 hover:-translate-y-1 hover:shadow-md">
                  <GitFork className="w-7 h-7 text-blue-600 mx-auto mb-3" />
                  <div className="text-sm font-bold mb-1.5 text-slate-900">Tránh Gõ Tay Lặp Lại</div>
                  <div className="text-[11px] text-slate-500 leading-relaxed">Nhận biết cơ hội tích hợp API và triển khai Robot RPA tối ưu</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center transition-all hover:border-cyan-300 hover:bg-cyan-50/10 hover:-translate-y-1 hover:shadow-md">
                  <Layers className="w-7 h-7 text-indigo-600 mx-auto mb-3" />
                  <div className="text-sm font-bold mb-1.5 text-slate-900">Báo cáo & Giám sát</div>
                  <div className="text-[11px] text-slate-500 leading-relaxed">Xác định các chỉ số SLA chuẩn xác phục vụ quá trình cải tiến</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl p-4 mb-8">
                <Cpu className="w-5 h-5 text-cyan-600 shrink-0" />
                <div className="text-xs text-slate-600 leading-normal">
                  Chỉ số khảo sát là công cụ hữu dụng được nghiên cứu kỹ lưỡng bởi <strong className="text-cyan-700 font-bold">Base.vn</strong> hỗ trợ chuyển đổi tinh gọn.
                </div>
              </div>

              <button 
                onClick={handleStart}
                className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-600/20 hover:shadow-xl hover:shadow-cyan-600/30 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer border-none"
              >
                Bắt đầu đánh giá BPA <ChevronRight className="w-5 h-5" />
              </button>
              
              <p className="mt-4 text-center text-[12px] text-slate-400">
                🔒 Thông tin của doanh nghiệp được cam kết an toàn tuyệt đối.
              </p>
            </motion.div>
          )}

          {step === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto bg-white border border-slate-100 rounded-[24px] p-8 sm:p-10 shadow-xl"
            >
              <div className="mb-8">
                <div className="inline-flex items-center bg-cyan-50 border border-cyan-200 text-cyan-700 text-[10px] font-bold px-3.5 py-1.5 rounded-full mb-4 tracking-wider uppercase font-display">
                  📋 Bước 1 / 2 — Thông tin cơ bản
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight mb-2 text-slate-900">Nhận đề xuất tối ưu hóa quy trình</h2>
                <p className="text-sm text-slate-500">Thông tin liên hệ giúp hệ thống phân biệt quy mô để thiết kế lộ trình tinh gọn phù hợp nhất.</p>
              </div>

              <div className="flex flex-col gap-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      Họ và tên <span className="text-cyan-600">*</span>
                    </label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Nguyễn Văn A"
                        value={userData.name}
                        onChange={e => setUserData({ ...userData, name: e.target.value })}
                        className={`w-full bg-slate-50 border-1.5 ${errors.name ? 'border-red-500 bg-red-50' : 'border-slate-200'} rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none transition-all focus:border-cyan-500 focus:bg-white focus:shadow-sm`}
                      />
                    </div>
                    {errors.name && <span className="text-[11px] text-red-500 flex items-center gap-1 font-medium"><AlertCircle className="w-3 h-3" /> {errors.name}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      Công ty / Doanh nghiệp <span className="text-slate-400 font-normal">(Tùy chọn)</span>
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Công ty Cổ phần Vận hành Số Việt Nam"
                        value={userData.co}
                        onChange={e => setUserData({ ...userData, co: e.target.value })}
                        className="w-full bg-slate-50 border-1.5 border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none transition-all focus:border-cyan-500 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      Số điện thoại <span className="text-cyan-600">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="tel" 
                        placeholder="0912 345 678"
                        value={userData.phone}
                        onChange={e => setUserData({ ...userData, phone: e.target.value })}
                        className={`w-full bg-slate-50 border-1.5 ${errors.phone ? 'border-red-500 bg-red-50' : 'border-slate-200'} rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none transition-all focus:border-cyan-500 focus:bg-white focus:shadow-sm`}
                      />
                    </div>
                    {errors.phone && <span className="text-[11px] text-red-500 flex items-center gap-1 font-medium"><AlertCircle className="w-3 h-3" /> {errors.phone}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      Email <span className="text-cyan-600">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="email" 
                        placeholder="management@congty.com"
                        value={userData.email}
                        onChange={e => setUserData({ ...userData, email: e.target.value })}
                        className={`w-full bg-slate-50 border-1.5 ${errors.email ? 'border-red-500 bg-red-50' : 'border-slate-200'} rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none transition-all focus:border-cyan-500 focus:bg-white focus:shadow-sm`}
                      />
                    </div>
                    {errors.email && <span className="text-[11px] text-red-500 flex items-center gap-1 font-medium"><AlertCircle className="w-3 h-3" /> {errors.email}</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-cyan-50 border border-cyan-200 rounded-2xl p-4 mb-6">
                <Lock className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                <p className="text-xs text-cyan-800 leading-relaxed">
                  <strong className="text-cyan-950">Bảo mật thông tin:</strong> Toàn bộ dữ liệu của bạn được mã hóa an toàn bảo mật, cam kết chỉ được dùng để tạo bản đồ tư vấn và gửi trực tiếp tới email đăng ký của bạn.
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
                  className="flex-[2] py-4 text-base font-bold rounded-xl bg-gradient-to-r from-cyan-600 to-blue-500 text-white shadow-lg shadow-blue-500/10 hover:shadow-xl hover:shadow-blue-500/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer border-none"
                >
                  Sang phần khảo sát quy trình →
                </button>
              </div>
            </motion.div>
          )}

          {step === 'quiz' && (
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-sm sticky top-4 z-30"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest">Đánh giá hệ thống tự động hóa</span>
                    <span className="text-xs font-semibold text-slate-600">Tiến độ phản hồi</span>
                  </div>
                  <span className="text-xs font-bold text-cyan-700 bg-cyan-50 border border-cyan-200 px-3 py-1 rounded-full">
                    Đã hoàn thành {Object.keys(answers).length} / {QUESTIONS_AUTOMATION.length} câu
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(Object.keys(answers).length / QUESTIONS_AUTOMATION.length) * 100}%` }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full"
                  />
                </div>
              </motion.div>

              <div className="space-y-6">
                {QUESTIONS_AUTOMATION.map((q, qIdx) => (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: qIdx * 0.05 }}
                    className="bg-white border border-slate-100 rounded-[24px] p-8 sm:p-10 shadow-lg relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <span className="inline-flex items-center bg-cyan-50 border border-cyan-200 text-cyan-700 text-[10px] font-bold px-3.5 py-1.5 rounded-full tracking-widest uppercase font-display">
                        {q.section}
                      </span>
                      <span className="text-xs font-bold text-slate-400 font-display bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                        Câu {qIdx + 1}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold leading-snug mb-2 tracking-tight text-slate-900">
                      {q.text}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed max-w-3xl mb-7">
                      {q.helpText}
                    </p>

                    <div className="flex flex-col gap-3">
                      {q.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handlePick(qIdx, opt.score)}
                          className={`flex items-center gap-4 p-4 sm:p-5 rounded-2xl border-1.5 transition-all text-left group ${
                            answers[qIdx] === opt.score 
                              ? 'bg-cyan-500/5 border-cyan-500 shadow-sm' 
                              : 'bg-slate-50 border-slate-200 hover:border-cyan-500/40 hover:bg-white hover:translate-x-1 hover:shadow-sm'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                            answers[qIdx] === opt.score 
                              ? 'border-cyan-500 bg-cyan-500' 
                              : 'border-slate-350 bg-white group-hover:border-cyan-400'
                          }`}>
                            {answers[qIdx] === opt.score && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />}
                          </div>
                          <span className={`text-sm sm:text-base transition-colors ${answers[qIdx] === opt.score ? 'text-slate-900 font-semibold' : 'text-slate-600 font-medium'}`}>
                            {opt.text}
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
                    <p className="text-xs font-bold text-red-900">Lỗi gửi phản hồi</p>
                    <p className="text-[11px] text-red-700 leading-relaxed">{submitError}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 pb-12 max-w-[500px] mx-auto">
                <button 
                  onClick={() => setStep('contact')}
                  className="flex-1 py-4 text-sm font-semibold rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Đổi thông tin
                </button>
                <button 
                  disabled={Object.keys(answers).length < QUESTIONS_AUTOMATION.length || isSubmitting}
                  onClick={handleProceedSubmit}
                  className="flex-[2] py-4 rounded-xl text-base font-bold transition-all flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-600 to-blue-500 text-white shadow-xl hover:-translate-y-1 hover:shadow-2xl disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none border-none"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCcw className="w-5 h-5 animate-spin" /> Đang tổng hợp...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-6 h-6" /> 
                      {Object.keys(answers).length < QUESTIONS_AUTOMATION.length 
                        ? `Thiếu ${QUESTIONS_AUTOMATION.length - Object.keys(answers).length} câu chưa trả lời` 
                        : 'Xem Phân Tích Quy Trình →'}
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
              <div className="bg-white border border-slate-100 rounded-[24px] p-10 sm:p-12 text-center shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600" />
                
                <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-slate-400 mb-6 font-display">
                  Đánh giá Chỉ số Tự động hoá Quy trình tổng quát
                </div>

                <div className="relative w-44 h-44 mx-auto mb-6">
                  <svg viewBox="0 0 148 148" className="w-full h-full -rotate-90">
                    <circle className="fill-none stroke-slate-100 cx-[74] cy-[74] r-[62] stroke-[8]" cx="74" cy="74" r="62" />
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
                <p className="text-sm text-slate-600 leading-relaxed max-w-[550px] mx-auto">
                  {resultData.desc}
                </p>
              </div>

              {/* Multi-dimension analysis section */}
              <div className="flex items-center gap-3.5 my-9">
                <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-cyan-600 font-display whitespace-nowrap">
                  Phân tích 10 phương diện Quy trình
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/20 to-transparent" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(DIMENSIONS_AUTOMATION).map(([section, cfg]) => {
                  const s = dimensionScores[section];
                  const pct = Math.round((s / cfg.max) * 100);
                  return (
                    <div key={section} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                      <div className="text-xs font-semibold text-slate-500 mb-2.5">{section}</div>
                      <div className="flex items-baseline gap-1 mb-3.5">
                        <div className="text-3xl font-extrabold font-display" style={{ color: cfg.c }}>{s}</div>
                        <div className="text-xs text-slate-400">/{cfg.max}</div>
                        <div className="ml-auto text-xs font-bold text-slate-600 font-display bg-slate-50 px-2 py-1 rounded-md">{pct}%</div>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner font-sans">
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

              {/* Custom Action recommendations */}
              <div className="flex items-center gap-3.5 my-9">
                <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-cyan-600 font-display whitespace-nowrap">
                  Đề xuất Lộ trình Hành động Custom
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/20 to-transparent" />
              </div>

              <div className="space-y-4">
                {resultData.recos.map((reco, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col sm:flex-row items-start gap-4 p-6 bg-white border border-slate-150 rounded-2xl shadow-sm hover:translate-x-1 transition-all"
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: reco.bg }}
                    >
                      {reco.ic}
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        {reco.t}
                        <span className="inline-flex bg-cyan-50 text-cyan-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-display">
                          Đề xuất {idx + 1}
                        </span>
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {reco.p}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-[24px] p-8 sm:p-12 text-center relative overflow-hidden mt-12 shadow-xl">
                <div className="absolute top-[20%] right-[-50px] w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 space-y-6">
                  <div className="inline-flex items-center gap-2 bg-cyan-500/20 text-cyan-300 text-[10px] uppercase tracking-wider font-bold px-3.5 py-1.5 rounded-full font-display">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Tối ưu hóa vận hành cùng Base.vn
                  </div>

                  <h3 className="text-xl sm:text-3.5xl font-extrabold leading-tight tracking-tight max-w-[650px] mx-auto text-white">
                    Tăng Tốc Vận Hành Doanh Nghiệp Của Bạn Ngay Hôm Nay
                  </h3>

                  <p className="text-slate-400 text-xs sm:text-sm max-w-[500px] mx-auto leading-relaxed">
                    Hơn 9000+ doanh nghiệp hàng đầu tại Việt Nam đang tối ưu hóa luồng công việc, phê duyệt tự động và kết nối hoàn chỉnh trên nền tảng Base.vn.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto pt-4">
                    <button 
                      onClick={handleRestart}
                      className="py-3.5 px-6 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-850 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <RefreshCcw className="w-4 h-4" /> Khảo sát lại
                    </button>
                    <button 
                      onClick={() => window.open('https://base.vn/dang-ky-demo?utm_source=base-survey', '_blank', 'noopener,noreferrer')}
                      className="py-3.5 px-7 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/15 hover:shadow-2xl transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 border-none cursor-pointer"
                    >
                      Tư vấn & Trải nghiệm giải pháp <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Back to Home action */}
              <div className="text-center pt-8">
                <button 
                  onClick={() => onNavigate('/')}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors border border-slate-200 bg-slate-50 px-4 py-2 rounded-xl cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Quay lại trang đánh giá chính
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
