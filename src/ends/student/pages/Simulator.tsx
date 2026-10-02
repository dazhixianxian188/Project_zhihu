import { useState } from 'react';
import { GROWTH_STAGES, STAGE_PROFILES, FORBIDDEN_MONITORING } from '../../../types';
import { useStage } from '../../../context/StageContext';
import { ZhiYa } from '../../../components/ZhiYa';
import { AiOutputPanel } from '../../../components/AiOutputPanel';
import { analyzeInfoRisk } from '../../../engine/growthEngine';
import './Simulator.css';

/** 同一案例：网络上看到一条没有来源的消息 */
const CASE = '这条消息说有个重大发现，但没有给出任何来源或证据。';

/**
 * 成长阶段模拟器 —— 用于比赛 Demo。
 * 切换阶段后同时改变：AI语言、分析深度、干预强度、建议方式、页面视觉、信息密度、知芽形态、成长树成熟度。
 */
export function Simulator() {
  const { stage, setStage } = useStage();
  const [demoText] = useState('震惊！这个方法竟然100%有效，不转不是中国人！');
  const profile = STAGE_PROFILES[stage];
  const result = analyzeInfoRisk({ type: 'text', content: demoText }, stage);

  return (
    <div className="sim zh-page">
      <div className="page-head">
        <h1>成长阶段模拟器</h1>
        <p>切换成长阶段，观察 AI 如何随学生成熟度改变支持方式——不只是换文案。</p>
      </div>

      <div className="sim__switcher">
        {GROWTH_STAGES.map((s) => (
          <button
            key={s.stage}
            className={'sim__stage' + (stage === s.stage ? ' active' : '')}
            onClick={() => setStage(s.stage)}
          >
            <b>Stage {s.stage}</b>
            <span>{s.name}</span>
            <em>{s.focus}</em>
          </button>
        ))}
      </div>

      <div className="sim__grid">
        <div className="zh-card sim__buddy">
          <h3>知芽形态</h3>
          <div className="sim__buddy-main">
            <ZhiYa form={profile.budForm} size={150} />
          </div>
          <p className="sim__muted">随成长阶段变化形态</p>
        </div>

        <div className="zh-card">
          <h3>AI 语言与引导方式</h3>
          <ul className="fact-list">
            <li><b>开场白：</b>「{profile.greeting}」</li>
            <li><b>语气：</b>{profile.tone === 'simple' ? '简单、温和、直接、少术语' : profile.tone === 'explanatory' ? '解释原因、提供依据、鼓励思考' : '理性、克制、分析型、提供多个选项'}</li>
            <li><b>建议条数：</b>{profile.actionCount} 条（阶段越高，选项越完整）</li>
            <li><b>信息密度：</b>{profile.density === 'low' ? '低 —— 明亮柔和' : profile.density === 'medium' ? '中 —— 清晰有活力' : '高 —— 简洁高级'}</li>
            <li><b>视觉风格：</b>{profile.visual}</li>
          </ul>
        </div>
      </div>

      <div className="sim__demo-label">同一段内容，在不同阶段下的 AI 分析：</div>
      <div className="sim__demo-source zh-card">
        <b>示例信息：</b>{demoText}
      </div>

      <AiOutputPanel output={result.output} />

      {/* 同一案例三阶段对比 —— 比赛重要 Demo */}
      <div className="zh-card sim__compare" style={{ marginTop: 16 }}>
        <h3>同一案例 · 三个阶段的 AI 对比</h3>
        <p className="sim__muted" style={{ marginBottom: 12 }}>
          案例：「在网络上看到一条没有来源的消息。」切换阶段，AI 的语言、深度与引导方式都不同。
        </p>
        <div className="sim__compare-grid">
          {(['A', 'B', 'C'] as const).map((s) => {
            const r = analyzeInfoRisk({ type: 'text', content: CASE }, s);
            const p = STAGE_PROFILES[s];
            return (
              <div key={s} className={'sim__compare-card' + (stage === s ? ' active' : '')} onClick={() => setStage(s)}>
                <b>Stage {s} · {p.tone === 'simple' ? '保护' : p.tone === 'explanatory' ? '判断培养' : '自主成长'}</b>
                <p>{r.output.observation.replace(/^[^。]*。\s*/, '')}</p>
                <span>{p.greeting}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="zh-card sim__promise">
        <h3>学生端承诺：不做监控后台</h3>
        <div className="sim__forbid">
          {FORBIDDEN_MONITORING.map((f) => (
            <span key={f} className="sim__forbid-item">✕ {f}</span>
          ))}
        </div>
        <p className="sim__muted" style={{ marginTop: 10 }}>
          知护面向学生个人成长，不做排名、不贴标签、不制造焦虑。成长树只记录你自己的成长。
        </p>
      </div>
    </div>
  );
}
