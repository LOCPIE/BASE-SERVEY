import React, { useState, useMemo, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Search, 
  Filter, 
  Copy, 
  Check, 
  Bookmark, 
  BookmarkCheck,
  Sparkles, 
  Building2, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Briefcase, 
  Cpu, 
  Headphones, 
  ShoppingCart, 
  ChevronRight, 
  ChevronDown,
  X, 
  SlidersHorizontal,
  Zap,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Layers,
  Wrench,
  HelpCircle,
  Code2,
  FileText,
  Share2
} from 'lucide-react';
import { PromptItem, PROMPTS_DATABASE } from '../data/promptsData';

interface PromptLibraryProps {
  onNavigate: (path: string) => void;
}

// Departments List
const DEPARTMENTS = [
  { id: 'all', name: 'Tất cả phòng ban', icon: Layers },
  { id: 'ceo', name: 'Ban Giám đốc & CEO', icon: Building2 },
  { id: 'hr', name: 'HR & Nhân sự', icon: Users },
  { id: 'marketing', name: 'Marketing & Branding', icon: Sparkles },
  { id: 'sales', name: 'Sales & Kinh doanh', icon: TrendingUp },
  { id: 'finance', name: 'Tài chính & Kế toán', icon: DollarSign },
  { id: 'operations', name: 'Vận hành & Sản xuất', icon: Briefcase },
  { id: 'it', name: 'IT & Chuyển đổi số', icon: Cpu },
  { id: 'cs', name: 'Chăm sóc Khách hàng', icon: Headphones },
];

// Industries List
const INDUSTRIES = [
  'Tất cả ngành nghề',
  'Bán lẻ & E-commerce',
  'Bất động sản & Xây dựng',
  'Công nghệ & SaaS',
  'Sản xuất & Chế biến',
  'F&B & Chuỗi Nhà hàng',
  'Dịch vụ & Agency',
  'Tài chính & Ngân hàng',
  'Y tế & Dược phẩm'
];

