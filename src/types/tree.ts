// ============================================================
// 知芽成长树 —— 数据模型（第3段）
// 成长行为 → 解锁元素 → 建设成长树 → 看见自己的变化
// 不使用经验值/等级/积分/战斗力，不与其他学生比较。
// ============================================================
import { TREE_STAGES } from './index';
import type { TreeStage } from './index';
export type { TreeStage };
export { TREE_STAGES };

/** 成长树元素（至少支持这些，根据阶段逐步解锁） */
export type TreeElementKey =
  | 'seed' | 'leaf' | 'branch' | 'flower' | 'fruit'
  | 'trunk'
  | 'grass' | 'butterfly' | 'bird' | 'stream' | 'stone' | 'light';

export interface TreeElement {
  key: TreeElementKey;
  name: string;
  /** 由哪类真实成长行为解锁 */
  unlockedBy: string;
}

/** 五维成长能力 → 树木元素 的对应关系 */
export const CAPABILITY_ELEMENT_MAP: Record<string, TreeElementKey> = {
  infoJudgment: 'leaf',      // 信息判断 → 叶片
  digitalLiteracy: 'flower', // 网络素养 → 花朵
  onlineInteraction: 'branch',// 网络交往 → 枝条
  selfDirectedLearning: 'fruit', // 自主学习 → 果实
  selfManagement: 'trunk',   // 自我管理 → 树干（以 trunk 表达，归到元素计数）
};

export const TREE_ELEMENTS: Record<TreeElementKey, TreeElement> = {
  seed: { key: 'seed', name: '种子', unlockedBy: '成长的起点' },
  leaf: { key: 'leaf', name: '叶片', unlockedBy: '信息来源核验 / 判断信息真实性 / 学习信息判断方法' },
  branch: { key: 'branch', name: '枝条', unlockedBy: '健康网络交往 / 正确处理网络互动' },
  flower: { key: 'flower', name: '花朵', unlockedBy: '网络素养学习 / 网络语境理解 / 隐私保护学习' },
  fruit: { key: 'fruit', name: '果实', unlockedBy: '完成学习目标 / 调整学习计划 / 完成恢复计划' },
  trunk: { key: 'trunk', name: '树干', unlockedBy: '主动调整 / 保持计划执行 / 解决问题（自我管理）' },
  grass: { key: 'grass', name: '草地', unlockedBy: '成长环境逐渐丰富（随阶段解锁）' },
  butterfly: { key: 'butterfly', name: '蝴蝶', unlockedBy: '自然生态元素（随阶段解锁）' },
  bird: { key: 'bird', name: '小鸟', unlockedBy: '能力转化为行动（随阶段解锁）' },
  stream: { key: 'stream', name: '溪流', unlockedBy: '完整自然环境（随阶段解锁）' },
  stone: { key: 'stone', name: '石头', unlockedBy: '少量自然元素（随阶段解锁）' },
  light: { key: 'light', name: '阳光', unlockedBy: '稳定自主成长状态（随阶段解锁）' },
};

/** 各阶段应解锁的元素（自然元素随阶段逐步加入） */
export const STAGE_ELEMENTS: Record<TreeStage, TreeElementKey[]> = {
  seed: ['seed'],
  sprout: ['seed', 'leaf'],
  sapling: ['seed', 'leaf', 'branch', 'flower'],
  flowering: ['seed', 'leaf', 'branch', 'flower', 'grass', 'stone', 'light'],
  fruiting: ['seed', 'leaf', 'branch', 'flower', 'fruit', 'grass', 'butterfly', 'bird', 'stone', 'light'],
  lush: ['seed', 'leaf', 'branch', 'flower', 'fruit', 'grass', 'butterfly', 'bird', 'stream', 'stone', 'light'],
};

// ---------- 成长事件 ----------

export interface GrowthEvent {
  id: string;
  title: string;
  reason: string;
  note: string;
  element: TreeElementKey;
  /** 相对时间描述，如"今天""昨天""3天前" */
  when: string;
}

/** 成长事件文案模板（由真实行为触发，不出现经验值/升级/积分/战斗力） */
export const EVENT_TEMPLATES: Record<TreeElementKey, Omit<GrowthEvent, 'id' | 'when'>> = {
  leaf: {
    title: '知芽今天长出了一片新叶',
    reason: '你完成了一次信息来源核验。',
    note: '你正在逐渐形成自己的信息判断方法。',
    element: 'leaf',
  },
  flower: {
    title: '知芽开出了一朵新花',
    reason: '你完成了一次网络素养学习。',
    note: '理解网络环境，也是保护自己的能力。',
    element: 'flower',
  },
  fruit: {
    title: '知芽结出了一个果实',
    reason: '你完成了本周学习目标。',
    note: '坚持正在变成你的能力。',
    element: 'fruit',
  },
  branch: {
    title: '知芽长出了新的枝条',
    reason: '你主动调整了学习计划，并完成了恢复任务。',
    note: '能够调整方向，本身就是一种成长。',
    element: 'branch',
  },
  trunk: {
    title: '知芽的树干更加完整了',
    reason: '你保持了计划执行，并主动解决了一个问题。',
    note: '稳定的自我管理，是所有能力的支撑。',
    element: 'trunk',
  },
  seed: { title: '知芽埋下了一颗种子', reason: '你开启了自主成长。', note: '每一段成长都从一个意愿开始。', element: 'seed' },
  grass: { title: '知芽周围长出了草地', reason: '你的成长环境越来越丰富。', note: '稳定的节奏会让成长更从容。', element: 'grass' },
  butterfly: { title: '一只蝴蝶落在了知芽上', reason: '你持续投入成长。', note: '自然会回应认真生长的生命。', element: 'butterfly' },
  bird: { title: '一只小鸟停在了枝头', reason: '你的能力开始转化为行动。', note: '能运用的能力，才是真正的能力。', element: 'bird' },
  stream: { title: '知芽旁有了溪流', reason: '你形成了稳定的自主成长状态。', note: '源源不断，是成熟的样子。', element: 'stream' },
  stone: { title: '知芽边多了几块石头', reason: '你的成长越来越完整。', note: '丰富而不喧哗。', element: 'stone' },
  light: { title: '知芽沐浴在阳光里', reason: '你保持着稳定的自我管理。', note: '温暖、有生命力、高级，是最终的样子。', element: 'light' },
};

// ---------- 成长任务（今日成长 · 建议而非强制） ----------

export interface GrowthTask {
  id: string;
  category: string;       // 信息判断 / 学习成长 / 网络素养 / 自主管理
  title: string;
  reward: TreeElementKey; // 完成后解锁的元素
}

export const TODAY_TASKS: GrowthTask[] = [
  { id: 't-info', category: '信息判断', title: '完成一次信息来源核验', reward: 'leaf' },
  { id: 't-learn', category: '学习成长', title: '完成今天的学习目标', reward: 'fruit' },
  { id: 't-literacy', category: '网络素养', title: '完成一次网络素养学习', reward: 'flower' },
  { id: 't-self', category: '自主管理', title: '完成一次主动调整', reward: 'branch' },
];

// ---------- 成长树整体状态 ----------

export interface GrowthSnapshot {
  stage: TreeStage;
  note: string;
}

export interface TreeState {
  treeStage: TreeStage;
  /** 已解锁元素及其数量（自然元素数量固定1，叶片等可累加） */
  growthElements: Partial<Record<TreeElementKey, number>>;
  growthEvents: GrowthEvent[];
  currentTasks: GrowthTask[];
  completedTasks: string[];
  growthHistory: GrowthSnapshot[];
}
