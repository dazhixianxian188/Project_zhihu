import './Suggest.css';

/**
 * 家长/教师端 · 支持建议 —— 专业、理性、支持。
 * 禁止"该学生存在严重问题""该学生疑似欺凌者"，改为描述行为与建议。
 */
const SUGGESTIONS = [
  {
    area: '学习执行',
    bad: '该学生存在严重问题。',
    good: '近两周学习计划执行出现持续下降，建议优先了解近期课程安排和个人时间变化。',
  },
  {
    area: '网络交往',
    bad: '该学生疑似欺凌者。',
    good: '当前提供的互动记录存在持续针对性负面表达，建议结合完整事件背景进行人工确认。',
  },
  {
    area: '信息判断',
    bad: '该学生缺乏判断力。',
    good: '近期对未验证信息的采信较多，可陪伴练习信息来源核验，逐步形成判断习惯。',
  },
];

export function Suggest() {
  return (
    <div className="zh-page">
      <div className="page-head">
        <h1>支持建议</h1>
        <p>面向家长/教师的柔性支持建议——描述行为与趋势，不贴标签、不下定性结论。</p>
      </div>

      <div className="sug__list">
        {SUGGESTIONS.map((s) => (
          <div key={s.area} className="zh-card">
            <h3>{s.area}</h3>
            <div className="sug__row sug__row--bad">
              <span className="sug__tag sug__tag--bad">避免</span>
              <span>「{s.bad}」</span>
            </div>
            <div className="sug__row sug__row--good">
              <span className="sug__tag sug__tag--good">建议</span>
              <span>「{s.good}」</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
