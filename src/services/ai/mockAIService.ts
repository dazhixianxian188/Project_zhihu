// ============================================================
// Mock AI Service —— 包装现有引擎，表现为完整异步 AI 流程。
// 以后替换为真实模型时，只需实现 IAIService 接口，无需改动页面。
// ============================================================
import {
  analyzeInfoRisk, analyzeNetworkRisk, analyzeLearningTrack,
  analyzeContext, decideInterventionLevel,
} from '../../engine/growthEngine';
import type { IAIService } from './types';
import type {
  InfoRiskInput, InfoRiskResult, NetworkRiskResult, LearningTrack, LearningRiskResult,
  ContextAnalysis, InterventionLevel, GrowthStage, RiskCategory,
} from '../../types';
import type { RiskFinding } from '../../types/risk';

/** 模拟网络延迟，让"AI 分析中"状态可见 */
const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

export const mockAIService: IAIService = {
  async analyzeInformation(input: InfoRiskInput, stage: GrowthStage): Promise<InfoRiskResult> {
    await delay();
    return analyzeInfoRisk(input, stage);
  },
  async analyzeSocialRisk(text: string, stage: GrowthStage): Promise<NetworkRiskResult> {
    await delay();
    return analyzeNetworkRisk(text, stage);
  },
  async analyzeLearningDrift(track: LearningTrack, stage: GrowthStage): Promise<LearningRiskResult> {
    await delay();
    return analyzeLearningTrack(track, stage);
  },
  async analyzeSlangContext(text: string): Promise<ContextAnalysis> {
    await delay(300);
    return analyzeContext(text);
  },
  async generateIntervention(input: {
    severity: 'low' | 'medium' | 'high' | 'critical'; stage: GrowthStage; category: RiskCategory;
  }): Promise<InterventionLevel> {
    await delay(200);
    return decideInterventionLevel(input);
  },
  async generateGrowthReport(): Promise<string> {
    await delay(300);
    return '过去一段时间，你完成了多次信息判断、学习调整和网络素养学习，这些行为已经成为你的成长记录。';
  },
  async explainRisk(input: InfoRiskInput, stage: GrowthStage): Promise<RiskFinding> {
    await delay();
    const r = analyzeInfoRisk(input, stage);
    const sev = r.output.level;
    const severity: 'low' | 'medium' | 'high' | 'critical' =
      sev >= 4 ? 'critical' : sev === 3 ? 'high' : sev === 2 ? 'medium' : 'low';
    return {
      riskType: 'information',
      riskLevel: sev >= 3 ? 'high' : sev === 2 ? 'medium' : 'low',
      confidence: sev >= 3 ? 0.85 : 0.65,
      evidence: r.output.observation ? [r.output.observation] : [],
      explanation: r.output.why,
      uncertainty: '需结合原始出处与其他独立来源交叉验证后确认。',
      suggestedActions: r.output.actions,
      interventionLevel: decideInterventionLevel({ severity, stage, category: 'information' }),
      requiresHumanReview: sev >= 3,
    };
  },
};

/** 暴露给未来替换：当前默认使用 Mock */
export const aiService: IAIService = mockAIService;
