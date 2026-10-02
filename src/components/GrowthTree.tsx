import { useMemo } from 'react';
import type { TreeStage, TreeState } from '../types/tree';
import './GrowthTree.css';

interface Props {
  state: TreeState;
  size?: number;
}

/** 确定性伪随机：同一输入永远同一输出，避免渲染闪烁 */
function rng(seed: number) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/**
 * 知芽成长树 —— 随使用渐进展现的巨人藤蔓。
 * 不一次全部展现：阶段越低越简，越高越粗壮、华丽、挂件与生灵越多。
 * 全部为柔和自然的动态 SVG，无 emoji、无图标。
 */
export function GrowthTree({ state, size = 360 }: Props) {
  const stage = state.treeStage;
  const el = state.growthElements;
  const leaves = el.leaf ?? 0;
  const branches = el.branch ?? 0;
  const flowers = el.flower ?? 0;
  const fruits = el.fruit ?? 0;

  const scenery = useMemo(() => {
    const r = rng(7);
    // 远景云雾（仅较高阶段出现，增加层次与动态）
    const clouds =
      stage === 'fruiting' || stage === 'lush'
        ? [
            { x: 40, y: 60, s: 1, d: 0 },
            { x: 300, y: 40, s: 1.3, d: 3 },
          ]
        : [];
    // 光点（萤火虫/光斑），繁茂阶段最多
    const sparks = [] as { x: number; y: number; d: number }[];
    if (stage === 'lush') {
      for (let i = 0; i < 6; i++) sparks.push({ x: 60 + r() * 280, y: 90 + r() * 180, d: r() * 4 });
    }
    return { clouds, sparks };
  }, [stage]);

  const W = 420;
  const H = 440;

  return (
    <div className="gtree" style={{ width: size, height: size * (H / W) }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" aria-label="知芽成长树" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="gt-sky" cx="50%" cy="20%" r="90%">
            <stop offset="0%" stopColor="#fdfbf3" />
            <stop offset="100%" stopColor="#eef6ec" />
          </radialGradient>
          <radialGradient id="gt-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff3c4" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffd76b" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="gt-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b89060" />
            <stop offset="100%" stopColor="#8f6b43" />
          </linearGradient>
          <linearGradient id="gt-trunk" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5a4226" />
            <stop offset="50%" stopColor="#7a5a3a" />
            <stop offset="100%" stopColor="#5a4226" />
          </linearGradient>
        </defs>

        {/* 天空背景 */}
        <rect x="0" y="0" width={W} height={H} fill="url(#gt-sky)" />

        {/* 远景云雾 */}
        {scenery.clouds.map((c, i) => (
          <g key={i} className="gt-cloud" style={{ animationDelay: `${c.d}s` }}>
            <ellipse cx={c.x} cy={c.y} rx={34 * c.s} ry={11 * c.s} fill="#ffffff" opacity="0.7" />
            <ellipse cx={c.x + 26 * c.s} cy={c.y - 6 * c.s} rx={26 * c.s} ry={9 * c.s} fill="#ffffff" opacity="0.6" />
          </g>
        ))}

        {/* 阳光（随阶段增强） */}
        {(stage === 'flowering' || stage === 'fruiting' || stage === 'lush') && (
          <g className="gt-sun">
            <circle cx="350" cy="70" r="120" fill="url(#gt-sun)" />
            <circle cx="350" cy="70" r="30" fill="#ffe9a8" opacity="0.9" />
          </g>
        )}

        {/* 地面 */}
        <ellipse cx={W / 2} cy={H - 30} rx="200" ry="42" fill="url(#gt-ground)" opacity="0.85" />
        <ellipse cx={W / 2} cy={H - 36} rx="170" ry="26" fill="#a97f4f" />

        {/* 草地（较高阶段） */}
        {(stage === 'flowering' || stage === 'fruiting' || stage === 'lush') && (
          <g className="gt-sway" style={{ transformOrigin: `${W / 2}px ${H - 36}px` }}>
            {Array.from({ length: stage === 'lush' ? 16 : 10 }).map((_, i) => {
              const x = 70 + i * ((W - 140) / (stage === 'lush' ? 15 : 9));
              return (
                <path
                  key={i}
                  d={`M${x} ${H - 36} q3 -16 7 0`}
                  stroke="#5eab57"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              );
            })}
          </g>
        )}

        {/* 树体：随阶段渐进 */}
        {renderVine(stage, { leaves, branches, flowers, fruits })}

        {/* 蝴蝶（结果及以上） */}
        {(stage === 'fruiting' || stage === 'lush') && (
          <g className="gt-butterfly" style={{ animationDelay: '0.5s' }}>
            <ellipse cx="0" cy="0" rx="10" ry="7" fill="#f4a6d0" />
            <ellipse cx="0" cy="0" rx="10" ry="7" fill="#f4a6d0" transform="translate(22,0)" />
            <circle cx="11" cy="0" r="2.4" fill="#6b4a5e" />
          </g>
        )}

        {/* 小鸟（繁茂阶段） */}
        {stage === 'lush' && (
          <g className="gt-bird">
            <path d="M0 0 q7 -6 14 0 q7 -6 14 0" stroke="#56616f" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          </g>
        )}

        {/* 光斑 */}
        {scenery.sparks.map((s, i) => (
          <circle
            key={i}
            className="gt-spark"
            cx={s.x}
            cy={s.y}
            r="2.4"
            fill="#fff3c4"
            style={{ animationDelay: `${s.d}s` }}
          />
        ))}
      </svg>
    </div>
  );
}

interface Counts {
  leaves: number;
  branches: number;
  flowers: number;
  fruits: number;
}

function renderVine(stage: TreeStage, c: Counts) {
  switch (stage) {
    case 'seed':
      return <SeedStage />;
    case 'sprout':
      return <SproutStage leaves={c.leaves} />;
    case 'sapling':
      return <SaplingStage c={c} />;
    case 'flowering':
      return <FloweringStage c={c} />;
    case 'fruiting':
      return <FruitingStage c={c} />;
    case 'lush':
      return <LushStage c={c} />;
  }
}

/* ---------- 种子 ---------- */
function SeedStage() {
  return (
    <g className="gt-grow">
      <ellipse cx="210" cy="386" rx="40" ry="24" fill="#8b6b3d" />
      <path d="M196 376 Q210 358 224 376" stroke="#3fae73" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <circle className="gt-spark" cx="210" cy="360" r="3" fill="#fff3c4" />
    </g>
  );
}

/* ---------- 嫩芽 ---------- */
function SproutStage({ leaves }: { leaves: number }) {
  return (
    <g>
      <path d="M210 392 L210 318" stroke="#4f8a34" strokeWidth="7" strokeLinecap="round" />
      <Leaf x={210} y={312} r={30} fill="#7ed3a8" rotate={-12} />
      {leaves >= 2 && <Leaf x={186} y={332} r={20} fill="#9be0bd" rotate={18} />}
    </g>
  );
}

/* ---------- 小树 ---------- */
function SaplingStage({ c }: { c: Counts }) {
  return (
    <g>
      <path d="M210 396 Q206 320 214 250" stroke="url(#gt-trunk)" strokeWidth="14" strokeLinecap="round" fill="none" />
      {/* 枝条 */}
      {c.branches >= 1 && <path className="gt-sway2" d="M212 300 Q176 278 158 262" stroke="#6b4f30" strokeWidth="6" fill="none" strokeLinecap="round" />}
      {c.branches >= 1 && <path className="gt-sway2" d="M212 286 Q250 262 272 250" stroke="#6b4f30" strokeWidth="6" fill="none" strokeLinecap="round" />}
      {/* 树冠 */}
      <circle cx="210" cy="214" r="56" fill="#4fb0c4" opacity="0.9" />
      <circle cx="168" cy="240" r="34" fill="#2f94c8" opacity="0.85" />
      <circle cx="256" cy="236" r="36" fill="#277f8e" opacity="0.85" />
      {/* 叶 */}
      {c.leaves >= 1 && <Leaf x={200} y={208} r={14} fill="#9be0bd" rotate={-8} />}
      {c.leaves >= 2 && <Leaf x={232} y={222} r={14} fill="#7ed3a8" rotate={10} />}
      {c.leaves >= 3 && <Leaf x={178} y={226} r={12} fill="#9be0bd" rotate={20} />}
      {/* 花 */}
      {c.flowers >= 1 && <Flower x={196} y={196} />}
    </g>
  );
}

/* ---------- 开花 ---------- */
function FloweringStage({ c }: { c: Counts }) {
  return (
    <g>
      {/* 更粗的主藤 */}
      <path d="M210 398 Q204 300 218 200 Q224 160 210 120" stroke="url(#gt-trunk)" strokeWidth="20" strokeLinecap="round" fill="none" />
      {/* 垂枝 */}
      <path className="gt-sway2" d="M214 230 Q170 210 138 224 Q128 240 142 256" stroke="#6b4f30" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path className="gt-sway2" d="M214 210 Q262 192 292 210 Q300 228 284 244" stroke="#6b4f30" strokeWidth="7" fill="none" strokeLinecap="round" />
      {/* 树冠层 */}
      <circle cx="210" cy="150" r="72" fill="#3fa9bd" opacity="0.9" />
      <circle cx="156" cy="186" r="46" fill="#2f94c8" opacity="0.85" />
      <circle cx="268" cy="180" r="48" fill="#277f8e" opacity="0.85" />
      <circle cx="210" cy="108" r="40" fill="#7ed3a8" opacity="0.9" />
      {/* 叶簇 */}
      {[0, 1, 2, 3, 4].map((i) => (
        <Leaf
          key={i}
          x={150 + i * 30}
          y={150 + Math.sin(i) * 26}
          r={13}
          fill={i % 2 ? '#9be0bd' : '#7ed3a8'}
          rotate={i * 14 - 20}
        />
      ))}
      {/* 花朵（垂挂） */}
      {c.flowers >= 1 && <Flower x={188} y={136} />}
      {c.flowers >= 2 && <Flower x={236} y={146} />}
      {c.flowers >= 1 && <Flower x={150} y={232} />}
      {c.flowers >= 2 && <Flower x={286} y={226} />}
    </g>
  );
}

/* ---------- 结果 ---------- */
function FruitingStage({ c }: { c: Counts }) {
  return (
    <g>
      {/* 粗壮主藤 */}
      <path d="M210 400 Q200 290 220 180 Q228 130 206 80" stroke="url(#gt-trunk)" strokeWidth="26" strokeLinecap="round" fill="none" />
      {/* 多条垂藤 */}
      <path className="gt-sway2" d="M218 210 Q160 188 122 206 Q110 232 128 258" stroke="#6b4f30" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path className="gt-sway2" d="M218 190 Q276 168 314 192 Q326 222 304 248" stroke="#6b4f30" strokeWidth="8" fill="none" strokeLinecap="round" />
      <path className="gt-sway2" d="M214 150 Q188 120 184 92" stroke="#6b4f30" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path className="gt-sway2" d="M216 140 Q244 108 252 78" stroke="#6b4f30" strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* 树冠 */}
      <circle cx="210" cy="120" r="86" fill="#3fa9bd" opacity="0.9" />
      <circle cx="146" cy="168" r="52" fill="#2f94c8" opacity="0.85" />
      <circle cx="278" cy="160" r="54" fill="#277f8e" opacity="0.85" />
      <circle cx="210" cy="70" r="48" fill="#7ed3a8" opacity="0.9" />
      {/* 叶簇 */}
      {Array.from({ length: 9 }).map((_, i) => (
        <Leaf
          key={i}
          x={132 + (i % 5) * 40}
          y={120 + Math.floor(i / 5) * 40 + Math.sin(i * 2) * 18}
          r={12}
          fill={i % 2 ? '#9be0bd' : '#7ed3a8'}
          rotate={i * 18 - 30}
        />
      ))}
      {/* 花 */}
      {[
        [180, 112], [240, 124], [150, 150], [276, 144], [210, 80],
      ].map(([x, y], i) => (i < Math.max(2, c.flowers) ? <Flower key={i} x={x} y={y} /> : null))}
      {/* 果实（垂挂） */}
      {c.fruits >= 1 && <Fruit x={170} y={232} />}
      {c.fruits >= 2 && <Fruit x={252} y={224} />}
      {c.fruits >= 3 && <Fruit x={210} y={252} />}
      {/* 挂件：小灯笼/丝带 */}
      <Lantern x={128} y={252} />
    </g>
  );
}

