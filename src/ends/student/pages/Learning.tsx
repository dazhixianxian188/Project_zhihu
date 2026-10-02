import { useState } from 'react';
import { analyzeLearningTrack } from '../../../engine/growthEngine';
import { useStage } from '../../../context/StageContext';
import { useTree } from '../../../context/TreeContext';
import { AiOutputPanel } from '../../../components/AiOutputPanel';
import type { LearningRiskResult, LearningTrack } from '../../../types';

const SCENES = ['CET-4/6', '考研', '编程', '科研', '课程', '竞赛', '技能', '实习准备'];

export function Learning() {
  const { stage } = useStage();
  const { grow } = useTree();
  const [track, setTrack] = useState<LearningTrack>({
    goal: '12月底通过六级',
    planMinutesPerDay: 90,
    actualMinutesPerDay: 55,
    scene: 'CET-4/6',
  });
  const [result, setResult] = useState<LearningRiskResult | null>(null);
  const [recovered, setRecovered] = useState(false);

  const run = () => { setResult(analyzeLearningTrack(track, stage)); setRecovered(false); };

  const field = (label: string, node: React.ReactNode) => (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--zh-text-soft)' }}>
      {label}
      {node}
    </label>
  );

  return (
    <div className="zh-page">
      <div className="page-head">
        <h1>学习轨迹</h1>
        <p>AI 提供建议，最终选择权属于你。</p>
      </div>

      <div className="zh-card" style={{ marginBottom: 16 }}>
        <div className="zh-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {field('学习场景', (
            <select className="zh-input" value={track.scene} onChange={(e) => setTrack({ ...track, scene: e.target.value })}>
              {SCENES.map((s) => <option key={s}>{s}</option>)}
            </select>
          ))}
          {field('学习目标', (
            <input className="zh-input" value={track.goal} onChange={(e) => setTrack({ ...track, goal: e.target.value })} />
          ))}
          {field('计划（分钟/天）', (
            <input type="number" className="zh-input" value={track.planMinutesPerDay}
              onChange={(e) => setTrack({ ...track, planMinutesPerDay: Number(e.target.value) })} />
          ))}
          {field('实际（分钟/天）', (
            <input type="number" className="zh-input" value={track.actualMinutesPerDay}
              onChange={(e) => setTrack({ ...track, actualMinutesPerDay: Number(e.target.value) })} />
          ))}
        </div>
        <button className="zh-btn-primary" style={{ marginTop: 14 }} onClick={run}>分析偏航</button>
      </div>

      {result && (
        <div className="zh-grid">
          <div className="zh-card">
            <h3 style={{ marginBottom: 8 }}>执行偏差</h3>
            <p>{result.deviation}</p>
            <div style={{ height: 10, borderRadius: 999, background: 'var(--zh-border)', marginTop: 12, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${Math.min(100, (track.actualMinutesPerDay / Math.max(track.planMinutesPerDay, 1)) * 100)}%`,
                background: 'var(--zh-primary)',
              }} />
            </div>
            <p style={{ fontSize: 12, color: 'var(--zh-text-mute)', marginTop: 6 }}>实际执行 / 计划</p>
          </div>

          <div className="zh-card">
            <h3 style={{ marginBottom: 8 }}>可能原因</h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {result.possibleCauses.map((c) => <span key={c} className="zh-tag">{c}</span>)}
            </div>
            <h3 style={{ margin: '16px 0 8px' }}>恢复建议</h3>
            <p>{result.recoverySuggestion}</p>
            <p style={{ marginTop: 10, fontSize: 13, color: 'var(--zh-autonomy)' }}>{result.emphasized}</p>
          </div>

          <AiOutputPanel output={result.output} />

          {/* 学习轨迹 → 成长树联动：选择并完成恢复方案 → 果实/枝条 */}
          <div className="zh-card grow-link">
            <h3>选择一个恢复方案并完成</h3>
            <p style={{ marginBottom: 10 }}>AI 提供建议，最终选择权属于你。选择你愿意尝试的方式：</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
              <span className="zh-tag">将 90 分钟拆成 3 个 30 分钟单元</span>
              <span className="zh-tag">先恢复节奏，再逐步加量</span>
              <span className="zh-tag">回顾时间冲突并重新排期</span>
            </div>
            <button
              className="zh-btn-primary"
              disabled={recovered}
              onClick={() => { grow('fruit'); grow('branch'); setRecovered(true); }}
            >
              {recovered ? '✓ 已记录：知芽结出果实、长出新枝' : '我已完成恢复调整，记录成长'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
