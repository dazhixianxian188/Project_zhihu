import './Intervention.css';

/**
 * 家长/教师端 · 干预记录 —— 柔性干预的过程记录。
 */
const RECORDS = [
  { time: '2026-10-01', level: 'Level 2 解释教育', area: '学习执行', note: 'AI 解释计划与实际的偏差，提供拆分学习单元建议。', outcome: '学生接受建议，本周执行回升。' },
  { time: '2026-09-28', level: 'Level 1 轻提醒', area: '信息判断', note: '提醒核验未验证信息的来源。', outcome: '学生完成 1 次来源核验。' },
  { time: '09-25（人工）', level: 'Level 3 自主恢复', area: '网络交往', note: '存在持续针对性表达迹象，转人工确认。', outcome: '结合背景确认非欺凌，已进行沟通引导。' },
];

export function GuardianIntervention() {
  return (
    <div className="zh-page">
      <div className="page-head">
        <h1>干预记录</h1>
        <p>记录 AI 柔性干预的等级、过程与后续变化，不做惩罚性评价。</p>
      </div>
      <div className="iv__list">
        {RECORDS.map((r, i) => (
          <div key={i} className="zh-card iv__item">
            <div className="iv__head">
              <b>{r.area}</b>
              <span className="zh-tag">{r.level}</span>
              <span className="iv__time">{r.time}</span>
            </div>
            <p><b>过程：</b>{r.note}</p>
            <p><b>后续变化：</b>{r.outcome}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