// Prompts loaded from src/data/promptsData.ts
/*
const _UNUSED_OLD_DB: PromptItem[] = [
  // BAN GIÁM ĐỐC & CEO
  {
    id: 'ceo-swot-dx',
    title: 'Phân tích SWOT & Chiến lược Chuyển đổi số cho CEO',
    department: 'Ban Giám đốc & CEO',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o / Claude 3.5 Sonnet',
    difficulty: 'Nâng cao',
    tags: ['Chiến lược', 'SWOT', 'Digital Transformation', 'CEO'],
    description: 'Xây dựng ma trận SWOT sắc bén và đề xuất 3 sáng kiến chuyển đổi số ưu tiên hàng đầu với tính toán ROI sơ bộ.',
    prompt: `Tôi là CEO của doanh nghiệp [Tên doanh nghiệp] hoạt động trong ngành [Tên ngành nghề] với quy mô [Số lượng nhân sự] nhân sự và doanh thu trung bình [Doanh thu hàng năm].

Hãy đóng vai một Chuyên gia Tư vấn Chiến lược Quản trị & Chuyển đổi số cấp cao từ McKinsey/BCG.
Nhiệm vụ của bạn:
1. Phân tích ma trận SWOT (Điểm mạnh, Điểm yếu, Cơ hội, Thách thức) của doanh nghiệp trong bối cảnh ứng dụng Công nghệ & AI năm nay.
2. Đề xuất TOP 3 sáng kiến chuyển đổi số mang tính đột phá và khả thi nhất trong 6 - 12 tháng tới.
3. Với mỗi sáng kiến, hãy nêu rõ:
   - Mục tiêu chiến lược
   - Công nghệ/Công cụ gợi ý (Ví dụ: ERP, CRM, AI Agent, Automation)
   - Dự toán ROI & Thời gian hoàn vốn
   - 3 Rủi ro vận hành chính và cách giảm thiểu.

Trình bày theo cấu trúc báo cáo dành cho Hội đồng Quản trị: ngắn gọn, sắc bén, dựa trên số liệu và có tính hành động cao.`,
    placeholders: [
      { key: 'Tên doanh nghiệp', label: 'Tên doanh nghiệp', defaultValue: 'Công ty ABC' },
      { key: 'Tên ngành nghề', label: 'Ngành nghề kinh doanh', defaultValue: 'Bán lẻ thời trang' },
      { key: 'Số lượng nhân sự', label: 'Số nhân sự', defaultValue: '120' },
      { key: 'Doanh thu hàng năm', label: 'Doanh thu hàng năm', defaultValue: '80 tỷ VNĐ' }
    ]
  },
  {
    id: 'ceo-okr-cascade',
    title: 'Thiết lập & Phân rã Hệ thống OKRs Toàn doanh nghiệp',
    department: 'Ban Giám đốc & CEO',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o / Gemini 1.5 Pro',
    difficulty: 'Trung cấp',
    tags: ['OKRs', 'Quản trị Mục tiêu', 'KPI', 'CEO'],
    description: 'Xây dựng mục tiêu OKR quý từ cấp C-Level xuống các Trưởng phòng (Sales, Marketing, HR, Vận hành).',
    prompt: `Doanh nghiệp của tôi là [Tên doanh nghiệp] thuộc ngành [Ngành nghề]. Mục tiêu chiến lược hàng đầu trong Quý [Số Quý] của chúng tôi là: [Mục tiêu trọng tâm quý].

Hãy đóng vai chuyên gia Quản trị Mục tiêu OKRs.
Hãy giúp tôi xây dựng khung OKRs Quý [Số Quý] chi tiết gồm:
1. 1 Objective cấp Công ty (mang tính cảm hứng, định hướng rõ ràng) kèm 3-4 Key Results (đo lường bằng con số cụ thể).
2. Phân rã (Cascade) OKRs này thành OKRs cho 4 phòng ban cốt lõi:
   - Phòng Kinh doanh (Sales)
   - Phòng Marketing
   - Phòng Nhân sự (HR)
   - Phòng Vận hành & Công nghệ
3. Đề xuất bộ chỉ số đo lường tiến độ hàng tuần (Weekly Check-in metrics) để Ban Điều hành theo dõi sát sao.`,
    placeholders: [
      { key: 'Tên doanh nghiệp', label: 'Tên doanh nghiệp', defaultValue: 'Công ty Công nghệ XYZ' },
      { key: 'Ngành nghề', label: 'Ngành nghề', defaultValue: 'Phần mềm B2B' },
      { key: 'Số Quý', label: 'Quý thực hiện', defaultValue: 'Q3/2026' },
      { key: 'Mục tiêu trọng tâm quý', label: 'Mục tiêu trọng tâm', defaultValue: 'Tăng trưởng doanh thu 35% và giảm 20% chi phí vận hành' }
    ]
  },
  {
    id: 'ceo-risk-mitigation',
    title: 'Đánh giá Rủi ro Vận hành & Kế hoạch Khủng hoảng',
    department: 'Ban Giám đốc & CEO',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'Claude 3.5 Sonnet / DeepSeek R1',
    difficulty: 'Nâng cao',
    tags: ['Risk Management', 'Khủng hoảng', 'Vận hành'],
    description: 'Lập bản đồ rủi ro toàn diện và kịch bản ứng phó cho CEO khi thị trường biến động hoặc sự cố vận hành.',
    prompt: `Doanh nghiệp của tôi hoạt động trong lĩnh vực [Lĩnh vực kinh doanh]. Chúng tôi đang lo ngại các nhóm rủi ro: [Nhóm rủi ro lo ngại, ví dụ: biến động chuỗi cung ứng, suy giảm sức mua, chảy máu nhân sự cốt lõi].

Hãy đóng vai Giám đốc Quản trị Rủi ro (Chief Risk Officer).
1. Xây dựng Ma trận Rủi ro (Probability vs. Impact Matrix) cho 5 rủi ro lớn nhất của ngành [Lĩnh vực kinh doanh].
2. Lập kế hoạch ứng phó sự cố (Contingency Plan) chi tiết cho rủi ro: [Rủi ro ưu tiên xử lý].
3. Đề xuất quy trình truyền thông khủng hoảng nội bộ & bên ngoài trong 24 giờ đầu tiên xảy ra sự cố.`,
    placeholders: [
      { key: 'Lĩnh vực kinh doanh', label: 'Lĩnh vực kinh doanh', defaultValue: 'Chuỗi F&B 15 cửa hàng' },
      { key: 'Nhóm rủi ro lo ngại', label: 'Rủi ro lo ngại', defaultValue: 'An toàn thực phẩm, đứt gẫy nguồn cung nguyên liệu và chi phí mặt bằng tăng' },
      { key: 'Rủi ro ưu tiên xử lý', label: 'Rủi ro ưu tiên', defaultValue: 'Sự cố an toàn thực phẩm tại 1 chi nhánh' }
    ]
  },

  // HR & NHÂN SỰ
  {
    id: 'hr-sop-creation',
    title: 'Xây dựng Quy trình SOP Chuẩn hóa Phòng ban',
    department: 'HR & Nhân sự',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o / Gemini 1.5 Pro',
    difficulty: 'Trung cấp',
    tags: ['SOP', 'Quy trình', 'HR', 'Chuẩn hóa'],
    description: 'Tạo tài liệu Quy trình Thao tác Chuẩn (SOP) mạch lạc, có phân công RACI cho bất kỳ vị trí hoặc công việc nào.',
    prompt: `Tôi là Trưởng phòng Nhân sự / Vận hành tại [Tên công ty]. Chúng tôi cần xây dựng Quy trình Thao tác Chuẩn (SOP) cho công việc: [Tên công việc/quy trình].

Hãy đóng vai Chuyên gia Tối ưu Quy trình Doanh nghiệp (Process Excellence Specialist).
Hãy soạn thảo tài liệu SOP chuẩn mực theo cấu trúc:
1. Thông tin chung: Tên SOP, Mã số, Mục đích, Phạm vi áp dụng, Người chịu trách nhiệm chính.
2. Đầu vào (Inputs) & Đầu ra (Outputs) bắt buộc.
3. Các bước thực hiện chi tiết (Step-by-step workflow) gồm:
   - Bước # | Tên bước | Hành động chi tiết | Tiêu chuẩn hoàn thành | Thời gian xử lý (SLA) | Phân công RACI (Responsible, Accountable, Consulted, Informed)
4. Danh mục mẫu biểu/File đính kèm cần sử dụng.
5. Các lỗi thường gặp (Common Mistakes) & Bảng hướng dẫn khắc phục nhanh.`,
    placeholders: [
      { key: 'Tên công ty', label: 'Tên công ty', defaultValue: 'Tập đoàn Logistics Vina' },
      { key: 'Tên công việc/quy trình', label: 'Tên quy trình', defaultValue: 'Quy trình Tiếp nhận & Onboarding Nhân sự Mới' }
    ]
  },
  {
    id: 'hr-turnover-retention',
    title: 'Chiến dịch Giảm Tỷ lệ Giảm Mới & Giữ chân Nhân tài',
    department: 'HR & Nhân sự',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'Claude 3.5 Sonnet / ChatGPT 4o',
    difficulty: 'Nâng cao',
    tags: ['Retention', 'Tuyển dụng', 'HR Analytics', 'Văn hóa doanh nghiệp'],
    description: 'Phân tích nguyên nhân nhân sự nghỉ việc và lập chiến lược giữ chân nhân sự cốt lõi trong 90 ngày.',
    prompt: `Công ty chúng tôi thuộc ngành [Ngành nghề]. Tỷ lệ nghỉ việc (Turnover rate) hiện tại là [Tỷ lệ %] / năm, tập trung chủ yếu ở bộ phận [Bộ phận bị ảnh hưởng nhiều nhất] và nhóm nhân sự có thâm niên [Số năm thâm niên].

Hãy đóng vai Giám đốc Nhân sự (CHRO).
1. Phân tích 5 nguyên nhân gốc rễ (Root Causes) phổ biến dẫn đến tình trạng này trong ngành [Ngành nghề].
2. Xây dựng Khung giải pháp giữ chân nhân tài (Talent Retention Framework) gồm 3 trụ cột:
   - Lương thưởng & Phúc lợi (Total Rewards)
   - Lộ trình phát triển & Đào tạo (Career Path)
   - Trải nghiệm nhân viên & Văn hóa làm việc (Employee Experience)
3. Soạn thảo kịch bản Phỏng vấn Thôi việc (Exit Interview Script) với 6 câu hỏi đào sâu nguyên nhân thực sự mà nhân viên thường giấu.`,
    placeholders: [
      { key: 'Ngành nghề', label: 'Ngành nghề', defaultValue: 'Bất động sản' },
      { key: 'Tỷ lệ %', label: 'Tỷ lệ nghỉ việc %', defaultValue: '28%' },
      { key: 'Bộ phận bị ảnh hưởng nhiều nhất', label: 'Bộ phận ảnh hưởng', defaultValue: 'Khối Kinh doanh & Chăm sóc khách hàng' },
      { key: 'Số năm thâm niên', label: 'Thâm niên', defaultValue: '6 tháng đến 2 năm' }
    ]
  },
  {
    id: 'hr-kpi-dictionary',
    title: 'Bộ Từ điển KPI & Đo lường Hiệu suất Vị trí',
    department: 'HR & Nhân sự',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Cơ bản',
    tags: ['KPI', 'Performance Review', 'HR', 'Đánh giá'],
    description: 'Thiết lập bộ chỉ số KPI chuẩn xác, đo lường được cho từng vị trí công việc cụ thể.',
    prompt: `Hãy đóng vai Chuyên gia Quản trị Hiệu suất (Performance Management Expert).
Tôi cần xây dựng Bảng KPI cho vị trí: [Vị trí công việc] thuộc phòng [Tên phòng ban] trong công ty ngành [Ngành nghề].

Yêu cầu output:
Tạo bảng chuẩn gồm 5-7 chỉ số KPI đáp ứng nguyên tắc SMART:
- Tên chỉ số KPI
- Trọng số (%)
- Công thức tính / Phương pháp đo lường
- Tần suất đo lường (Tuần/Tháng/Quý)
- Mức độ kỳ vọng (Tối thiểu - Đạt - Vượt kỳ vọng)
- Đơn vị tính (VNĐ, %, Giờ, Lượt, v.v.)`,
    placeholders: [
      { key: 'Vị trí công việc', label: 'Vị trí công việc', defaultValue: 'Trưởng nhóm Marketing Performance' },
      { key: 'Tên phòng ban', label: 'Phòng ban', defaultValue: 'Phòng Marketing' },
      { key: 'Ngành nghề', label: 'Ngành nghề', defaultValue: 'Thương mại điện tử' }
    ]
  },

  // MARKETING & BRANDING
  {
    id: 'mkt-content-calendar',
    title: 'Lập Kế hoạch Content Marketing Đa kênh 30 Ngày',
    department: 'Marketing & Branding',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o / Claude 3.5 Sonnet',
    difficulty: 'Trung cấp',
    tags: ['Content', 'Social Media', 'Marketing Plan', 'SEO'],
    description: 'Lập ma trận nội dung 30 ngày chuẩn định hướng TOFU-MOFU-BOFU chuyển đổi cao cho mạng xã hội và Website.',
    prompt: `Tôi là Marketing Manager cho sản phẩm/dịch vụ: [Tên sản phẩm/dịch vụ] thuộc ngành [Ngành nghề].
Khách hàng mục tiêu là: [Chân dung khách hàng mục tiêu].
Mục tiêu chiến dịch tháng tới: [Mục tiêu chiến dịch, ví dụ: Tăng nhận diện thương hiệu & thu hút 200 Lead chất lượng].

Hãy đóng vai Content Strategist hàng đầu.
Lập Kế hoạch Content 30 ngày đa kênh (Facebook, LinkedIn, TikTok, Website) theo phễu tiếp thị:
1. TOFU (Awareness - 40%): Bài viết giáo dục, giải trí, chia sẻ insight thị trường.
2. MOFU (Consideration - 40%): Bài so sánh, case study khách hàng thành công, giải đáp thắc mắc.
3. BOFU (Conversion - 20%): Bài kêu gọi dùng thử, ưu đãi giới hạn, testimonial.

Mỗi bài đăng gồm: Ngày đăng, Kênh, Loại định dạng (Infographic/Video ngắn/Bài viết dài), Tiêu đề Hook thu hút, Tóm tắt ý chính và Call to Action (CTA).`,
    placeholders: [
      { key: 'Tên sản phẩm/dịch vụ', label: 'Sản phẩm/Dịch vụ', defaultValue: 'Phần mềm Quản lý Nhân sự SaaS' },
      { key: 'Ngành nghề', label: 'Ngành nghề', defaultValue: 'B2B Software' },
      { key: 'Chân dung khách hàng mục tiêu', label: 'Khách hàng mục tiêu', defaultValue: 'Chủ doanh nghiệp SME & Giám đốc Nhân sự (CHRO)' },
      { key: 'Mục tiêu chiến dịch', label: 'Mục tiêu chiến dịch', defaultValue: 'Thu hút 150 Dùng thử đăng ký tư vấn demo' }
    ]
  },
  {
    id: 'mkt-positioning-messaging',
    title: 'Xây dựng Định vị Thương hiệu & Khẩu hiệu (Messaging House)',
    department: 'Marketing & Branding',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'Claude 3.5 Sonnet',
    difficulty: 'Nâng cao',
    tags: ['Branding', 'Positioning', 'Messaging', 'Copywriting'],
    description: 'Thiết kế Ngôi nhà Thông điệp (Messaging House) gồm USP, Value Proposition, Slogan và Tone of Voice.',
    prompt: `Thương hiệu của tôi là [Tên thương hiệu] cung cấp [Sản phẩm/Dịch vụ] cho đối tượng [Khách hàng mục tiêu].
Đối thủ cạnh tranh chính là: [Tên đối thủ/Lĩnh vực đối thủ]. Điểm khác biệt cốt lõi của chúng tôi là: [Điểm mạnh độc bản].

Hãy đóng vai Giám đốc Sáng tạo & Branding (Creative Director).
Xây dựng tài liệu Khung Thông điệp Thương hiệu (Messaging House) gồm:
1. Slogan ấn tượng (Đề xuất 5 phương án khác nhau: cảm xúc, hành động, hiện đại, tối giản).
2. Tuyên ngôn Giá trị (Value Proposition) trong 2 câu.
3. 3 Trụ cột Thông điệp (Core Message Pillars) kèm các bằng chứng chứng minh (Proof points).
4. Định hình Giọng văn Thương hiệu (Brand Tone of Voice) với quy tắc NÊN vs KHÔNG NÊN trong truyền thông.`,
    placeholders: [
      { key: 'Tên thương hiệu', label: 'Tên thương hiệu', defaultValue: 'CleanHome AI' },
      { key: 'Sản phẩm/Dịch vụ', label: 'Sản phẩm/Dịch vụ', defaultValue: 'Dịch vụ giúp việc theo giờ ứng dụng công nghệ' },
      { key: 'Khách hàng mục tiêu', label: 'Khách hàng mục tiêu', defaultValue: 'Gia đình trẻ bận rộn tại các đô thị lớn' },
      { key: 'Tên đối thủ/Lĩnh vực đối thủ', label: 'Đối thủ', defaultValue: 'Các ứng dụng đặt lịch truyền thống' },
      { key: 'Điểm mạnh độc bản', label: 'Điểm khác biệt (USP)', defaultValue: 'Nhân sự được xác thực lý lịch AI & cam kết hoàn tiền 100% nếu không hài lòng' }
    ]
  },

  // SALES & KINH DOANH
  {
    id: 'sales-objection-handling',
    title: 'Kịch bản Xử lý Từ chối Bán hàng (Objection Handling Guide)',
    department: 'Sales & Kinh doanh',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Trung cấp',
    tags: ['Sales Script', 'Từ chối', 'Bán hàng B2B', 'Closing'],
    description: 'Bộ kịch bản phản bác thông minh khi khách hàng chê giá cao, đòi suy nghĩ thêm hoặc so sánh với đối thủ.',
    prompt: `Tôi là Trưởng phòng Kinh doanh B2B/B2C cho sản phẩm [Sản phẩm/Dịch vụ].
Giá bán sản phẩm của chúng tôi là [Giá bán] VNĐ.

Khách hàng thường đưa ra 4 lý do từ chối sau:
1. "Giá bên em cao quá, bên đối thủ rẻ hơn 30%."
2. "Để anh/chị về suy nghĩ thêm / hỏi ý kiến Sếp."
3. "Hiện tại bên anh chưa có nhu cầu / đang dùng bên khác rất tốt."
4. "Gửi email báo giá qua để anh xem sau nhé."

Hãy đóng vai Vua Bán Hàng (Sales Master Trainer).
Hãy lập Bảng Kịch bản Xử lý Từ chối theo công thức L.A.S.E.R (Listen - Acknowledge - Shorten - Explore - Respond):
Mỗi lời từ chối cung cấp:
- 2 Câu hỏi đào sâu tâm lý thật của khách
- Kịch bản trả lời mẫu từng từ từng chữ (Word-by-word script)
- Kỹ thuật chốt hạ (Closing technique) ngay lập tức.`,
    placeholders: [
      { key: 'Sản phẩm/Dịch vụ', label: 'Sản phẩm/Dịch vụ', defaultValue: 'Gói giải pháp phần mềm Quản lý Kho thông minh' },
      { key: 'Giá bán', label: 'Giá bán', defaultValue: '45.000.000' }
    ]
  },
  {
    id: 'sales-b2b-proposal',
    title: 'Soạn thảo Đề xuất Bán hàng B2B (Sales Proposal) Chuyên nghiệp',
    department: 'Sales & Kinh doanh',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'Claude 3.5 Sonnet / Gemini 1.5 Pro',
    difficulty: 'Nâng cao',
    tags: ['Proposal', 'B2B', 'Sales', 'Tư vấn'],
    description: 'Tạo tài liệu đề xuất giải pháp B2B hấp dẫn, đánh trúng nỗi đau khách hàng và tối ưu tỷ lệ chốt hợp đồng.',
    prompt: `Tôi chuẩn bị gửi Báo giá & Đề xuất Giải pháp (Sales Proposal) cho khách hàng doanh nghiệp: [Tên khách hàng/Ngành khách hàng].
Nỗi đau lớn nhất của họ là: [Nỗi đau của khách hàng].
Giải pháp chúng tôi đề xuất là: [Tên gói giải pháp] với chi phí [Ngân sách dự kiến].

Hãy đóng vai Giám đốc Tư vấn Bán hàng B2B.
Hãy viết khung Đề xuất Dự án B2B gồm 6 phần:
1. Tóm tắt Quản trị (Executive Summary) ngắn gọn trong 1 trang.
2. Thấu hiểu Vấn đề & Thách thức hiện tại của khách hàng.
3. Phạm vi Giải pháp & Lộ trình Triển khai từng mốc (Milestones).
4. Cam kết Chỉ số Hiệu quả (KPIs & Commitments).
5. Bảng Giá & Phương thức Thanh toán tối ưu tâm lý.
6. Lý do Chọn Chúng Tôi (Why Us & Case Studies tương tự).`,
    placeholders: [
      { key: 'Tên khách hàng/Ngành khách hàng', label: 'Tên/Ngành khách hàng', defaultValue: 'Chuỗi siêu thị Bán lẻ 30 chi nhánh' },
      { key: 'Nỗi đau của khách hàng', label: 'Nỗi đau chính', defaultValue: 'Thất thoát hàng hóa kho 3%/năm và tốc độ kiểm kho chậm' },
      { key: 'Tên gói giải pháp', label: 'Gói giải pháp', defaultValue: 'Hệ thống Quản lý Kho Barcode & AI Kiểm kê' },
      { key: 'Ngân sách dự kiến', label: 'Ngân sách', defaultValue: '250.000.000 VNĐ' }
    ]
  },

  // TÀI CHÍNH & KẾ TOÁN
  {
    id: 'fin-cashflow-forecast',
    title: 'Lập Mô hình Dự báo Dòng tiền & Tối ưu Chi phí',
    department: 'Tài chính & Kế toán',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o / Claude 3.5 Sonnet',
    difficulty: 'Nâng cao',
    tags: ['Cashflow', 'Tài chính', 'Budget', 'Cost Optimization'],
    description: 'Mô phỏng dòng tiền vào - ra trong 6 tháng và tìm điểm hòa vốn cũng như phương án cắt giảm 15% chi phí lãng phí.',
    prompt: `Tôi là Giám đốc Tài chính (CFO) của công ty [Tên công ty] ngành [Ngành nghề].
Doanh thu dự kiến trung bình mỗi tháng là [Doanh thu/tháng].
Chi phí cố định (Định phí) hàng tháng: [Chi phí cố định] (Lương, mặt bằng, điện nước).
Chi phí biến đổi (Biến phí): [Chi phí biến đổi %] trên doanh thu.

Hãy đóng vai Chuyên gia Quản trị Tài chính Doanh nghiệp.
1. Tính Điểm Hòa Vốn (Break-even Point) theo doanh thu và sản lượng.
2. Thiết lập Bảng Kế hoạch Dự báo Dòng tiền (Cashflow Forecast) 6 tháng với 3 kịch bản: Cơ sở (Base), Tích cực (Bull), Tiêu cực (Bear).
3. Đề xuất 5 vị trí chi phí thường bị lãng phí ẩn (Hidden Operational Waste) trong ngành [Ngành nghề] và hành động cắt giảm 15% ngay tháng này mà không ảnh hưởng chất lượng.`,
    placeholders: [
      { key: 'Tên công ty', label: 'Tên công ty', defaultValue: 'Công ty Sản xuất Nhựa An Phát' },
      { key: 'Ngành nghề', label: 'Ngành nghề', defaultValue: 'Sản xuất công nghiệp' },
      { key: 'Doanh thu/tháng', label: 'Doanh thu/tháng', defaultValue: '3.5 tỷ VNĐ' },
      { key: 'Chi phí cố định', label: 'Định phí/tháng', defaultValue: '1.2 tỷ VNĐ' },
      { key: 'Chi phí biến đổi %', label: 'Biến phí %', defaultValue: '55%' }
    ]
  },

  // VẬN HÀNH & SẢN XUẤT
  {
    id: 'ops-kaizen-lean',
    title: 'Ứng dụng Lean / 5S Tối ưu Năng suất Vận hành',
    department: 'Vận hành & Sản xuất',
    industry: 'Sản xuất & Chế biến',
    recommendedModel: 'ChatGPT 4o / Gemini 1.5 Pro',
    difficulty: 'Trung cấp',
    tags: ['Lean', '5S', 'Vận hành', 'Sản xuất', 'Tối ưu'],
    description: 'Chiến dịch cải tiến liên tục Kaizen và áp dụng 5S triệt tiêu thời gian lãng phí trong nhà xưởng / kho vận.',
    prompt: `Tôi quản lý bộ phận Vận hành/Sản xuất tại [Tên xưởng/kho/nhà máy].
Vấn đề lãng phí lớn nhất hiện nay là: [Mô tả vấn đề lãng phí, ví dụ: thời gian tìm kiếm công cụ, tồn kho cao, thời gian chờ đợi].

Hãy đóng vai Chuyên gia Tư vấn Lean Six Sigma.
1. Phân tích 8 loại Lãng phí (8 Wastes / TIMWOODS) áp dụng trực tiếp cho thực trạng trên.
2. Xây dựng Kế hoạch Triển khai 5S (Seiri - Seiton - Seiso - Seiketsu - Shitsuke) trong 30 ngày cho khu vực làm việc.
3. Thiết lập Bảng kiểm theo dõi (5S Audit Checklist) tiêu chuẩn cho Quản đốc / Giám sát.`,
    placeholders: [
      { key: 'Tên xưởng/kho/nhà máy', label: 'Tên xưởng/kho', defaultValue: 'Kho Trung tâm Thương mại Điện tử Bình Dương' },
      { key: 'Mô tả vấn đề lãng phí', label: 'Vấn đề lãng phí', defaultValue: 'Nhân viên tốn 20 phút mỗi ca để tìm dụng cụ đóng gói và tỷ lệ sai sót đơn hàng 2.5%' }
    ]
  },

  // IT & CHUYỂN ĐỔI SỐ
  {
    id: 'it-ai-tool-eval',
    title: 'Đánh giá & Lựa chọn Phần mềm/Công cụ Chuyển đổi số',
    department: 'IT & Chuyển đổi số',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o / DeepSeek R1',
    difficulty: 'Trung cấp',
    tags: ['IT', 'Software Evaluation', 'Chuyển đổi số', 'ERP/CRM'],
    description: 'Xây dựng tiêu chí so sánh, lựa chọn các giải pháp phần mềm (ERP, CRM, HRM, AI tools) tối ưu chi phí cho doanh nghiệp.',
    prompt: `Doanh nghiệp chúng tôi đang tìm kiếm giải pháp phần mềm: [Loại phần mềm, ví dụ: CRM quản lý khách hàng B2B].
Ngân sách dự kiến: [Ngân sách].
Các yêu cầu tính năng bắt buộc: [Danh sách tính năng cần có].

Hãy đóng vai Giám đốc Công nghệ (CTO).
1. Lập Ma trận So sánh 3-4 giải pháp phần mềm hàng đầu trên thị trường (bao gồm cả giải pháp Việt Nam và Quốc tế).
2. So sánh theo các tiêu chí: Tính năng cốt lõi, Khả năng mở rộng (Scalability), Tích hợp API, Độ an toàn bảo mật, Chi phí triển khai & duy trì, Trải nghiệm người dùng (UX).
3. Đề xuất Ma trận Rủi ro khi triển khai tích hợp dữ liệu cũ sang hệ thống mới và checklist kiểm thử (UAT Checklist).`,
    placeholders: [
      { key: 'Loại phần mềm', label: 'Loại phần mềm', defaultValue: 'Hệ thống HRM Quản lý Chấm công & Lương' },
      { key: 'Ngân sách', label: 'Ngân sách', defaultValue: '100 - 150 triệu VNĐ/năm' },
      { key: 'Danh sách tính năng cần có', label: 'Tính năng bắt buộc', defaultValue: 'Chấm công khuôn mặt AI, tính lương tự động đa ca, cổng App mobile cho nhân viên' }
    ]
  },

  // CHĂM SÓC KHÁCH HÀNG
  {
    id: 'cs-complaint-handling',
    title: 'Kịch bản Xử lý Khiếu nại Khách hàng Hỏa tốc (HEAR Framework)',
    department: 'Chăm sóc Khách hàng',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o / Claude 3.5 Sonnet',
    difficulty: 'Cơ bản',
    tags: ['Customer Care', 'Khiếu nại', 'CSKH', 'Script'],
    description: 'Xoa dịu khách hàng tức giận, giải quyết sự cố dịch vụ chuyên nghiệp và biến khách hàng bức xúc thành khách hàng trung thành.',
    prompt: `Tôi là Quản lý Chăm sóc Khách hàng tại công ty [Tên công ty] ngành [Ngành nghề].
Khách hàng vừa gặp sự cố nghiêm trọng: [Mô tả sự cố của khách hàng].
Khách hàng đang vô cùng tức giận và đe dọa bóc phốt lên mạng xã hội.

Hãy đóng vai Chuyên gia Trải nghiệm Khách hàng (Customer Experience Director).
Xây dựng Kịch bản Xử lý Khiếu nại theo mô hình HEAR (Hear - Empathize - Apologize - Resolve):
1. Kịch bản phản hồi trực tiếp qua Điện thoại / Chat trong 5 phút đầu tiên.
2. Mẫu Thư Xin Lỗi (Apology Email) chính thức từ cấp Quản lý gửi khách hàng.
3. Đề xuất 3 phương án đền bù thỏa đáng (Voucher, Đổi mới, Quà tặng đặc biệt) để biến rủi ro thành cơ hội tăng điểm NPS.`,
    placeholders: [
      { key: 'Tên công ty', label: 'Tên công ty', defaultValue: 'Thương hiệu Thời trang Neva' },
      { key: 'Ngành nghề', label: 'Ngành nghề', defaultValue: 'Bán lẻ Thời trang Online' },
      { key: 'Mô tả sự cố của khách hàng', label: 'Mô tả sự cố', defaultValue: 'Giao lầm size áo dự tiệc quan trọng sát giờ đi sự kiện và thái độ shipper hách dịch' }
    ]
  },

  // NGÀNH BÁN LẺ & E-COMMERCE
  {
    id: 'retail-livestream-script',
    title: 'Kịch bản Bán hàng Livestream & Video Ngắn Chuyển đổi Cao',
    department: 'Sales & Kinh doanh',
    industry: 'Bán lẻ & E-commerce',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Trung cấp',
    tags: ['Livestream', 'E-commerce', 'Shopee', 'TikTok Shop'],
    description: 'Thiết kế cấu trúc buổi Livestream 2 tiếng bùng nổ đơn hàng cho shop online & thương hiệu bán lẻ.',
    prompt: `Tôi chuẩn bị Livestream bán sản phẩm: [Tên sản phẩm] trên nền tảng [TikTok Shop / Shopee / Facebook].
Chương trình ưu đãi chính: [Chương trình khuyến mãi].

Hãy đóng vai đạo diễn Livestream triệu đơn.
Hãy lập kịch bản chi tiết cho phiên Live 90 phút:
1. 10 phút đầu: Mở màn kéo mắt xem (Hook, Giveaway mini game, tạo không khí khẩn trương).
2. 30 phút giữa: Giới thiệu 3 Deal chủ lực (Dùng thử, giải thích USP, tạo hiệu ứng đám đông FOMO).
3. 30 phút tiếp theo: Đẩy Deal Flash Sale giới hạn 5 phút.
4. 20 phút cuối: Chốt đơn dồn dập, cảm ơn và hẹn phiên tiếp theo.
Kèm các câu nói cửa miệng "Call to Action" thúc đẩy bấm mua ngay lập tức.`,
    placeholders: [
      { key: 'Tên sản phẩm', label: 'Sản phẩm', defaultValue: 'Bộ Mỹ phẩm Dưỡng da Thiên nhiên' },
      { key: 'TikTok Shop / Shopee / Facebook', label: 'Nền tảng', defaultValue: 'TikTok Shop' },
      { key: 'Chương trình khuyến mãi', label: 'Ưu đãi chính', defaultValue: 'Mua 1 tặng 1 + Freeship toàn quốc trong 30 phút vàng' }
    ]
  },

  // NGÀNH BẤT ĐỘNG SẢN
  {
    id: 'bds-telesales-script',
    title: 'Kịch bản Telesales Bất động sản Cao cấp & Biệt thự',
    department: 'Sales & Kinh doanh',
    industry: 'Bất động sản & Xây dựng',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Cơ bản',
    tags: ['Bất động sản', 'Telesales', 'Cold Call', 'Sales Script'],
    description: 'Kịch bản gọi điện tiếp cận nhà đầu tư BĐS mà không bị cúp máy trong 10 giây đầu tiên.',
    prompt: `Tôi là môi giới Bất động sản đang bán dự án: [Tên dự án BĐS] tại khu vực [Khu vực/Thành phố].
Giá bán từ: [Khoảng giá].
Đối tượng khách hàng gọi điện: [Chân dung khách hàng, ví dụ: Nhà đầu tư có tiền gửi tiết kiệm hoặc tìm tài sản tích trữ].

Hãy đóng vai Chuyên gia Đào tạo Sales BĐS top 1%.
Viết Kịch bản Gọi điện lạnh (Cold Calling Script) 30 giây ấn tượng:
1. Mở đầu nhẹ nhàng, không gây cảm giác chèo kéo.
2. Trao ngay 1 thông tin giá trị độc quyền về quy hoạch/tiềm năng tăng giá.
3. Câu hỏi mở để đo lường mức độ quan tâm của nhà đầu tư.
4. Kịch bản vượt qua rào cản "Anh bận lắm, gửi Zalo đi" cực kỳ khéo léo.`,
    placeholders: [
      { key: 'Tên dự án BĐS', label: 'Tên dự án', defaultValue: 'Khu đô thị Sinh thái Grand River' },
      { key: 'Khu vực/Thành phố', label: 'Vị trí', defaultValue: 'Long Thành, Đồng Nai' },
      { key: 'Khoảng giá', label: 'Khoảng giá', defaultValue: '4.5 - 7 tỷ VNĐ / căn nhà phố' },
      { key: 'Chân dung khách hàng', label: 'Chân dung khách', defaultValue: 'Nhà đầu tư cá nhân có tài chính nhàn rỗi từ 3 tỷ trở lên' }
    ]
  }
];
*/

