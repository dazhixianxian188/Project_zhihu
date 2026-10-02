// ============================================================
// 知护 —— 核心类型定义（第1段基础架构）
// 统一成长模型 + 三类AI风险感知 + 自适应柔性干预
// ============================================================

/** 成长阶段：同一套AI成长引擎随学生成熟度变化 */
export type GrowthStage = 'A' | 'B' | 'C';

export interface GrowthStageMeta {
  stage: GrowthStage;
  name: string;
  focus: string;
  principle: string;
}

export const GROWTH_STAGES: GrowthStageMeta[] = [
  { stage: 'A', name: '成长保护阶段', focus: '保护 + 引导', principle: 'AI 更多地识别风险并给出直接引导，帮助学生建立基本安全意识。' },
  { stage: 'B', name: '判断能力培养阶段', focus: '解释 + 判断训练', principle: 'AI 解释风险成因，训练学生自己进行信息判断与网络交往判断。' },
  { stage: 'C', name: '自主成长阶段', focus: '分析 + 决策支持 + 自主成长', principle: 'AI 提供分析与决策支持，将最终判断与选择权交给学生。' },
];

// ---------- 成长阶段画像：阶段切换必须联动多维度 ----------
// AI语言 / 分析深度 / 干预强度 / 建议方式 / 页面视觉 / 信息密度 / 知芽形态

export interface StageProfile {
  stage: GrowthStage;
  /** AI 开场白与语气 */
  greeting: string;
  tone: 'simple' | 'explanatory' | 'analytical';
  /** 分析深度：建议条数、信息密度 */
  actionCount: number;
  density: 'low' | 'medium' | 'high';
  /** 知芽形态 */
  budForm: BudForm;
  /** 视觉风格描述 */
  visual: string;
  /** 主题色（用于CSS变量切换） */
  theme: BudTheme;
}

export type BudForm = 'seed' | 'sprout' | 'tree' | 'lush';

export interface BudTheme {
  primary: string;
  primarySoft: string;
  accent: string;
  /** 信息密度对应的字号/间距系数 */
  densityScale: number;
}

export const STAGE_PROFILES: Record<GrowthStage, StageProfile> = {
  A: {
    stage: 'A',
    greeting: '我们一起看看。',
    tone: 'simple',
    actionCount: 3,
    density: 'low',
    budForm: 'sprout',
    visual: '明亮、柔和、圆角、适度插画、轻动画',
    theme: { primary: '#2f9e6b', primarySoft: '#e6f5ee', accent: '#7ed3a8', densityScale: 1 },
  },
  B: {
    stage: 'B',
    greeting: '我们可以一起分析。',
    tone: 'explanatory',
    actionCount: 4,
    density: 'medium',
    budForm: 'tree',
    visual: '更现代、更清晰、更有活力、信息图表更多',
    theme: { primary: '#2b8fd0', primarySoft: '#e8f3fc', accent: '#5cb0ee', densityScale: 0.95 },
  },
  C: {
    stage: 'C',
    greeting: '我可以帮你梳理，你来做最终判断。',
    tone: 'analytical',
    actionCount: 5,
    density: 'high',
    budForm: 'lush',
    visual: '简洁、高级、白/浅灰、蓝绿色、成熟数据图表、少卡通',
    theme: { primary: '#1f7a8c', primarySoft: '#eef6f7', accent: '#3fa9bd', densityScale: 0.9 },
  },
};

// ---------- 知芽成长树：成长阶段 ----------
// 种子 → 嫩芽 → 小树 → 开花 → 结果 → 繁茂
// 真实成长行为 → 解锁成长元素；树越漂亮 ≠ 学生越优秀，只是成长记录。

export type TreeStage = 'seed' | 'sprout' | 'sapling' | 'flowering' | 'fruiting' | 'lush';

export interface TreeStageMeta {
  stage: TreeStage;
  name: string;
  desc: string;
}

