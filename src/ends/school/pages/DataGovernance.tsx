import { PRIVACY_PRINCIPLES, DATA_SOURCE_NOTICE } from '../../../types/risk';
import './DataGovernance.css';

/**
 * 学校管理端 · 数据治理 —— 授权、数据访问、审计日志、脱敏、权限。
 */
const AUDIT = [
  { time: '2026-10-01 09:12', actor: '教师', action: '查看班级脱敏趋势', result: '正常' },
  { time: '2026-09-28 14:30', actor: '管理员', action: '导出脱敏风险事件清单', result: '已记录' },
  { time: '2026-09-20 10:05', actor: '教师', action: '调阅需复核事件详情（含授权）', result: '已记录' },
];

export function DataGovernance() {
  return (
    <div className="zh-page">
      <div className="page-head">
        <h1>数据治理</h1>
        <p>授权、数据访问、审计日志、脱敏与权限，保障数据合规与最小化使用。</p>
      </div>
      <p className="data-notice">{DATA_SOURCE_NOTICE}</p>

      <div className="zh-card">
        <h3 style={{ marginBottom: 10 }}>隐私与治理原则</h3>
        <div className="dg__principles">
          {PRIVACY_PRINCIPLES.map((p) => (
            <div key={p.title} className="dg__p">
              <b>{p.title}</b><span>{p.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="zh-card" style={{ marginTop: 16 }}>
        <h3 style={{ marginBottom: 10 }}>审计日志</h3>
        <table className="dg__table">
          <thead><tr><th>时间</th><th>操作者</th><th>操作</th><th>结果</th></tr></thead>
          <tbody>
            {AUDIT.map((a, i) => (
              <tr key={i}><td>{a.time}</td><td>{a.actor}</td><td>{a.action}</td><td>{a.result}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
