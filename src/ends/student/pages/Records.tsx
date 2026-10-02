import { useTree } from '../../../context/TreeContext';
import './Records.css';

/**
 * 成长记录 —— 用"行为 + 趋势 + 变化"描述成长，不转换成能力分数。
 */
export function Records() {
  const { state } = useTree();
  const el = state.growthElements;

  const DIMS = [
    { name: '信息判断', behavior: '本周完成 3 次来源核验', trend: '较上周 +1 次', change: '开始主动核对信息来源', count: el.leaf ?? 0, unit: '片叶' },
    { name: '网络素养', behavior: '完成 2 次网络语境学习', trend: '稳步进行', change: '更能理解网络表达背后的语境', count: el.flower ?? 0, unit: '朵花' },
    { name: '网络交往', behavior: '完成 1 次网络交往分析', trend: '近期互动平稳', change: '学会识别需要关注的异常信号', count: el.branch ?? 0, unit: '条枝' },
    { name: '学习执行', behavior: '完成 4 次学习恢复调整', trend: '执行节奏回升中', change: '能主动拆分任务并恢复节奏', count: el.fruit ?? 0, unit: '个果实' },
    { name: '自我管理', behavior: '完成 2 次主动调整', trend: '保持稳定', change: '遇到问题会主动调整方向', count: el.trunk ?? 0, unit: '级树干' },
  ];

  return (
    <div className="zh-page">
      <div className="page-head">
        <h1>成长记录</h1>
      </div>

      <div className="rec__grid">
        {DIMS.map((d) => (
          <div key={d.name} className="zh-card rec__card">
            <div className="rec__head">
              <h3>{d.name}</h3>
              <span className="zh-tag">{d.count} {d.unit}</span>
            </div>
            <ul className="fact-list">
              <li><b>行为：</b>{d.behavior}</li>
              <li><b>趋势：</b>{d.trend}</li>
              <li><b>变化：</b>{d.change}</li>
            </ul>
          </div>
        ))}
      </div>

      <div className="zh-card rec__timeline" style={{ marginTop: 16 }}>
        <h3 style={{ marginBottom: 12 }}>最近的成长事件</h3>
        <div className="tree__timeline">
          {state.growthEvents.slice(0, 5).map((e) => (
            <div key={e.id} className="tree__event">
              <span className="tree__event-dot" />
              <div>
                <b>{e.title}</b>
                <span className="tree__event-when">{e.when}</span>
                <p>原因：{e.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
