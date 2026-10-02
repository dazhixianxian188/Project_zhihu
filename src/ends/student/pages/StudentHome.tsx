import { Link } from 'react-router-dom';
import { GrowthTree } from '../../../components/GrowthTree';
import { useStage } from '../../../context/StageContext';
import { useTree } from '../../../context/TreeContext';
import { STAGE_PROFILES, GROWTH_STAGES } from '../../../types';
import './StudentHome.css';

const SCENES = [
  { key: 'insight', title: '信息洞察', path: '/student/insight' },
  { key: 'relations', title: '网络关系', path: '/student/relations' },
  { key: 'learning', title: '学习轨迹', path: '/student/learning' },
];

const TODAY_REMINDERS = [
  { cat: '信息风险', text: '有 1 条待核验来源的信息', path: '/student/insight' },
  { cat: '网络交往', text: '近期互动整体平稳', path: '/student/relations' },
  { cat: '学习状态', text: '六级学习执行较计划略有下降', path: '/student/learning' },
];

const TODAY_GROWTH = [
  { cat: '信息判断', task: '完成一次信息来源核验', path: '/student/insight' },
  { cat: '学习目标', task: '完成今天的学习目标', path: '/student/learning' },
  { cat: '网络素养', task: '完成一次网络素养学习', path: '/student/simulator' },
  { cat: '自主管理', task: '完成一次主动调整', path: '/student/growth' },
];

export function StudentHome() {
  const { stage } = useStage();
  const { latestEventTitle, state, summary } = useTree();
  const profile = STAGE_PROFILES[stage];
  const meta = GROWTH_STAGES.find((s) => s.stage === stage)!;

  return (
    <div className="shome zh-ambient">
      {latestEventTitle && (
        <Link to="/student/tree" className="shome__growth-tip zh-anim-up">
          {latestEventTitle}
        </Link>
      )}

      <section className="shome__hero">
        <div className="shome__hero-text zh-anim-up">
          <h1>让 AI 发现风险，<br />更让你学会面对风险</h1>
          <div className="shome__cta">
            <Link to="/student/insight" className="zh-btn-primary">开始一次信息洞察</Link>
            <Link to="/student/simulator" className="zh-btn-ghost">成长阶段模拟器</Link>
          </div>
        </div>
        <div className="shome__hero-tree zh-float">
          <GrowthTree state={state} size={220} />
          <p className="shome__stage">{meta.name}</p>
        </div>
      </section>

      <section className="shome__scenes">
        {SCENES.map((s, i) => (
          <Link
            key={s.key}
            to={s.path}
            className="shome__scene zh-anim-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <span className="shome__scene-title">{s.title}</span>
            <span className="shome__scene-dot" />
          </Link>
        ))}
      </section>

      <section className="shome__growth">
        <div className="shome__growth-left">
          <Link to="/student/tree" className="shome__tree-thumb">
            <GrowthTree state={state} size={220} />
          </Link>
          <p className="shome__recent">{summary}</p>
          <Link to="/student/tree" className="shome__enter">我的成长树</Link>
        </div>

        <div className="shome__growth-right">
          <div className="zh-card">
            <h3>今日提醒</h3>
            <div className="shome__reminders">
              {TODAY_REMINDERS.map((r) => (
                <Link key={r.cat} to={r.path} className="shome__reminder">
                  <b>{r.cat}</b>
                  <span>{r.text}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="zh-card">
            <h3>今日成长</h3>
            <div className="shome__today">
              {TODAY_GROWTH.map((g) => (
                <Link key={g.cat} to={g.path} className="shome__today-item">
                  <b>{g.cat}</b>
                  <span>{g.task}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
