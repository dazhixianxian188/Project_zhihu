import { useState } from 'react';
import { ZhiYa } from '../../../components/ZhiYa';
import './RiskEvents.css';

type Status = 'review' | 'done' | 'closed' | 'watch';

interface RiskEvent {
  id: string;
  title: string;
  category: string;
  status: Status;
  time: string;
}

const STATUS_META: Record<Status, { label: string; color: string }> = {
  review: { label: '待人工复核', color: '#c77700' },
  done: { label: '已处理', color: '#2f9e6b' },
  closed: { label: '已关闭', color: '#5b6472' },
  watch: { label: '需要持续关注', color: '#2f6bff' },
};

const INITIAL_EVENTS: RiskEvent[] = [
  { id: 'E-204', title: '某班级网络交往持续负面互动（疑似）', category: '网络交往', status: 'review', time: '2026-10-01' },
  { id: 'E-201', title: '学习计划执行连续两周下降', category: '学习偏航', status: 'watch', time: '2026-09-28' },
  { id: 'E-198', title: '未验证信息在年级群传播', category: '信息风险', status: 'done', time: '2026-09-25' },
  { id: 'E-190', title: '隐私信息疑似泄露（已人工确认并处置）', category: '网络交往', status: 'closed', time: '2026-09-20' },
];

export function RiskEvents() {
  const [filter, setFilter] = useState<Status | 'all'>('all');
  const [events] = useState<RiskEvent[]>(INITIAL_EVENTS);
  const shown = filter === 'all' ? events : events.filter((e) => e.status === filter);

  return (
    <div className="zh-page">
      <div className="page-head">
        <h1>风险事件</h1>
        <p>教育数字化治理视角下的风险事件管理。知护不是公安监控中心，也不是全量学生监控中心。</p>
      </div>

      <div className="re__brand zh-card">
        <ZhiYa form="lush" size={40} />
        <span>知芽仅作为品牌标识与轻量状态元素。</span>
      </div>

      <div className="re__filter">
        <button className={'re__chip' + (filter === 'all' ? ' active' : '')} onClick={() => setFilter('all')}>全部</button>
        {(Object.keys(STATUS_META) as Status[]).map((s) => (
          <button key={s} className={'re__chip' + (filter === s ? ' active' : '')} onClick={() => setFilter(s)}>
            {STATUS_META[s].label}
          </button>
        ))}
      </div>

      <div className="re__list">
        {shown.map((e) => (
          <div key={e.id} className="zh-card re__item">
            <div className="re__item-main">
              <b>{e.title}</b>
              <span className="re__meta">{e.id} · {e.category} · {e.time}</span>
            </div>
            <span className="re__status" style={{ color: STATUS_META[e.status].color, borderColor: STATUS_META[e.status].color }}>
              {STATUS_META[e.status].label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