/* ---------- 繁茂：巨人藤蔓 ---------- */
function LushStage({ c }: { c: Counts }) {
  return (
    <g>
      {/* 极粗壮主藤 */}
      <path d="M210 404 Q196 280 224 160 Q234 96 206 40" stroke="url(#gt-trunk)" strokeWidth="34" strokeLinecap="round" fill="none" />
      <path d="M210 404 Q220 300 200 200" stroke="#8a6a44" strokeWidth="14" strokeLinecap="round" fill="none" opacity="0.6" />
      {/* 茂密垂藤 */}
      <path className="gt-sway2" d="M222 200 Q150 176 104 202 Q88 240 116 272" stroke="#6b4f30" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path className="gt-sway2" d="M220 180 Q296 154 342 188 Q360 232 330 266" stroke="#6b4f30" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path className="gt-sway2" d="M216 140 Q176 104 168 60" stroke="#6b4f30" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path className="gt-sway2" d="M218 130 Q262 92 274 48" stroke="#6b4f30" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path className="gt-sway2" d="M212 240 Q172 268 150 300" stroke="#6b4f30" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path className="gt-sway2" d="M216 236 Q262 262 288 292" stroke="#6b4f30" strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* 层叠树冠 */}
      <circle cx="210" cy="100" r="100" fill="#33a0b8" opacity="0.9" />
      <circle cx="132" cy="156" r="60" fill="#2f94c8" opacity="0.85" />
      <circle cx="292" cy="150" r="62" fill="#277f8e" opacity="0.85" />
      <circle cx="210" cy="48" r="56" fill="#7ed3a8" opacity="0.9" />
      <circle cx="158" cy="90" r="40" fill="#4fb0c4" opacity="0.8" />
      <circle cx="266" cy="86" r="42" fill="#5cc0d4" opacity="0.8" />
      {/* 大量叶簇 */}
      {Array.from({ length: 14 }).map((_, i) => (
        <Leaf
          key={i}
          x={120 + (i % 7) * 32}
          y={96 + Math.floor(i / 7) * 64 + Math.sin(i * 1.7) * 22}
          r={13}
          fill={i % 3 === 0 ? '#bdeccb' : i % 2 ? '#9be0bd' : '#7ed3a8'}
          rotate={i * 22 - 40}
        />
      ))}
      {/* 花 */}
      {[
        [176, 92], [244, 104], [140, 132], [286, 126], [210, 56], [188, 152], [238, 158],
      ].map(([x, y], i) => (i < Math.max(3, c.flowers + 2) ? <Flower key={i} x={x} y={y} /> : null))}
      {/* 果实 */}
      {[
        [150, 224], [268, 214], [210, 250], [188, 188], [244, 196],
      ].map(([x, y], i) => (i < Math.max(2, c.fruits + 1) ? <Fruit key={i} x={x} y={y} /> : null))}
      {/* 挂件：灯笼 */}
      <Lantern x={116} y={268} />
      <Lantern x={332} y={262} />
      {/* 巢中雏鸟 */}
      <g transform="translate(164,72)">
        <ellipse cx="0" cy="0" rx="14" ry="7" fill="#9c7a4e" />
        <circle cx="-4" cy="-4" r="4" fill="#7ec8e3" />
        <circle cx="5" cy="-3" r="4" fill="#7ec8e3" />
      </g>
    </g>
  );
}

