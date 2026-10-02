import { useState } from 'react';
import type { AiOutput } from '../types';
import { STAGE_PROFILES } from '../types';
import { useStage } from '../context/StageContext';
import { ZhiYa } from './ZhiYa';
import { RiskLevelBadge } from './RiskLevelBadge';
import './AiOutputPanel.css';

/**
 * AI 输出统一结构 —— 五段式展示
 * ① 我看到了什么 ② 为什么值得注意 ③ 可能存在什么风险 ④ 你可以怎么做 ⑤ 由你决定
 * 顶部知芽伙伴与开场白随成长阶段变化。支持可申诉反馈。
 */
export function AiOutputPanel({ output }: { output: AiOutput }) {
  const { stage } = useStage();
  const profile = STAGE_PROFILES[stage];
  const [appealed, setAppealed] = useState(false);
  return (
    <div className="ai-output">
      <div className="ai-output__header">
        <div className="ai-output__buddy">
          <ZhiYa form={profile.budForm} size={40} />
          <div>
            <div className="ai-output__greeting">{profile.greeting}</div>
            <span className="ai-output__title">AI 分析</span>
          </div>
        </div>
        <RiskLevelBadge level={output.level} />
      </div>

      <section className="ai-output__section">
        <h4>① 我看到了什么</h4>
        <p>{output.observation}</p>
      </section>

      <section className="ai-output__section">
        <h4>② 为什么值得注意</h4>
        <p>{output.why}</p>
      </section>

      <section className="ai-output__section">
        <h4>③ 可能存在什么风险</h4>
        <p>{output.risk}</p>
      </section>

      <section className="ai-output__section">
        <h4>④ 你可以怎么做</h4>
        <ol>
          {output.actions.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ol>
      </section>

      <section className="ai-output__section ai-output__section--autonomy">
        <h4>⑤ 由你决定</h4>
        <p>{output.autonomy}</p>
      </section>

      <div className="ai-output__appeal">
        {appealed ? (
          <span>✓ 已收到你的反馈，将结合人工复核重新评估。感谢你帮助 AI 更准确。</span>
        ) : (
          <button onClick={() => setAppealed(true)}>我认为这次分析不准确，提交反馈</button>
        )}
      </div>
    </div>
  );
}
