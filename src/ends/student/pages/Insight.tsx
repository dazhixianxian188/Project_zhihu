import { useState } from 'react';
import { analyzeInfoRisk } from '../../../engine/growthEngine';
import { useStage } from '../../../context/StageContext';
import { useTree } from '../../../context/TreeContext';
import { AiOutputPanel } from '../../../components/AiOutputPanel';
import type { InfoRiskResult } from '../../../types';
import './Insight.css';

/** 自动监测到的内容（Mock）—— 学生无需手动输入，系统发现后供查看与处理 */
const MONITORED = [
  { id: 'm1', cat: '信息内容', title: '一条来源不明的热传消息', preview: '震惊！这个方法竟然 100% 有效，不转不是中国人！', type: 'web' as const },
  { id: 'm2', cat: '网络互动', title: '群聊中反复出现的针对性玩笑', preview: '哈哈哈他又来了，老样子……', type: 'chat' as const },
  { id: 'm3', cat: '流行表达', title: '截图里的网络流行语', preview: '这波操作我直接封神 yyds', type: 'meme' as const },
  { id: 'm4', cat: '信息内容', title: '一张缺少出处的图片', preview: '配图称“某研究证明”，但未标注来源', type: 'image' as const },
];

const CATS = ['全部', '信息内容', '网络互动', '流行表达'];

export function Insight() {
  const { stage } = useStage();
  const { grow } = useTree();
  const [cat, setCat] = useState('全部');
  const [active, setActive] = useState<string | null>(null);
  const [verified, setVerified] = useState<Record<string, boolean>>({});

  const list = MONITORED.filter((m) => cat === '全部' || m.cat === cat);
  const current = MONITORED.find((m) => m.id === active);
  const result: InfoRiskResult | null = current ? analyzeInfoRisk({ type: current.type, content: current.preview }, stage) : null;

  return (
    <div className="zh-page">
      <div className="page-head">
        <h1>信息洞察</h1>
      </div>

      <div className="ins__tabs">
        {CATS.map((c) => (
          <button key={c} className={'ins__tab' + (cat === c ? ' active' : '')} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      <div className="ins__list">
        {list.map((m) => (
          <button
            key={m.id}
            className={'zh-card ins__item' + (active === m.id ? ' open' : '')}
            onClick={() => setActive(active === m.id ? null : m.id)}
          >
            <div className="ins__item-head">
              <span className="zh-tag">{m.cat}</span>
              <b>{m.title}</b>
            </div>
            <p className="ins__preview">{m.preview}</p>
          </button>
        ))}
      </div>

      {current && result && (
        <div className="zh-grid" style={{ marginTop: 16 }}>
          <div className="zh-card">
            <h3 style={{ marginBottom: 12 }}>AI 分析</h3>
            <ul className="fact-list">
              <li><b>来源：</b>{result.source}</li>
              <li><b>语境：</b>{result.networkContext}</li>
              <li><b>可能误解：</b>{result.misunderstanding}</li>
            </ul>
            {result.absoluteExpressions.length > 0 && (
              <p><span className="zh-tag" style={{ background: 'var(--zh-warm-soft)', color: 'var(--zh-warning)' }}>绝对化表达</span> {result.absoluteExpressions.join('、')}</p>
            )}
            {result.emotionalManipulation.length > 0 && (
              <p><span className="zh-tag" style={{ background: '#fdecec', color: 'var(--zh-danger)' }}>情绪诱导</span> {result.emotionalManipulation.join('、')}</p>
            )}
          </div>

          <AiOutputPanel output={result.output} />

          <div className="zh-card grow-link">
            <h3>记录这次判断</h3>
            <button
              className="zh-btn-primary"
              disabled={!!verified[current.id]}
              onClick={() => { grow('leaf'); setVerified((v) => ({ ...v, [current.id]: true })); }}
            >
              {verified[current.id] ? '已记录' : '我已完成核验'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
