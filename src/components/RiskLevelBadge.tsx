import type { InterventionLevel } from '../types';
import { INTERVENTION_LEVELS } from '../types';
import './RiskLevelBadge.css';

export function RiskLevelBadge({ level }: { level: InterventionLevel }) {
  const meta = INTERVENTION_LEVELS.find((l) => l.level === level)!;
  return (
    <span className={`risk-badge risk-badge--${level}`} title={meta.desc}>
      Level {level} · {meta.name}
    </span>
  );
}
