import { useState } from 'react';
import './SchoolTrend.css';

const TRENDS = [
  { name: '信息判断能力', value: 74, change: '+6%', detail: '近四周来源核验次数稳步上升，学生主动核对信息的行为增加。' },
  { name: '学习执行', value: 61, change: '-3%', detail: '近期计划完成度略有回落，建议关注课程安排与时间分配变化。', invert: false },
  { name: '网络素养', value: 68, change: '+4%', detail: '网络语境理解与隐私保护学习参与度提升。' },
  { name: '网络交往风险', value: 15, change: '平稳', detail: '需关注的异常信号处于低位，整体互动平稳。', invert: true },
  { name: '自主管理', value: 66, change: '+2%', detail: '主动调整与计划执行保持稳定。' },
];

export function SchoolTrend() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="zh-page">
      <div className="page-head">
        <h1>成长趋势</h1>
      </div>

      <div className="st__grid">
        {TRENDS.map((t) => {
          const isOpen = open === t.name;
          return (
            <button
              key={t.name}
              className={'zh-card st__metric' + (isOpen ? ' open' : '')}
              onClick={() => setOpen(isOpen ? null : t.name)}
            >
              <div className="st__metric-head">
                <span>{t.name}</span>
                <b style={{ color: t.invert ? 'var(--zh-info)' : 'var(--zh-primary)' }}>
                  {t.invert ? `风险 ${t.value}` : t.value}
                </b>
              </div>
              <div className="st__bar"><div className="st__fill" style={{ width: `${t.value}%` }} /></div>
              <span className="st__change">{t.change}</span>
              {isOpen && <p className="st__detail">{t.detail}</p>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
