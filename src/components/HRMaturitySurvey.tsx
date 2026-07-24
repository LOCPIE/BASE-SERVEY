import React, { useState, useMemo } from 'react';
import Header from './Header';
import Footer from './Footer';
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
  MessageSquare
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

interface HRMaturitySurveyProps {
  onNavigate: (path: string) => void;
}

const QUESTIONS_HR: Question[] = [
  {
    id: "HR.1",
    section: "Hồ sơ & Vận hành",
    text: "Hồ sơ lý lịch và thông tin hợp đồng của nhân sự hiện được lưu trữ và quản lý như thế nào?",
    helpText: "Quản trị thông tin nhân sự là nền móng cốt lõi cho mọi chính sách và quy trình quản lý con người.",
    options: [
      { text: "Lưu trữ bản cứng (giấy tờ trong tủ hồ sơ) hoặc file Excel rời rạc từng phòng ban.", score: 0 },
      { text: "Đã số hoá và lưu trữ tập trung trên Drive/Cloud nhưng cập nhật và đối soát thủ công.", score: 2 },
      { text: "Quản lý bằng phần mềm hồ sơ nhân sự (Core HR), nhân viên có thể tự cập nhật dữ liệu cá nhân.", score: 3 },
      { text: "Hệ thống Core HR thông minh đồng bộ toàn diện dòng đời nhân sự và tự động nhắc nhở/vận hành liên kết.", score: 4 }
    ]
  },
  {
    id: "HR.2",
    section: "Hồ sơ & Vận hành",
    text: "Quy trình ghi nhận ngày công (chấm công) và chuẩn bị bảng tính lương mỗi tháng đang diễn ra thế nào?",
    helpText: "Cách chấm công và làm lương trực tiếp thể hiện khả năng số hóa các quy trình lặp đi lặp lại.",
    options: [
      { text: "Chấm công thủ công (bằng sổ/Excel), tính lương mất nhiều ngày của kế toán hoặc HR.", score: 0 },
      { text: "Chấm công vân tay/gương mặt tại văn phòng nhưng vẫn xuất file Excel xử lý thủ công phức tạp.", score: 2 },
      { text: "Sử dụng phần mềm quản lý công trực tuyến tích hợp và duyệt đơn từ phép/đi muộn online.", score: 3 },
      { text: "Chấm công đa hình thức qua mobile app, tự động đồng bộ thời gian thực vào bảng lương động chỉ với vài click.", score: 4 }
    ]
  },
  {
    id: "HR.3",
    section: "Tuyển dụng & Đào tạo",
    text: "Quy trình thu thập hồ sơ ứng viên và quản trị tuyển dụng của doanh nghiệp đang được vận hành ra sao?",
    helpText: "Một quy trình tuyển dụng số hóa giúp tăng chất lượng ứng viên và giảm đáng kể thời gian trống việc.",
    options: [
      { text: "Nhận hồ sơ qua mail cá nhân, lưu trữ folder máy tính, liên hệ phỏng vấn rời rạc.", score: 0 },
      { text: "Có đăng tuyển khá đều đặn nhưng việc quản lý sàng lọc ứng viên và phỏng vấn ghi chép thủ công.", score: 2 },
      { text: "Sử dụng hệ thống quản trị tuyển dụng nội bộ (ATS), lưu hồ sơ tập trung và đánh giá cộng tác.", score: 3 },
      { text: "ATS thông minh tự động hóa toàn quy trình tuyển dụng, sàng lọc CV tự động và liên thông hệ thống Onboarding.", score: 4 }
    ]
  },
  {
    id: "HR.4",
    section: "Hiệu suất & Gắn kết",
    text: "Cách thức doanh nghiệp thiết lập mục tiêu và đánh giá kết quả làm việc (hiệu suất) của nhân sự?",
    helpText: "Đánh giá minh bạch giúp xây dựng văn hóa công bằng, gia tăng động lực thúc đẩy kinh doanh.",
    options: [
      { text: "Đánh giá mang tính cảm tính cuối năm hoặc không có chỉ tiêu đo lường công bằng.", score: 0 },
      { text: "Có chỉ tiêu (KPIs) nhưng theo dõi thủ công bằng bảng Excel riêng rẽ, đánh giá định kỳ nửa năm/cuối năm.", score: 2 },
      { text: "Thiết lập mục tiêu và đánh giá hiệu suất (OKRs/KPIs) trực tuyến, có quy trình đánh giá 360 độ.", score: 3 },
      { text: "Quản trị hiệu suất liên tục thời gian thực, liên kết trực tiếp với quỹ lương thưởng, phát triển năng lực.", score: 4 }
    ]
  },
  {
    id: "HR.5",
    section: "Tuyển dụng & Đào tạo",
    text: "Doanh nghiệp tổ chức các chương trình đào tạo và quản lý lộ trình học sập của nhân viên thế nào?",
    helpText: "Phát triển năng lực liên tục là phương pháp tối ưu để giữ chân nhân tài và nâng cấp nội lực tổ chức.",
    options: [
      { text: "Việc đào tạo diễn ra tự phát, nhân viên tự học theo kinh nghiệm thực tế.", score: 0 },
      { text: "Tổ chức các lớp học offline định kỳ nhưng không đo lường được hiệu quả thực sự sau đào tạo.", score: 2 },
      { text: "Có cổng học tập trực tuyến (LMS), hệ thống hóa nội dung bài giảng để học viên chủ động tự học.", score: 3 },
      { text: "Hệ thống khuyến nghị lộ trình học tập tự động theo khoảng trống năng lực của mỗi nhân viên.", score: 4 }
    ]
  },
  {
    id: "HR.6",
    section: "Hiệu suất & Gắn kết",
    text: "Doanh nghiệp đo lường mức độ hài lòng và chỉ số gắn bó của nhân sự với tổ chức bằng cách nào?",
    helpText: "Hiểu được trải nghiệm nhân viên giúp tối ưu hóa chi phí tuyển dụng lại và giảm tỷ lệ nghỉ việc.",
    options: [
      { text: "Không đo lường chính thức, chỉ biết lý do khi nhân viên nộp đơn xin nghỉ việc.", score: 0 },
      { text: "Khảo sát giấy/Google Form định kỳ một lần mỗi năm nhưng ít có phản hồi hay cải tiến cụ thể.", score: 2 },
      { text: "Thống kê định kỳ qua khảo sát trực tuyến (eNPS), truyền thông tin tức liên tục trên mạng xã hội nội bộ.", score: 3 },
      { text: "Quản trị trải nghiệm nhân viên đa chạm, khảo sát tự động từng điểm quan trọng (onboarding, sau thử việc).", score: 4 }
    ]
  },
  {
    id: "HR.7",
    section: "Trải nghiệm số Nhân viên",
    text: "Nhân viên làm các thủ tục hành chính (đơn từ phép, công tác, tra cứu thông tin lương) như thế nào?",
    helpText: "Trải nghiệm tiện lợi giảm tải áp lực hành chính và xây dựng môi trường làm việc chuyên nghiệp.",
    options: [
      { text: "Sử dụng đơn giấy viết tay hoặc điền mẫu word in ra ký trực tiếp gửi HR.", score: 0 },
      { text: "Sử dụng nhóm chat (Zalo, Teams, Viber) để xin duyệt đơn, người quản lý xác nhận qua tin nhắn.", score: 2 },
      { text: "Làm đơn/yêu cầu trực tuyến trên hệ thống nội bộ, phê duyệt tự động luân chuyển đúng cấp.", score: 3 },
      { text: "All-in-one mobile app giúp nhân viên duyệt đơn, tra cứu bảng lương, ký hợp đồng điện tử tiện dụng.", score: 4 }
    ]
  },
  {
    id: "HR.8",
    section: "Chiến lược & Phân tích",
    text: "Quy trình xây dựng đội ngũ kế nhiệm và lộ trình phát triển của các vị trí then chốt hiện tại?",
    helpText: "Quy hoạch nhân sự thăng tiến đảm bảo tính bền vững của doanh nghiệp trước các xáo trộn thị trường.",
    options: [
      { text: "Chưa có kế hoạch dự phòng, phát sinh khủng hoảng mới tìm phỏng vấn người thay thế.", score: 0 },
      { text: "Có ý định xây dựng nhưng chưa cụ thể hóa thành quy trình, nhân sự thăng tiến chủ yếu theo thâm niên.", score: 2 },
      { text: "Đã xây dựng Bản đồ năng lực và sơ đồ thăng tiến rõ rệt cho các cấp quản lý từ trung tới cao.", score: 3 },
      { text: "Sử dụng sơ đồ quản trị nhân tài thông minh (9-Box Grid), tự động phát hiện nhân tài tiềm năng kế thừa.", score: 4 }
    ]
  },
  {
    id: "HR.9",
    section: "Chiến lược & Phân tích",
    text: "Bộ phận Nhân sự đang cung cấp báo cáo và phân tích dữ liệu lao động phục vụ quản trị như thế nào?",
    helpText: "HR Analytics giúp ban giám đốc có cơ sở đưa ra các quyết sách nhân sự chuẩn xác dựa trên số liệu thực tế.",
    options: [
      { text: "Chỉ lập báo cáo cơ cấu tăng giảm khi có yêu cầu đột xuất từ Ban Giám đốc.", score: 0 },
      { text: "Báo cáo định kỳ (headcount, quỹ lương...) bằng Excel, mất nhiều ngày tổng hợp dữ liệu.", score: 2 },
      { text: "Sở hữu Dashboard biểu quan thời gian thực về tỷ lệ nghỉ việc, năng suất, và chi phí nhân sự.", score: 3 },
      { text: "Phân tích nhân sự nâng cao dự báo xu hướng biến động nhân tài, mô phỏng ngân sách tối ưu bằng thuật toán.", score: 4 }
    ]
  },
  {
    id: "HR.10",
    section: "Trải nghiệm số Nhân viên",
    text: "Mức độ sẵn sàng đón nhận công nghệ và quy chuẩn số hóa của đội ngũ HR cũng như nhân sự?",
    helpText: "Văn hóa số là bệ đỡ lớn nhất giúp các hệ thống kỹ thuật hiện đại phát huy tối đa công suất.",
    options: [
      { text: "E ngại và kháng cự mạnh mẽ với công nghệ mới, thích phương pháp thủ công truyền thống.", score: 0 },
      { text: "Chấp nhận áp dụng các ứng dụng mới nhưng thụ động, mức độ sử dụng trồi sụt do giao thức phức tạp.", score: 2 },
      { text: "Thích ứng tốt, bộ phận HR tích cực hướng dẫn và làm gương chuyển đổi số cho toàn công ty.", score: 3 },
      { text: "Tư duy Digital-first trong mọi công việc hành chính nhân sự, thúc đẩy đổi mới liên tục hiệu suất số.", score: 4 }
    ]
  }
];