export default function PromptLibrary({ onNavigate }: PromptLibraryProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('Tất cả ngành nghề');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('prompt_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activePromptModal, setActivePromptModal] = useState<PromptItem | null>(null);
  const [customValues, setCustomValues] = useState<Record<string, string>>({});
  const [copiedStatus, setCopiedStatus] = useState<boolean>(false);
  const [copiedCardId, setCopiedCardId] = useState<string | null>(null);

  const [visibleCount, setVisibleCount] = useState<number>(15);

  // Set document title
  useEffect(() => {
    document.title = "Prompt Library - Thư viện Prompt cho doanh nghiệp";
  }, []);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(15);
  }, [selectedDepartment, selectedIndustry, searchQuery]);

  // Calculate prompt counts per department
  const deptCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: 0,
      ceo: 0,
      hr: 0,
      marketing: 0,
      sales: 0,
      finance: 0,
      operations: 0,
      it: 0,
      cs: 0,
    };

    PROMPTS_DATABASE.forEach(item => {
      const indMatch = selectedIndustry === 'Tất cả ngành nghề' || 
        item.industry === 'Tất cả ngành nghề' || 
        item.industry === selectedIndustry;

      if (!indMatch) return;

      counts.all++;
      if (item.department.includes('CEO')) counts.ceo++;
      if (item.department.includes('HR')) counts.hr++;
      if (item.department.includes('Marketing')) counts.marketing++;
      if (item.department.includes('Sales')) counts.sales++;
      if (item.department.includes('Tài chính')) counts.finance++;
      if (item.department.includes('Vận hành')) counts.operations++;
      if (item.department.includes('IT')) counts.it++;
      if (item.department.includes('Chăm sóc')) counts.cs++;
    });

    return counts;
  }, [selectedIndustry]);

  // Filter prompts
  const filteredPrompts = useMemo(() => {
    return PROMPTS_DATABASE.filter(item => {
      // Dept match
      const deptMatch = selectedDepartment === 'all' || 
        (selectedDepartment === 'ceo' && item.department.includes('CEO')) ||
        (selectedDepartment === 'hr' && item.department.includes('HR')) ||
        (selectedDepartment === 'marketing' && item.department.includes('Marketing')) ||
        (selectedDepartment === 'sales' && item.department.includes('Sales')) ||
        (selectedDepartment === 'finance' && item.department.includes('Tài chính')) ||
        (selectedDepartment === 'operations' && item.department.includes('Vận hành')) ||
        (selectedDepartment === 'it' && item.department.includes('IT')) ||
        (selectedDepartment === 'cs' && item.department.includes('Chăm sóc'));

      // Industry match
      const indMatch = selectedIndustry === 'Tất cả ngành nghề' || 
        item.industry === 'Tất cả ngành nghề' || 
        item.industry === selectedIndustry;

      // Query match
      const queryMatch = !searchQuery || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.department.toLowerCase().includes(searchQuery.toLowerCase());

      return deptMatch && indMatch && queryMatch;
    });
  }, [selectedDepartment, selectedIndustry, searchQuery]);

  const displayedPrompts = useMemo(() => {
    return filteredPrompts.slice(0, visibleCount);
  }, [filteredPrompts, visibleCount]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated: string[];
    if (favorites.includes(id)) {
      updated = favorites.filter(favId => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    try {
      localStorage.setItem('prompt_favorites', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const openCustomizer = (prompt: PromptItem) => {
    setActivePromptModal(prompt);
    // Fill default values
    const initialValues: Record<string, string> = {};
    prompt.placeholders.forEach(p => {
      initialValues[p.key] = p.defaultValue;
    });
    setCustomValues(initialValues);
    setCopiedStatus(false);
  };

  // Generate customized prompt string
  const generatedPrompt = useMemo(() => {
    if (!activePromptModal) return '';
    let result = activePromptModal.prompt;
    Object.entries(customValues).forEach(([key, value]) => {
      result = result.replaceAll(`[${key}]`, value || `[${key}]`);
    });
    return result;
  }, [activePromptModal, customValues]);

  const copyToClipboard = (text: string, cardId?: string) => {
    navigator.clipboard.writeText(text);
    if (cardId) {
      setCopiedCardId(cardId);
      setTimeout(() => setCopiedCardId(null), 2000);
    } else {
      setCopiedStatus(true);
      setTimeout(() => setCopiedStatus(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col antialiased">
      {/* Header */}
      <Header onNavigate={onNavigate} activeRoute="/prompt-library" />

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold mb-4">
            <Bot className="w-4 h-4 text-indigo-400" />
            <span>Thư viện Prompt AI Quản trị Doanh nghiệp</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Kho Prompt Chuẩn Hóa Cho <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">CEO & Doanh nghiệp</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Hơn 50+ câu lệnh AI thực chiến được tối ưu sẵn cho các phòng ban & ngành nghề. Điền thông tin doanh nghiệp và sao chép câu lệnh áp dụng ngay vào ChatGPT, Gemini hoặc Claude.
          </p>

          {/* Search & Global Controls */}
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm prompt (ví dụ: SOP, SWOT, Tuyển dụng, Telesales, Cashflow...)"
                className="w-full bg-slate-800 text-white placeholder-slate-400 text-sm rounded-xl pl-10 pr-4 py-3 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Industry Selector Dropdown */}
            <div className="relative">
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full sm:w-auto appearance-none bg-slate-800 text-slate-200 text-sm font-medium rounded-xl px-4 py-3 pr-10 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
              >
                {INDUSTRIES.map((ind, i) => (
                  <option key={i} value={ind}>{ind}</option>
                ))}
              </select>
              <SlidersHorizontal className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* Department Nav Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-slate-200 scrollbar-none overflow-x-auto">
          {DEPARTMENTS.map((dept) => {
            const Icon = dept.icon;
            const isActive = selectedDepartment === dept.id;
            const count = deptCounts[dept.id] ?? 0;
            return (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`group flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100 ring-2 ring-indigo-600/20'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-600'}`} />
                <span>{dept.name}</span>
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-full transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs text-slate-500 font-medium">
            Hiển thị <span className="font-bold text-slate-800">{filteredPrompts.length}</span> prompt mẫu chuẩn hóa
            {selectedIndustry !== 'Tất cả ngành nghề' && (
              <span className="ml-1 text-indigo-600 font-semibold">• Ngành: {selectedIndustry}</span>
            )}
          </div>

          {favorites.length > 0 && (
            <button
              onClick={() => {
                // Quick filter favorites or toggle view
                setSearchQuery(prev => prev === 'favorite:saved' ? '' : 'favorite:saved');
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>Đã lưu ({favorites.length})</span>
            </button>
          )}
        </div>

        {/* Grid of Prompt Cards */}
        {filteredPrompts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-md mx-auto my-8">
            <Bot className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-800 text-base mb-1">Không tìm thấy prompt phù hợp</h3>
            <p className="text-xs text-slate-500 mb-4">Thử thay đổi từ khóa tìm kiếm hoặc chọn phòng ban/ngành nghề khác.</p>
            <button
              onClick={() => {
                setSelectedDepartment('all');
                setSelectedIndustry('Tất cả ngành nghề');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 hover:bg-indigo-100 cursor-pointer"
            >
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedPrompts.map((item) => {
                const isFav = favorites.includes(item.id);
                const isCopied = copiedCardId === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => openCustomizer(item)}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 p-5 flex flex-col justify-between transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer group relative"
                  >
                    <div>
                      {/* Top Meta Tags */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-extrabold tracking-wider uppercase bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-md border border-indigo-100">
                          {item.department}
                        </span>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => toggleFavorite(item.id, e)}
                            title="Lưu prompt này"
                            className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                          >
                            {isFav ? (
                              <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-indigo-600 transition-colors leading-snug">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.tags.map((tag, idx) => (
                          <span key={idx} className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Stats & Actions */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                        {item.difficulty}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(item.prompt, item.id);
                          }}
                          className="p-2 text-slate-500 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 rounded-lg border border-slate-200 transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600">Đã copy</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy nhanh</span>
                            </>
                          )}
                        </button>

                        <span className="p-2 bg-indigo-600 text-white rounded-lg group-hover:bg-indigo-700 transition-colors">
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More Button */}
            {filteredPrompts.length > visibleCount && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setVisibleCount(prev => prev + 15)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-600 font-bold text-sm rounded-xl border border-indigo-200 shadow-sm hover:bg-indigo-50 hover:border-indigo-300 hover:shadow transition-all cursor-pointer group"
                >
                  <span>Xem thêm ({filteredPrompts.length - visibleCount} câu lệnh)</span>
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Interactive Customizer Modal */}
      <AnimatePresence>
        {activePromptModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-xl">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-extrabold uppercase bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">
                        {activePromptModal.department}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">• Mức độ: {activePromptModal.difficulty}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg leading-tight">{activePromptModal.title}</h3>
                  </div>
                </div>

                <button
                  onClick={() => setActivePromptModal(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Inputs Column */}
                <div className="lg:col-span-5 space-y-4 border-r border-slate-100 pr-0 lg:pr-6">
                  <div className="flex items-center gap-2 mb-2">
                    <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
                    <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                      1. Nhập thông tin doanh nghiệp
                    </h4>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">Điền vào các ô dưới đây để tự động thay thế biến trong câu lệnh prompt.</p>

                  {activePromptModal.placeholders.map((ph) => (
                    <div key={ph.key}>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {ph.label} <span className="text-slate-400 font-normal">[{ph.key}]</span>
                      </label>
                      <input
                        type="text"
                        value={customValues[ph.key] ?? ''}
                        onChange={(e) => setCustomValues({ ...customValues, [ph.key]: e.target.value })}
                        placeholder={ph.defaultValue}
                        className="w-full bg-slate-50 text-slate-800 text-xs rounded-xl px-3 py-2.5 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                      />
                    </div>
                  ))}

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-xs flex items-start gap-2 mt-4">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>Mẹo: Prompt hoàn chỉnh hơn sẽ giúp AI (ChatGPT/Gemini) đưa ra câu trả lời thực chiến và sát với thực tế doanh nghiệp hơn 80%.</span>
                  </div>
                </div>

                {/* Prompt Preview Column */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-indigo-600" />
                        <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                          2. Prompt Hoàn chỉnh (Xem trước)
                        </h4>
                      </div>

                      <button
                        onClick={() => copyToClipboard(generatedPrompt)}
                        className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3.5 py-1.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedStatus ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-300" />
                            <span>Đã sao chép!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Sao chép Prompt này</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs leading-relaxed max-h-[350px] overflow-y-auto border border-slate-800 select-all whitespace-pre-wrap">
                      {generatedPrompt}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Mở ChatGPT hoặc Gemini để dán ngay</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.open('https://chatgpt.com', '_blank')}
                        className="text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                      >
                        Mở ChatGPT <ExternalLink className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => window.open('https://gemini.google.com', '_blank')}
                        className="text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                      >
                        Mở Gemini <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
