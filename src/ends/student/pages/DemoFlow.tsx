import { Link } from 'react-router-dom';
import './DemoFlow.css';

/**
 * 比赛 Demo 故事线 —— 12 步串联，每步可进入对应页面真实演示。
 * 核心闭环：风险发现 → AI 解释 → 学生学习 → 学生行动 → 成长树变化。
 * 重点不是"AI 发现了多少风险"，而是"AI 发现风险之后，学生长出了新的能力"。
 */
const STEPS = [
  { n: 1, title: '学生遇到网络信息', to: '/student/insight', desc: '在信息洞察输入一条无来源的消息。' },
  { n: 2, title: 'AI 发现潜在信息风险', to: '/student/insight', desc: 'AI 返回五段式分析，识别未验证与误导迹象。' },
  { n: 3, title: 'AI 解释风险，而非简单禁止', to: '/student/insight', desc: '给出依据、原因与"你可以怎么判断"。' },
  { n: 4, title: '学生学习信息判断方法', to: '/student/insight', desc: '找来源、找证据、交叉验证。' },
  { n: 5, title: '完成信息核验 → 成长树新增叶片', to: '/student/insight', desc: '点击"我已完成来源核验"，知芽长出新叶。' },
  { n: 6, title: '网络交往案例', to: '/student/relations', desc: '输入多人聊天，AI 分析互动关系，发现持续针对性表达。' },
  { n: 6.5, title: 'AI 提示：需结合完整背景确认', to: '/student/relations', desc: '异常 ≠ 欺凌，不贴标签。' },
  { n: 7, title: '学习处理方法 → 成长树增加枝条/花朵', to: '/student/relations', desc: '完成交往处理学习，知芽长出新枝与新花。' },
  { n: 8, title: '学习轨迹：目标·计划·实际·偏航·恢复 → 果实', to: '/student/learning', desc: '六级目标，计划90分钟实际55分钟，自主调整后结出果实。' },
  { n: 9, title: '切换成长阶段：保护 → 判断 → 自主', to: '/student/simulator', desc: '同一案例，AI 文案/深度/干预/视觉/知芽/成长树同步变化。' },
  { n: 10, title: '教师/家长端：成长趋势 + AI 分析 + 支持建议', to: '/guardian/overview', desc: '专业、理性、支持，不排名不贴标签。' },
  { n: 11, title: '学校端：风险事件 + 人工复核 + 权限 + 数据治理', to: '/school/trend', desc: '教育治理，不是监控中心。' },
  { n: 12, title: '回到学生端：过去与现在的成长树对比', to: '/student/tree', desc: '这些变化不是等级，而是你主动完成的成长记录。' },
];

export function DemoFlow() {
  return (
    <div className="zh-page">
      <div className="page-head">
        <h1>比赛 Demo 故事线</h1>
        <p>按顺序点击进入每一步，可在对应页面真实演示完整闭环。</p>
      </div>

      <div className="df__flow">
        {STEPS.map((s) => (
          <Link key={s.n} to={s.to} className="df__step">
            <div className="df__num">{s.n}</div>
            <div className="df__body">
              <b>{s.title}</b>
              <span>{s.desc}</span>
            </div>
            <span className="df__go">进入 →</span>
          </Link>
        ))}
      </div>

      <div className="df__core zh-card">
        <b>核心闭环</b>
        <p>风险发现 → AI 解释 → 学生学习 → 学生行动 → 成长树变化</p>
        <p className="df__core-em">
          最终重点不是"AI 发现了多少风险"，而是"AI 发现风险之后，学生有没有因此长出新的能力"。
        </p>
      </div>

      <div className="df__final">
        <p>感知风险 · 理解风险 · 教会判断 · 柔性干预 · 自主成长</p>
        <p className="df__slogan">让 AI 发现风险，更让学生学会面对风险。</p>
      </div>
    </div>
  );
}