export const TREE_STAGES: TreeStageMeta[] = [
  { stage: 'seed', name: '种子', desc: '成长的起点，埋下自主成长的意愿。' },
  { stage: 'sprout', name: '嫩芽', desc: '开始尝试信息判断与自我管理。' },
  { stage: 'sapling', name: '小树', desc: '判断能力逐步建立，学习计划稳定执行。' },
  { stage: 'flowering', name: '开花', desc: '网络素养与表达能力绽放。' },
  { stage: 'fruiting', name: '结果', desc: '能正确处理风险，形成自己的判断。' },
  { stage: 'lush', name: '繁茂', desc: '持续自我管理，成长为独立成熟的个体。' },
];

/** 成长元素：由真实成长行为解锁（非游戏化数值） */
export interface GrowthElement {
  key: string;
  name: string;
  part: 'leaf' | 'branch' | 'flower' | 'fruit' | 'trunk';
  unlockedBy: string; // 触发该元素的真实成长行为
}

export const GROWTH_ELEMENTS: GrowthElement[] = [
  { key: 'leaf', name: '新叶', part: 'leaf', unlockedBy: '信息来源核验' },
  { key: 'branch', name: '新枝', part: 'branch', unlockedBy: '完成学习计划' },
  { key: 'flower', name: '花朵', part: 'flower', unlockedBy: '网络素养学习' },
  { key: 'fruit', name: '果实', part: 'fruit', unlockedBy: '正确处理风险' },
  { key: 'trunk', name: '树干', part: 'trunk', unlockedBy: '持续自我管理' },
];

/** 禁止出现的监控化元素（学生端/全局约束） */
export const FORBIDDEN_MONITORING = [
  '风险排行榜', '危险学生', '违规次数', '沉迷指数', '学生排名', '高危TOP10',
];

// ---------- 统一成长模型：五大核心维度 ----------

export type GrowthDimensionKey =
  | 'infoJudgment'
  | 'digitalLiteracy'
  | 'onlineInteraction'
  | 'selfDirectedLearning'
  | 'selfManagement';

export interface GrowthDimension {
  key: GrowthDimensionKey;
  name: string;
  indicators: string[];
}

export const GROWTH_DIMENSIONS: GrowthDimension[] = [
  {
    key: 'infoJudgment',
    name: '信息判断',
    indicators: ['信息来源识别', '事实/观点区分', '未验证信息识别', '信息可信度判断', '网络语境理解', 'AI生成内容辨别'],
  },
  {
    key: 'digitalLiteracy',
    name: '网络素养',
    indicators: ['网络表达', '网络语言规范', '网络风险识别', '隐私保护', '网络安全意识'],
  },
  {
    key: 'onlineInteraction',
    name: '网络交往',
    indicators: ['异常互动', '持续性负面互动', '针对性攻击', '多人共同攻击', '隐私泄露', '威胁', '疑似网络欺凌'],
  },
  {
    key: 'selfDirectedLearning',
    name: '自主学习',
    indicators: ['学习目标', '学习计划', '实际执行', '目标偏航', '偏航原因', '恢复计划'],
  },
  {
    key: 'selfManagement',
    name: '自我管理',
    indicators: ['计划执行', '时间管理', '风险应对', '自主决策', '问题恢复'],
  },
];

// ---------- 三类AI风险感知 ----------

export type RiskCategory = 'information' | 'network' | 'learning';

export interface RiskCategoryMeta {
  key: RiskCategory;
  name: string;
  pageName: string;
  description: string;
}

export const RISK_CATEGORIES: RiskCategoryMeta[] = [
  { key: 'information', name: '信息风险', pageName: '信息洞察', description: '对文本、图片、截图、网络内容等进行来源、语境、误导与情绪操纵分析。' },
  { key: 'network', name: '网络交往风险', pageName: '网络关系', description: '对互动对象、频率、持续性、攻击与威胁等进行识别，异常≠欺凌。' },
  { key: 'learning', name: '学习偏航', pageName: '学习轨迹', description: '目标→计划→实际行为→偏差→原因→恢复，支持多种学习场景。' },
];

// ---------- 自适应柔性干预：四级 ----------

export type InterventionLevel = 1 | 2 | 3 | 4;

