import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './EndSwitcher.css';

const ENDS = [
  { to: '/student', label: '学生端', sub: '温暖陪伴' },
  { to: '/guardian/overview', label: '家长 / 教师端', sub: '专业支持' },
  { to: '/school/trend', label: '学校管理端', sub: '教育治理' },
];

function detectCurrent(pathname: string) {
  if (pathname.startsWith('/guardian')) return ENDS[1].to;
  if (pathname.startsWith('/school')) return ENDS[2].to;
  return ENDS[0].to;
}

/**
 * 端切换 —— 放在每个端的头像位置，下拉切换三端。
 */
export function EndSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const current = detectCurrent(pathname);
  const currentEnd = ENDS.find((e) => e.to === current) ?? ENDS[0];

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <div className="esw" ref={ref}>
      <button className="esw__avatar" onClick={() => setOpen((v) => !v)} title="切换端">
        <span className="esw__avatar-ring" />
      </button>
      {open && (
        <div className="esw__menu">
          <div className="esw__title">切换到</div>
          {ENDS.map((e) => (
            <Link
              key={e.to}
              to={e.to}
              className={'esw__item' + (e.to === current ? ' active' : '')}
              onClick={() => setOpen(false)}
            >
              <b>{e.label}</b>
              <span>{e.sub}</span>
            </Link>
          ))}
        </div>
      )}
      <span className="esw__current">{currentEnd.label}</span>
    </div>
  );
}
