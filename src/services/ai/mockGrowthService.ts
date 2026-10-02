// 成长树服务：状态由 TreeContext 持有，这里提供无状态工具契约（可替换为后端 API）。
import { createInitialTree, summarizeGrowth } from '../../engine/treeEngine';
import type { IGrowthService } from './types';
import type { TreeElementKey } from '../../types/tree';

// 注：完整的状态读写在 context/TreeContext 中；此处导出引擎级工具，便于未来接入后端。
export const growthService: Omit<IGrowthService, 'completeGrowthTask' | 'unlockGrowthElement'> = {
  getGrowthTree: () => createInitialTree(),
  getGrowthEvents: () => createInitialTree().growthEvents,
  getGrowthTasks: () => createInitialTree().currentTasks,
  getGrowthHistory: () => createInitialTree().growthHistory,
};

export { summarizeGrowth };
export type { TreeElementKey };
