// 服务层统一出口。当前为 Mock，可整体替换为真实后端/模型而不改动页面。
export { aiService, mockAIService } from './ai/mockAIService';
export { growthService, summarizeGrowth } from './ai/mockGrowthService';
export type { IAIService, IGrowthService } from './ai/types';

// 隐私服务：集中管理数据来源声明与权限校验（可替换为后端）。
import { DATA_SOURCE_NOTICE, PRIVACY_PRINCIPLES, ROLES } from '../types/risk';

export const privacyService = {
  dataSourceNotice: DATA_SOURCE_NOTICE,
  principles: PRIVACY_PRINCIPLES,
  roles: ROLES,
  /** 权限校验：某角色是否可访问某数据域（Mock） */
  canAccess: (role: string, scope: string) => {
    const meta = ROLES.find((r) => r.role === role);
    if (!meta) return false;
    return meta.dataAccess.some((d) => d.includes(scope)) || !meta.restricted.some((r) => r.includes(scope));
  },
};
