import { useState } from 'react';
import type { RiskFinding } from '../../../types/risk';
import { RISK_LEVEL_TEXT, DATA_SOURCE_NOTICE } from '../../../types/risk';
import './Analysis.css';

/**
 * 家长/教师端 · AI 分析 —— 可解释。
 * 展示统一风险结构：依据 + 解释 + 不确定性 + 建议，不使用简单 risk=true，不给学生贴标签。
 */
const FINDINGS: RiskFinding[] = [
  {
    riskType: 'learning',
    riskLevel: 'medium',
    confidence: 0.72,
    evidence: ['近两周日均学习时长 55 分钟，低于计划 90 分钟', '连续 6 天未达计划'],
    explanation: '计划与实际之间存在持续差距，属于学习过程中常见的偏航信号。',
    uncertainty: '需进一步了解是课程安排变化、时间冲突还是疲劳所致，不能仅凭数据定性。',
    suggestedActions: ['优先了解近期课程安排和个人时间变化', '与学生沟通是否需要拆分学习单元'],
    interventionLevel: 2,
    requiresHumanReview: false,
  },
  {
    riskType: 'network',
    riskLevel: 'high',
    confidence: 0.65,
    evidence: ['提供的互动记录中存在针对特定对象的持续负面表达', '多人参与'],
    explanation: '记录显示存在需要关注的异常信号，但这只是迹象分析。',
    uncertainty: '是否构成欺凌需结合完整事件背景进行人工确认，当前材料不足以定性。',
    suggestedActions: ['结合完整事件背景人工确认', '不急于给任何一方贴标签', '为可能需要支持的学生提供求助渠道'],
    interventionLevel: 4,
    requiresHumanReview: true,
  },
];

export function Analysis() {
  const [active, setActive] = useState(0);
  const f = FINDINGS[active];

  return (
    <div className="zh-page">
      <div className="page-head">
        <h1>AI 分析</h1>
        <p>专业、理性、可解释。AI 提供依据、原因与不确定性，最终判断由人做出。</p>
      </div>

      <p className="data-notice">{DATA_SOURCE_NOTICE}</p>

      <div className="an__tabs">
        {FINDINGS.map((x, i) => (
          <button key={i} className={'an__tab' + (active === i ? ' active' : '')} onClick={() => setActive(i)}>
            {x.riskType === 'learning' ? '学习偏航' : x.riskType === 'network' ? '网络交往' : '信息风险'}
          </button>
        ))}
      </div>

      <div className="zh-card">
        <div className="an__level">
          <b>事件风险：{RISK_LEVEL_TEXT[f.riskLevel]}</b>
          <span className="zh-tag" style={{ marginLeft: 8 }}>置信度 {Math.round(f.confidence * 100)}%</span>
          {f.requiresHumanReview && (
            <span className="zh-tag" style={{ background: '#ffecec', color: 'var(--zh-danger)', marginLeft: 8 }}>需人工复核</span>
          )}
        </div>

        <h3>分析依据</h3>
        <ul className="fact-list">{f.evidence.map((e, i) => <li key={i}>{e}</li>)}</ul>

        <h3 style={{ marginTop: 14 }}>风险解释</h3>
        <p className="an__p">{f.explanation}</p>

        <h3 style={{ marginTop: 14 }}>不确定性（需要进一步确认）</h3>
        <p className="an__p">{f.uncertainty}</p>

        <h3 style={{ marginTop: 14 }}>建议行动</h3>
        <ul className="fact-list">{f.suggestedActions.map((s, i) => <li key={i}>{s}</li>)}</ul>

        <p className="an__caution">说明：以上为对当前事件的分析，不构成对学生的身份定性。</p>
      </div>
    </div>
  );
}
