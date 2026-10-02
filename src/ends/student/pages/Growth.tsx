import { useState } from 'react';
import { GROWTH_DIMENSIONS, GROWTH_STAGES } from '../../../types';
import { useStage } from '../../../context/StageContext';

export function Growth() {
  const { stage } = useStage();
  const current = GROWTH_STAGES.find((s) => s.stage === stage)!;
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="zh-page">
      <div className="page-head">
        <h1>我的成长</h1>
      </div>

      <div className="zh-card" style={{ marginBottom: 16, borderLeft: '4px solid var(--zh-primary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Stage {current.stage} · {current.name}</h3>
          <span className="zh-tag">{current.focus}</span>
        </div>
      </div>

      <div className="zh-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {GROWTH_DIMENSIONS.map((d) => {
          const isOpen = open === d.key;
          return (
            <button
              key={d.key}
              className={'zh-card gr__card' + (isOpen ? ' open' : '')}
              onClick={() => setOpen(isOpen ? null : d.key)}
            >
              <h3 style={{ marginBottom: isOpen ? 10 : 0 }}>{d.name}</h3>
              {isOpen && (
                <ul className="fact-list" style={{ animation: 'zh-fade-up 0.3s ease both' }}>
                  {d.indicators.map((ind) => <li key={ind}>{ind}</li>)}
                </ul>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
