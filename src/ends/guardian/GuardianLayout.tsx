import { NavLink, Outlet } from 'react-router-dom';
import { EndSwitcher } from '../../components/EndSwitcher';
import './EndLayout.css';

const MODULES = [
  { key: 'overview', name: '成长概览' },
  { key: 'trend', name: '风险趋势' },
  { key: 'analysis', name: 'AI分析' },
  { key: 'suggest', name: '支持建议' },
  { key: 'intervention', name: '干预记录' },
];

export function GuardianLayout() {
  return (
    <div className="end-shell zh-ambient">
      <header className="end-header">
        <span className="brand-bud" />
        <b>知护 · 家长/教师端</b>
        <nav className="end-nav">
          {MODULES.map((m) => (
            <NavLink key={m.key} to={`/guardian/${m.key}`} className={({ isActive }) => 'end-nav-item' + (isActive ? ' active' : '')}>
              {m.name}
            </NavLink>
          ))}
        </nav>
        <EndSwitcher />
      </header>
      <main className="end-main"><Outlet /></main>
    </div>
  );
}
