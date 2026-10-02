// ============================================================
// 知护 AI 成长引擎（模拟层）
// 三类风险感知 → 网络语境分析 → 自适应柔性干预 → 统一五段式输出
// 注意：此为前端模拟逻辑，用于驱动界面与交互。
// ============================================================
import type {
  AiOutput,
  ContextAnalysis,
  GrowthStage,
  InfoRiskInput,
  InfoRiskResult,
  InterventionLevel,
  LearningRiskResult,
  LearningTrack,
  NetworkRiskResult,
  NetworkVerdict,
  RiskCategory,
} from '../types';

// ---------- 自适应柔性干预引擎 ----------
// 核心输入：风险程度 × 成长阶段 × 场景 × 历史状态

interface InterventionInput {
  severity: 'low' | 'medium' | 'high' | 'critical';
  stage: GrowthStage;
  category: RiskCategory;
}

/**
 * 学生越成熟，AI 越倾向于解释与支持（低等级），
 * 但严重威胁、隐私泄露、持续攻击等情况仍进入更高等级。
 */
export function decideInterventionLevel({ severity, stage, category }: InterventionInput): InterventionLevel {
  if (severity === 'critical') return 4;
  if (severity === 'high') {
    if (category === 'network') return 4; // 网络交往高危需支持介入
    return 3;
  }
  if (severity === 'medium') {
    if (stage === 'A') return 2; // 保护阶段更主动解释教育
    if (stage === 'C') return 1; // 自主阶段以轻提醒为主
    return 2;
  }
  return 1; // low → 轻提醒
}

// ---------- 成长阶段自适应层 ----------
// 切换阶段必须同时改变：AI 语言、分析深度、建议方式、信息密度
// （干预强度由 decideInterventionLevel 单独控制）

export interface StageLanguage {
  /** AI 开场语言 */
  intro: string;
  /** 建议引导方式 */
  actionLead: string;
  /** 信息密度：1 浅 / 2 中 / 3 深 */
  depth: 1 | 2 | 3;
  /** 自主表达侧重 */
  autonomyTone: string;
}

export const STAGE_LANGUAGE: Record<GrowthStage, StageLanguage> = {
  A: {
    intro: '我们一起看看。',
    actionLead: '你可以试着这样做：',
    depth: 1,
    autonomyTone: '别担心，知护会陪着你一起慢慢学会判断。',
  },
  B: {
    intro: '我们可以一起分析。',
    actionLead: '建议你从这几个角度想一想：',
    depth: 2,
    autonomyTone: '知护和你一起分析，但怎么判断、怎么做，由你来定。',
  },
  C: {
    intro: '我可以帮你梳理，你来做最终判断。',
    actionLead: '可选的应对方向，供你权衡：',
    depth: 3,
    autonomyTone: '以上是分析与选项，最终判断与行动由你自主决定。',
  },
};

/** 根据成长阶段调整 AI 语言、分析深度与信息密度 */
function adaptToStage(base: Omit<AiOutput, 'level' | 'category'>, stage: GrowthStage) {
  const lang = STAGE_LANGUAGE[stage];
  // 阶段越低，建议越精简（少而直接）；阶段越高，选项更完整
  const maxActions = stage === 'A' ? 2 : stage === 'B' ? 3 : base.actions.length;
  const actions = base.actions.slice(0, Math.max(1, maxActions));
  return {
    observation: `${lang.intro} ${base.observation}`,
    // 分析深度：阶段越高，why 越偏分析型
    why: lang.depth >= 2 ? base.why : base.why.split('。')[0] + '。',
    risk: base.risk,
    actions,
    autonomy: `${base.autonomy} ${lang.autonomyTone}`,
  };
}

// ---------- 统一五段式输出构建 ----------

export function buildAiOutput(
  observation: string,
  why: string,
  risk: string,
  actions: string[],
  autonomy: string,
  level: InterventionLevel,
  category: RiskCategory,
  stage: GrowthStage,
): AiOutput {
  return { ...adaptToStage({ observation, why, risk, actions, autonomy }, stage), level, category };
}

// 学生自主成长的统一话术，强调"由你决定"
const AUTONOMY_NOTE = '最终如何判断与行动，由你自己决定。知护不会替你做决定，而是陪伴你逐渐形成自己的判断。';

// ---------- 1. AI 信息风险感知 ----------

