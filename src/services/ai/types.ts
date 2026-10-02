// ============================================================
// 知护 · 统一 AI Service 接口（可替换架构）
// 当前为 Mock 实现，所有页面表现为完整 AI 流程；以后可直接替换为真实模型。
// 不修改现有页面调用，仅作为架构契约与未来接入点。
// ============================================================
import type {
  InfoRiskInput, InfoRiskResult, NetworkRiskResult, LearningTrack, LearningRiskResult,
  ContextAnalysis, InterventionLevel, GrowthStage, RiskCategory,
} from '../../types';
import type { TreeState, TreeElementKey, GrowthTask } from '../../types/tree';
import type { RiskFinding } from '../../types/risk';

/** AI 分析服务统一接口 */
export interface IAIService {
  analyzeInformation(input: InfoRiskInput, stage: GrowthStage): Promise<InfoRiskResult>;
  analyzeSocialRisk(text: string, stage: GrowthStage): Promise<NetworkRiskResult>;
  analyzeLearningDrift(track: LearningTrack, stage: GrowthStage): Promise<LearningRiskResult>;
  analyzeSlangContext(text: string): Promise<ContextAnalysis>;
  generateIntervention(input: {
    severity: 'low' | 'medium' | 'high' | 'critical'; stage: GrowthStage; category: RiskCategory;
  }): Promise<InterventionLevel>;
  generateGrowthReport(state: TreeState): Promise<string>;
  /** 输出统一风险结构（依据+解释+不确定性+建议，禁止 risk=true） */
  explainRisk(input: InfoRiskInput, stage: GrowthStage): Promise<RiskFinding>;
}

/** 成长树服务统一接口 */
export interface IGrowthService {
  getGrowthTree(): TreeState;
  getGrowthEvents(): TreeState['growthEvents'];
  getGrowthTasks(): GrowthTask[];
  completeGrowthTask(taskId: string, reward: TreeElementKey): void;
  unlockGrowthElement(element: TreeElementKey, when?: string): void;
  getGrowthHistory(): TreeState['growthHistory'];
}