const DIMENSIONS_HR: Record<string, { c: string; max: number }> = {
  "Hồ sơ & Vận hành": { c: "#10b981", max: 8 }, // Emerald
  "Tuyển dụng & Đào tạo": { c: "#3b82f6", max: 8 }, // Blue
  "Hiệu suất & Gắn kết": { c: "#ec4899", max: 8 }, // Pink
  "Trải nghiệm số Nhân viên": { c: "#f59e0b", max: 8 }, // Amber
  "Chiến lược & Phân tích": { c: "#8b5cf6", max: 8 } // Violet
};

export default function HRMaturitySurvey({ onNavigate }: HRMaturitySurveyProps) {
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
    Object.keys(DIMENSIONS_HR).forEach(d => scores[d] = 0);
    QUESTIONS_HR.forEach((q, i) => {
      const s = answers[i] || 0;
      scores[q.section] += s;
    });
    return scores;
  }, [answers]);

  const resultData = useMemo(() => {
    if (percentageScore < 25) {
      return {
        lvl: "🌱 Sơ khởi (Ad-hoc / Manual)",
        lc: "#34d399",
        rc: "#10b981",
        desc: "Hoạt động HRM của doanh nghiệp đang phụ thuộc lớn vào tài liệu giấy hoặc Excel phân tán. Quy trình thủ công tốn thời gian khiến HR bận rộn với các tác vụ giấy tờ đơn thuần thay vì đóng góp cho mục tiêu kinh doanh.",
        recos: [
          { ic: <Construction className="w-6 h-6 text-emerald-600" />, bg: "rgba(16,185,129,0.1)", t: "Chuyển dịch sang Core HR tập trung", p: "Bắt đầu số hóa thông tin hồ sơ nhân viên cơ bản, lưu trữ Cloud tập trung để loại bỏ quản lý phân tán." },
          { ic: <Users className="w-6 h-6 text-emerald-600" />, bg: "rgba(16,185,129,0.1)", t: "Sử dụng chấm công trực tuyến", p: "Thay thế ghi nhận công thủ công bằng việc sử dụng các cổng check-in có phần mềm tổng hợp tự động." },
          { ic: <Lightbulb className="w-6 h-6 text-emerald-600" />, bg: "rgba(16,185,129,0.1)", t: "Thiết lập tiêu chuẩn quy trình", p: "Văn bản hóa các quy định của công ty, chính sách nghỉ phép, khen thưởng rõ ràng và minh bạch." }
        ]
      };
    } else if (percentageScore < 50) {
      return {
        lvl: "⚡ Số hóa Quy trình (Digitalized HR)",
        lc: "#3b82f6",
        rc: "#2563eb",
        desc: "Doanh nghiệp đã sở hữu một số công cụ hoặc cổng số hóa rời rạc. Tuy dữ liệu đã được thu thập trực tuyến nhưng tính liên thông giữa các khâu chấm công, tính lương và quản lý ứng viên vẫn còn bị nghẽn ở nhiều khoảng trống thủ công.",
        recos: [
          { ic: <Shuffle className="w-6 h-6 text-blue-600" />, bg: "rgba(59,130,246,0.1)", t: "Tích hợp Công và Lương", p: "Kết nối dữ liệu giờ công, đơn nghỉ phép tự động đồng bộ vào bảng lương thời gian thực để cắt giảm thời gian xử lý cuối tháng." },
          { ic: <Target className="w-6 h-6 text-blue-600" />, bg: "rgba(59,130,246,0.1)", t: "Ứng dụng phần mềm Tuyển dụng (ATS)", p: "Xây dựng Talent Pool và tập trung hóa dòng trao đổi giữa các phòng ban chuyên môn và bộ phận HR." },
          { ic: <MessageSquare className="w-6 h-6 text-blue-600" />, bg: "rgba(59,130,246,0.1)", t: "Cải thiện Cổng tự tra cứu (Self-Service)", p: "Cung cấp cổng mobile app giúp nhân viên tự quản lý thông tin nghỉ phép, bảng lương nhằm giảm thiểu xung đột vận hành." }
        ]
      };
    } else if (percentageScore < 75) {
      return {
        lvl: "🚀 Quản trị Tài năng tối ưu (Strategic Talent Management)",
        lc: "#ec4899",
        rc: "#db2777",
        desc: "Bộ phận Nhân sự đã vận hành ổn định trên các nền tảng phần mềm khép kín từ tuyển dụng, quản lý hồ sơ đến chấm công tính lương. Doanh nghiệp đang nỗ lực áp dụng các mô hình đánh giá và học tập trực tuyến để giữ chân người tài.",
        recos: [
          { ic: <TrendingUp className="w-6 h-6 text-pink-600" />, bg: "rgba(236,72,153,0.1)", t: "Chuẩn hóa Quản trị Hiệu suất chuyên sâu", p: "Sử dụng OKRs hoặc KPIs được đánh giá trực tuyến đa dạng, định kỳ để thúc đẩy tinh thần đổi mới liên tục." },
          { ic: <Trophy className="w-6 h-6 text-pink-600" />, bg: "rgba(236,72,153,0.1)", t: "Xây dựng khung năng lực đào tạo", p: "Liên kết kết quả đánh giá cuối kỳ với hệ thống bài giảng E-learning định sẵn giúp nâng tầm kỹ năng cho đội ngũ." },
          { ic: <Heart className="w-6 h-6 text-pink-600" />, bg: "rgba(236,72,153,0.1)", t: "Thiết lập bản đồ thăng tiến", p: "Tạo lộ trình phát triển sự nghiệp chi tiết để nhân sự nhận thấy cơ hội thăng tiến rõ rệt tại doanh nghiệp." }
        ]
      };
    } else {
      return {
        lvl: "✨ Trưởng thành & Dẫn dắt bằng Dữ liệu (Predictive Enterprise)",
        lc: "#8b5cf6",
        rc: "#7c3aed",
        desc: "Chúc mừng! Doanh nghiệp sở hữu nền tảng quản trị nhân sự số hóa tiên phong và tư duy Digital-first sâu sắc. Dữ liệu nhân sự được phân tích tự động thời gian thực giúp Ban lãnh đạo có được các kiến nghị bổ sung nhân lực, tối ưu chi phí dự báo.",
        recos: [
          { ic: <Zap className="w-6 h-6 text-violet-600" />, bg: "rgba(139,92,246,0.1)", t: "Ứng dụng phân tích dữ liệu dự báo", p: "Khai thác tối đa HR Analytics để dự phòng tỷ lệ nghỉ việc, tối ưu phân phối lương thưởng dựa trên hiệu lực cống hiến thực tế." },
          { ic: <LinkIcon className="w-6 h-6 text-violet-600" />, bg: "rgba(139,92,246,0.1)", t: "Hệ thống hóa Bản đồ 9 ô nhân tài", p: "Tự động phát hiện các nguồn lực cốt cán và quy hoạch nhân lực kế cận kế thừa chủ chốt định kỳ." },
          { ic: <Sparkles className="w-6 h-6 text-violet-600" />, bg: "rgba(139,92,246,0.1)", t: "Tái cơ cấu để nâng cao trải nghiệm sướng", p: "Cải tổ vòng đời nhân viên toàn diện, hướng tới cá nhân hóa trải nghiệm phúc lợi cao cấp." }
        ]
      };
    }
  }, [percentageScore]);

  const analysisData = useMemo(() => {
    // Determine highest and lowest dimensions
    const dimensionPercentages = Object.entries(DIMENSIONS_HR).map(([name, cfg]) => {
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
      "Hồ sơ & Vận hành": {
        strengthTitle: "Thông tin hồ sơ & Vận hành nhân sự ổn định",
        strengthDesc: "Doanh nghiệp quản lý hồ sơ nhân viên quy chuẩn, thông tin hợp đồng đầy đủ và các thủ tục hành chính ngày được thực hiện chính xác.",
        strengthTips: [
          "Mở rộng thông tin thành dạng số hóa lưu trữ tập trung tự động cập nhật.",
          "Chuẩn bị liên kết cơ sở dữ liệu hồ sơ với hệ thống chấm công tính lương để tối ưu hóa việc trả lương."
        ],
        weaknessTitle: "Vận hành thủ công phân tán dữ liệu",
        weaknessDesc: "Hồ sơ nhân viên đa phần lưu trữ trên file cứng hoặc Excel cá nhân gây tốn thời gian tra cứu, dễ thất lạc và rủi ro rò rỉ thông tin cao.",
        weaknessTips: [
          "Đưa 100% hồ sơ lên nền tảng quản lý Core HR điện tử.",
          "Quy định cập nhật hồ sơ trực tiếp từ nhân viên qua cổng tự phục vụ."
        ]
      },
      "Tuyển dụng & Đào tạo": {
        strengthTitle: "Quy trình tuyển mộ tuyển dụng hiệu quả",
        strengthDesc: "Có kênh tuyển dụng mạch lạc, Talent Pool chất lượng và quy trình đào tạo hội nhập bài bản cho nhân viên mới.",
        strengthTips: [
          "Ứng dụng hệ thống ATS chuyên dụng để xây dựng nguồn hồ sơ độc quyền dài hạn.",
          "Thiết lập thang đo hiệu suất nguồn tuyển dụng để tối ưu chi phí quảng cáo tuyển."
        ],
        weaknessTitle: "Tuyển đào tạo thủ công đơn lẻ",
        weaknessDesc: "Chưa quy chuẩn Talent Pool, quy trình onboarding mang tính cảm tính, thiếu tài liệu huấn luyện trung tâm khiến tỷ lệ nhân sự thử việc nghỉ việc cao.",
        weaknessTips: [
          "Văn bản hóa cẩm nang Onboarding hội nhập nhân sự 30-60-90 ngày đầu tiên.",
          "Sử dụng công cụ theo dõi quy trình ứng viên trực tuyến, tránh thất lạc ứng viên tài năng."
        ]
      },
      "Hiệu suất & Gắn kết": {
        strengthTitle: "Cam kết gắn kết hiệu suất nòng cốt tốt",
        strengthDesc: "Hệ thống đánh giá hiệu quản lượng hóa rõ ràng, nhân viên thấu hiểu sứ mệnh chung và có động lực phấn đấu cao.",
        strengthTips: [
          "Mở rộng khảo sát eNPS định kỳ để đánh giá sức khỏe tinh thần tổ chức.",
          "Liên thông kết quả đánh giá KPI/OKRs với cơ chế thăng tiến và bổ nhiệm nhân tài."
        ],
        weaknessTitle: "Đánh giá cảm tính & Thiếu gắn kết",
        weaknessDesc: "Đánh giá hiệu suất cuối kỳ mang nặng tính chủ quan, thiếu chỉ số đo lường KPIs/OKRs cụ thể, không tạo được động lực cho nhân sự cống hiến.",
        weaknessTips: [
          "Xây dựng bộ chỉ số đánh giá KPIs/OKRs rõ ràng cho từng vị trí và truyền thông minh bạch.",
          "Tổ chức các buổi đối thoại định kỳ 1-1 giữa quản lý và nhân sự để tháo gỡ điểm nghẽn."
        ]
      },
      "Trải nghiệm số Nhân viên": {
        strengthTitle: "Trải nghiệm tiện ích tự phục vụ xuất sắc",
        strengthDesc: "Nhân viên tự gửi đơn phép, tra công, nhận bảng lương trực tuyến qua Mobile App mà không cần kiến nghị trực tiếp bộ phận HR.",
        strengthTips: [
          "Cấu hình các quy định duyệt thông minh để phê duyệt tự động giảm thời gian chờ.",
          "Tích hợp ký số điện tử để hoàn thiện trải nghiệm không giấy tờ (Paperless office)."
        ],
        weaknessTitle: "Trải nghiệm rườm rà, thủ tục giấy tờ nhiều",
        weaknessDesc: "Mọi việc từ xin nghỉ phép, xin tạm ứng đến thắc mắc tiền lương đều phải thực hiện bằng đơn giấy, ký duyệt qua nhiều cấp sếp thủ công, gây ức chế cho nhân viên.",
        weaknessTips: [
          "Triển khai Mobile App tự phục vụ để nhân viên tra cứu công lương, duyệt đơn phép thời gian thực.",
          "Loại bỏ các văn bản in ấn hành chính không cần thiết."
        ]
      },
      "Chiến lược & Phân tích": {
        strengthTitle: "Phân tích dữ liệu nhân sự chiến lược (HR Analytics)",
        strengthDesc: "Ban quản lý đưa ra quyết định nhân sự dựa trên trực quan biểu đồ, dự báo tỷ lệ biến động nhân sự và dòng chảy nguồn lực một cách tối ưu.",
        strengthTips: [
          "Ứng dụng phân tích dự báo nâng cao bằng mô hình toán để dự báo chi phí nhân sự hằng năm.",
          "Đồng bộ dữ liệu nhân sự với hiệu suất kinh doanh (Sales Performance) để đo lường ROI nhân sự."
        ],
        weaknessTitle: "Thiếu dữ liệu nhân sự hỗ trợ quyết định sếp",
        weaknessDesc: "Không có số liệu báo cáo nhân sự tổng thể, lãnh đạo tuyển dụng hay phân bổ ngân sách lương dựa trên phán đoán cảm tính, dẫn tới lãng phí tài chính.",
        weaknessTips: [
          "Bắt đầu xây dựng hệ thống báo cáo số lượng biến động nhân sự thường nguyệt tự động.",
          "Tính toán chỉ số chi phí nhân sự trên doanh thu làm cơ sở định cấu trúc lương thưởng."
        ]
      }
    };

    const defaultAdvice = {
      strengthTitle: "Quản trị cơ hữu ổn định",
      strengthDesc: "Doanh nghiệp có nền tảng vững để nâng cấp chuyên sâu nâng tầm năng lực con người.",
      strengthTips: ["Tiếp tục cải tiến quy trình.", "Đào tạo nhân lực nòng cốt."],
      weaknessTitle: "Khoảng trống số hóa cơ bản",
      weaknessDesc: "Còn tồn đọng nhiều thủ tục thủ công gây thắt cổ chai dòng thông tin.",
      weaknessTips: ["Tiến hành dọn dẹp phân cấp quản lý.", "Áp dụng phần mềm cốt lõi dùng ngay."]
    };

    return {
      highest: {
        name: highest?.name || "Hồ sơ & Vận hành",
        pct: highest?.pct || 0,
        advice: adviceByDimension[highest?.name] || defaultAdvice
      },
      lowest: {
        name: lowest?.name || "Chiến lược & Phân tích",
        pct: lowest?.pct || 0,
        advice: adviceByDimension[lowest?.name] || defaultAdvice
      },
      roadmap: percentageScore < 30 ? [
        { phase: "Giai đoạn 1: Chuẩn hóa Thông tin & Core HR Tập trung", desc: "Đưa toàn bộ hồ sơ nhân sự từ Excel/giấy lên phần mềm quản lý Core HR đám mây. Đồng bộ danh bạ toàn tổ chức.", time: "Tháng 01 - Tháng 02" },
        { phase: "Giai đoạn 2: Tự động hóa Chấm công & Tự phục vụ đơn từ", desc: "Triển khai chấm công di động/GPS tích hợp duyệt đơn xin nghỉ phép, đi muộn trực tiếp trên Mobile App. Nhân viên tra công tự động hằng ngày.", time: "Tháng 03 - Tháng 04" },
        { phase: "Giai đoạn 3: Kết toán công lương thông suốt", desc: "Liên kết dữ liệu chấm công và phép tự động đổ về bảng lương cuối tháng, giảm tải 90% công sức tính tay của phòng nhân sự.", time: "Tháng 05 trở đi" }
      ] : percentageScore < 60 ? [
        { phase: "Giai đoạn 1: Số hóa phễu Tuyển dụng & Onboarding nội bộ", desc: "Sử dụng ATS để thu thập hồ sơ ứng viên đa kênh, tạo hệ thống đánh giá ứng viên chuyên nghiệp và chuẩn hóa tài liệu Onboarding.", time: "Tháng 01 - Tháng 02" },
        { phase: "Giai đoạn 2: Kiến thiết đánh giá Hiệu suất (KPIs/OKRs) trực tuyến", desc: "Đưa chỉ tiêu KPIs, OKRs của từng nhân sự lên hệ thống phần mềm quản lý hiệu suất để theo dõi tiến độ công việc minh bạch.", time: "Tháng 03 - Tháng 05" },
        { phase: "Giai đoạn 3: Đào tạo & Khung năng lực trực tuyến", desc: "Tích hợp công cụ E-learning để nhân viên tự học tập cải tạo kỹ năng dưa trên lỗ hổng năng lực phát hiện sau kỳ đánh giá.", time: "Tháng 06 trở đi" }
      ] : [
        { phase: "Giai đoạn 1: Tối ưu hóa vòng đời trải nghiệm Nhân sự (Employee Lifecycle)", desc: "Xây dựng cổng giao tiếp thông tin, khảo sát ý kiến thường kỳ và cá nhân hóa lộ trình chăm sóc phúc lợi đãi ngộ.", time: "Tháng 01 - Tháng 02" },
        { phase: "Giai đoạn 2: Tích hợp sâu AI & Dự toán nguồn lực thông minh", desc: "Ứng dụng Trí tuệ nhân tạo (AI Agents) để tự động lọc hồ sơ ứng viên ứng tuyển, dự báo nguy cơ nghỉ việc dựa trên dữ liệu lịch sử.", time: "Tháng 03 - Tháng 05" },
        { phase: "Giai đoạn 3: Phân tích nguồn nhân lực chiến lược (Predictive HR)", desc: "Quy hoạch tự động Bản đồ 9 ô năng lực nhân tài, lập kế hoạch kế nhiệm sếp dựa trên dữ liệu hiệu quả cống hiến thực.", time: "Tháng 06 trở đi" }
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
          survey_type: 'hr_maturity',
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
              answers: { ...answers, survey_type: 'hr_maturity' },
              survey_type: 'hr_maturity',
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
            answers: { ...answers, survey_type: 'hr_maturity' },
            survey_type: 'hr_maturity',
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
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 z-50 shadow-[0_0_15px_rgba(23,186,134,0.2)]" />

      {/* Header */}
      <Header onNavigate={onNavigate} />

      {/* Background Blobs focused on Teal/Emerald colors representing HR Growth */}
      <div className="fixed -top-[200px] -right-[150px] w-[600px] h-[600px] rounded-full bg-emerald-100/40 blur-[100px] pointer-events-none mix-blend-multiply opacity-50" />
      <div className="fixed -bottom-[100px] -left-[150px] w-[450px] h-[450px] rounded-full bg-teal-100/40 blur-[100px] pointer-events-none mix-blend-multiply opacity-50" />
      <div className="fixed bottom-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-blue-100/30 blur-[100px] pointer-events-none mix-blend-multiply opacity-40" />

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
          
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold tracking-[0.08em] uppercase px-4 py-1.5 rounded-full mb-5 font-display">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-[ping_1.5s_infinite] shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
            Khảo sát HRM · Nhận Báo cáo ngay
          </div>

          <h1 className="text-2xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-4 text-slate-900 flex flex-col items-center">
            <span>Chỉ số trưởng thành</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-indigo-600">Quản trị Nhân sự (HRM)</span>
          </h1>
          
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-[550px] mx-auto mb-7">
            Đánh giá sức mạnh hệ thống vận hành, quy trình thu hút, đào tạo, và mức độ hài lòng số của nhân sự doanh nghiệp bạn.
          </p>

          <div className="flex justify-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm font-sans">
              <Clock className="w-3.5 h-3.5 text-teal-600" /> ~3-5 phút
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm font-sans">
              <ClipboardList className="w-3.5 h-3.5 text-teal-600" /> 10 Câu hỏi chuyên sâu
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm font-sans">
              <Target className="w-3.5 h-3.5 text-teal-600" /> Điểm số & Khuyến nghị
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
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center transition-all hover:border-emerald-300 hover:bg-emerald-50/10 hover:-translate-y-1 hover:shadow-md">
                  <BarChart3 className="w-7 h-7 text-emerald-600 mx-auto mb-3" />
                  <div className="text-sm font-bold mb-1.5 text-slate-900">Chuẩn hóa 5 Năng lực</div>
                  <div className="text-[11px] text-slate-500 leading-relaxed">Phân cụm đo lường từ Vận hành cơ bản tới Phân tích Chiến lược</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center transition-all hover:border-emerald-300 hover:bg-emerald-50/10 hover:-translate-y-1 hover:shadow-md">
                  <Target className="w-7 h-7 text-teal-600 mx-auto mb-3" />
                  <div className="text-sm font-bold mb-1.5 text-slate-900">Định vị Năng suất</div>
                  <div className="text-[11px] text-slate-500 leading-relaxed">Xác định điểm nghẽn giấy tờ làm phát sinh lãng phí vận hành</div>
                </div>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-center transition-all hover:border-emerald-300 hover:bg-emerald-50/10 hover:-translate-y-1 hover:shadow-md">
                  <Map className="w-7 h-7 text-indigo-600 mx-auto mb-3" />
                  <div className="text-sm font-bold mb-1.5 text-slate-900">Kế hoạch Cải tiến</div>
                  <div className="text-[11px] text-slate-500 leading-relaxed">Cung cấp bước đi cụ thể xây dựng phòng nhân sự số chiến lược</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4 mb-8">
                <Users className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-xs text-slate-600 leading-normal">
                  Chỉ số tham chiếu dựa trên số liệu khảo sát từ hơn <strong className="text-emerald-700 font-bold">400+ giám đốc HR (CHRO)</strong> tại Việt Nam.
                </div>
              </div>

              <button 
                onClick={handleStart}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 hover:shadow-xl hover:shadow-emerald-600/30 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer border-none"
              >
                Bắt đầu đánh giá HRM <ChevronRight className="w-5 h-5" />
              </button>
              
              <p className="mt-4 text-center text-[12px] text-slate-400">
                🔒 Cam kết bảo mật thông tin nội bộ của doanh nghiệp tuyệt đối.
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
                <div className="inline-flex items-center bg-teal-50 border border-teal-200 text-teal-700 text-[10px] font-bold px-3.5 py-1.5 rounded-full mb-4 tracking-wider uppercase font-display">
                  📋 Bước 1 / 2 — Thiết lập thông tin
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight mb-2 text-slate-900">Nhận kết quả phân tích HRM</h2>
                <p className="text-sm text-slate-500">Thông tin liên hệ giúp hệ thống định hình quy mô và chuẩn bị đề xuất báo cáo tối ưu nhất.</p>
              </div>

              <div className="flex flex-col gap-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      Họ và tên <span className="text-teal-600">*</span>
                    </label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Nguyễn Văn A"
                        value={userData.name}
                        onChange={e => setUserData({ ...userData, name: e.target.value })}
                        className={`w-full bg-slate-50 border-1.5 ${errors.name ? 'border-red-500 bg-red-50' : 'border-slate-200'} rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none transition-all focus:border-teal-500 focus:bg-white focus:shadow-sm`}
                      />
                    </div>
                    {errors.name && <span className="text-[11px] text-red-500 flex items-center gap-1 font-medium"><AlertCircle className="w-3 h-3" /> {errors.name}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      Tên doanh nghiệp / Công ty <span className="text-slate-400 font-normal">(Tùy chọn)</span>
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Công ty Giải pháp HR Việt Nam"
                        value={userData.co}
                        onChange={e => setUserData({ ...userData, co: e.target.value })}
                        className="w-full bg-slate-50 border-1.5 border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none transition-all focus:border-teal-500 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      Số điện thoại <span className="text-teal-600">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="tel" 
                        placeholder="0912 345 678"
                        value={userData.phone}
                        onChange={e => setUserData({ ...userData, phone: e.target.value })}
                        className={`w-full bg-slate-50 border-1.5 ${errors.phone ? 'border-red-500 bg-red-50' : 'border-slate-200'} rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none transition-all focus:border-teal-500 focus:bg-white focus:shadow-sm`}
                      />
                    </div>
                    {errors.phone && <span className="text-[11px] text-red-500 flex items-center gap-1 font-medium"><AlertCircle className="w-3 h-3" /> {errors.phone}</span>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                      Email <span className="text-teal-600">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="email" 
                        placeholder="hr@congty.com"
                        value={userData.email}
                        onChange={e => setUserData({ ...userData, email: e.target.value })}
                        className={`w-full bg-slate-50 border-1.5 ${errors.email ? 'border-red-500 bg-red-50' : 'border-slate-200'} rounded-xl py-3.5 pl-11 pr-4 text-sm outline-none transition-all focus:border-teal-500 focus:bg-white focus:shadow-sm`}
                      />
                    </div>
                    {errors.email && <span className="text-[11px] text-red-500 flex items-center gap-1 font-medium"><AlertCircle className="w-3 h-3" /> {errors.email}</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6">
                <Lock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-800 leading-relaxed">
                  <strong className="text-emerald-950">Cam kết an toàn thông tin:</strong> Toàn bộ dữ liệu phản hồi của doanh nghiệp bạn được mã hóa an toàn bảo mật, chỉ được sử dụng tạo lập báo cáo chuyên biệt gửi duy nhất tới email của bạn.
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
                  className="flex-[2] py-4 text-base font-bold rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-teal-500/10 hover:shadow-xl hover:shadow-teal-500/20 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer border-none"
                >
                  Khảo sát 10 câu hỏi tiếp theo →
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
                    <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">Khảo sát trưởng thành HRM</span>
                    <span className="text-xs font-semibold text-slate-600">Tiến trình làm bài</span>
                  </div>
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                    Đã hoàn thành {Object.keys(answers).length} / {QUESTIONS_HR.length} câu
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(Object.keys(answers).length / QUESTIONS_HR.length) * 100}%` }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-indigo-600 rounded-full"
                  />
                </div>
              </motion.div>

              <div className="space-y-6">
                {QUESTIONS_HR.map((q, qIdx) => (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: qIdx * 0.05 }}
                    className="bg-white border border-slate-100 rounded-[24px] p-8 sm:p-10 shadow-lg relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <span className="inline-flex items-center bg-teal-50 border border-teal-200 text-teal-700 text-[10px] font-bold px-3.5 py-1.5 rounded-full tracking-widest uppercase font-display">
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
                              ? 'bg-teal-500/5 border-teal-500 shadow-sm' 
                              : 'bg-slate-50 border-slate-200 hover:border-teal-500/40 hover:bg-white hover:translate-x-1 hover:shadow-sm'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                            answers[qIdx] === opt.score 
                              ? 'border-teal-500 bg-teal-500' 
                              : 'border-slate-350 bg-white group-hover:border-teal-400'
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
                    <p className="text-xs font-bold text-red-900">Lỗi lưu kết quả</p>
                    <p className="text-[11px] text-red-700 leading-relaxed">{submitError}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 pb-12 max-w-[500px] mx-auto">
                <button 
                  onClick={() => setStep('contact')}
                  className="flex-1 py-4 text-sm font-semibold rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Tra thông tin
                </button>
                <button 
                  disabled={Object.keys(answers).length < QUESTIONS_HR.length || isSubmitting}
                  onClick={handleProceedSubmit}
                  className="flex-[2] py-4 rounded-xl text-base font-bold transition-all flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-xl hover:-translate-y-1 hover:shadow-2xl disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none border-none"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCcw className="w-5 h-5 animate-spin" /> Đang thiết lập...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-6 h-6" /> 
                      {Object.keys(answers).length < QUESTIONS_HR.length 
                        ? `Nhập nốt ${QUESTIONS_HR.length - Object.keys(answers).length} câu còn thiếu` 
                        : 'Xem Báo Cáo HRM Ngay →'}
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
              {/* Main Scorecard card */}
              <div className="bg-white border border-slate-100 rounded-[24px] p-10 sm:p-12 text-center shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600" />
                
                <div className="text-[11px] font-bold tracking-[0.15em] uppercase text-slate-400 mb-6 font-display">
                  Điểm số Trưởng thành HRM tổng thể
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
                <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-teal-600 font-display whitespace-nowrap">
                  Phân tích theo 5 Năng lực HRM cốt lõi
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-teal-500/20 to-transparent" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(DIMENSIONS_HR).map(([section, cfg]) => {
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

              {/* Customized Action Plan */}
              <div className="flex items-center gap-3.5 my-9">
                <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-teal-600 font-display whitespace-nowrap">
                  Hành động khuyên dùng (Actionable Recommendations)
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-teal-500/20 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {resultData.recos.map((re, rIdx) => (
                  <div key={rIdx} className="bg-white border border-slate-150 rounded-2xl p-6 shadow-sm flex flex-col items-start text-left hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 hover:scale-105 transition-transform" style={{ backgroundColor: re.bg }}>
                      {re.ic}
                    </div>
                    <h3 className="font-bold text-slate-900 leading-snug text-base mb-2 font-sans">
                      {re.t}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">
                      {re.p}
                    </p>
                  </div>
                ))}
              </div>

              {/* BÁO CÁO TƯ VẤN QUẢN TRỊ NHÂN SỰ CHUYÊN SÂU */}
              <div className="flex items-center gap-3.5 my-9">
                <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-teal-600 font-display whitespace-nowrap">
                  Báo cáo tư vấn & Quy hoạch chuyển đổi HRM chuyên sâu
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-teal-500/20 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
                {/* STRENGTH */}
                <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-6 shadow-xs relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-100/10 rounded-full -mr-6 -mt-6 pointer-events-none" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-650 shrink-0">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-emerald-950 leading-tight">Điểm tựa dịch chuyển (Lợi thế quản trị)</h4>
                      <p className="text-[10px] text-emerald-600 uppercase font-mono tracking-wider font-semibold">Core Leverage</p>
                    </div>
                  </div>
                  <div className="bg-white border border-emerald-100 rounded-xl p-4 space-y-3 shadow-2xs">
                    <div className="text-xs font-bold text-slate-850 flex items-center justify-between">
                      <span className="font-sans">{analysisData.highest.name}</span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded border border-emerald-100 font-mono">{analysisData.highest.pct}% hoàn thiện</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">{analysisData.highest.advice.strengthDesc}</p>
                    <div className="space-y-1.5 pt-2.5 border-t border-slate-100">
                      <span className="text-[10px] font-black text-emerald-700 uppercase font-mono tracking-wider">Mô hình kiến nghị tiếp tục tận dụng:</span>
                      {analysisData.highest.advice.strengthTips.map((tip, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed font-sans">
                          <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* WEAKNESS */}
                <div className="bg-rose-50/40 border border-rose-100 rounded-2xl p-6 shadow-xs relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-rose-100/10 rounded-full -mr-6 -mt-6 pointer-events-none" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-500 shrink-0">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-rose-950 leading-tight">Khoảng trống rủi ro (Cần cải thiện khẩn cấp)</h4>
                      <p className="text-[10px] text-rose-600 uppercase font-mono tracking-wider font-semibold">Critical Gaps</p>
                    </div>
                  </div>
                  <div className="bg-white border border-rose-100 rounded-xl p-4 space-y-3 shadow-2xs">
                    <div className="text-xs font-bold text-slate-850 flex items-center justify-between">
                      <span className="font-sans">{analysisData.lowest.name}</span>
                      <span className="text-[10px] font-extrabold px-2 py-0.5 bg-rose-50 text-rose-700 rounded border border-rose-100 font-mono">{analysisData.lowest.pct}% hoàn thiện</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-sans">{analysisData.lowest.advice.weaknessDesc}</p>
                    <div className="space-y-1.5 pt-2.5 border-t border-slate-100">
                      <span className="text-[10px] font-black text-rose-600 uppercase font-mono tracking-wider">Hành trình khắc phục rủi ro:</span>
                      {analysisData.lowest.advice.weaknessTips.map((tip, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed font-sans">
                          <span className="text-rose-500 font-bold shrink-0 mt-0.5">!</span>
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ROADMAP FOR HRM */}
              <div className="bg-white border border-slate-200 rounded-[20px] p-6 mb-8 text-left shadow-xs">
                <h4 className="text-sm font-extrabold text-slate-900 mb-5 flex items-center gap-2 font-sans">
                  <Map className="w-4 h-4 text-teal-600" /> Bản đồ số hóa quy trình và tổ chức nhân sự (SME HR Roadmap)
                </h4>
                <div className="relative border-l border-teal-500 pl-6 ml-3 space-y-6">
                  {analysisData.roadmap.map((step, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-teal-500 border-4 border-white shadow-sm flex items-center justify-center animate-pulse" />
                      <div className="text-[10px] font-extrabold text-teal-600 uppercase tracking-wider font-mono">{step.time}</div>
                      <h5 className="text-xs font-extrabold text-slate-900 mt-1 font-sans">{step.phase}</h5>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed font-sans">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-slate-50 border border-slate-200 rounded-[20px] p-6 text-center flex flex-col sm:flex-row items-center justify-between gap-4 mt-12">
                <div className="text-left">
                  <h4 className="font-bold text-slate-900 text-sm">Bạn cần tư vấn chi tiết hơn về lộ trình HRM số hóa?</h4>
                  <p className="text-xs text-slate-500">Chuyên gia Base.vn hỗ trợ tư vấn khảo sát cụm doanh nghiệp hoàn toàn miễn phí.</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button 
                    onClick={handleRestart}
                    className="flex-1 sm:flex-initial bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold px-4 py-2.5 rounded-lg transition-all cursor-pointer font-sans"
                  >
                    Làm lại khảo sát
                  </button>
                  <button 
                    onClick={() => window.open('https://base.vn/dang-ky-demo?utm_source=base-survey-hr', '_blank', 'noopener,noreferrer')}
                    className="flex-1 sm:flex-initial bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-all shadow-md cursor-pointer hover:opacity-90 border-none font-sans"
                  >
                    Tư vấn giải pháp
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
