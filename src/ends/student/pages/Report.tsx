import { useTree } from '../../../context/TreeContext';
import { GrowthTree } from '../../../components/GrowthTree';
import { TREE_STAGES } from '../../../types/tree';
import './Report.css';

/**
 * 成长报告「我的成长」—— 不是"风险评分报告"。
 * 用行为与变化描述成长，展示成长树从过去到现在的变化。
 */
export function Report() {
  const { state, summary } = useTree();

  return (
    <div className="zh-page">
      <div className="page-head">
        <h1>我的成长</h1>
        <p>这不是风险评分报告，而是你这段时间真实成长的回顾。</p>
      </div>

      <div className="report__grid">
        <div className="zh-card">
          <h3>我正在形成什么能力</h3>
          <ul className="fact-list">
            <li>信息判断：开始主动核验信息来源，而不是直接接受。</li>
            <li>网络素养：能理解网络语境，区分调侃与攻击。</li>
            <li>网络交往：能识别需要关注的异常信号并知道如何求助。</li>
            <li>学习执行：遇到偏航时会主动拆分任务、恢复节奏。</li>
            <li>自我管理：保持计划执行，遇到问题主动调整。</li>
          </ul>
        </div>

        <div className="zh-card report__tree-card">
          <GrowthTree state={state} size={180} />
          <p className="report__stage">现在：{TREE_STAGES.find((s) => s.stage === state.treeStage)?.name}</p>
        </div>
      </div>

      <div className="zh-card" style={{ marginTop: 16 }}>
        <h3>最近发生了哪些变化</h3>
        <ul className="fact-list">
          <li>{summary}</li>
          <li>你完成了多次学习恢复调整，执行节奏正在回升。</li>
          <li>你做过主动调整：把大任务拆成小单元，先恢复节奏再加量。</li>
        </ul>
      </div>

      <div className="zh-card" style={{ marginTop: 16 }}>
        <h3>AI 建议我关注什么</h3>
        <ul className="fact-list">
          <li>继续保持对信息来源的核验习惯，它正在变成你的能力。</li>
          <li>学习执行回升中，建议稳定节奏，不必一次加量太多。</li>
          <li>网络交往整体平稳，保持与可信任的人开放沟通。</li>
        </ul>
      </div>

      <div className="zh-card report__closing" style={{ marginTop: 16, borderLeft: '4px solid var(--zh-primary)' }}>
        过去一段时间，你完成了多次信息判断、学习调整和网络素养学习，这些行为已经成为你的成长记录。
        成长树记录的不是你有多优秀，而是你一路走来真实的脚步。
      </div>
    </div>
  );
}
