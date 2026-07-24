import React, { useState, useMemo } from 'react';
import { 
  FileSpreadsheet, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface ProjectScoringMatrixProps {
  onNavigate: (path: string) => void;
}

interface Project {
  id: string;
  code: string;
  name: string;
}

interface Criterion {
  id: number;
  name: string;
  weight: number;
  description: string;
  scores: Record<string, { score: number; comment: string }>;
}

const DEFAULT_PROJECTS: Project[] = [
  { id: 'proj-1', code: 'A', name: 'Triển khai Base.vn (Tối ưu vận hành)' },
  { id: 'proj-2', code: 'B', name: 'Mở Chi nhánh mới (Tăng trưởng)' },
  { id: 'proj-3', code: 'C', name: 'Thử nghiệm AI Chatbot R&D (Đổi mới)' },
];

const DEFAULT_CRITERIA: Criterion[] = [
  {
    id: 1,
    name: 'Strategic Fit (Mức độ phù hợp chiến lược)',
    weight: 30,
    description: 'Dự án có trực tiếp phục vụ cho mục tiêu trọng tâm năm nay không?',
    scores: {
      'proj-1': { score: 5, comment: 'Khớp 100% mục tiêu tinh gọn' },
      'proj-2': { score: 3, comment: 'Kế hoạch mở rộng hơi mạo hiểm' },
      'proj-3': { score: 2, comment: 'Chưa tập trung vào bài toán cốt lõi' },
    },
  },
  {
    id: 2,
    name: 'ROI & Business Value (Tỷ suất hoàn vốn & Giá trị)',
    weight: 25,
    description: 'Tốc độ hoàn vốn (Payback), khả năng tạo dòng tiền hoặc giảm chi phí rõ ràng.',
    scores: {
      'proj-1': { score: 4, comment: 'Tiết kiệm ngay 20% chi phí ẩn' },
      'proj-2': { score: 5, comment: 'Mang lại doanh thu trực tiếp' },
      'proj-3': { score: 2, comment: 'Rủi ro ROI không rõ ràng' },
    },
  },
  {
    id: 3,
    name: 'Risk Profile (Mức độ an toàn / Rủi ro thấp)',
    weight: 15,
    description: 'Mức độ kiểm soát rủi ro công nghệ, thị trường và vận hành.',
    scores: {
      'proj-1': { score: 4, comment: 'Rủi ro triển khai rất thấp' },
      'proj-2': { score: 2, comment: 'Rủi ro chôn vốn & tồn kho' },
      'proj-3': { score: 1, comment: 'Rủi ro kỹ thuật & lỗ nặng' },
    },
  },
  {
    id: 4,
    name: 'AI Readiness (Độ sẵn sàng về Data & Công nghệ)',
    weight: 15,
    description: 'Dữ liệu đã chuẩn hóa chưa? Quy trình SOP đã sẵn sàng số hóa/ứng dụng AI chưa?',
    scores: {
      'proj-1': { score: 5, comment: 'SaaS chuẩn hóa, dùng được ngay' },
      'proj-2': { score: 3, comment: 'Chưa cần ứng dụng AI' },
      'proj-3': { score: 2, comment: 'Hạ tầng Data chưa sẵn sàng' },
    },
  },
  {
    id: 5,
    name: 'Resource Capacity (Độ khả thi nguồn lực)',
    weight: 15,
    description: 'Doanh nghiệp có đủ nhân sự giỏi và ngân sách thực thi mà không làm gãy BAU không?',
    scores: {
      'proj-1': { score: 4, comment: 'Tốn ít nhân sự quản trị' },
      'proj-2': { score: 2, comment: 'Thiếu hụt Quản lý chi nhánh' },
      'proj-3': { score: 3, comment: 'Tốn ít người nhưng thiếu chuyên môn' },
    },
  },
];

const PROJECT_COLOR_THEMES = [
  { header: 'bg-emerald-950/90 text-emerald-200', title: 'text-emerald-300', cell: 'bg-emerald-50/30', border: 'border-emerald-300', text: 'text-emerald-900', scoreBg: 'bg-emerald-900/90 text-emerald-100', cardBg: 'bg-emerald-50/50 border-emerald-200/80', focusRing: 'focus:ring-emerald-500' },
  { header: 'bg-amber-950/90 text-amber-200', title: 'text-amber-300', cell: 'bg-amber-50/30', border: 'border-amber-300', text: 'text-amber-900', scoreBg: 'bg-amber-900/90 text-amber-100', cardBg: 'bg-amber-50/50 border-amber-200/80', focusRing: 'focus:ring-amber-500' },
  { header: 'bg-rose-950/90 text-rose-200', title: 'text-rose-300', cell: 'bg-rose-50/30', border: 'border-rose-300', text: 'text-rose-900', scoreBg: 'bg-rose-900/90 text-rose-100', cardBg: 'bg-rose-50/50 border-rose-200/80', focusRing: 'focus:ring-rose-500' },
  { header: 'bg-indigo-950/90 text-indigo-200', title: 'text-indigo-300', cell: 'bg-indigo-50/30', border: 'border-indigo-300', text: 'text-indigo-900', scoreBg: 'bg-indigo-900/90 text-indigo-100', cardBg: 'bg-indigo-50/50 border-indigo-200/80', focusRing: 'focus:ring-indigo-500' },
  { header: 'bg-purple-950/90 text-purple-200', title: 'text-purple-300', cell: 'bg-purple-50/30', border: 'border-purple-300', text: 'text-purple-900', scoreBg: 'bg-purple-900/90 text-purple-100', cardBg: 'bg-purple-50/50 border-purple-200/80', focusRing: 'focus:ring-purple-500' },
  { header: 'bg-cyan-950/90 text-cyan-200', title: 'text-cyan-300', cell: 'bg-cyan-50/30', border: 'border-cyan-300', text: 'text-cyan-900', scoreBg: 'bg-cyan-900/90 text-cyan-100', cardBg: 'bg-cyan-50/50 border-cyan-200/80', focusRing: 'focus:ring-cyan-500' },
];

export default function ProjectScoringMatrix({ onNavigate }: ProjectScoringMatrixProps) {
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [criteria, setCriteria] = useState<Criterion[]>(DEFAULT_CRITERIA);

  // Get color theme for project at index
  const getTheme = (index: number) => PROJECT_COLOR_THEMES[index % PROJECT_COLOR_THEMES.length];

  // Calculate Weighted Scores per Project
  const summary = useMemo(() => {
    let totalWeight = 0;
    const scoresMap: Record<string, number> = {};

    projects.forEach((p) => {
      scoresMap[p.id] = 0;
    });

    criteria.forEach((item) => {
      const w = item.weight / 100;
      totalWeight += item.weight;
      projects.forEach((p) => {
        const itemScore = item.scores[p.id]?.score ?? 3;
        scoresMap[p.id] += w * itemScore;
      });
    });

    const formattedScores: Record<string, number> = {};
    projects.forEach((p) => {
      formattedScores[p.id] = Number(scoresMap[p.id].toFixed(2));
    });

    return {
      totalWeight,
      scores: formattedScores,
    };
  }, [criteria, projects]);

  const getConclusion = (score: number) => {
    if (score >= 4.0) {
      return { 
        label: 'ĐIỀU HÀNH NGAY (ƯU TIÊN 1)', 
        badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 inline mr-1" />
      };
    }
    if (score >= 3.0) {
      return { 
        label: 'HOÃN / XEM XÉT SAU', 
        badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
        icon: <AlertTriangle className="w-4 h-4 text-amber-600 inline mr-1" />
      };
    }
    return { 
      label: 'LOẠI BỎ (REJECT)', 
      badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
      icon: <XCircle className="w-4 h-4 text-rose-600 inline mr-1" />
    };
  };

  const handleUpdateScore = (criterionId: number, projId: string, field: 'score' | 'comment', value: string | number) => {
    setCriteria((prev) =>
      prev.map((c) => {
        if (c.id === criterionId) {
          const prevScoreObj = c.scores[projId] || { score: 3, comment: '' };
          return {
            ...c,
            scores: {
              ...c.scores,
              [projId]: {
                ...prevScoreObj,
                [field]: value,
              },
            },
          };
        }
        return c;
      })
    );
  };

  const handleUpdateCriterion = (id: number, field: keyof Criterion, value: any) => {
    setCriteria((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleAddCriterion = () => {
    const newId = criteria.length > 0 ? Math.max(...criteria.map((c) => c.id)) + 1 : 1;
    const initialScores: Record<string, { score: number; comment: string }> = {};
    projects.forEach((p) => {
      initialScores[p.id] = { score: 3, comment: 'Ghi chú thẩm định' };
    });

    setCriteria([
      ...criteria,
      {
        id: newId,
        name: 'Tiêu chí mới',
        weight: 10,
        description: 'Mô tả ý nghĩa tiêu chí này đối với doanh nghiệp',
        scores: initialScores,
      },
    ]);
  };

  const handleRemoveCriterion = (id: number) => {
    if (criteria.length <= 1) {
      alert('Cần giữ lại ít nhất 1 tiêu chí đánh giá.');
      return;
    }
    setCriteria(criteria.filter((c) => c.id !== id));
  };

  const handleAddProject = () => {
    const nextCharCode = String.fromCharCode(65 + projects.length); // A, B, C, D, ...
    const newProjId = `proj-${Date.now()}`;
    const newProj: Project = {
      id: newProjId,
      code: nextCharCode,
      name: `Dự án ${nextCharCode} (Mục tiêu mới)`,
    };

    setProjects([...projects, newProj]);

    // Populate initial scores for this new project across all criteria
    setCriteria((prev) =>
      prev.map((c) => ({
        ...c,
        scores: {
          ...c.scores,
          [newProjId]: { score: 3, comment: 'Đánh giá sơ bộ' },
        },
      }))
    );
  };

  const handleRemoveProject = (projId: string) => {
    if (projects.length <= 1) {
      alert('Cần giữ lại ít nhất 1 dự án để đánh giá.');
      return;
    }
    setProjects(projects.filter((p) => p.id !== projId));
  };

  const handleUpdateProjectName = (projId: string, newName: string) => {
    setProjects(projects.map((p) => (p.id === projId ? { ...p, name: newName } : p)));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Accent Line */}
      <div className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 w-full" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('/')}>
            <div className="bg-white px-3 py-2 rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
              <img 
                src="https://static-gcdn.basecdn.net/landing/base.vn/image/v2/logo/base.png" 
                alt="Base.vn" 
                className="h-6 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => onNavigate('/')} className="text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors bg-transparent border-none">Trang chủ</button>
            <button onClick={() => { onNavigate('/'); setTimeout(() => { document.getElementById('featured-assessments')?.scrollIntoView({ behavior: 'smooth' }); }, 150); }} className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors bg-transparent border-none">Đánh giá doanh nghiệp</button>
            <button onClick={() => onNavigate('/tool')} className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors bg-transparent border-none flex items-center gap-1.5">
              Tool
              <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider">Free</span>
            </button>
            <button onClick={() => window.open('https://base.vn/blog/', '_blank', 'noopener,noreferrer')} className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors bg-transparent border-none">Tin tức</button>
            <button onClick={() => window.open('https://base.vn/dang-ky-demo?utm_source=base-survey-contact', '_blank', 'noopener,noreferrer')} className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors bg-transparent border-none">Liên hệ</button>
          </nav>

          <button 
            onClick={() => window.open('https://base.vn/dang-ky-demo?utm_source=base-survey', '_blank', 'noopener,noreferrer')}
            className="hidden sm:inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-sm cursor-pointer"
          >
            Tư vấn 1-1 với Chuyên gia Base
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button onClick={() => onNavigate('/')} className="hover:text-emerald-600 transition-colors">Trang chủ</button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button onClick={() => onNavigate('/tool')} className="hover:text-emerald-600 transition-colors">Công cụ Quản trị</button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-medium">Đánh giá và Xếp hạng dự án</span>
        </div>

        {/* Back Button & Title Header */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-emerald-100/80 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
                <FileSpreadsheet className="w-3.5 h-3.5" />
                Công cụ Quản trị CEO &amp; HĐQT
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Đánh giá và Xếp hạng dự án
              </h1>
              <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                Khung ma trận chấm điểm có trọng số (Weighted Scoring Matrix) giúp Thẩm định, Định lượng giá trị &amp; Phân loại thứ tự ưu tiên phê duyệt cho các dự án chiến lược của Doanh nghiệp.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => onNavigate('/tool')}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Về danh mục Tool
              </button>
            </div>
          </div>

          {/* Quick Notice Banner */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4 text-xs">
            <div className="flex items-start gap-2.5 text-slate-700 leading-relaxed">
              <Info className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong>Quy tắc vận hành:</strong> Nhập điểm số từ <strong>1 (Rất thấp)</strong> đến <strong>5 (Rất cao)</strong> cho từng tiêu chí. 
                Thêm/Xóa dự án linh hoạt và điểm số tổng hợp được tự động tính toán theo trọng số <code className="bg-emerald-100 text-emerald-900 px-1 py-0.5 rounded font-mono font-bold">Score = Σ(Weight% × Grade)</code>.
              </div>
            </div>
          </div>
        </div>

        {/* Project Titles Customizer Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Danh sách Dự án cần So sánh ({projects.length} dự án)
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 hidden sm:inline">Chỉnh sửa tên hoặc thêm/bớt dự án trực tiếp</span>
              <button
                onClick={handleAddProject}
                className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-300 font-extrabold px-3 py-1 rounded-lg text-xs hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Thêm dự án mới
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p, idx) => {
              const theme = getTheme(idx);
              return (
                <div key={p.id} className={`p-3.5 rounded-xl border space-y-2 relative group ${theme.cardBg}`}>
                  <div className="flex items-center justify-between">
                    <label className={`text-xs font-black uppercase tracking-wider ${theme.text}`}>
                      Dự án {p.code}
                    </label>
                    {projects.length > 1 && (
                      <button
                        onClick={() => handleRemoveProject(p.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-100 rounded transition-colors cursor-pointer"
                        title={`Xóa dự án ${p.code}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={p.name}
                    onChange={(e) => handleUpdateProjectName(p.id, e.target.value)}
                    className={`w-full bg-white border border-slate-300 text-xs font-semibold text-slate-900 rounded-lg px-3 py-1.5 focus:ring-2 focus:outline-none ${theme.focusRing}`}
                    placeholder={`Tên dự án ${p.code}...`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Matrix Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px] text-xs">
              <thead>
                <tr className="bg-slate-900 text-white font-bold">
                  <th className="p-3.5 border-b border-slate-800 text-center w-12">STT</th>
                  <th className="p-3.5 border-b border-slate-800 min-w-[260px]">Tiêu chí đánh giá (Key Criteria)</th>
                  <th className="p-3.5 border-b border-slate-800 text-center w-28">Trọng số (%)</th>
                  <th className="p-3.5 border-b border-slate-800 min-w-[300px]">Diễn giải tiêu chí</th>
                  
                  {/* Dynamic Project Headers */}
                  {projects.map((p, idx) => {
                    const theme = getTheme(idx);
                    return (
                      <th key={p.id} className={`p-3.5 border-b border-slate-800 min-w-[200px] ${theme.header}`}>
                        <div className="flex items-center justify-between">
                          <div className={`font-extrabold text-sm ${theme.title}`}>Dự án {p.code}</div>
                          {projects.length > 1 && (
                            <button
                              onClick={() => handleRemoveProject(p.id)}
                              className="text-slate-400 hover:text-rose-300 p-0.5 rounded cursor-pointer"
                              title={`Xóa dự án ${p.code}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <div className="text-[11px] font-medium opacity-90 truncate max-w-[180px]">{p.name}</div>
                      </th>
                    );
                  })}

                  <th className="p-3.5 border-b border-slate-800 text-center w-12">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {criteria.map((item, idx) => (
                  <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="p-3 text-center font-bold text-slate-500">{idx + 1}</td>
                    
                    {/* Name */}
                    <td className="p-3">
                      <textarea
                        rows={Math.max(2, Math.ceil((item.name || '').length / 28))}
                        value={item.name}
                        onChange={(e) => handleUpdateCriterion(item.id, 'name', e.target.value)}
                        className="w-full bg-transparent font-bold text-slate-800 focus:bg-white focus:ring-1 focus:ring-emerald-500 rounded px-1.5 py-1 text-xs border border-transparent hover:border-slate-300 transition-colors leading-relaxed resize-y min-h-[48px]"
                      />
                    </td>

                    {/* Weight */}
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={item.weight}
                          onChange={(e) => handleUpdateCriterion(item.id, 'weight', Number(e.target.value))}
                          className="w-16 bg-white border border-slate-300 text-center font-extrabold text-slate-800 rounded px-1.5 py-1 text-xs focus:ring-2 focus:ring-emerald-500"
                        />
                        <span className="font-bold text-slate-500">%</span>
                      </div>
                    </td>

                    {/* Description */}
                    <td className="p-3">
                      <textarea
                        rows={Math.max(2, Math.ceil((item.description || '').length / 32))}
                        value={item.description}
                        onChange={(e) => handleUpdateCriterion(item.id, 'description', e.target.value)}
                        className="w-full bg-transparent text-slate-600 focus:bg-white focus:ring-1 focus:ring-emerald-500 rounded p-1 text-[11px] border border-transparent hover:border-slate-300 transition-colors leading-relaxed resize-y min-h-[48px]"
                      />
                    </td>

                    {/* Dynamic Project Cells */}
                    {projects.map((p, pIdx) => {
                      const theme = getTheme(pIdx);
                      const projScoreObj = item.scores[p.id] || { score: 3, comment: '' };

                      return (
                        <td key={p.id} className={`p-3 text-center ${theme.cell}`}>
                          <div className="flex items-center justify-center gap-2">
                            <span className={`text-[11px] font-bold ${theme.text}`}>Điểm:</span>
                            <select
                              value={projScoreObj.score}
                              onChange={(e) => handleUpdateScore(item.id, p.id, 'score', Number(e.target.value))}
                              className={`bg-white border font-extrabold rounded px-2 py-1 text-xs focus:ring-2 cursor-pointer shadow-sm ${theme.border} ${theme.text} ${theme.focusRing}`}
                            >
                              {[1, 2, 3, 4, 5].map((s) => (
                                <option key={s} value={s}>{s} / 5</option>
                              ))}
                            </select>
                          </div>
                        </td>
                      );
                    })}

                    {/* Delete Action */}
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleRemoveCriterion(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Xóa tiêu chí này"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}

                {/* Weight Total Row */}
                <tr className="bg-slate-100 font-extrabold border-t-2 border-slate-300 text-slate-900">
                  <td colSpan={2} className="p-3.5 uppercase text-right tracking-wider">TỔNG CỘNG TRỌNG SỐ</td>
                  <td className="p-3.5 text-center text-emerald-800 font-black text-sm">
                    <span className={`inline-block px-2.5 py-1 rounded-md border ${summary.totalWeight === 100 ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-rose-100 text-rose-800 border-rose-300'}`}>
                      {summary.totalWeight}%
                    </span>
                  </td>
                  <td colSpan={projects.length + 2} className="p-3.5 text-slate-600 font-medium italic">
                    {summary.totalWeight === 100 ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Tổng trọng số chuẩn xác 100%
                      </span>
                    ) : (
                      <span className="text-rose-700 font-bold flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        Tổng trọng số hiện tại là {summary.totalWeight}%. Khuyên dùng điều chỉnh về 100%.
                      </span>
                    )}
                  </td>
                </tr>

                {/* Weighted Score Row */}
                <tr className="bg-slate-900 text-white font-extrabold text-sm">
                  <td colSpan={4} className="p-4 uppercase text-right tracking-wider">
                    ĐIỂM TỔNG HỢP CÓ TRỌNG SỐ (WEIGHTED SCORE)
                  </td>
                  {projects.map((p, idx) => {
                    const theme = getTheme(idx);
                    const score = summary.scores[p.id] || 0;
                    return (
                      <td key={p.id} className={`p-4 text-center font-black text-lg border-r border-slate-800 ${theme.scoreBg}`}>
                        {score.toFixed(2)} / 5.0
                      </td>
                    );
                  })}
                  <td className="p-4"></td>
                </tr>

                {/* Conclusion Row */}
                <tr className="border-t-2 border-slate-900 font-extrabold text-xs">
                  <td colSpan={4} className="p-4 uppercase text-right text-slate-900 bg-slate-100 tracking-wider">
                    KẾT LUẬN &amp; PHÂN LOẠI ƯU TIÊN PHÊ DUYỆT (FOR CEO)
                  </td>
                  {projects.map((p) => {
                    const score = summary.scores[p.id] || 0;
                    const conc = getConclusion(score);
                    return (
                      <td key={p.id} className="p-4 bg-slate-50 text-center border-r border-slate-200">
                        <span className={`inline-flex items-center px-2.5 py-2 rounded-xl border font-black text-xs shadow-sm ${conc.badgeClass}`}>
                          {conc.icon}
                          {conc.label}
                        </span>
                      </td>
                    );
                  })}
                  <td className="p-4 bg-slate-100"></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table Footer Controls */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <button
              onClick={handleAddCriterion}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4 text-emerald-600" />
              Thêm tiêu chí thẩm định mới
            </button>
          </div>
        </div>

        {/* Executive Guidance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Tránh Bẫy "Cảm Tính &amp; Thiên Vị"</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ma trận chấm điểm bắt buộc các phòng ban phải chứng minh bằng tiêu chí rõ ràng thay vì trình bày ý tưởng chung chung.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Tối Ưu Ngân Sách &amp; Nguồn Lực</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tập trung 80% ngân sách cho các Dự án Ưu tiên 1 (Score ≥ 4.0). Loại bỏ ngay các dự án rủi ro cao hoặc không chuẩn bị đủ Data.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Sẵn Sàng Triển Khai Chuyển Đổi Số</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Đo lường chỉ số AI Readiness và Quy trình SOP hóa trước khi giải ngân cho các giải pháp phần mềm toàn doanh nghiệp.
            </p>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-1 rounded-md border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              Khảo sát Doanh nghiệp Miễn phí
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Đánh giá Mức độ Chuyển đổi số &amp; AI Readiness cho Doanh nghiệp
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Thực hiện bài khảo sát chuẩn hóa 10-15 phút để nhận ngay Báo cáo phân tích khoảng trống vận hành và lộ trình triển khai hạ tầng số chuyên sâu.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
            <button
              onClick={() => onNavigate('/khao-sat-chuyen-doi-so')}
              className="px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs rounded-xl transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              Khảo sát Chuyển đổi số
            </button>
            <button
              onClick={() => onNavigate('/khao-sat-chuyen-doi-ai')}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              Khảo sát AI Readiness
            </button>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs space-y-4">
          <div className="flex items-center justify-center gap-2">
            <img 
              src="https://static-gcdn.basecdn.net/landing/base.vn/image/v2/logo/base.png" 
              alt="Base.vn" 
              className="h-5 object-contain brightness-200"
              referrerPolicy="no-referrer"
            />
          </div>
          <p>© 2026 Base.vn - Nền tảng Quản trị Doanh nghiệp Toàn diện.</p>
        </div>
      </footer>
    </div>
  );
}
