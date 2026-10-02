// ============================================================
// 知芽成长树引擎（模拟层）
// 真实成长行为 → 成长事件 → 解锁元素 → 树木变化 → 阶段推进
// 不随机增长，不惩罚，不与他人比较。
// ============================================================
import type { TreeStage } from '../types';
import {
  type GrowthEvent,
  type TreeElementKey,
  type TreeState,
  EVENT_TEMPLATES,
  STAGE_ELEMENTS,
  TODAY_TASKS,
} from '../types/tree';

/** 根据已解锁的核心元素（叶/枝/花/果）判断树阶段 */
export function deriveStage(counts: Partial<Record<TreeElementKey, number>>): TreeStage {
  const leaf = counts.leaf ?? 0;
  const branch = counts.branch ?? 0;
  const flower = counts.flower ?? 0;
  const fruit = counts.fruit ?? 0;
  if (fruit >= 3 && flower >= 2 && branch >= 2) return 'lush';
  if (fruit >= 1) return 'fruiting';
  if (flower >= 1 && leaf >= 2) return 'flowering';
  if (leaf >= 2 || branch >= 1) return 'sapling';
  if (leaf >= 1) return 'sprout';
  return 'seed';
}

let eventSeq = 1000;

/** 完成一次成长行为：生成事件、解锁元素、推进阶段 */
export function applyGrowthBehavior(state: TreeState, element: TreeElementKey, when: string): TreeState {
  const tpl = EVENT_TEMPLATES[element];
  const event: GrowthEvent = { ...tpl, id: `evt-${++eventSeq}`, when };

  const growthElements = { ...state.growthElements };
  growthElements[element] = (growthElements[element] ?? 0) + 1;

  // 推进阶段后，把该阶段应有的自然元素补齐
  const newStage = deriveStage(growthElements);
  for (const el of STAGE_ELEMENTS[newStage]) {
    if (el !== 'seed') growthElements[el] = growthElements[el] ?? 1;
  }
  growthElements.seed = 1;

  const newEvent = event;
  const growthEvents = [newEvent, ...state.growthEvents];

  return { ...state, treeStage: newStage, growthElements, growthEvents };
}

/** 初始状态：从嫩芽起步，仅带少量历史，让成长随使用逐步展现 */
export function createInitialTree(): TreeState {
  let state: TreeState = {
    treeStage: 'seed',
    growthElements: { seed: 1 },
    growthEvents: [],
    currentTasks: TODAY_TASKS,
    completedTasks: [],
    growthHistory: [],
  };
  // 模拟过去的少量成长，起步为嫩芽阶段
  state = applyGrowthBehavior(state, 'leaf', '3天前');

  state.growthHistory = [
    { stage: 'seed', note: '一个月前：你遇到信息时更倾向于直接接受。' },
    { stage: state.treeStage, note: '现在：你开始尝试核对信息来源，成长正在发生。' },
  ];
  return state;
}

/** 成长记录摘要，例如"本周新增1片叶、1条枝、1朵花"，不显示经验值 */
export function summarizeGrowth(state: TreeState): string {
  const parts: string[] = [];
  const push = (k: TreeElementKey, label: string) => {
    const n = state.growthEvents.filter((e) => e.element === k).length;
    if (n > 0) parts.push(`${n}${label}`);
  };
  push('leaf', '片叶');
  push('branch', '条枝');
  push('flower', '朵花');
  push('fruit', '个果实');
  return parts.length ? `本周新增${parts.join('、')}。` : '本周还没有新的成长记录。';
}
