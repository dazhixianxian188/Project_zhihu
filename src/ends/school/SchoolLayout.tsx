import { NavLink, Outlet } from 'react-router-dom';
import { EndSwitcher } from '../../components/EndSwitcher';
import '../guardian/EndLayout.css';

const MODULES = [
  { key: 'trend', name: '成长趋势' },
  { key: 'events', name: '风险事件' },
  { key: 'intervention', name: '干预管理' },
  { key: 'review', name: '人工复核' },
  { key: 'permission', name: '权限管理' },
  { key: 'data', name: '数据治理' },
];

export function SchoolLayout() {
  return (
    <div className="end-shell zh-ambient">
      <header className="end-header">
        <span className="brand-bud" />
        <b>知护 · 学校管理端</b>
        <nav className="end-nav">
          {MODULES.map((m) => (
            <NavLink key={m.key} to={`/school/${m.key}`} className={({ isActive }) => 'end-nav-item' + (isActive ? ' active' : '')}>
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
