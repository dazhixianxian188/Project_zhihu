// ============================================================
// 知护 · 统一 AI 风险数据结构（第5段）
// 所有风险输出必须使用此结构，禁止 risk=true 这种简单布尔。
// 必须包含：风险 + 依据 + 解释 + 不确定性 + 建议。
// ============================================================
import type { InterventionLevel, RiskCategory } from './index';

/** 统一 AI 风险发现结构 */
export interface RiskFinding {
  /** 风险类型：信息 / 网络交往 / 学习偏航 */
  riskType: RiskCategory;
  /** 事件风险等级（是事件风险，不是学生身份标签） */
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  /** 置信度 0-1 */
  confidence: number;
  /** 分析依据：客观事实与证据 */
  evidence: string[];
  /** 风险原因解释 */
  explanation: string;
  /** 不确定性：需要进一步确认的部分 */
  uncertainty: string;
  /** 建议行动 */
  suggestedActions: string[];
  /** 自适应柔性干预等级 */
  interventionLevel: InterventionLevel;
  /** 是否需要人工复核（高风险必须人工确认） */
  requiresHumanReview: boolean;
}

/** 风险等级描述：始终描述"事件"，不描述"学生" */
export const RISK_LEVEL_TEXT: Record<RiskFinding['riskLevel'], string> = {
  low: '当前事件风险较低，持续关注即可。',
  medium: '当前事件存在需要关注的迹象，建议了解背景。',
  high: '当前事件风险等级较高，建议尽快人工确认。',
  critical: '当前事件风险等级高，需立即人工介入并提供支持。',
};

// ---------- 角色与权限 ----------

export type Role = 'student' | 'parent' | 'teacher' | 'admin';

export interface RoleMeta {
  role: Role;
  name: string;
  /** 可访问的数据范围 */
  dataAccess: string[];
  /** 默认不能查看的内容（权限隔离） */
  restricted: string[];
}

export const ROLES: RoleMeta[] = [
  {
    role: 'student',
    name: '学生',
    dataAccess: ['本人成长记录', '本人 AI 分析', '本人成长树'],
    restricted: ['其他学生数据', '全校统计明细'],
  },
  {
    role: 'parent',
    name: '家长',
    dataAccess: ['本人孩子成长概览与趋势', '高风险事件通知'],
    restricted: ['孩子全部原始聊天内容（需授权）', '其他学生数据'],
  },
  {
    role: 'teacher',
    name: '教师',
    dataAccess: ['所带班级成长趋势（脱敏聚合）', '需人工复核的风险事件'],
    restricted: ['学生全部原始内容（需授权）', '学生间排名对比'],
  },
  {
    role: 'admin',
    name: '管理员',
    dataAccess: ['全校脱敏趋势', '权限配置', '审计日志', '数据治理'],
    restricted: ['无故浏览学生原始内容'],
  },
];

// ---------- 隐私原则 ----------

export const PRIVACY_PRINCIPLES = [
  { title: '数据最小化', desc: '只使用完成分析所需的数据，不采集无关信息。' },
  { title: '用户授权', desc: '用户清楚什么数据被使用、为什么使用、谁可以查看。' },
  { title: '权限隔离', desc: '家长/教师不能默认查看学生所有原始内容。' },
  { title: 'AI 不直接定性', desc: '一次行为不能直接形成学生身份标签。' },
  { title: '人工复核', desc: '高风险事件必须经过人工确认。' },
  { title: '可解释', desc: 'AI 提供分析依据、风险原因与不确定性。' },
  { title: '可申诉', desc: '学生认为 AI 分析不准确，可以提交反馈。' },
];

/** Demo 数据来源声明（伦理限制：不宣称全量监控） */
export const DATA_SOURCE_NOTICE =
  '本页展示为用户主动提供 / 授权数据 / 系统演示数据。知护不监控所有微信、QQ 或社交平台，也不进行全天候或全国学生监控。';

/** 禁止出现的学生身份标签（始终描述事件，不描述学生） */
export const FORBIDDEN_STUDENT_LABELS = ['高危学生', '欺凌者', '受害者', '危险学生', '问题学生'];
