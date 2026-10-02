import { NavLink, Outlet } from 'react-router-dom';
import { STUDENT_MODULES, GROWTH_STAGES } from '../../types';
import { useStage } from '../../context/StageContext';
import { EndSwitcher } from '../../components/EndSwitcher';
import './StudentLayout.css';

export function StudentLayout() {
  const { stage, setStage } = useStage();
  return (
    <div className="student-shell zh-ambient">
      <aside className="student-side">
        <div className="student-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="brand-bud" />
            <div>
              <div className="brand-name">知护</div>
              <div className="brand-sub">学生端</div>
            </div>
          </div>
          <EndSwitcher />
        </div>

        <nav className="student-nav">
          <NavLink to="/student" end className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
            <span className="nav-name">首页</span>
            <span className="nav-desc">温暖陪伴入口</span>
          </NavLink>
          {STUDENT_MODULES.map((m) => (
            <NavLink key={m.key} to={`/student/${m.key}`} className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
              <span className="nav-name">{m.name}</span>
              <span className="nav-desc">{m.desc}</span>
            </NavLink>
          ))}
          <NavLink to="/student/simulator" className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
            <span className="nav-name">阶段模拟器</span>
            <span className="nav-desc">切换成长阶段 Demo</span>
          </NavLink>
          <NavLink to="/student/report" className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
            <span className="nav-name">成长报告</span>
            <span className="nav-desc">我的成长回顾</span>
          </NavLink>
          <NavLink to="/student/demos" className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
            <span className="nav-name">演示 Demo</span>
            <span className="nav-desc">6 个完整演示</span>
          </NavLink>
          <NavLink to="/student/demo-flow" className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
            <span className="nav-name">Demo 故事线</span>
            <span className="nav-desc">12 步比赛演示</span>
          </NavLink>
        </nav>

        <div className="stage-switch">
          <div className="stage-label">成长阶段（影响 AI 引导方式）</div>
          <div className="stage-btns">
            {GROWTH_STAGES.map((s) => (
              <button
                key={s.stage}
                className={'stage-btn' + (stage === s.stage ? ' active' : '')}
                onClick={() => setStage(s.stage)}
                title={s.principle}
              >
                Stage {s.stage}
              </button>
            ))}
          </div>
          <p className="stage-tip">{GROWTH_STAGES.find((s) => s.stage === stage)?.focus} · 学生越成熟，AI 越少替你判断。</p>
        </div>
      </aside>

      <main className="student-main">
        <Outlet />
      </main>
    </div>
  );
}
