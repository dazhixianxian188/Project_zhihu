interface Props {
  title: string;
  desc: string;
}

/** 家长/教师端与学校管理端各模块的骨架页面（后续段逐步填充功能） */
export function PlaceholderPage({ title, desc }: Props) {
  return (
    <div className="zh-page">
      <div className="page-head">
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>
      <div className="zh-card">
        <p style={{ color: 'var(--zh-text-soft)' }}>
          本模块已在系统结构中预留，将在后续段基于统一成长模型与 AI 成长引擎继续完善。
        </p>
        <p style={{ marginTop: 10, color: 'var(--zh-text-mute)', fontSize: 13 }}>
          遵循"分段连续开发"：本段只搭建骨架，不提前重构已确定的功能与定位。
        </p>
      </div>
    </div>
  );
}
