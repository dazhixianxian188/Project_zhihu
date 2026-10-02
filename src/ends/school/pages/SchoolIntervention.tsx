import './SchoolIntervention.css';

/**
 * 学校管理端 · 干预管理 —— 记录 AI 干预、学生反馈、教师处理、后续变化。
 */
const LOGS = [
  { id: 'I-302', time: '2026-10-01', ai: 'Level 2 解释教育（学习执行偏航）', feedback: '学生接受拆分单元建议', teacher: '已与学生沟通', followup: '本周执行回升' },
  { id: 'I-298', time: '2026-09-28', ai: 'Level 4 支持介入（网络交往需关注）', feedback: '学生反馈为朋友间玩笑', teacher: '结合背景人工确认非欺凌', followup: '已引导，持续关注' },
  { id: 'I-290', time: '2026-09-20', ai: 'Level 1 轻提醒（信息未验证）', feedback: '已完成来源核验', teacher: '无需介入', followup: '关闭' },
];

export function SchoolIntervention() {
  return (
    <div className="zh-page">
      <div className="page-head">
        <h1>干预管理</h1>
        <p>柔性干预的全流程记录：AI 干预 → 学生反馈 → 教师处理 → 后续变化。</p>
      </div>
      <div className="si__list">
        {LOGS.map((l) => (
          <div key={l.id} className="zh-card si__item">
            <div className="si__head"><b>{l.id}</b><span className="si__time">{l.time}</span></div>
            <p><b>AI 干预：</b>{l.ai}</p>
            <p><b>学生反馈：</b>{l.feedback}</p>
            <p><b>教师处理：</b>{l.teacher}</p>
            <p><b>后续变化：</b>{l.followup}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
