import { useState } from 'react';
import { analyzeNetworkRisk, analyzeContext } from '../../../engine/growthEngine';
import { useStage } from '../../../context/StageContext';
import { useTree } from '../../../context/TreeContext';
import { AiOutputPanel } from '../../../components/AiOutputPanel';
import type { NetworkRiskResult } from '../../../types';

const SAMPLE = '你怎么这么丑 真讨厌 看到你就烦 你好傻啊';

export function Relations() {
  const { stage } = useStage();
  const { grow } = useTree();
  const [text, setText] = useState('');
  const [result, setResult] = useState<NetworkRiskResult | null>(null);
  const [learned, setLearned] = useState(false);

  const run = () => {
    if (!text.trim()) return;
    setResult(analyzeNetworkRisk(text, stage));
    setLearned(false);
  };

  return (
    <div className="zh-page">
      <div className="page-head">
        <h1>网络关系</h1>
        <p>AI 网络交往风险感知 —— 分析互动对象、频率、持续性、攻击与威胁。结果仅作迹象参考。</p>
      </div>

      <div className="zh-card" style={{ marginBottom: 16 }}>
        <textarea
          style={{ width: '100%', minHeight: 100, padding: 12, borderRadius: 10, border: '1px solid var(--zh-border)', fontFamily: 'inherit', fontSize: 14, resize: 'vertical' }}
          placeholder="粘贴一段互动记录（聊天、评论区等），AI 将分析是否存在持续针对性负面互动……"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          <button className="zh-btn-primary" onClick={run}>开始分析</button>
          <button className="zh-btn-ghost" onClick={() => setText(SAMPLE)}>填入示例</button>
        </div>
      </div>

      {result && (
        <div className="zh-grid">
          <div className="zh-card">
            <h3 style={{ marginBottom: 8 }}>分析结果</h3>
            <div style={{ fontSize: 20, fontWeight: 700, color: result.verdict === 'help' ? 'var(--zh-danger)' : result.verdict === 'watch' ? 'var(--zh-warning)' : 'var(--zh-primary)' }}>
              {result.verdictText}
            </div>
            <ul className="fact-list" style={{ marginTop: 12 }}>
              <li><b>互动对象：</b>{result.targets}</li>
              <li><b>持续时间：</b>{result.duration}</li>
              <li><b>频率：</b>{result.frequency}</li>
              <li><b>情绪/攻击：</b>{result.emotions.join('、') || '未见明显负面情绪'}</li>
              <li><b>隐私：</b>{result.privacy}</li>
              <li><b>威胁：</b>{result.threats}</li>
              <li><b>排斥：</b>{result.exclusion}</li>
            </ul>
          </div>

          <div className="zh-card">
            <h3 style={{ marginBottom: 8 }}>网络语境与语言素养分析</h3>
            {(() => {
              const c = analyzeContext(text);
              return (
                <ul className="fact-list">
                  <li><b>网络梗：</b>{c.meme}</li>
                  <li><b>讽刺/反讽：</b>{c.sarcasm}</li>
                  <li><b>潜在攻击：</b>{c.potentialAttack}</li>
                  <li><b>针对性玩笑：</b>{c.targetedJoke}</li>
                </ul>
              );
            })()}
            <div style={{ marginTop: 10 }}>
              <b>风险升级路径：</b>
              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 6 }}>
                {analyzeContext(text).escalation.map((s, i) => (
                  <span key={i} className="zh-tag">{i + 1}. {s}</span>
                ))}
              </div>
              <p style={{ marginTop: 8, fontSize: 12, color: 'var(--zh-text-mute)' }}>
                网络梗不必然是风险，系统会结合上下文与持续性综合判断。
              </p>
            </div>
          </div>

          <div className="zh-card" style={{ borderLeft: '4px solid var(--zh-warning)' }}>
            <b>⚠️ 异常 ≠ 欺凌</b>
            <p style={{ marginTop: 6, color: 'var(--zh-text-soft)' }}>{result.emphasized}</p>
            <p style={{ marginTop: 6, color: 'var(--zh-text-mute)', fontSize: 13 }}>
              系统不会给学生贴"欺凌者""受害者""危险学生"标签。
            </p>
            {result.verdict !== 'normal' && (
              <p style={{ marginTop: 8, color: 'var(--zh-warning)', fontWeight: 600 }}>
                当前互动记录存在需要关注的异常信号，建议结合完整事件背景进一步确认。
              </p>
            )}
          </div>

          <AiOutputPanel output={result.output} />

          {/* 网络关系 → 成长树联动：完成交往处理学习 → 新枝/新花 */}
          <div className="zh-card grow-link">
            <h3>完成一次网络交往处理学习</h3>
            <p>学习如何识别持续针对性表达、如何保护自己、如何在需要时求助。完成后记录这次成长。</p>
            <button
              className="zh-btn-primary"
              disabled={learned}
              onClick={() => { grow('branch'); grow('flower'); setLearned(true); }}
            >
              {learned ? '✓ 已记录：知芽长出新枝与新花' : '我已完成交往处理学习，记录成长'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
