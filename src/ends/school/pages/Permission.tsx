import { ROLES } from '../../../types/risk';
import './Permission.css';

/**
 * 学校管理端 · 权限管理 —— 学生/家长/教师/管理员，不同数据访问权限。
 */
export function Permission() {
  return (
    <div className="zh-page">
      <div className="page-head">
        <h1>权限管理</h1>
        <p>按角色配置数据访问权限，遵循最小授权与权限隔离原则。</p>
      </div>
      <div className="perm__grid">
        {ROLES.map((r) => (
          <div key={r.role} className="zh-card perm__card">
            <h3>{r.name}</h3>
            <p className="perm__label">可访问</p>
            <ul className="fact-list">{r.dataAccess.map((d) => <li key={d}>{d}</li>)}</ul>
            <p className="perm__label perm__label--restrict">默认不可访问（需授权）</p>
            <ul className="fact-list">{r.restricted.map((d) => <li key={d}>{d}</li>)}</ul>
          </div>
        ))}
      </div>
    </div>
  );
}
