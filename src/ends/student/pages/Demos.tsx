import { Link } from 'react-router-dom';
import './Demos.css';

/**
 * 预置 6 个完整 Demo —— 比赛演示用。
 * 每个 Demo 都遵循：AI 感知 → 理解 → 教会判断 → 柔性干预 → 成长树反馈。
 */
const DEMOS = [
  {
    no: 1, title: '信息风险', path: '/student/insight',
    steps: '截图输入 → AI 分析 → 来源验证 → 学生完成验证 → 新叶',
  },
  {
    no: 2, title: '网络流行语', path: '/student/insight',
    steps: '聊天内容 → AI 解释网络语境 → 判断冒犯/攻击倾向 → 学习更合适表达 → 新花',
  },
  {
    no: 3, title: '网络交往', path: '/student/relations',
    steps: '多人聊天 → 识别持续针对性表达 → 风险提示 → 建议人工确认 → 学习应对 → 新枝',
  },
  {
    no: 4, title: '学习偏航', path: '/student/learning',
    steps: '目标 → 计划 → 实际 → 偏差 → 原因 → 恢复 → 果实',
  },
  {
    no: 5, title: '成长阶段', path: '/student/simulator',
    steps: '同一案例切换：保护阶段 → 判断阶段 → 自主阶段，展示 AI 变化',
  },
  {
    no: 6, title: '成长报告', path: '/student/report',
    steps: '汇总五维趋势，展示成长树从过去到现在的变化',
  },
];

export function Demos() {
  return (
    <div className="zh-page">
      <div className="page-head">
        <h1>演示 Demo</h1>
        <p>6 个完整演示，覆盖三类 AI 风险感知、成长阶段自适应与成长报告。</p>
      </div>
      <div className="demos__grid">
        {DEMOS.map((d) => (
          <Link key={d.no} to={d.path} className="zh-card demos__card">
            <span className="demos__no">Demo {d.no}</span>
            <h3>{d.title}</h3>
            <p>{d.steps}</p>
            <span className="demos__enter">开始演示 →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
