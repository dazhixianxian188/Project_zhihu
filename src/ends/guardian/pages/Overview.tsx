import { ZhiYa } from '../../../components/ZhiYa';
import './Overview.css';

/** 五个趋势维度：信息判断、学习执行、网络素养、网络交往风险、自主管理。用趋势，不用"好学生分数"。 */
const METRICS = [
  { name: '信息判断能力', value: 72, trend: '稳步提升', color: 'var(--zh-primary)' },
  { name: '学习执行', value: 58, trend: '近两周略有下降', color: 'var(--zh-warning)' },
  { name: '网络素养', value: 66, trend: '逐步形成', color: 'var(--zh-primary)' },
  { name: '网络交往风险', value: 18, trend: '整体平稳', color: 'var(--zh-info)', invert: true },
  { name: '自主管理', value: 65, trend: '平稳', color: 'var(--zh-primary)' },
];

const AI_SUGGESTIONS = [
  '近两周学习计划执行出现持续下降，建议优先了解近期课程安排和个人时间变化。',
  '信息判断能力稳步提升，可鼓励孩子继续对网络信息进行来源核验。',
  '网络交往未见明显风险信号，保持开放沟通即可。',
];

export function Overview() {
  return (
    <div className="zh-page">
      <div className="page-head">
        <h1>学生成长概览</h1>
        <p>了解孩子/学生的成长状态与趋势。知护支持成长，不做学生之间的排名。</p>
      </div>

      <div className="ov__buddy zh-card">
        <ZhiYa form="tree" size={56} />
        <div>
          <b>知芽 · 辅助成长状态</b>
          <p style={{ color: 'var(--zh-text-soft)', fontSize: 13, marginTop: 2 }}>
            知芽在此仅作为辅助成长视觉，帮助你直观感受孩子的成长节奏，不作为游戏元素。
          </p>
        </div>
      </div>

      <div className="ov__grid">
        {METRICS.map((m) => (
          <div key={m.name} className="zh-card ov__metric">
            <div className="ov__metric-head">
              <span>{m.name}</span>
              <b style={{ color: m.color }}>{m.invert ? `风险 ${m.value}` : `${m.value}`}</b>
            </div>
            <div className="ov__bar">
              <div className="ov__bar-fill" style={{ width: `${m.value}%`, background: m.color }} />
            </div>
            <p className="ov__trend">{m.trend}</p>
          </div>
        ))}
      </div>

      <div className="zh-card ov__growth" style={{ marginTop: 16 }}>
        <ZhiYa form="tree" size={44} />
        <div>
          <b>成长状态</b>
          <p>近期新增 3 项成长记录（信息核验、学习恢复、网络素养学习）。</p>
          <span className="ov__growth-note">成长树记录的是成长过程，不作为评分或等级。</span>
        </div>
      </div>

      <div className="zh-card" style={{ marginTop: 16 }}>
        <h3 style={{ marginBottom: 10 }}>AI 支持建议</h3>
        <ul className="fact-list">
          {AI_SUGGESTIONS.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>
    </div>
  );
}