export function analyzeInfoRisk(input: InfoRiskInput, stage: GrowthStage): InfoRiskResult {
  const content = input.content || '';
  const hasAbsolute = /(一定|绝对|100%|所有|全都|震惊|不转不是)/.test(content);
  const hasEmotional = /(竟然|居然|哭了|怒了|可怕|赶紧|马上|必看)/.test(content);
  const hasUnverified = !/http|来源|报道|官方|论文|数据/.test(content);

  const severity: 'low' | 'medium' | 'high' | 'critical' = hasAbsolute && hasEmotional ? 'high' : hasAbsolute || hasEmotional ? 'medium' : 'low';
  const level = decideInterventionLevel({ severity, stage, category: 'information' });

  const judgmentTips = [
    '找来源：这条信息最初来自哪里？是否可追溯到原始出处？',
    '找证据：有没有数据、报道或其他独立来源支撑？',
    '交叉验证：能否在其他独立渠道找到一致的说法？',
    '区分事实与观点：哪些是可验证的事实，哪些是个人观点或情绪？',
  ];

  const output = buildAiOutput(
    `我看到这是一段${input.type === 'meme' ? '网络流行语/梗' : '内容'}，其中包含若干需要留意的表达。`,
    hasAbsolute
      ? '内容中出现了绝对化或夸张表达，且缺少可追溯的来源与证据支撑。'
      : '内容整体较为平和，但仍建议核对其来源与证据情况。',
    hasUnverified
      ? '可能存在未验证信息或情绪诱导的迹象，需要进一步确认，不宜直接采信。'
      : '目前风险迹象较弱，但仍建议结合上下文自行判断。',
    judgmentTips.slice(0, stage === 'A' ? 3 : 4),
    AUTONOMY_NOTE,
    level,
    'information',
    stage,
  );

  return {
    source: hasUnverified ? '未识别到明确来源' : '已标注来源（待核实）',
    origin: '原始出处待追溯',
    evidence: hasUnverified ? '暂未提供可核验的证据' : '存在部分佐证，仍需交叉验证',
    absoluteExpressions: hasAbsolute ? ['检测到绝对化/夸张表达'] : [],
    emotionalManipulation: hasEmotional ? ['检测到情绪诱导词'] : [],
    networkContext: '建议结合发布语境与传播路径理解',
    misunderstanding: '注意断章取义与语境缺失带来的误解',
    riskPoints: [
      ...(hasAbsolute ? ['绝对化表达降低可信度'] : []),
      ...(hasEmotional ? ['情绪操纵可能影响判断'] : []),
      ...(hasUnverified ? ['未验证信息'] : []),
    ],
    judgmentTips,
    output,
  };
}

// ---------- 2. AI 网络交往风险感知 ----------

export function analyzeNetworkRisk(text: string, stage: GrowthStage): NetworkRiskResult {
  const hasNegative = /(讨厌|丑|傻|滚|去死|废物|垃圾|恶心)/.test(text);
  const hasThreat = /(打你|杀|威胁|曝光|人肉|发你照片)/.test(text);
  const hasPrivacy = /(电话|住址|学校|班级|身份证|照片)/.test(text);
  const repeated = (text.match(/讨厌|丑|傻|滚/g) || []).length >= 2;

  let verdict: NetworkVerdict = 'normal';
  let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';
  if (hasThreat || hasPrivacy) {
    verdict = 'help';
    severity = 'critical';
  } else if (repeated && hasNegative) {
    verdict = 'watch';
    severity = 'high';
  } else if (hasNegative) {
    verdict = 'watch';
    severity = 'medium';
  }
  const level = decideInterventionLevel({ severity, stage, category: 'network' });

  const actions =
    verdict === 'help'
      ? ['保留完整互动记录与截图', '尽快告知可信任的家长或老师', '必要时向学校心理老师或心理援助渠道求助', '不要单独应对，避免激化冲突']
      : ['留意后续互动是否持续或升级', '尝试在安全环境下与对方沟通边界', '与可信任的人聊聊你的感受'];

  const output = buildAiOutput(
    '我看到这段互动记录中出现了一些负面表达。',
    verdict === 'normal'
      ? '目前看属于正常范围内的互动，没有发现持续针对性的负面信号。'
      : '存在针对特定对象的负面表达，需要结合完整事件背景进行判断。',
    verdict === 'help'
      ? '可能存在威胁或隐私泄露的迹象，这属于需要尽快确认并寻求支持的情况。'
      : verdict === 'watch'
      ? '存在需要关注的迹象，但需要进一步确认，不能简单定性。'
      : '目前未发现明显风险迹象。',
    actions,
    '你对自己的感受最清楚。如果你感到不舒服或不安，请相信你的感受，并主动寻求支持。是否求助、何时求助，由你决定。',
    level,
    'network',
    stage,
  );

  return {
    verdict,
    verdictText: verdict === 'normal' ? '正常互动' : verdict === 'watch' ? '需要关注' : '建议求助',
    targets: '互动对象信息（示例）',
    duration: '观察周期内持续存在',
    frequency: repeated ? '多次重复出现' : '偶发',
    emotions: hasNegative ? ['负面情绪表达'] : [],
    privacy: hasPrivacy ? '检测到疑似个人信息提及' : '未检测到隐私泄露',
    threats: hasThreat ? '检测到疑似威胁表达' : '未检测到威胁',
    exclusion: '需结合群聊/多人语境进一步确认',
    emphasized: '异常 ≠ 欺凌。当前结果是基于提供记录的迹象分析，是否构成欺凌需结合完整事件背景进行人工确认。',
    output,
  };
}