export interface InterventionLevelMeta {
  level: InterventionLevel;
  name: string;
  desc: string;
}

export const INTERVENTION_LEVELS: InterventionLevelMeta[] = [
  { level: 1, name: '轻提醒', desc: '即时提醒，帮助学生注意当下的信息或行为。' },
  { level: 2, name: '解释教育', desc: '解释风险成因，结合素养教育帮助学生理解。' },
  { level: 3, name: '自主恢复', desc: '提供恢复计划与行动建议，由学生自主执行。' },
  { level: 4, name: '支持介入', desc: '严重威胁、隐私泄露、持续网络攻击等情况，遵循授权、权限与人工复核。' },
];

// ---------- AI 输出统一结构：五段式 ----------

export interface AiOutput {
  /** 随成长阶段变化的 AI 开场白 */
  greeting?: string;
  /** ① 我看到了什么 —— 客观描述 */
  observation: string;
  /** ② 为什么值得注意 —— 给出证据 */
  why: string;
  /** ③ 可能存在什么风险 —— 使用"可能""存在迹象""需要进一步确认" */
  risk: string;
  /** ④ 你可以怎么做 —— 给出行动建议 */
  actions: string[];
  /** ⑤ 由你决定 —— 保留学生自主权 */
  autonomy: string;
  /** 对应的干预等级 */
  level: InterventionLevel;
  /** 风险类别 */
  category: RiskCategory;
}

// ---------- 各风险感知的具体数据结构 ----------

// 信息风险感知
export interface InfoRiskInput {
  type: 'text' | 'image' | 'screenshot' | 'web' | 'chat' | 'meme';
  content: string;
}

export interface InfoRiskResult {
  source: string;
  origin: string;
  evidence: string;
  absoluteExpressions: string[];
  emotionalManipulation: string[];
  networkContext: string;
  misunderstanding: string;
  riskPoints: string[];
  judgmentTips: string[];
  output: AiOutput;
}

// 网络交往风险感知
export type NetworkVerdict = 'normal' | 'watch' | 'help';

export interface NetworkRiskResult {
  verdict: NetworkVerdict;
  verdictText: string;
  targets: string;
  duration: string;
  frequency: string;
  emotions: string[];
  privacy: string;
  threats: string;
  exclusion: string;
  emphasized: string; // 异常 ≠ 欺凌
  output: AiOutput;
}

export const NETWORK_VERDICT_TEXT: Record<NetworkVerdict, string> = {
  normal: '正常互动',
  watch: '需要关注',
  help: '建议求助',
};

// 学习偏航感知
export interface LearningTrack {
  goal: string;
  planMinutesPerDay: number;
  actualMinutesPerDay: number;
  scene: string;
}

export interface LearningRiskResult {
  deviation: string;
  possibleCauses: string[];
  recoverySuggestion: string;
  emphasized: string; // AI提供建议，最终选择权属于学生
  output: AiOutput;
}

// ---------- 网络语境与语言素养分析 ----------

export interface ContextAnalysis {
  meme: string;
  slang: string;
  sarcasm: string;
  pun: string;
  emotion: string;
  offensive: string;
  groupLabel: string;
  potentialAttack: string;
  targetedJoke: string;
  escalation: string[]; // 普通梗→重复→固定针对→多人→持续攻击→威胁/隐私
}

// ---------- 学生端模块 ----------

export interface StudentModule {
  key: string;
  name: string;
  desc: string;
}

export const STUDENT_MODULES: StudentModule[] = [
  { key: 'growth', name: '我的成长', desc: '统一成长模型总览' },
  { key: 'insight', name: '信息洞察', desc: 'AI 信息风险感知' },
  { key: 'relations', name: '网络关系', desc: 'AI 网络交往风险感知' },
  { key: 'learning', name: '学习轨迹', desc: 'AI 学习偏航感知' },
  { key: 'records', name: '成长记录', desc: '成长过程记录' },
  { key: 'tree', name: '我的成长树', desc: '知芽成长树' },
  { key: 'assistant', name: 'AI助手', desc: '成长陪伴助手' },
];