/* ---------- 元素组件 ---------- */

function Leaf({ x, y, r, fill, rotate = 0 }: { x: number; y: number; r: number; fill: string; rotate?: number }) {
  return (
    <g className="gt-leaf" style={{ transformOrigin: `${x}px ${y}px` }}>
      <path
        d={`M${x} ${y - r} Q${x + r * 0.9} ${y} ${x} ${y + r} Q${x - r * 0.9} ${y} ${x} ${y - r} Z`}
        fill={fill}
        transform={`rotate(${rotate} ${x} ${y})`}
      />
      <path d={`M${x} ${y - r * 0.7} L${x} ${y + r * 0.7}`} stroke="#ffffff" strokeWidth="1.4" opacity="0.5" transform={`rotate(${rotate} ${x} ${y})`} />
    </g>
  );
}

function Flower({ x, y }: { x: number; y: number }) {
  return (
    <g className="gt-bloom" style={{ transformOrigin: `${x}px ${y}px` }}>
      {[0, 72, 144, 216, 288].map((a) => {
        const rad = (a * Math.PI) / 180;
        return <circle key={a} cx={x + Math.cos(rad) * 6} cy={y + Math.sin(rad) * 6} r="4.2" fill="#f8d66b" />;
      })}
      <circle cx={x} cy={y} r="3" fill="#f4a6d0" />
    </g>
  );
}

function Fruit({ x, y }: { x: number; y: number }) {
  return (
    <g className="gt-bob" style={{ transformOrigin: `${x}px ${y - 14}px` }}>
      <path d={`M${x} ${y - 14} L${x} ${y - 6}`} stroke="#6b4f30" strokeWidth="2" />
      <circle cx={x} cy={y} r="8" fill="#e07a8a" />
      <circle cx={x - 2.4} cy={y - 2.4} r="2.4" fill="#ffc0cb" opacity="0.8" />
    </g>
  );
}

function Lantern({ x, y }: { x: number; y: number }) {
  return (
    <g className="gt-bob" style={{ transformOrigin: `${x}px ${y - 18}px` }}>
      <path d={`M${x} ${y - 18} L${x} ${y - 8}`} stroke="#6b4f30" strokeWidth="1.6" />
      <ellipse cx={x} cy={y} rx="7" ry="9" fill="#f6c945" opacity="0.92" />
      <ellipse cx={x} cy={y} rx="7" ry="9" fill="none" stroke="#e0a82e" strokeWidth="1.2" />
      <circle cx={x} cy={y - 4} r="2.6" fill="#fff3c4" opacity="0.9" />
    </g>
  );
}