// ---------- 3. AI 学习目标与行为偏航感知 ----------

export function analyzeLearningTrack(track: LearningTrack, stage: GrowthStage): LearningRiskResult {
  const diff = track.planMinutesPerDay - track.actualMinutesPerDay;
  const ratio = track.actualMinutesPerDay / Math.max(track.planMinutesPerDay, 1);
  const severity: 'low' | 'medium' | 'high' | 'critical' = ratio < 0.5 ? 'high' : ratio < 0.8 ? 'medium' : 'low';
  const level = decideInterventionLevel({ severity, stage, category: 'learning' });

  const deviation = `计划每天 ${track.planMinutesPerDay} 分钟，实际平均 ${track.actualMinutesPerDay} 分钟，近期执行节奏出现下降，差距约 ${diff} 分钟/天。`;

  const possibleCauses = ['任务量过大', '时间冲突', '任务颗粒度过大', '疲劳', '外部事务'];
  const recoverySuggestion = `可以将 ${track.planMinutesPerDay} 分钟拆成多个更小的学习单元（例如 3 个 ${Math.round(track.planMinutesPerDay / 3)} 分钟单元），降低启动难度，循序渐进地恢复节奏。`;

  const output = buildAiOutput(
    `我看到你在「${track.scene}」上的目标是「${track.goal}」，但近期实际投入低于计划。`,
    `计划与实际之间存在差距（约 ${diff} 分钟/天），这是学习过程中常见的偏航信号。`,
    '可能存在目标偏航的迹象，需要结合你近期的时间安排与状态进一步确认原因。',
    [
      '回顾最近一周，是哪类原因导致投入不足？',
      `尝试拆分任务：${recoverySuggestion}`,
      '设定一个可达成的小目标，先恢复节奏再逐步加量。',
    ],
    'AI 提供的是恢复建议，是否调整、如何调整，最终选择权属于你。知护会支持你的每一步。',
    level,
    'learning',
    stage,
  );

  return {
    deviation,
    possibleCauses,
    recoverySuggestion,
    emphasized: 'AI 提供建议，最终选择权属于学生。',
    output,
  };
}

// ---------- AI 网络语境与语言素养分析 ----------

export function analyzeContext(text: string): ContextAnalysis {
  const hasSarcasm = /(呵呵|就这|笑死|绝了)/.test(text);
  return {
    meme: /(梗|yyds|xswl|emo)/.test(text) ? '检测到网络流行语' : '未见明显网络梗',
    slang: '结合年龄段网络用语习惯理解',
    sarcasm: hasSarcasm ? '可能存在讽刺/反讽，需结合语气判断' : '未见明显反讽',
    pun: '需结合语境判断是否双关',
    emotion: '表达中带有情绪色彩，注意区分调侃与攻击',
    offensive: '未发现明显冒犯表达',
    groupLabel: '注意是否存在群体标签化表达',
    potentialAttack: '单次使用不等于攻击，需看是否固定针对某人',
    targetedJoke: '玩笑是否针对特定对象、是否让对方感到不适',
    escalation: ['普通网络梗', '重复使用', '固定针对某人', '多人参与', '持续攻击', '威胁/隐私泄露'],
  };
}
