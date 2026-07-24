export interface PromptItem {
  id: string;
  title: string;
  department: string;
  industry: string;
  recommendedModel: string;
  difficulty: 'Cơ bản' | 'Trung cấp' | 'Nâng cao';
  tags: string[];
  description: string;
  prompt: string;
  placeholders: { key: string; label: string; defaultValue: string }[];
}

export const PROMPTS_DATABASE: PromptItem[] = [
  // --- BAN GIÁM ĐỐC & CEO ---
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

Hãy đóng vai Giám đốc Chiến lược (CSO). Hãy thiết lập hệ thống OKR (Objective & Key Results) gồm:
1. OKR Cấp Doanh nghiệp (1 Objective + 3 Key Results đo lường bằng số liệu định lượng).
2. Phân rã OKR trên xuống các phòng ban:
   - Phòng Kinh doanh (Sales)
   - Phòng Marketing
   - Phòng HR & Nhân sự
   - Phòng Vận hành & IT
3. Đề xuất 2 chỉ số cảnh báo rủi ro (Key Risk Indicators) để theo dõi tiến độ tuần.`,
    placeholders: [
      { key: 'Tên doanh nghiệp', label: 'Tên doanh nghiệp', defaultValue: 'Tập đoàn Công nghệ XYZ' },
      { key: 'Ngành nghề', label: 'Ngành nghề', defaultValue: 'Phần mềm B2B' },
      { key: 'Số Quý', label: 'Quý thực hiện', defaultValue: 'Quý 3/2026' },
      { key: 'Mục tiêu trọng tâm quý', label: 'Mục tiêu trọng tâm', defaultValue: 'Tăng trưởng doanh thu 35% và mở rộng thêm thị trường miền Nam' }
    ]
  },
  {
    id: 'ceo-mna-due-diligence',
    title: 'Đánh giá & Rà soát Cơ hội Sáp nhập Doanh nghiệp (M&A Due Diligence)',
    department: 'Ban Giám đốc & CEO',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'Claude 3.5 Sonnet / ChatGPT 4o',
    difficulty: 'Nâng cao',
    tags: ['M&A', 'Due Diligence', 'Chiến lược', 'CEO'],
    description: 'Xây dựng khung thẩm định M&A toàn diện về Tài chính, Pháp lý, Vận hành và Văn hóa.',
    prompt: `Doanh nghiệp của tôi là [Tên công ty] đang cân nhắc mua lại/sáp nhập công ty [Công ty mục tiêu] trong ngành [Ngành nghề] với quy mô [Quy mô công ty mục tiêu].

Đóng vai Chuyên gia M&A cấp cao. Hãy lập checklist Thẩm định (Due Diligence Checklist) gồm 4 trụ cột:
1. Tài chính & Thuế: 5 chỉ số & rủi ro cần soi kỹ nhất.
2. Pháp lý & Sở hữu trí tuệ: Các điều khoản hợp đồng & tranh chấp tiềm ẩn.
3. Công nghệ & Vận hành: Khả năng tích hợp hệ thống CNTT & dây chuyền.
4. Văn hóa & Nhân sự: Rủi ro chảy máu nhân tài sau M&A và giải pháp giữ chân Key Personnel.`,
    placeholders: [
      { key: 'Tên công ty', label: 'Công ty mua', defaultValue: 'Tập đoàn Retail Pro' },
      { key: 'Công ty mục tiêu', label: 'Công ty mục tiêu', defaultValue: 'Chuỗi Cửa hàng FastMart' },
      { key: 'Ngành nghề', label: 'Ngành nghề', defaultValue: 'Bán lẻ & Tiện lợi' },
      { key: 'Quy mô công ty mục tiêu', label: 'Quy mô', defaultValue: '30 cửa hàng, 150 nhân sự' }
    ]
  },
  {
    id: 'ceo-crisis-communication',
    title: 'Lập Kế hoạch Truyền thông Khủng hoảng C-Level',
    department: 'Ban Giám đốc & CEO',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Nâng cao',
    tags: ['Crisis Management', 'Truyền thông', 'PR', 'CEO'],
    description: 'Soạn thảo thông cáo báo chí & kịch bản ứng phó khủng hoảng truyền thông khẩn cấp.',
    prompt: `Công ty chúng tôi [Tên công ty] vừa gặp sự cố truyền thông: [Mô tả sự cố]. Đối tượng bị ảnh hưởng: [Đối tượng bị ảnh hưởng].

Đóng vai Giám đốc Truyền thông Khủng hoảng (Crisis PR Director).
Hãy soạn thảo:
1. Thông cáo Báo chí chính thức từ CEO (ngắn gọn, thể hiện tinh thần trách nhiệm, cầu thị, không đổ lỗi).
2. Kịch bản trả lời phỏng vấn báo chí (Q&A) gồm 5 câu hỏi hóc húa nhất và câu trả lời chuẩn mực.
3. Thông điệp trấn an nội bộ gửi toàn thể nhân viên để ổn định tâm lý.
4. Lộ trình 3 bước khắc phục hậu quả trong 72 giờ đầu tiên.`,
    placeholders: [
      { key: 'Tên công ty', label: 'Tên công ty', defaultValue: 'Ứng dụng Viễn thông TechApp' },
      { key: 'Mô tả sự cố', label: 'Sự cố xảy ra', defaultValue: 'Gián đoạn dịch vụ thanh toán trực tuyến trong 4 tiếng do sự cố máy chủ' },
      { key: 'Đối tượng bị ảnh hưởng', label: 'Đối tượng ảnh hưởng', defaultValue: '50.000 người dùng cá nhân & 200 đối tác bán hàng' }
    ]
  },
  {
    id: 'ceo-expansion-strategy',
    title: 'Xây dựng Chiến lược Thâm nhập Thị trường Mới & Bán hàng Quốc tế',
    department: 'Ban Giám đốc & CEO',
    industry: 'Sản xuất & Chế biến',
    recommendedModel: 'Claude 3.5 Sonnet / Gemini 1.5 Pro',
    difficulty: 'Nâng cao',
    tags: ['Go-to-Market', 'Mở rộng thị trường', 'Xuất khẩu', 'CEO'],
    description: 'Lập chiến lược GTM (Go-to-Market) để đưa sản phẩm chủ lực mở rộng sang thị trường quốc tế.',
    prompt: `Chúng tôi là công ty [Tên công ty] chuyên sản xuất/cung cấp [Sản phẩm dịch vụ chủ lực]. Chúng tôi muốn mở rộng thị trường sang [Thị trường mục tiêu, ví dụ: Đông Nam Á / Mỹ / Nhật].

Hãy đóng vai Chuyên gia Tư vấn Mở rộng Thị trường Quốc tế.
Nhiệm vụ:
1. Phân tích rào cản pháp lý & văn hóa tiêu dùng tại [Thị trường mục tiêu].
2. Lựa chọn mô hình thâm nhập phù hợp nhất (Xuất khẩu trực tiếp, Đối tác phân phối địa phương, hay thành lập Chi nhánh).
3. Thiết lập Chiến lược Giá & Định vị Sản phẩm cạnh tranh với đối thủ bản địa.
4. Kế hoạch hành động 6 tháng đầu tiên phân theo từng mốc Quý.`,
    placeholders: [
      { key: 'Tên công ty', label: 'Tên công ty', defaultValue: 'Chế biến Thực phẩm Nông sản Việt' },
      { key: 'Sản phẩm dịch vụ chủ lực', label: 'Sản phẩm chủ lực', defaultValue: 'Trái cây sấy dẻo cao cấp' },
      { key: 'Thị trường mục tiêu', label: 'Thị trường mục tiêu', defaultValue: 'Nhật Bản & Hàn Quốc' }
    ]
  },
  {
    id: 'ceo-company-culture-code',
    title: 'Thiết kế Sổ tay Văn hóa Doanh nghiệp & Giá trị Cốt lõi',
    department: 'Ban Giám đốc & CEO',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Trung cấp',
    tags: ['Văn hóa doanh nghiệp', 'Core Values', 'CEO', 'Nhân sự'],
    description: 'Xây dựng bộ giá trị cốt lõi & hành vi ứng xử tiêu chuẩn áp dụng toàn công ty.',
    prompt: `Tên công ty: [Tên công ty]. Lĩnh vực: [Lĩnh vực].
Sứ mệnh của chúng tôi: [Sứ mệnh/Tầm nhìn].
Chúng tôi muốn xây dựng 5 Giá trị Cốt lõi (Core Values) đại diện cho tinh thần của đội ngũ.

Hãy đóng vai Chuyên gia Tái cấu trúc Văn hóa Doanh nghiệp.
Hãy thiết kế:
1. 5 Giá trị cốt lõi kèm tên gọi truyền cảm hứng và lời giải thích sắc bén 1-2 câu.
2. Với mỗi giá trị, hãy chỉ rõ 3 "Hành vi ĐƯỢC khuyến khích" và 3 "Hành vi CẤM/KHÔNG chấp nhận".
3. Đề xuất 3 phương thức đo lường & tích hợp văn hóa vào kỳ Đánh giá Hiệu suất công việc (Performance Review).`,
    placeholders: [
      { key: 'Tên công ty', label: 'Tên công ty', defaultValue: 'Công ty Logistics FastMove' },
      { key: 'Lĩnh vực', label: 'Lĩnh vực', defaultValue: 'Dịch vụ Vận tải & Kho vận' },
      { key: 'Sứ mệnh/Tầm nhìn', label: 'Sứ mệnh', defaultValue: 'Trở thành đơn vị giao nhận tin cậy hàng đầu nhờ tốc độ và sự trung thực' }
    ]
  },
  {
    id: 'ceo-risk-management-matrix',
    title: 'Ma trận Quản trị Rủi ro Toàn diện & Phương án Dự phòng',
    department: 'Ban Giám đốc & CEO',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o / Claude 3.5 Sonnet',
    difficulty: 'Nâng cao',
    tags: ['Risk Management', 'Dự phòng', 'CEO', 'Quản trị'],
    description: 'Nhận diện & xếp hạng rủi ro doanh nghiệp theo Xác suất & Mức độ ảnh hưởng.',
    prompt: `Doanh nghiệp [Tên công ty] hoạt động trong ngành [Ngành nghề].

Đóng vai Giám đốc Quản trị Rủi ro (Chief Risk Officer).
Lập Ma trận Quản trị Rủi ro (Risk Assessment Matrix) cho 5 nhóm rủi ro:
1. Rủi ro Tài chính & Dòng tiền
2. Rủi ro Nhân sự chủ chốt
3. Rủi ro Vận hành & Chuỗi cung ứng
4. Rủi ro Công nghệ & An ninh mạng
5. Rủi ro Biến động Thị trường & Pháp lý

Với mỗi nhóm rủi ro, xác định:
- Kịch bản rủi ro cụ thể
- Đánh giá Mức độ Ảnh hưởng (1-5) & Xác suất xảy ra (1-5)
- Biện pháp phòng ngừa chủ động (Mitigation Plan)
- Kịch bản ứng phó khẩn cấp (Contingency Plan) khi rủi ro kích hoạt.`,
    placeholders: [
      { key: 'Tên công ty', label: 'Tên công ty', defaultValue: 'Tập đoàn Xây dựng An Gia' },
      { key: 'Ngành nghề', label: 'Ngành nghề', defaultValue: 'Xây dựng & Thi công Công trình' }
    ]
  },

  // --- HR & NHÂN SỰ ---
  {
    id: 'hr-jd-ai-era',
    title: 'Viết Thông báo Tuyển dụng (JD) Đón đầu Kỷ nguyên AI',
    department: 'HR & Nhân sự',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Cơ bản',
    tags: ['Tuyển dụng', 'JD', 'HR', 'AI Skills'],
    description: 'Soạn thảo JD thu hút ứng viên tài năng, tích hợp yêu cầu sử dụng AI vào công việc.',
    prompt: `Tôi cần tuyển vị trí: [Tên vị trí tuyển dụng] cho công ty [Tên công ty].
Địa điểm làm việc: [Địa điểm]. Mức lương: [Mức lương].

Đóng vai Trưởng phòng Tuyển dụng (Talent Acquisition Manager).
Hãy viết bản Thông báo Tuyển dụng (Job Description) chuyên nghiệp & cuốn hút gồm:
1. Tiêu đề gây chú ý & Tóm tắt sứ mệnh vị trí trong 2 câu.
2. 5 Trách nhiệm công việc chính (tập trung vào kết quả đầu ra).
3. Yêu cầu năng lực: Tích hợp kỹ năng sử dụng công cụ AI (như ChatGPT, Midjourney, Automation...) để tăng năng suất công việc.
4. Quyền lợi & Môi trường làm việc (Phúc lợi nổi bật, cơ hội thăng tiến).
5. Quy trình ứng tuyển rõ ràng.`,
    placeholders: [
      { key: 'Tên vị trí tuyển dụng', label: 'Vị trí tuyển dụng', defaultValue: 'Trưởng nhóm Marketing (Marketing Team Leader)' },
      { key: 'Tên công ty', label: 'Tên công ty', defaultValue: 'Công ty EdTech Vietnam' },
      { key: 'Địa điểm', label: 'Địa điểm', defaultValue: 'Hà Nội (Hybrid)' },
      { key: 'Mức lương', label: 'Mức lương', defaultValue: '25 - 35 triệu VNĐ + Thưởng KPI' }
    ]
  },
  {
    id: 'hr-star-interview-questions',
    title: 'Bộ Câu hỏi Phỏng vấn Đánh giá Năng lực theo Phương pháp STAR',
    department: 'HR & Nhân sự',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Trung cấp',
    tags: ['Phỏng vấn', 'STAR Method', 'Tuyển dụng', 'HR'],
    description: 'Bộ câu hỏi phỏng vấn đào sâu hành vi quá khứ nhằm đánh giá chính xác năng lực ứng viên.',
    prompt: `Tôi sắp phỏng vấn ứng viên vị trí: [Vị trí phỏng vấn] cấp độ [Cấp độ: Nhân viên / Quản lý].
Các năng lực cốt lõi cần đánh giá: [3-4 năng lực quan trọng, ví dụ: Xử lý xung đột, Tư duy dữ liệu, Khả năng chịu áp lực].

Đóng vai Chuyên gia Tuyển dụng Senior.
Hãy xây dựng bộ câu hỏi phỏng vấn hành vi (Behavioral Interview) theo cấu trúc STAR (Situation - Task - Action - Result):
1. 2 Câu hỏi đào sâu cho mỗi năng lực cốt lõi.
2. Gợi ý câu hỏi phụ (Follow-up questions) để phát hiện ứng viên nói dối hoặc trả lời chung chung.
3. Tiêu chí đánh giá câu trả lời ĐẠT vs KHÔNG ĐẠT.`,
    placeholders: [
      { key: 'Vị trí phỏng vấn', label: 'Vị trí phỏng vấn', defaultValue: 'Quản lý Bán hàng Khách hàng Doanh nghiệp (B2B Sales Manager)' },
      { key: 'Cấp độ: Nhân viên / Quản lý', label: 'Cấp độ', defaultValue: 'Quản lý cấp trung' },
      { key: '3-4 năng lực quan trọng', label: 'Năng lực cốt lõi', defaultValue: 'Xử lý từ chối giá cao, Lãnh đạo đội ngũ, Tư duy chiến lược B2B' }
    ]
  },
  {
    id: 'hr-onboarding-plan-306090',
    title: 'Kế hoạch Onboarding 30-60-90 Ngày cho Quản lý Cấp cao',
    department: 'HR & Nhân sự',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o / Claude 3.5 Sonnet',
    difficulty: 'Trung cấp',
    tags: ['Onboarding', 'Hội nhập', 'HR', 'Lãnh đạo'],
    description: 'Thiết kế lộ trình 3 tháng thử việc giúp nhân sự mới hòa nhập nhanh và tạo ra kết quả sớm.',
    prompt: `Tôi cần lập lộ trình thử việc Onboarding cho nhân sự mới ở vị trí: [Vị trí mới] tại công ty [Tên công ty].

Đóng vai Giám đốc Nhân sự (CHRO).
Hãy thiết kế Lộ trình Onboarding 30-60-90 Ngày chi tiết:
- 30 Ngày đầu (Học hỏi & Hòa nhập): Mục tiêu, công việc cần làm, danh sách nhân sự cần gặp mặt.
- 60 Ngày tiếp theo (Đóng góp & Đánh giá): Các sáng kiến cải tiến ban đầu & mục tiêu ngắn hạn.
- 90 Ngày cuối (Thành thục & Bứt phá): Đảm nhận 100% trách nhiệm & thiết lập mục tiêu dài hạn.
- Đề xuất 3 chỉ số OKR thử việc để đánh giá kết quả sau 2 tháng.`,
    placeholders: [
      { key: 'Vị trí mới', label: 'Vị trí', defaultValue: 'Giám đốc Vận hành (COO)' },
      { key: 'Tên công ty', label: 'Tên công ty', defaultValue: 'Chuỗi Nhà hàng Chuẩn Việt' }
    ]
  },
  {
    id: 'hr-pms-kpi-design',
    title: 'Thiết kế Hệ thống Đánh giá Hiệu suất KPI & BSC Toàn diện',
    department: 'HR & Nhân sự',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Nâng cao',
    tags: ['KPI', 'Balanced Scorecard', 'Performance', 'HR'],
    description: 'Xây dựng từ điển KPI theo 4 viễn cảnh Thẻ điểm cân bằng (BSC) cho phòng ban.',
    prompt: `Tôi muốn thiết lập khung KPI cho phòng ban: [Tên phòng ban] tại công ty [Tên công ty].

Đóng vai Chuyên gia C&B & Quản trị Hiệu suất.
Hãy thiết kế Thẻ điểm cân bằng (Balanced Scorecard) gồm 4 viễn cảnh:
1. Viễn cảnh Tài chính (Financial): 2 KPI đo lường hiệu quả kinh tế.
2. Viễn cảnh Khách hàng (Customer): 2 KPI đo lường sự hài lòng đối tác/khách hàng.
3. Viễn cảnh Quy trình Nội bộ (Internal Process): 2 KPI đo lường tốc độ & chất lượng công việc.
4. Viễn cảnh Học hỏi & Phát triển (Learning & Growth): 2 KPI đo lường nâng cao năng lực nhân sự.

Mỗi KPI cần ghi rõ: Tên KPI, Công thức tính, Tần suất đo lường, Trọng số gợi ý (%).`,
    placeholders: [
      { key: 'Tên phòng ban', label: 'Phòng ban', defaultValue: 'Phòng Chăm sóc Khách hàng (Customer Success)' },
      { key: 'Tên công ty', label: 'Tên công ty', defaultValue: 'Công ty Phần mềm MISA Software' }
    ]
  },
  {
    id: 'hr-enps-engagement-survey',
    title: 'Khảo sát Mức độ Mẫn cảm & Gắn kết Nhân sự (eNPS)',
    department: 'HR & Nhân sự',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Cơ bản',
    tags: ['eNPS', 'Gắn kết nhân sự', 'Employee Engagement', 'HR'],
    description: 'Bộ câu hỏi khảo sát giấu tên đo lường độ gắn kết nhân viên & phân tích điểm nghẽn.',
    prompt: `Công ty chúng tôi [Tên công ty] muốn thực hiện đợt khảo sát gắn kết nhân viên (Employee Engagement Survey) định kỳ.

Đóng vai Chuyên gia Trải nghiệm Nhân sự (Employee Experience Specialist).
Hãy thiết kế:
1. 10 Câu hỏi khảo sát theo thang điểm Likert 1-5 thuộc 4 nhóm: Môi trường làm việc, Lãnh đạo & Quản lý, Cơ hội phát triển, Chế độ đãi ngộ.
2. 2 Câu hỏi mở để nhân viên tự do góp ý thật lòng.
3. Mẫu thư mời tham gia khảo sát bảo mật từ Giám đốc Nhân sự gửi toàn bộ nhân viên.
4. Khung phương pháp phân tích chỉ số eNPS và phân loại nhóm nhân viên (Promoters, Passives, Detractors).`,
    placeholders: [
      { key: 'Tên công ty', label: 'Tên công ty', defaultValue: 'Công ty Thương mại Dược phẩm Mediphar' }
    ]
  },
  {
    id: 'hr-internal-training-curriculum',
    title: 'Xây dựng Khung Khóa học Đào tạo Nội bộ cho Đội ngũ',
    department: 'HR & Nhân sự',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Trung cấp',
    tags: ['L&D', 'Đào tạo nội bộ', 'Chương trình giảng dạy', 'HR'],
    description: 'Thiết kế giáo trình đào tạo nội bộ 4 buổi giúp chuẩn hóa kỹ năng làm việc.',
    prompt: `Tôi cần xây dựng khóa đào tạo nội bộ chủ đề: [Chủ đề đào tạo] cho đối tượng [Đối tượng học viên] trong thời lượng [Thời lượng, ví dụ: 4 buổi x 2 tiếng].

Đóng vai Chuyên gia Đào tạo & Phát triển Tổ chức (L&D Manager).
Hãy thiết kế Khung Chương trình Đào tạo (Training Curriculum) bao gồm:
1. Mục tiêu khóa học (Nắm được gì, làm được gì sau khóa học).
2. Dàn ý chi tiết từng buổi học (Lý thuyết 30%, Thực hành/Case study 70%).
3. Bài tập thu hoạch thực tế sau mỗi buổi.
4. Tiêu chí đánh giá & Bài test cấp chứng chỉ hoàn thành nội bộ.`,
    placeholders: [
      { key: 'Chủ đề đào tạo', label: 'Chủ đề đào tạo', defaultValue: 'Kỹ năng Viết Email Báo giá & Đàm phán Khách hàng B2B' },
      { key: 'Đối tượng học viên', label: 'Đối tượng', defaultValue: 'Đội ngũ Sales mới gia nhập dưới 6 tháng' },
      { key: 'Thời lượng', label: 'Thời lượng', defaultValue: '3 buổi x 2.5 tiếng' }
    ]
  },
  {
    id: 'hr-retention-benefits-strategy',
    title: 'Chiến lược Giữ chân Nhân tài & Thiết kế Gói Phúc lợi Linh hoạt',
    department: 'HR & Nhân sự',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'Claude 3.5 Sonnet / ChatGPT 4o',
    difficulty: 'Nâng cao',
    tags: ['Retention', 'Phúc lợi', 'C&B', 'HR'],
    description: 'Xây dựng chính sách đãi ngộ tổng thể (Total Rewards) ngăn chặn tỷ lệ nghỉ việc.',
    prompt: `Doanh nghiệp [Tên doanh nghiệp] đang đối mặt với nguy cơ chảy máu nhân tài ở nhóm [Nhóm nhân sự nguy cơ, ví dụ: Senior Developer / Sales Top Performer]. Tỷ lệ nghỉ việc hiện tại: [Tỷ lệ nghỉ việc %].

Đóng vai Chuyên gia Đãi ngộ & Giữ chân Nhân tài.
Hãy xây dựng Giải pháp Tổng thể Total Rewards gồm:
1. Phân tích 4 nguyên nhân gốc rễ khiến nhóm nhân sự này rời đi.
2. Thiết kế Gói phúc lợi linh hoạt (Flexible Benefits) kết hợp Lương cứng + Thưởng hiệu suất + ESOP/Phúc lợi phi tài chính.
3. Lộ trình thăng tiến 2 tuyến (Individual Contributor vs Management Track).
4. Kế hoạch phỏng vấn giữ chân (Stay Interview) khẩn cấp.`,
    placeholders: [
      { key: 'Tên doanh nghiệp', label: 'Tên doanh nghiệp', defaultValue: 'Công ty Giải pháp Công nghệ Fintech' },
      { key: 'Nhóm nhân sự nguy cơ', label: 'Nhóm nhân sự', defaultValue: 'Kỹ sư Phần mềm Senior & Data Engineer' },
      { key: 'Tỷ lệ nghỉ việc %', label: 'Tỷ lệ nghỉ việc', defaultValue: '22% / năm' }
    ]
  },

  // --- MARKETING & BRANDING ---
  {
    id: 'mkt-30day-content-calendar',
    title: 'Lập Lịch Content Marketing 30 Ngày Đa Kênh (FB, LinkedIn, TikTok)',
    department: 'Marketing & Branding',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Trung cấp',
    tags: ['Content Calendar', 'Social Media', 'Marketing Plan', 'Branding'],
    description: 'Ma trận nội dung 30 ngày phủ sóng đa kênh theo tỷ lệ 4:3:2:1 (Giá trị, Giải trí, Bán hàng, Uy tín).',
    prompt: `Sản phẩm/Dịch vụ của chúng tôi: [Sản phẩm dịch vụ]. Đối tượng khách hàng mục tiêu: [Chân dung khách hàng]. Kênh triển khai chính: [Kênh: Facebook, LinkedIn, TikTok...].

Đóng vai Giám đốc Creative Content.
Hãy lập Lịch Content Marketing 30 ngày đa dạng chủ đề:
1. Phân bổ theo tỷ lệ 40% Chia sẻ giá trị/Kiến thức, 30% Định vị thương hiệu/Uy tín, 20% Bán hàng/Khuyến mãi, 10% Tương tác/Giải trí.
2. Bảng kế hoạch theo từng ngày: Ngày, Kênh đăng, Chủ đề bài viết, Góc nhìn (Angle), Định dạng (Video ngắn / Infographic / Carousel / Bài viết sâu).
3. 5 Mẫu tiêu đề giật gân (Hooks) thu hút lượt click cao.`,
    placeholders: [
      { key: 'Sản phẩm dịch vụ', label: 'Sản phẩm/Dịch vụ', defaultValue: 'Dịch vụ Tư vấn & Thi công Nội thất Căn hộ' },
      { key: 'Chân dung khách hàng', label: 'Khách hàng mục tiêu', defaultValue: 'Chủ nhà mới nhận căn hộ chung cư cao cấp, thu nhập từ 40tr/tháng' },
      { key: 'Kênh: Facebook, LinkedIn, TikTok...', label: 'Kênh truyền thông', defaultValue: 'Facebook Fanpage & TikTok' }
    ]
  },
  {
    id: 'mkt-seo-content-brief',
    title: 'Dàn ý Bài viết chuẩn SEO Top 1 Google & Chuyển đổi Cao',
    department: 'Marketing & Branding',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Cơ bản',
    tags: ['SEO', 'Content Writing', 'Blog', 'Marketing'],
    description: 'Dàn ý bài viết chuyên sâu phủ từ khóa chính & phụ, đáp ứng chuẩn E-E-A-T của Google.',
    prompt: `Từ khóa chính (Focus Keyword): [Từ khóa chính].
Sản phẩm liên quan cần chèn CTA: [Sản phẩm dịch vụ].

Đóng vai Chuyên gia SEO Content Audit.
Hãy xây dựng Dàn ý Chi tiết (Content Brief) chuẩn SEO Top 1:
1. Thẻ Meta Title (dưới 60 ký tự, chứa từ khóa) & Meta Description (dưới 155 ký tự, hấp dẫn).
2. Cấu trúc bài viết từ H1, H2, H3 theo hành trình tìm kiếm của người dùng (Search Intent).
3. Danh sách từ khóa LSI & từ khóa phụ cần chèn tự nhiên vào từng phần.
4. Đề xuất vị trí chèn hình ảnh, Infographic, Call-to-Action (CTA) bán hàng tối ưu nhất.`,
    placeholders: [
      { key: 'Từ khóa chính', label: 'Từ khóa SEO', defaultValue: 'Phần mềm quản lý kho hàng tốt nhất' },
      { key: 'Sản phẩm dịch vụ', label: 'Sản phẩm chuyển đổi', defaultValue: 'Phần mềm Base WMS quản lý kho thông minh' }
    ]
  },
  {
    id: 'mkt-product-launch-campaign',
    title: 'Kế hoạch Ra mắt Sản phẩm Mới 3 Giai đoạn',
    department: 'Marketing & Branding',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'Claude 3.5 Sonnet / ChatGPT 4o',
    difficulty: 'Nâng cao',
    tags: ['Product Launch', 'Campaign', 'Marketing', 'Go-To-Market'],
    description: 'Kế hoạch chiến dịch tung sản phẩm mới bùng nổ doanh số trong 30 ngày.',
    prompt: `Chúng tôi chuẩn bị ra mắt sản phẩm mới: [Tên sản phẩm mới] thuộc ngành [Ngành nghề]. Điểm bán hàng độc nhất (USP): [USP sản phẩm].

Đóng vai Trưởng phòng Chiến dịch Marketing (Campaign Manager).
Hãy thiết kế Kế hoạch Ra mắt Sản phẩm 3 Giai đoạn:
1. Giai đoạn 1: Teasing (Tạo tò mò, gom Lead/Đăng ký trước) - 10 ngày.
2. Giai đoạn 2: Launching (Bùng nổ truyền thông, Sự kiện ra mắt, Offer độc quyền) - 7 ngày.
3. Giai đoạn 3: Sustaining (Đẩy mạnh Social Proof, Đánh giá từ KOLs, Retargeting) - 13 ngày.
Kèm KPI mục tiêu đo lường cho từng giai đoạn (Reach, Conversions, ROI).`,
    placeholders: [
      { key: 'Tên sản phẩm mới', label: 'Tên sản phẩm', defaultValue: 'Nước ép Trái cây Cần tây Collagen Nguyên chất' },
      { key: 'Ngành nghề', label: 'Ngành nghề', defaultValue: 'F&B & Thực phẩm Chức năng' },
      { key: 'USP sản phẩm', label: 'USP', defaultValue: 'Công nghệ sấy lạnh Nhật Bản giữ 99% vitamin, không chất bảo quản' }
    ]
  },
  {
    id: 'mkt-brand-positioning-framework',
    title: 'Tuyên bố Định vị Thương hiệu & Khung Thông điệp Truyền thông',
    department: 'Marketing & Branding',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Nâng cao',
    tags: ['Branding', 'Positioning', 'Messaging Framework', 'Marketing'],
    description: 'Xây dựng tuyên bố định vị thương hiệu sắc bén và bộ thông điệp truyền thông nhất quán.',
    prompt: `Tên thương hiệu: [Tên thương hiệu]. Lĩnh vực hoạt động: [Lĩnh vực].
Đối thủ cạnh tranh chính: [Đối thủ cạnh tranh].

Đóng vai Chuyên gia Tác chiến Thương hiệu (Brand Strategist).
Hãy xây dựng Khung Định vị Thương hiệu (Brand Positioning Framework):
1. Tuyên bố Định vị Thương hiệu (Brand Positioning Statement) theo mẫu chuẩn quốc tế.
2. Tính cách thương hiệu (Brand Personality - 3 tính từ đại diện).
3. Giọng văn thương hiệu (Brand Tone of Voice - Nên nói gì & Không nên nói gì).
4. Khung thông điệp chính (Key Messaging Hierarchy) dành cho 3 nhóm khách hàng khác nhau.`,
    placeholders: [
      { key: 'Tên thương hiệu', label: 'Tên thương hiệu', defaultValue: 'Thời trang Công sở UrbanStyle' },
      { key: 'Lĩnh vực', label: 'Lĩnh vực', defaultValue: 'Thời trang Nam Nữ Cao cấp' },
      { key: 'Đối thủ cạnh tranh', label: 'Đối thủ cạnh tranh', defaultValue: 'Uniqlo, Zara, Routine' }
    ]
  },
  {
    id: 'mkt-email-nurturing-flow',
    title: 'Chuỗi Email Marketing 5 Bước Chăm sóc & Nuôi dưỡng Lead',
    department: 'Marketing & Branding',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Trung cấp',
    tags: ['Email Marketing', 'Automation', 'Nurturing', 'Lead Generation'],
    description: 'Kịch bản 5 email tự động gửi khách hàng từ khi nhận quà tặng đến khi chốt đơn.',
    prompt: `Khách hàng vừa để lại thông tin để nhận tài liệu miễn phí: [Tên tài liệu/Lead Magnet].
Sản phẩm trả phí chúng tôi muốn bán sau đó: [Sản phẩm bán hàng].

Đóng vai Chuyên gia Email Marketing Copywriter.
Hãy viết Chuỗi 5 Email Nuôi dưỡng Tự động (Automated Nurturing Drip Campaign):
- Email 1 (Ngay lập tức): Gửi quà + Lời chào mừng + Câu chuyện thương hiệu.
- Email 2 (Sau 1 ngày): Chia sẻ bài học giá trị giải quyết nỗi đau lớn nhất của họ.
- Email 3 (Sau 3 ngày): Case study khách hàng thực tế đã thành công nhờ giải pháp.
- Email 4 (Sau 5 ngày): Giới thiệu [Sản phẩm bán hàng] kèm ưu đãi dùng thử giới hạn.
- Email 5 (Sau 7 ngày): Email cảnh báo ưu đãi sắp hết hạn (Last Chance / FOMO).
Mỗi Email cần có Subject line thu hút lượt mở >40% và Call to Action rõ ràng.`,
    placeholders: [
      { key: 'Tên tài liệu/Lead Magnet', label: 'Tài liệu tặng', defaultValue: 'Ebook: 10 Mẫu Hợp đồng Bán hàng B2B Chuẩn Pháp lý' },
      { key: 'Sản phẩm bán hàng', label: 'Sản phẩm cần bán', defaultValue: 'Khóa học Đào tạo Kỹ năng Đàm phán B2B Chuyên sâu' }
    ]
  },
  {
    id: 'mkt-kol-influencer-brief',
    title: 'Lập Brief Hợp tác KOL/KOC Đánh giá & Quảng bá Sản phẩm',
    department: 'Marketing & Branding',
    industry: 'Bán lẻ & E-commerce',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Cơ bản',
    tags: ['KOL', 'KOC', 'Influencer Marketing', 'Brief'],
    description: 'Bản yêu cầu hợp tác chuẩn chỉnh gửi KOL/KOC đảm bảo nội dung đúng định hướng.',
    prompt: `Chúng tôi cần thuê KOL/KOC quay video đánh giá sản phẩm: [Tên sản phẩm].
Nền tảng đăng tải: [TikTok / Reels / YouTube Short].

Đóng vai Influencer Marketing Specialist.
Hãy soạn thảo bản Brief Hợp tác Sản xuất Nội dung (Creator Brief) chuyên nghiệp gồm:
1. Thông tin nhãn hàng & Thông điệp cốt lõi của chiến dịch.
2. Yêu cầu sản xuất: Thời lượng video, cấu trúc kịch bản gợi ý (Hook 3s, Trải nghiệm sản phẩm, USP, CTA).
3. Do's and Don'ts (Những từ ngữ bắt buộc dùng & Những điều cấm đề cập/vi phạm chính sách).
4. Quyền lợi Creator & Mẫu mã code giảm giá riêng (Affiliate Commission).`,
    placeholders: [
      { key: 'Tên sản phẩm', label: 'Sản phẩm', defaultValue: 'Tai nghe Không dây Chống ồn SmartSound' },
      { key: 'TikTok / Reels / YouTube Short', label: 'Nền tảng', defaultValue: 'TikTok & Facebook Reels' }
    ]
  },
  {
    id: 'mkt-facebook-ad-copy-pas',
    title: 'Viết Ad Copy Quảng cáo theo Cấu trúc PAS (Problem - Agitate - Solve)',
    department: 'Marketing & Branding',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Cơ bản',
    tags: ['Facebook Ads', 'Copywriting', 'PAS Framework', 'Ads'],
    description: '3 mẫu nội dung quảng cáo đánh trúng nỗi đau khách hàng và kích thích chuyển đổi.',
    prompt: `Tôi cần viết bài quảng cáo chạy Facebook Ads cho: [Sản phẩm dịch vụ].
Nỗi đau lớn nhất của khách hàng: [Nỗi đau khách hàng].
Giải pháp sản phẩm mang lại: [Giải pháp của sản phẩm].

Đóng vai Senior Performance Copywriter.
Hãy viết 3 Mẫu Quảng cáo theo cấu trúc PAS (Problem - Agitate - Solve):
- Mẫu 1: Tập trung vào cảm xúc lo lắng / tiết kiệm chi phí.
- Mẫu 2: Tập trung vào tốc độ / sự tiện lợi.
- Mẫu 3: Dạng câu chuyện trải nghiệm của khách hàng thực tế.
Mỗi mẫu gồm: Tiêu đề gây sốc, Thân bài PAS ngắn gọn, 3 Tiêu đề nút bấm (Headline nút CTA).`,
    placeholders: [
      { key: 'Sản phẩm dịch vụ', label: 'Sản phẩm/Dịch vụ', defaultValue: 'Dịch vụ Khai thuế & Báo cáo Tài chính Trọn gói' },
      { key: 'Nỗi đau khách hàng', label: 'Nỗi đau khách hàng', defaultValue: 'Sợ bị phạt thuế do sai sót chứng từ, không có kế toán giỏi' },
      { key: 'Giải pháp của sản phẩm', label: 'Giải pháp', defaultValue: 'Đội ngũ đại lý thuế chuyên nghiệp cam kết chịu trách nhiệm 100% về số liệu' }
    ]
  },

  // --- SALES & KINH DOANH ---
  {
    id: 'sales-objection-handling-cheat-sheet',
    title: 'Ma trận Xử lý 10 Từ chối Về Giá & Đối thủ Cạnh tranh',
    department: 'Sales & Kinh doanh',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o / Claude 3.5 Sonnet',
    difficulty: 'Trung cấp',
    tags: ['Sales Script', 'Objection Handling', 'Bán hàng', 'Đàm phán'],
    description: 'Kịch bản ứng phó thần tốc khi khách hàng chê giá đắt hoặc so sánh với đối thủ.',
    prompt: `Sản phẩm của chúng tôi: [Sản phẩm dịch vụ]. Phân khúc giá: [Mức giá / Phân khúc].
Đối thủ cạnh tranh thường bị khách hàng mang ra so sánh: [Tên đối thủ cạnh tranh].

Đóng vai Vua Bán hàng B2B (Top Sales Performer).
Hãy xây dựng Kịch bản Xử lý Từ chối (Objection Handling Cheat Sheet) cho 5 tình huống phổ biến nhất:
1. "Bên em giá cao hơn đối thủ X nhiều quá."
2. "Để anh/chị về suy nghĩ thêm rồi báo lại sau nhé."
3. "Bên anh đang dùng dịch vụ của đối thủ Y rất ổn, chưa có nhu cầu đổi."
4. "Ngân sách bên anh đợt này cắt giảm, không đủ tiền mua."
5. "Gửi báo giá qua Zalo/Email đi, anh xem rồi gọi lại."

Với mỗi tình huống, cung cấp: Nguyên nhân thật sự sau lời từ chối + 2 Câu hỏi cô lập vấn đề + 1 Kịch bản đáp trả khéo léo đảo ngược thế cờ.`,
    placeholders: [
      { key: 'Sản phẩm dịch vụ', label: 'Sản phẩm/Dịch vụ', defaultValue: 'Phần mềm Quản lý Nhân sự & Tiền lương Base HRM' },
      { key: 'Mức giá / Phân khúc', label: 'Phân khúc giá', defaultValue: 'Trung & Cao cấp dành cho DN từ 50-500 nhân sự' },
      { key: 'Tên đối thủ cạnh tranh', label: 'Đối thủ cạnh tranh', defaultValue: 'Các phần mềm HRM truyền thống đóng gói' }
    ]
  },
  {
    id: 'sales-b2b-proposal-structure',
    title: 'Cấu trúc Proposal Báo giá B2B Thuyết phục & Khép lại Hợp đồng',
    department: 'Sales & Kinh doanh',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Trung cấp',
    tags: ['Báo giá', 'Proposal', 'B2B Sales', 'Chốt hợp đồng'],
    description: 'Khung đề xuất giải pháp B2B giúp gia tăng tỷ lệ chốt hợp đồng lên 80%.',
    prompt: `Chúng tôi chuẩn bị gửi đề xuất giải pháp (Sales Proposal) cho khách hàng doanh nghiệp: [Tên khách hàng doanh nghiệp].
Bài toán họ đang gặp phải: [Vấn đề của khách hàng].
Giải pháp đề xuất: [Giải pháp cung cấp].

Đóng vai Giám đốc Tư vấn Giải pháp (Solution Architect).
Hãy thiết kế Cấu trúc Bản Đề xuất Giải pháp (B2B Sales Proposal Slide Deck) 8 trang:
- Trang 1: Thấu hiểu vấn đề & Nỗi đau hiện tại của doanh nghiệp họ.
- Trang 2: Chi phí ẩn nếu KHÔNG giải quyết vấn đề ngay lập tức.
- Trang 3: Lộ trình Giải pháp tổng thể đề xuất.
- Trang 4: Dữ liệu bằng chứng (Case study dự án tương tự đã triển khai).
- Trang 5: Báo giá 3 Gói lựa chọn (Basic - Standard - Premium).
- Trang 6: Cam kết bảo hành & Hỗ trợ kỹ thuật.
- Trang 7: Điều khoản thanh toán linh hoạt.
- Trang 8: Call to Action & Chữ ký xác nhận.`,
    placeholders: [
      { key: 'Tên khách hàng doanh nghiệp', label: 'Khách hàng mục tiêu', defaultValue: 'Chuỗi Siêu thị Điện máy Xanh Việt' },
      { key: 'Vấn đề của khách hàng', label: 'Vấn đề khách hàng', defaultValue: 'Thất thoát hàng tồn kho & Sai lệch số liệu giữa các chi nhánh' },
      { key: 'Giải pháp cung cấp', label: 'Giải pháp đề xuất', defaultValue: 'Hệ thống Quản lý Kho Tập trung Cloud WMS' }
    ]
  },
  {
    id: 'sales-cross-sell-upsell-playbook',
    title: 'Kịch bản Bán chéo (Cross-sell) & Bán gia tăng (Up-sell)',
    department: 'Sales & Kinh doanh',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Cơ bản',
    tags: ['Cross-sell', 'Up-sell', 'Gia tăng doanh số', 'Sales Script'],
    description: 'Kịch bản đề xuất bán thêm sản phẩm bổ trợ vào đúng thời điểm khách hàng hài lòng.',
    prompt: `Sản phẩm cốt lõi khách hàng đang sử dụng: [Sản phẩm hiện tại].
Sản phẩm muốn Bán chéo/Up-sell: [Sản phẩm bán thêm].

Đóng vai Chuyên gia Tối ưu Giá trị Khách hàng (LTV Specialist).
Hãy xây dựng Kịch bản Bán thêm (Cross-sell / Up-sell Script):
1. Nhận diện 3 "Thời điểm Vàng" để đề xuất bán thêm mà không gây khó chịu.
2. Câu thoại mở lời gợi mở nhu cầu tự nhiên dựa trên kết quả họ đạt được.
3. Ưu đãi riêng dành cho khách hàng thân thiết (Loyalty Offer) để kích thích ra quyết định nhanh trong 48h.`,
    placeholders: [
      { key: 'Sản phẩm hiện tại', label: 'Sản phẩm đang dùng', defaultValue: 'Gói Phần mềm Kế toán Doanh nghiệp' },
      { key: 'Sản phẩm bán thêm', label: 'Sản phẩm bán thêm', defaultValue: 'Mô-đun Hóa đơn Điện tử & Chữ ký số Tự động' }
    ]
  },
  {
    id: 'sales-account-based-marketing',
    title: 'Chiến lược Tiếp cận Khách hàng B2B Cấp cao (ABM Strategy)',
    department: 'Sales & Kinh doanh',
    industry: 'Công nghệ & SaaS',
    recommendedModel: 'Claude 3.5 Sonnet / ChatGPT 4o',
    difficulty: 'Nâng cao',
    tags: ['ABM', 'Account-Based Marketing', 'B2B Sales', 'Key Account'],
    description: 'Chiến lược săn tìm & chinh phục các Tập đoàn lớn theo phương pháp Account-Based Marketing.',
    prompt: `Tập đoàn mục tiêu chúng tôi muốn tiếp cận: [Tên Tập đoàn mục tiêu].
Sản phẩm/Dịch vụ muốn bán: [Sản phẩm dịch vụ].

Đóng vai Giám đốc Kinh doanh Key Account (Enterprise Sales Director).
Hãy thiết kế Chiến lược ABM (Account-Based Marketing) 4 bước:
1. Xác định 3 vị trí lãnh đạo có quyền quyết định (Buying Committee: ví dụ CEO, CIO, CFO).
2. Thiết kế Bản đồ Nỗi đau (Pain Point Mapping) riêng cho từng vị trí.
3. Kế hoạch tiếp cận đa kênh cá nhân hóa (Personalized Outreach Sequence qua LinkedIn, Email cá nhân, Sự kiện VIP).
4. Nội dung quà tặng trao giá trị ban đầu (Nghiên cứu ngành riêng cho tập đoàn đó) để xin cuộc hẹn 15 phút.`,
    placeholders: [
      { key: 'Tên Tập đoàn mục tiêu', label: 'Tập đoàn mục tiêu', defaultValue: 'Tập đoàn Dệt may & Thời trang Việt Nam' },
      { key: 'Sản phẩm dịch vụ', label: 'Sản phẩm/Dịch vụ', defaultValue: 'Giải pháp Quản trị Chuỗi cung ứng & ERP Số' }
    ]
  },
  {
    id: 'sales-channel-partner-policy',
    title: 'Xây dựng Chính sách Đại lý & Kênh Phân phối Thương mại',
    department: 'Sales & Kinh doanh',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Nâng cao',
    tags: ['Đại lý', 'Kênh phân phối', 'Chính sách Sales', 'Channel Sales'],
    description: 'Khung chính sách chiết khấu, thưởng doanh số & bảo vệ vùng bán hàng cho Đại lý.',
    prompt: `Chúng tôi là nhà sản xuất/phân phối: [Sản phẩm]. Muốn phát triển hệ thống Đại lý/Nhà phân phối toàn quốc.

Đóng vai Giám đốc Phát triển Kênh Phân phối (Channel Sales Director).
Hãy thiết kế Bản Chính sách Đại lý & Nhà Phân phối (Partner Policy Document):
1. Phân cấp Đại lý (Bạc, Vàng, Kim Cương) theo cam kết Doanh số tối thiểu.
2. Khung Chiết khấu cơ bản & Thưởng vượt mốc doanh số quý/năm.
3. Chính sách bảo vệ Vùng bán hàng & Đăng ký Dự án (Project Registration) chống phá giá.
4. Hỗ trợ từ Hãng (Đào tạo Sales, Tài liệu Marketing, Hỗ trợ hàng mẫu Demo).`,
    placeholders: [
      { key: 'Sản phẩm', label: 'Sản phẩm phân phối', defaultValue: 'Thiết bị Điện thông minh & Khóa cửa Vân tay' }
    ]
  },
  {
    id: 'sales-negotiation-tactics-sheet',
    title: 'Bộ Chiêu thức Đàm phán Hợp đồng B2B Giá trị Lớn',
    department: 'Sales & Kinh doanh',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o / Claude 3.5 Sonnet',
    difficulty: 'Nâng cao',
    tags: ['Đàm phán', 'Negotiation', 'B2B Sales', 'Hợp đồng'],
    description: 'Chiến thuật đàm phán bảo vệ biên lợi nhuận mà vẫn đạt thỏa thuận Win-Win.',
    prompt: `Chúng tôi đang đàm phán hợp đồng giá trị: [Giá trị hợp đồng] với đối tác.
Khách hàng đang ép giảm giá [Số % đòi giảm] mới chịu ký hợp đồng.

Đóng vai Bậc thầy Đàm phán Thương lượng.
Hãy xây dựng Kế hoạch Đàm phán Bảo vệ Biên Lợi nhuận (Win-Win Negotiation Strategy):
1. Xác định vị thế đàm phán BATNA (Best Alternative to a Negotiated Agreement).
2. 3 Điều khoản có thể mang ra trao đổi (Concessions) THAY VÌ giảm giá trực tiếp (Ví dụ: Thời hạn thanh toán, Phạm vi dịch vụ, Thời gian bảo hành).
3. Kịch bản phản hồi câu nói ép giá của khách hàng một cách cứng cỏi nhưng lịch thiệp.
4. Kỹ thuật tạo áp lực thời gian (Urgency Close) để chốt hợp đồng ngay trong tuần.`,
    placeholders: [
      { key: 'Giá trị hợp đồng', label: 'Giá trị hợp đồng', defaultValue: '1.2 Tỷ VNĐ' },
      { key: 'Số % đòi giảm', label: '% Khách đòi giảm', defaultValue: '15%' }
    ]
  },
  {
    id: 'sales-cold-email-outreach',
    title: 'Chuỗi Cold Email Tiếp cận Giám đốc / Người có Quyền Quyết định',
    department: 'Sales & Kinh doanh',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Cơ bản',
    tags: ['Cold Email', 'Outreach', 'Sales', 'B2B'],
    description: 'Chuỗi 3 email chào hàng lạnh tỷ lệ phản hồi cao gửi người quyết định C-Level.',
    prompt: `Dịch vụ của chúng tôi: [Dịch vụ].
Đối tượng người nhận Email: [Chức danh người nhận, ví dụ: CEO / CNO / Marketing Director].

Đóng vai Chuyên gia Outbound Sales.
Hãy viết Chuỗi 3 Cold Email ngắn gọn (<150 từ mỗi email):
- Email 1: Trực diện, nêu ngắn gọn 1 bài toán lớn của ngành họ và giải pháp ngắn trong 3 dòng.
- Email 2 (Sau 3 ngày): Gửi 1 con số kết quả (Metric/Proof) ấn tượng từ khách hàng cũ.
- Email 3 (Sau 7 ngày): Email chia tay lịch sự (Break-up Email) hỏi về thời điểm phù hợp hơn.
Lưu ý: Tiêu đề không giống quảng cáo spam, văn phong cá nhân hóa như gửi từ đối tác chuyên nghiệp.`,
    placeholders: [
      { key: 'Dịch vụ', label: 'Dịch vụ cung cấp', defaultValue: 'Dịch vụ Tối ưu Hóa Chi phí Quảng cáo Google & Facebook' },
      { key: 'Chức danh người nhận', label: 'Chức danh người nhận', defaultValue: 'Giám đốc Marketing (CMO)' }
    ]
  },

  // --- TÀI CHÍNH & KẾ TOÁN ---
  {
    id: 'fin-cashflow-12month-model',
    title: 'Mô hình Dự báo Dòng tiền 12 Tháng & Cảnh báo Thanh khoản',
    department: 'Tài chính & Kế toán',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'Claude 3.5 Sonnet / ChatGPT 4o',
    difficulty: 'Nâng cao',
    tags: ['Dòng tiền', 'Cashflow', 'Tài chính', 'Dự báo'],
    description: 'Xây dựng mô hình dự báo dòng tiền vào - ra, cảnh báo các tháng thâm hụt tài chính.',
    prompt: `Doanh nghiệp của tôi: [Tên công ty]. Doanh thu trung bình tháng: [Doanh thu tháng]. Chi phí cố định hàng tháng: [Chi phí cố định].

Đóng vai Giám đốc Tài chính (CFO).
Hãy thiết kế Khung Mô hình Dự báo Dòng tiền (Cashflow Forecast Model) 12 tháng:
1. Danh mục các khoản Dòng tiền vào (Operating Cash Inflow, Financing Inflow...).
2. Danh mục các khoản Dòng tiền ra (OPEX, CAPEX, Thuế, Lãi vay...).
3. 3 Kịch bản Dự báo: Tích cực (+20%), Cơ sở, Tiêu cực (-30%).
4. Cơ chế cảnh báo sớm khi Mức dự trữ tiền mặt hạ xuống dưới ngưỡng an toàn (Safety Buffer).`,
    placeholders: [
      { key: 'Tên công ty', label: 'Tên công ty', defaultValue: 'Công ty Thương mại Xuất nhập khẩu HP' },
      { key: 'Doanh thu tháng', label: 'Doanh thu trung bình/tháng', defaultValue: '5 tỷ VNĐ' },
      { key: 'Chi phí cố định', label: 'Chi phí cố định/tháng', defaultValue: '1.2 tỷ VNĐ' }
    ]
  },
  {
    id: 'fin-cost-optimization-audit',
    title: 'Phân tích Chi phí Vận hành & Lộ trình Cắt giảm Chi phí Thừa',
    department: 'Tài chính & Kế toán',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Trung cấp',
    tags: ['Chi phí', 'Cost Optimization', 'CFO', 'Tài chính'],
    description: 'Rà soát toàn bộ chi phí vận hành (OPEX) để tìm 15% chi phí lãng phí có thể cắt giảm ngay.',
    prompt: `Công ty chúng tôi muốn tối ưu hóa chi phí vận hành trong năm nay.
Tổng chi phí OPEX hiện tại: [Tổng chi phí năm].

Đóng vai Chuyên gia Tối ưu Chi phí Doanh nghiệp (Cost Controller).
Hãy xây dựng Lộ trình Rà soát & Cắt giảm Chi phí 4 bước:
1. Phân loại chi phí thành 3 nhóm: Bắt buộc (Good Cost), Cần cân nhắc (Better Cost), Lãng phí/Thừa (Bad Cost).
2. Danh mục 10 khoản mục chi phí dễ bị rò rỉ nhất (Ví dụ: In ấn, Phần mềm trùng lặp, Điện nước, Chi phí tiếp khách...).
3. Biện pháp cắt giảm cụ thể cho từng khoản mục mà KHÔNG làm ảnh hưởng đến năng suất nhân viên.
4. Đề xuất quy trình duyệt chi chặt chẽ hơn.`,
    placeholders: [
      { key: 'Tên công ty', label: 'Tên công ty', defaultValue: 'Tập đoàn Dịch vụ Du lịch & Lữ hành' },
      { key: 'Tổng chi phí năm', label: 'Tổng OPEX/Năm', defaultValue: '18 tỷ VNĐ' }
    ]
  },
  {
    id: 'fin-zero-based-budgeting',
    title: 'Lập Ngân sách Năm theo Phương pháp Zero-Based Budgeting (ZBB)',
    department: 'Tài chính & Kế toán',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'Claude 3.5 Sonnet / ChatGPT 4o',
    difficulty: 'Nâng cao',
    tags: ['Ngân sách', 'ZBB', 'Zero-Based Budgeting', 'CFO'],
    description: 'Phương pháp lập ngân sách từ số 0 giúp loại bỏ tư duy "tiêu tiền theo thói quen cũ".',
    prompt: `Chúng tôi chuẩn bị lập ngân sách cho năm tài chính mới cho phòng ban: [Tên phòng ban].

Đóng vai Trưởng phòng Kế hoạch Tài chính (FP&A Manager).
Hãy hướng dẫn quy trình Lập Ngân sách Zero-Based Budgeting (ZBB):
1. Nguyên lý ZBB khác gì so với phương pháp lập ngân sách truyền thống tăng dần.
2. Biểu mẫu bảo vệ ngân sách (Decision Package) yêu cầu Trưởng phòng giải trình từng đồng chi tiêu từ số 0.
3. Tiêu chí xếp hạng ưu tiên cấp ngân sách giữa các dự án.
4. Mẫu bảng theo dõi thực chi so với kế hoạch theo Quý.`,
    placeholders: [
      { key: 'Tên phòng ban', label: 'Phòng ban', defaultValue: 'Phòng Marketing & Truyền thông' }
    ]
  },
  {
    id: 'fin-financial-ratio-analysis',
    title: 'Phân tích Sức khỏe Tài chính Qua Chỉ số Liquidity, Solvency, Profitability',
    department: 'Tài chính & Kế toán',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Trung cấp',
    tags: ['Chỉ số tài chính', 'Financial Ratios', 'Phân tích báo cáo', 'Tài chính'],
    description: 'Đánh giá sức khỏe tài chính doanh nghiệp từ Báo cáo Tài chính năm.',
    prompt: `Tôi muốn phân tích sức khỏe tài chính cho doanh nghiệp [Tên doanh nghiệp] dựa trên số liệu báo cáo mới nhất.

Đóng vai Phân tích viên Tài chính Doanh nghiệp Senior.
Hãy phân tích bộ chỉ số tài chính cốt lõi gồm:
1. Khả năng thanh toán (Liquidity): Current Ratio, Quick Ratio, Cash Ratio.
2. Hiệu quả vận hành (Activity): Inventory Turnover, DSO (Số ngày thu tiền bình quân).
3. Đòn bẩy tài chính (Solvency): Debt-to-Equity, Interest Coverage Ratio.
4. Khả năng sinh lời (Profitability): Gross Margin, Net Margin, ROA, ROE.
Đề xuất 3 khuyến nghị hành động cải thiện dựa trên các chỉ số yếu.`,
    placeholders: [
      { key: 'Tên doanh nghiệp', label: 'Tên doanh nghiệp', defaultValue: 'Công ty Cổ phần Sản xuất Nhựa Việt' }
    ]
  },
  {
    id: 'fin-pricing-tier-strategy',
    title: 'Xây dựng Chiến lược Giá theo Tầng (Tiered Pricing Strategy)',
    department: 'Tài chính & Kế toán',
    industry: 'Công nghệ & SaaS',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Nâng cao',
    tags: ['Pricing Strategy', 'Định giá', 'Tài chính', 'SaaS'],
    description: 'Thiết kế khung bảng giá 3 tầng (Basic, Pro, Enterprise) tối đa hóa lợi nhuận.',
    prompt: `Sản phẩm dịch vụ của chúng tôi: [Sản phẩm dịch vụ].

Đóng vai Chuyên gia Định giá Sản phẩm (Pricing Strategist).
Hãy thiết kế Bảng giá 3 tầng (3-Tiered Pricing Structure):
1. Gói Basic (Nhắm vào khách hàng nhạy cảm về giá): Tính năng giới hạn, giá thu hút.
2. Gói Professional (Gói chủ lực chiếm 70% doanh thu): Đầy đủ tính năng thiết yếu, tạo cảm giác đáng tiền nhất (Anchor effect).
3. Gói Enterprise (Dành cho khách hàng lớn): Tùy chỉnh cao, hỗ trợ 1-1, giá cao.
Nêu rõ chiến thuật tâm lý học định giá được áp dụng.`,
    placeholders: [
      { key: 'Sản phẩm dịch vụ', label: 'Sản phẩm/Dịch vụ', defaultValue: 'Phần mềm Quản lý Dự án & Task công việc trực tuyến' }
    ]
  },
  {
    id: 'fin-unit-economics-cac-ltv',
    title: 'Tính toán Chi tiết Unit Economics (CAC, LTV, Payback Period)',
    department: 'Tài chính & Kế toán',
    industry: 'Bán lẻ & E-commerce',
    recommendedModel: 'Claude 3.5 Sonnet / ChatGPT 4o',
    difficulty: 'Nâng cao',
    tags: ['Unit Economics', 'CAC', 'LTV', 'Tài chính'],
    description: 'Đánh giá tính khả thi tài chính của mô hình kinh doanh trên từng đơn vị khách hàng.',
    prompt: `Chúng tôi vận hành mô hình kinh doanh [Mô hình kinh doanh].
Chi phí Marketing & Sales tháng: [Chi phí Mkt Sales]. Số khách hàng mới kiếm được: [Số khách hàng mới].
Giá trị trung bình đơn hàng: [Giá trị đơn hàng]. Tỷ lệ khách hàng quay lại: [Tỷ lệ quay lại %].

Đóng vai Chuyên gia Tài chính Startup & Growth.
Hãy tính toán & phân tích chỉ số Unit Economics:
1. Chi phí Phụ thuộc / Thu hút 1 Khách hàng (CAC - Customer Acquisition Cost).
2. Giá trị Vòng đời Khách hàng (LTV - Lifetime Value).
3. Tỷ lệ LTV / CAC (Đánh giá mô hình có bền vững không: Ngưỡng chuẩn > 3x).
4. Thời gian Hoàn vốn Thu hút Khách hàng (Payback Period).
5. Khuyến nghị 3 cách giảm CAC và tăng LTV.`,
    placeholders: [
      { key: 'Mô hình kinh doanh', label: 'Mô hình kinh doanh', defaultValue: 'Ứng dụng Bán đồ ăn sạch Đăng ký định kỳ (Subscription)' },
      { key: 'Chi phí Mkt Sales', label: 'Chi phí Mkt + Sales/Tháng', defaultValue: '150 triệu VNĐ' },
      { key: 'Số khách hàng mới', label: 'Số KH mới/Tháng', defaultValue: '500 khách hàng' },
      { key: 'Giá trị đơn hàng', label: 'Giá trị đơn hàng trung bình', defaultValue: '450.000 VNĐ' },
      { key: 'Tỷ lệ quay lại %', label: 'Tỷ lệ khách quay lại', defaultValue: '40% / tháng' }
    ]
  },

  // --- VẬN HÀNH & SẢN XUẤT ---
  {
    id: 'ops-sop-standard-procedure',
    title: 'Chuẩn hóa Quy trình Thao tác Chuẩn (SOP) Vận hành',
    department: 'Vận hành & Sản xuất',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Cơ bản',
    tags: ['SOP', 'Quy trình', 'Vận hành', 'Standardization'],
    description: 'Soạn thảo văn bản quy trình SOP từng bước giúp nhân viên mới dễ dàng làm theo.',
    prompt: `Tôi cần viết Quy trình Thao tác Chuẩn (SOP) cho công việc: [Tên công việc cần đóng gói quy trình] tại phòng ban [Phòng ban].

Đóng vai Chuyên gia Chuẩn hóa Quy trình Vận hành (SOP Specialist).
Hãy soạn thảo bản SOP theo chuẩn ISO:
1. Mục đích & Phạm vi áp dụng.
2. Trách nhiệm thực hiện (RACI Matrix: Ai làm, Ai duyệt, Ai hỗ trợ, Ai nhận thông tin).
3. Các bước thực hiện chi tiết (Step-by-step: Bước 1, Bước 2, Bước 3 kèm Mẫu tài liệu / Công cụ sử dụng).
4. Tiêu chuẩn đầu ra (Checklist kiểm tra chất lượng).
5. Các lỗi thường gặp và cách xử lý sự cố.`,
    placeholders: [
      { key: 'Tên công việc cần đóng gói quy trình', label: 'Tên công việc', defaultValue: 'Xử lý & Đóng gói Đơn hàng Xuất kho Bán lẻ' },
      { key: 'Phòng ban', label: 'Phòng ban', defaultValue: 'Phòng Kho vận & Giao nhận' }
    ]
  },
  {
    id: 'ops-supply-chain-jit-inventory',
    title: 'Tối ưu Hàng tồn kho & Quản trị Rủi ro Chuỗi Cung ứng (JIT)',
    department: 'Vận hành & Sản xuất',
    industry: 'Sản xuất & Chế biến',
    recommendedModel: 'Claude 3.5 Sonnet / ChatGPT 4o',
    difficulty: 'Nâng cao',
    tags: ['Supply Chain', 'Tồn kho', 'JIT', 'Vận hành'],
    description: 'Mô hình quản lý hàng tồn kho Just-In-Time giúp giảm chi phí lưu kho và đọng vốn.',
    prompt: `Nhà máy của chúng tôi sản xuất [Sản phẩm]. Tỷ lệ hàng tồn kho nguyên vật liệu hiện tại khá cao gây đọng vốn [Số tiền đọng vốn].

Đóng vai Giám đốc Chuỗi Cung ứng (Supply Chain Director).
Hãy thiết kế Phương án Tối ưu Tồn kho theo mô hình Just-In-Time (JIT):
1. Tính toán Mức Tồn kho An toàn (Safety Stock) và Điểm Đặt hàng lại (Reorder Point - ROP).
2. Quy trình làm việc với Nhà cung cấp nguyên vật liệu để rút ngắn Lead Time giao hàng.
3. Phân loại vật tư theo Mô hình ABC (Hạng A: Giá trị cao cần quản lý chặt, Hạng B, Hạng C).
4. Ma trận Quản trị Rủi ro khi đứt gãy chuỗi cung ứng (Kịch bản chậm hàng, tắc biên...).`,
    placeholders: [
      { key: 'Sản phẩm', label: 'Sản phẩm sản xuất', defaultValue: 'Linh kiện Kim loại Cơ khí Chính xác' },
      { key: 'Số tiền đọng vốn', label: 'Vốn đọng tồn kho', defaultValue: '4.5 tỷ VNĐ' }
    ]
  },
  {
    id: 'ops-vendor-scorecard-eval',
    title: 'Bảng Đánh giá & Lựa chọn Nhà cung cấp (Vendor Scorecard)',
    department: 'Vận hành & Sản xuất',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Trung cấp',
    tags: ['Vendor Evaluation', 'Nhà cung cấp', 'Procurement', 'Vận hành'],
    description: 'Bộ tiêu chí chấm điểm định lượng lựa chọn nhà cung cấp uy tín & giá tốt.',
    prompt: `Chúng tôi cần lựa chọn Nhà cung cấp cho dịch vụ/nguyên liệu: [Loại hàng hóa dịch vụ mua sắm].

Đóng vai Trưởng phòng Mua sắm Doanh nghiệp (Procurement Manager).
Hãy thiết kế Bảng Tiêu chí Đánh giá Nhà cung cấp (Vendor Scorecard) gồm 5 tiêu chí:
1. Chất lượng Hàng hóa / Dịch vụ (Trọng số 30%).
2. Giá cả & Điều khoản Thanh toán (Trọng số 25%).
3. Tốc độ Giao hàng & Tiến độ (Trọng số 20%).
4. Năng lực Pháp lý & Uy tín Thương hiệu (Trọng số 15%).
5. Dịch vụ Hậu mãi & Hỗ trợ Kỹ thuật (Trọng số 10%).
Gồm thang điểm 1-5 và biểu mẫu chấm điểm so sánh 3 Nhà cung cấp cùng lúc.`,
    placeholders: [
      { key: 'Loại hàng hóa dịch vụ mua sắm', label: 'Hàng hóa/Dịch vụ mua', defaultValue: 'Bao bì Giấy Carton In ấn Khổ lớn' }
    ]
  },
  {
    id: 'ops-lean-kaizen-improvement',
    title: 'Lập Kế hoạch Cải tiến Cụ thể theo Triết lý Lean/Kaizen',
    department: 'Vận hành & Sản xuất',
    industry: 'Sản xuất & Chế biến',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Trung cấp',
    tags: ['Lean', 'Kaizen', '5S', 'Vận hành'],
    description: 'Chiến dịch cải tiến liên tục Kaizen loại bỏ 8 lãng phí (Muda) trong xưởng sản xuất/văn phòng.',
    prompt: `Chúng tôi muốn triển khai chương trình Cải tiến Kaizen & 5S tại khu vực: [Khu vực triển khai: Xưởng / Văn phòng / Kho].

Đóng vai Chuyên gia Lean Six Sigma.
Hãy lập Kế hoạch Triển khai Kaizen 30 Ngày:
1. Nhận diện 8 loại Lãng phí (Muda) trong khu vực [Khu vực triển khai].
2. Quy trình 5S (Sàng lọc, Sắp xếp, Sạch sẽ, Săn sóc, Sẵn sàng) chi tiết tuần từng bước.
3. Mẫu Phiếu Đề xuất Cải tiến Kaizen đơn giản cho công nhân/nhân viên gửi ý kiến.
4. Cơ chế thưởng nóng cho các ý kiến cải tiến giúp tiết kiệm chi phí/thời gian.`,
    placeholders: [
      { key: 'Khu vực triển khai: Xưởng / Văn phòng / Kho', label: 'Khu vực áp dụng', defaultValue: 'Kho Vận hành & Đóng gói Hàng hóa' }
    ]
  },
  {
    id: 'ops-sla-kpi-internal-framework',
    title: 'Thiết lập Cam kết Chất lượng Dịch vụ Nội bộ (SLA & OLA)',
    department: 'Vận hành & Sản xuất',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Trung cấp',
    tags: ['SLA', 'OLA', 'Chất lượng vận hành', 'Cross-department'],
    description: 'Cam kết thời gian phản hồi & xử lý công việc giữa các phòng ban nội bộ.',
    prompt: `Phòng Vận hành/IT/HR thường xuyên bị các phòng ban khác phản ánh là phối hợp chậm chạp.
Chúng tôi muốn thiết lập Thỏa thuận Cam kết Dịch vụ Nội bộ (Internal SLA) giữa [Phòng cung cấp dịch vụ] và [Phòng sử dụng dịch vụ].

Đóng vai Chuyên gia Quản trị Chất lượng Vận hành.
Hãy xây dựng Khung SLA Nội bộ:
1. Danh mục 5 Yêu cầu công việc phổ biến nhất giữa 2 phòng ban.
2. Mức Cam kết Thời gian Phản hồi (Response Time) & Thời gian Hoàn thành (Resolution Time) cho từng yêu cầu.
3. Quy trình Khiếu nại (Escalation Path) khi vi phạm SLA.
4. Mẫu Báo cáo Tuân thủ SLA hàng tháng.`,
    placeholders: [
      { key: 'Phòng cung cấp dịch vụ', label: 'Phòng cung cấp', defaultValue: 'Phòng IT & Hỗ trợ Kỹ thuật' },
      { key: 'Phòng sử dụng dịch vụ', label: 'Phòng tiếp nhận', defaultValue: 'Toàn bộ khối Kinh doanh & Văn phòng' }
    ]
  },
  {
    id: 'ops-warehouse-layout-optimization',
    title: 'Thiết kế & Tối ưu Bố trí Kho hàng & Luồng Luân chuyển',
    department: 'Vận hành & Sản xuất',
    industry: 'Bán lẻ & E-commerce',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Trung cấp',
    tags: ['Kho hàng', 'Logistics', 'Warehouse Layout', 'Vận hành'],
    description: 'Tối ưu sơ đồ kho giúp giảm 40% thời gian di chuyển lấy hàng (Pick & Pack).',
    prompt: `Kho hàng của chúng tôi rộng [Diện tích kho m2] đang lưu trữ khoảng [Số lượng SKU] mã sản phẩm.

Đóng vai Chuyên gia Thiết kế Logistics & Kho vận.
Hãy đề xuất Phương án Bố trí Kho thông minh (Warehouse Layout):
1. Phân khu chức năng (Inbound, Storage, Picking Area, Packing Area, Outbound).
2. Nguyên lý xếp hàng theo Tần suất Bán ra (Fast-moving vs Slow-moving items).
3. Tối ưu luồng di chuyển 1 chiều (One-way flow) chống ùn tắc.
4. Mẫu danh mục kiểm tra an toàn PCCC & Lao động trong kho.`,
    placeholders: [
      { key: 'Diện tích kho m2', label: 'Diện tích kho', defaultValue: '500 m2' },
      { key: 'Số lượng SKU', label: 'Số mã SKU', defaultValue: '1.200 SKU sản phẩm mỹ phẩm & tiêu dùng' }
    ]
  },

  // --- IT & CHUYỂN ĐỔI SỐ ---
  {
    id: 'it-system-architecture-audit',
    title: 'Báo cáo Đánh giá Kiến trúc Hệ thống CNTT & Khả năng Mở rộng',
    department: 'IT & Chuyển đổi số',
    industry: 'Công nghệ & SaaS',
    recommendedModel: 'Claude 3.5 Sonnet / ChatGPT 4o',
    difficulty: 'Nâng cao',
    tags: ['System Architecture', 'IT Audit', 'Scalability', 'Tech Stack'],
    description: 'Đánh giá kiến trúc phần mềm, cơ sở dữ liệu và khả năng chịu tải của hệ thống.',
    prompt: `Hệ thống ứng dụng hiện tại của chúng tôi: [Tên hệ thống/Ứng dụng]. Lượng người dùng hiện tại: [Lượng người dùng]. Target mở rộng trong 1 năm tới: [Target mở rộng].

Đóng vai Kiến trúc sư Hệ thống Senior (Principal System Architect).
Hãy thực hiện Báo cáo Đánh giá Kiến trúc (Architecture Review):
1. Đánh giá Tech Stack hiện tại (Backend, Frontend, Database, Infrastructure).
2. Nhận diện các "Điểm nghẽn Cổ chai" (Bottlenecks) về chịu tải khi lượng truy cập tăng 5x.
3. Đề xuất Kiến trúc Mới (Microservices / Serverless / Caching strategy) để đảm bảo độ khả dụng 99.99%.
4. Lộ trình nâng cấp hệ thống không làm gián đoạn dịch vụ đang chạy.`,
    placeholders: [
      { key: 'Tên hệ thống/Ứng dụng', label: 'Tên hệ thống', defaultValue: 'Nền tảng Nạp tiền & Thanh toán Bán lẻ' },
      { key: 'Lượng người dùng', label: 'Lượng dùng hiện tại', defaultValue: '20.000 DAU (Daily Active Users)' },
      { key: 'Target mở rộng', label: 'Target mở rộng', defaultValue: '100.000 DAU trong 12 tháng' }
    ]
  },
  {
    id: 'it-cybersecurity-policy-guide',
    title: 'Khung Chính sách An toàn Thông tin & Bảo mật Dữ liệu ISO 27001',
    department: 'IT & Chuyển đổi số',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Nâng cao',
    tags: ['Bảo mật', 'Cybersecurity', 'ISO 27001', 'IT Policy'],
    description: 'Bộ quy định an toàn thông tin ngăn chặn nguy cơ rò rỉ dữ liệu khách hàng & mã độc.',
    prompt: `Doanh nghiệp [Tên doanh nghiệp] muốn ban hành Bộ Chính sách Bảo mật Thông tin Nội bộ.

Đóng vai Giám đốc An ninh Thông tin (CISO).
Hãy soạn thảo Khung Chính sách Bảo mật Dữ liệu theo chuẩn ISO 27001 gồm:
1. Quy định Quản lý Tài khoản & Mật khẩu (Password Policy, MFA 2 lớp).
2. Quy định Phân quyền Truy cập Dữ liệu Khách hàng (Principle of Least Privilege).
3. Quy định An toàn Thiết bị Cá nhân làm việc (BYOD Policy).
4. Quy trình 4 bước Xử lý Sự cố Rò rỉ Dữ liệu / Mã độc Ransomware khẩn cấp.`,
    placeholders: [
      { key: 'Tên doanh nghiệp', label: 'Tên doanh nghiệp', defaultValue: 'Công ty Tài chính Công nghệ VFin' }
    ]
  },
  {
    id: 'it-cloud-migration-strategy',
    title: 'Kế hoạch Dịch chuyển Hệ thống CNTT Lên Điện toán Đám mây',
    department: 'IT & Chuyển đổi số',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'Claude 3.5 Sonnet / ChatGPT 4o',
    difficulty: 'Nâng cao',
    tags: ['Cloud Migration', 'AWS', 'GCP', 'Azure', 'IT Infrastructure'],
    description: 'Lộ trình chuyển đổi máy chủ On-Premise lên Cloud an toàn, tiết kiệm chi phí.',
    prompt: `Chúng tôi đang vận hành máy chủ vật lý On-Premise và muốn dịch chuyển lên Nền tảng Cloud (AWS / Google Cloud / Azure).

Đóng vai Chuyên gia Cloud Solutions Architect.
Hãy lập Kế hoạch Dịch chuyển Cloud (Cloud Migration Strategy) theo phương pháp 6R:
1. Phân loại ứng dụng theo phương pháp (Rehost, Replatform, Refactor...).
2. Dự toán so sánh chi phí TCO (Total Cost of Ownership) On-Premise vs Cloud.
3. Lộ trình triển khai 5 bước để dữ liệu được đồng bộ an toàn, gián đoạn tối đa < 2 tiếng.
4. Kế hoạch Sao lưu (Backup) & Phục hồi Dữ liệu tự động.`,
    placeholders: []
  },
  {
    id: 'it-ai-automation-roadmap',
    title: 'Lộ trình Ứng dụng AI & Tự động hóa Quy trình Workflows (RPA/AI)',
    department: 'IT & Chuyển đổi số',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o / Claude 3.5 Sonnet',
    difficulty: 'Trung cấp',
    tags: ['AI Roadmap', 'Automation', 'RPA', 'Digital Transformation'],
    description: 'Xác định các tác vụ lặp đi lặp lại có thể tự động hóa bằng AI Agents & Make/n8n.',
    prompt: `Doanh nghiệp chúng tôi muốn ứng dụng AI và Tự động hóa (Automation) vào vận hành hàng ngày.

Đóng vai Chuyên gia AI & Process Automation.
Hãy xây dựng Lộ trình Tự động hóa Vận hành:
1. Nhận diện 5 công việc văn phòng tốn nhiều thời gian lặp lại nhất (Nhập liệu, Gửi mail, Báo cáo, CSAT...).
2. Đề xuất Công cụ AI & Automation phù hợp (Ví dụ: Make.com, n8n, ChatGPT API, Claude Agent).
3. Sơ đồ Luồng Tự động hóa (Workflow Automation Diagram) cho 1 quy trình mẫu.
4. Bảng tính toán Thời gian Tiết kiệm được của nhân sự sau khi tự động hóa.`,
    placeholders: []
  },
  {
    id: 'it-rfp-software-procurement',
    title: 'Yêu cầu Báo giá & Hồ sơ Mời thầu Giải pháp Phần mềm (RFP)',
    department: 'IT & Chuyển đổi số',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Trung cấp',
    tags: ['RFP', 'Phần mềm', 'Procurement', 'IT'],
    description: 'Hồ sơ mời thầu chuẩn mực gửi các đối tác phần mềm (ERP/CRM/HRM).',
    prompt: `Chúng tôi cần mua giải pháp phần mềm: [Tên giải pháp phần mềm, ví dụ: Phần mềm ERP / CRM].

Đóng vai Giám đốc Công nghệ (CTO).
Hãy soạn thảo Tài liệu Mời thầu Yêu cầu Giải pháp (Request for Proposal - RFP) gồm:
1. Tổng quan Doanh nghiệp & Bài toán Vận hành cần giải quyết.
2. Danh mục Yêu cầu Tính năng (Functional Requirements - Phải có vs Nên có).
3. Danh mục Yêu cầu Kỹ thuật & Bảo mật (Non-Functional Requirements: SLA, Security, API Integration).
4. Tiêu chí Đánh giá & Khung Báo giá yêu cầu các Nhà thầu nộp.`,
    placeholders: [
      { key: 'Tên giải pháp phần mềm, ví dụ: Phần mềm ERP / CRM', label: 'Giải pháp phần mềm', defaultValue: 'Hệ thống Quản trị Quan hệ Khách hàng B2B CRM' }
    ]
  },
  {
    id: 'it-disaster-recovery-drp',
    title: 'Lập Kế hoạch Phục hồi Sau Thảm họa CNTT (Disaster Recovery Plan)',
    department: 'IT & Chuyển đổi số',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Nâng cao',
    tags: ['Disaster Recovery', 'RTO', 'RPO', 'IT Security'],
    description: 'Kịch bản ứng phó sự cố thiên tai, hỏa hoạn, lỗi server đảm bảo hệ thống phục hồi nhanh.',
    prompt: `Doanh nghiệp chúng tôi muốn xây dựng Kế hoạch Phục hồi sau Thảm họa CNTT (Disaster Recovery Plan - DRP).

Đóng vai Chuyên gia An toàn Hệ thống.
Hãy thiết kế Bản DRP gồm:
1. Xác định Mục tiêu Thời gian Phục hồi (RTO - Recovery Time Objective) và Mục tiêu Điểm Phục hồi (RPO - Recovery Point Objective).
2. Kịch bản ứng phó cho 3 thảm họa: Sập Server chính, Rò rỉ dữ liệu mã hóa Ransomware, Mất kết nối Mạng diện rộng.
3. Quy trình khôi phục dữ liệu từ bản Backup dự phòng.
4. Lịch trình Diễn tập Phục hồi Thảm họa (DR Drill) định kỳ.`,
    placeholders: []
  },

  // --- CHĂM SÓC KHÁCH HÀNG (CS) ---
  {
    id: 'cs-nps-survey-action-plan',
    title: 'Phân tích Phản hồi NPS Khách hàng & Kế hoạch Cải thiện CSAT',
    department: 'Chăm sóc Khách hàng',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Trung cấp',
    tags: ['NPS', 'CSAT', 'Customer Experience', 'CS'],
    description: 'Phân tích nguyên nhân điểm NPS thấp và lập kế hoạch nâng cao độ hài lòng.',
    prompt: `Kết quả đo lường chỉ số Hài lòng Khách hàng (NPS) vừa qua của công ty [Tên công ty] đạt điểm [Điểm NPS hiện tại]. Tỷ lệ chê (Detractors) chiếm [Tỷ lệ Detractors %].

Đóng vai Giám đốc Trải nghiệm Khách hàng (CX Director).
Hãy lập Kế hoạch Cải thiện Điểm Hài lòng Khách hàng:
1. Phân nhóm 5 nguyên nhân hàng đầu khiến khách hàng không hài lòng.
2. Quy trình "Đóng Vòng Phản hồi" (Closed-Loop Feedback) liên hệ lại khách chê trong 24h.
3. 3 Sáng kiến nâng cao trải nghiệm vượt kỳ vọng (Surprise & Delight).
4. KPI mục tiêu đưa điểm NPS tăng lên mốc mới trong 3 tháng.`,
    placeholders: [
      { key: 'Tên công ty', label: 'Tên công ty', defaultValue: 'Chuỗi Phòng tập Gym Fitness Center' },
      { key: 'Điểm NPS hiện tại', label: 'Điểm NPS hiện tại', defaultValue: '+28' },
      { key: 'Tỷ lệ Detractors %', label: 'Tỷ lệ Detractors', defaultValue: '22%' }
    ]
  },
  {
    id: 'cs-escalation-matrix-crisis',
    title: 'Quy trình Xử lý Khiếu nại Gay gắt & Escalation Matrix',
    department: 'Chăm sóc Khách hàng',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Cơ bản',
    tags: ['Khiếu nại', 'Escalation', 'Customer Support', 'CS'],
    description: 'Sơ đồ chuyển giao khiếu nại khách hàng từ nhân viên CS lên Trưởng phòng & CEO.',
    prompt: `Bộ phận CSKH của chúng tôi cần quy trình xử lý các ca khiếu nại phức tạp, khách hàng giận giữ.

Đóng vai Trưởng phòng Chăm sóc Khách hàng (CS Manager).
Hãy thiết kế Ma trận Chuyển giao Khiếu nại (Escalation Matrix):
1. Phân loại 3 Cấp độ Mức độ Sự cố (Level 1: Nhẹ, Level 2: Nghiêm trọng, Level 3: Khẩn cấp/Nguy cơ khủng hoảng).
2. Quyền hạn đền bù tài chính của từng cấp (Nhân viên đền bù tối đa bao nhiêu, Trưởng nhóm bao nhiêu).
3. Kịch bản mẫu câu nói xoa dịu cơn giận của khách hàng ngay trên điện thoại (De-escalation Script).
4. Quy trình báo cáo & bài học kinh nghiệm sau sự cố.`,
    placeholders: []
  },
  {
    id: 'cs-vip-account-retention',
    title: 'Playbook Chăm sóc Khách hàng Đặc biệt VIP & Key Account',
    department: 'Chăm sóc Khách hàng',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Trung cấp',
    tags: ['VIP Service', 'Key Account', 'CSKH', 'CS'],
    description: 'Kế hoạch chăm sóc cá nhân hóa dành riêng cho Top 20% khách hàng mang lại 80% doanh thu.',
    prompt: `Chúng tôi có nhóm Khách hàng VIP / Key Account mang lại phần lớn doanh thu cho [Tên doanh nghiệp].

Đóng vai Giám đốc Dịch vụ Khách hàng VIP.
Hãy thiết kế Playbook Chăm sóc Khách hàng VIP:
1. Đặc quyền dành riêng cho khách VIP (Đường dây nóng riêng, Hỗ trợ 24/7, Quà sinh nhật cá nhân hóa).
2. Lịch trình tương tác chủ động (Quarterly Business Review - QBR) thăm hỏi định kỳ.
3. Kịch bản xử lý khi khách VIP dọa hủy hợp đồng / chuyển sang đối thủ.
4. Đo lường chỉ số Churn Rate của nhóm khách VIP.`,
    placeholders: [
      { key: 'Tên doanh nghiệp', label: 'Tên doanh nghiệp', defaultValue: 'Ngân hàng Thương mại Cổ phần' }
    ]
  },
  {
    id: 'cs-chatbot-kb-builder',
    title: 'Xây dựng Cơ sở Tri thức (Knowledge Base) & Kịch bản Chatbot AI',
    department: 'Chăm sóc Khách hàng',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'ChatGPT 4o',
    difficulty: 'Cơ bản',
    tags: ['Knowledge Base', 'Chatbot AI', 'FAQ', 'CS'],
    description: 'Bộ câu hỏi FAQ & kịch bản hội thoại tự động trả lời 80% thắc mắc khách hàng.',
    prompt: `Chúng tôi muốn cài đặt Chatbot AI hỗ trợ tư vấn tự động cho [Sản phẩm dịch vụ].

Đóng vai Chuyên gia Tự động hóa CSKH.
Hãy xây dựng Bộ Cơ sở Tri thức (Knowledge Base) cho Chatbot AI gồm:
1. 15 Câu hỏi thường gặp nhất (FAQ) chia thành 3 nhóm: Giá & Khuyến mãi, Hướng dẫn sử dụng, Chính sách Đổi trả/Bảo hành.
2. Với mỗi câu hỏi: Cung cấp câu trả lời ngắn gọn, thân thiện, kèm link/nút bấm CTA.
3. Quy trình chuyển giao hội thoại từ Chatbot sang Nhân viên thật (Human Handoff) mượt mà khi Bot không trả lời được.`,
    placeholders: [
      { key: 'Sản phẩm dịch vụ', label: 'Sản phẩm/Dịch vụ', defaultValue: 'Thương hiệu Thời trang Nữ Online' }
    ]
  },
  {
    id: 'cs-customer-journey-touchpoints',
    title: 'Vẽ Bản đồ Hành trình Khách hàng & Tối ưu Điểm chạm Trải nghiệm',
    department: 'Chăm sóc Khách hàng',
    industry: 'Tất cả ngành nghề',
    recommendedModel: 'Claude 3.5 Sonnet / ChatGPT 4o',
    difficulty: 'Nâng cao',
    tags: ['Customer Journey', 'Touchpoints', 'CX', 'Trải nghiệm khách hàng'],
    description: 'Phân tích tâm lý khách hàng qua từng giai đoạn từ Nhận biết đến Trung thành.',
    prompt: `Doanh nghiệp của chúng tôi: [Tên doanh nghiệp] thuộc ngành [Ngành nghề].

Đóng vai Kiến trúc sư Trải nghiệm Khách hàng (Customer Journey Architect).
Hãy thiết kế Bản đồ Hành trình Khách hàng (Customer Journey Map) qua 5 giai đoạn:
1. Nhận biết (Awareness) -> 2. Cân nhắc (Consideration) -> 3. Mua hàng (Purchase) -> 4. Sử dụng (Service) -> 5. Trung thành (Loyalty).

Với mỗi giai đoạn, chỉ rõ:
- Hành động của khách hàng
- Điểm chạm (Touchpoints: Website, Sales, App, CSKH...)
- Cảm xúc & Nỗi đau tiềm ẩn
- Cơ hội tạo sự đứt phá trải nghiệm (WOW Moments).`,
    placeholders: [
      { key: 'Tên doanh nghiệp', label: 'Tên doanh nghiệp', defaultValue: 'Ứng dụng Học Tiếng Anh Trực tuyến' },
      { key: 'Ngành nghề', label: 'Ngành nghề', defaultValue: 'EdTech & Giáo dục' }
    ]
  }
];
