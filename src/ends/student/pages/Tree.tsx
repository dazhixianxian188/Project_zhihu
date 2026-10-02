import { useTree } from '../../../context/TreeContext';
import { GrowthTree } from '../../../components/GrowthTree';
import { TREE_STAGES, TREE_ELEMENTS } from '../../../types/tree';
import type { TreeElementKey } from '../../../types/tree';
import './Tree.css';

/**
 * 知芽成长树 —— 学生自主成长的视觉化载体。
 * 中央：当前成长树；右侧/下方：今日成长、成长记录、成长事件时间线、我的成长变化。
 * 真实成长行为 → 解锁元素 → 建设成长树 → 看见自己的变化。
 */
export function Tree() {
  const { state, completeTask, summary } = useTree();
  const stage = state.treeStage;
  const stageMeta = TREE_STAGES.find((s) => s.stage === stage)!;
  const el = state.growthElements;

  return (
    <div className="zh-page">
      <div className="page-head">
        <h1>我的成长树 · 知芽</h1>
        <p>这棵树只记录你自己的成长——每一次判断、每一次恢复，都是真实发生过的成长。</p>
      </div>

      <div className="tree__layout">
        {/* 中央：当前成长树 */}
        <div className="zh-card tree__center">
          <GrowthTree state={state} size={300} />
          <div className="tree__stage-name">{stageMeta.name}</div>
          <p className="tree__stage-desc">{stageMeta.desc}</p>
          <div className="tree__stages">
            {TREE_STAGES.map((s, i) => (
              <span key={s.stage} className={'tree__stage-chip' + (stage === s.stage ? ' active' : '')}>
                {i + 1}. {s.name}
              </span>
            ))}
          </div>
        </div>

        {/* 右侧：今日成长 + 成长记录 */}
        <div className="tree__side">
          <div className="zh-card">
            <h3 style={{ marginBottom: 10 }}>今日成长</h3>
            <p className="tree__note">任务是建议，成长是反馈。不强制、不惩罚。</p>
            <div className="tree__tasks">
              {state.currentTasks.map((t) => {
                const done = state.completedTasks.includes(t.id);
                return (
                  <div key={t.id} className={'tree__task' + (done ? ' done' : '')}>
                    <div>
                      <b>{t.category}</b>
                      <span>{t.title} · {TREE_ELEMENTS[t.reward].name}</span>
                    </div>
                    <button
                      className={'zh-btn-' + (done ? 'ghost' : 'primary')}
                      style={{ padding: '5px 14px', fontSize: 13 }}
                      disabled={done}
                      onClick={() => completeTask(t.id, t.reward as TreeElementKey)}
                    >
                      {done ? '已完成' : '完成'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="zh-card">
            <h3 style={{ marginBottom: 6 }}>成长记录</h3>
            <p>{summary}</p>
            <div className="tree__counts">
              {(['leaf', 'branch', 'flower', 'fruit'] as TreeElementKey[]).map((k) => (
                <span key={k} className="tree__count">
                  {TREE_ELEMENTS[k].name} × {el[k] ?? 0}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 成长事件时间线 */}
      <div className="zh-card" style={{ marginTop: 16 }}>
        <h3 style={{ marginBottom: 12 }}>成长事件</h3>
        <div className="tree__timeline">
          {state.growthEvents.map((e) => (
            <div key={e.id} className="tree__event">
              <span className="tree__event-dot" />
              <div>
                <b>{e.title}</b>
                <span className="tree__event-when">{e.when}</span>
                <p>原因：{e.reason}</p>
                <p className="tree__event-note">{e.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 我的成长变化：与过去的自己，不与他人比较 */}
      <div className="zh-card tree__principle" style={{ marginTop: 16, borderLeft: '4px solid var(--zh-primary)' }}>
        <b>我的成长变化</b>
        <ul className="fact-list" style={{ marginTop: 8 }}>
          {state.growthHistory.map((h, i) => (
            <li key={i}>
              <b>{TREE_STAGES.find((s) => s.stage === h.stage)?.name}：</b>{h.note}
            </li>
          ))}
        </ul>
        <p className="tree__note" style={{ marginTop: 10 }}>
          这里只和过去的自己比较。一个月前的种子，到现在的成长树——你正在逐渐形成自己的能力。
        </p>
      </div>
    </div>
  );
}
