import { useState } from 'react';
import './Review.css';

/**
 * 学校管理端 · 人工复核 —— 高风险事件必须允许人工查看、确认和处理。
 * 强调事件风险，不贴学生身份标签。
 */
interface Case {
  id: string; risk: string; status: 'pending' | 'confirmed' | 'resolved'; summary: string; caution: string;
}

const CASES: Case[] = [
  { id: 'R-104', risk: '网络交往 · 持续针对性表达（需人工确认）', status: 'pending',
    summary: 'AI 发现提供的互动记录中存在针对特定对象的持续负面表达，置信度 65%。',
    caution: '当前为事件风险分析，不构成对任何学生的身份定性。是否构成欺凌需结合完整背景确认。' },
  { id: 'R-099', risk: '学习执行 · 持续偏航', status: 'confirmed',
    summary: '已与学生沟通，确认原因为近期课程安排变化，已调整学习单元。', caution: '无。' },
];

export function Review() {
  const [cases, setCases] = useState(CASES);
  const resolve = (id: string) =>
    setCases((cs) => cs.map((c) => (c.id === id ? { ...c, status: 'resolved' } : c)));

  return (
    <div className="zh-page">
      <div className="page-head">
        <h1>人工复核</h1>
        <p>高风险事件必须经过人工查看、确认与处理。复核结论描述事件，不形成学生身份标签。</p>
      </div>
      <div className="rv__list">
        {cases.map((c) => (
          <div key={c.id} className="zh-card rv__item">
            <div className="rv__head">
              <b>{c.id} · {c.risk}</b>
              <span className={'rv__status rv__status--' + c.status}>
                {c.status === 'pending' ? '待复核' : c.status === 'confirmed' ? '已确认' : '已处理'}
              </span>
            </div>
            <p>{c.summary}</p>
            <p className="rv__caution">⚠️ {c.caution}</p>
            {c.status === 'pending' && (
              <div className="rv__actions">
                <button className="zh-btn-primary" onClick={() => resolve(c.id)}>确认并处理</button>
                <button className="zh-btn-ghost" onClick={() => resolve(c.id)}>标记为不构成风险</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
