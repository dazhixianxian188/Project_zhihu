import type { BudForm } from '../types';
import './ZhiYa.css';

interface Props {
  form: BudForm;
  size?: number;
  className?: string;
}

/**
 * 知芽 —— 知护的成长伙伴形象。
 * 柔和浅蓝、温暖光晕，随成长阶段变得更饱满。带轻微呼吸与摇曳。
 */
export function ZhiYa({ form, size = 120, className = '' }: Props) {
  return (
    <div className={'zhiya ' + className} style={{ width: size, height: size }}>
      <svg viewBox="0 0 160 160" width={size} height={size} aria-label="知芽">
        <defs>
          <radialGradient id="zy-glow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#bfe0ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#6aa9e8" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="zy-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8fc0f0" />
            <stop offset="100%" stopColor="#5a97d8" />
          </linearGradient>
          <linearGradient id="zy-leaf" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a8dcf0" />
            <stop offset="100%" stopColor="#6fb0d8" />
          </linearGradient>
        </defs>

        {/* 光晕 */}
        <circle cx="80" cy="74" r="70" fill="url(#zy-glow)" className="zy-breath" />

        {renderBud(form)}
      </svg>
    </div>
  );
}

function renderBud(form: BudForm) {
  switch (form) {
    case 'seed':
      return (
        <g className="zy-sway">
          <ellipse cx="80" cy="120" rx="34" ry="12" fill="#e9dcc4" opacity="0.6" />
          <path d="M80 118 C58 118 56 92 72 84 C60 80 58 60 74 58 C70 44 84 40 90 50 C100 44 112 56 104 70 C116 76 112 100 96 104 C100 112 92 118 80 118 Z" fill="url(#zy-body)" />
          <ellipse cx="80" cy="92" rx="16" ry="13" fill="#eaf6ff" opacity="0.5" />
        </g>
      );
    case 'sprout':
      return (
        <g className="zy-sway">
          <ellipse cx="80" cy="128" rx="30" ry="9" fill="#e9dcc4" opacity="0.5" />
          {/* 身体 */}
          <path d="M80 124 C60 124 56 96 70 88 C60 82 60 62 76 60 C74 46 90 42 94 54 C104 48 114 60 106 72 C116 78 112 100 98 104 C100 114 92 124 80 124 Z" fill="url(#zy-body)" />
          <ellipse cx="78" cy="92" rx="14" ry="11" fill="#eaf6ff" opacity="0.5" />
          {/* 小芽叶 */}
          <path d="M94 56 C108 40 124 42 124 58 C124 70 108 72 96 64 Z" fill="url(#zy-leaf)" />
          <path d="M66 58 C54 44 40 48 42 62 C44 74 58 74 68 66 Z" fill="url(#zy-leaf)" opacity="0.85" />
        </g>
      );
    case 'tree':
      return (
        <g className="zy-sway">
          <ellipse cx="80" cy="134" rx="34" ry="9" fill="#e9dcc4" opacity="0.5" />
          {/* 身体更饱满 */}
          <path d="M80 130 C56 130 50 98 66 88 C54 80 56 56 74 54 C72 36 92 32 96 48 C108 40 122 54 112 70 C124 78 118 106 100 108 C102 120 92 130 80 130 Z" fill="url(#zy-body)" />
          <ellipse cx="77" cy="90" rx="16" ry="12" fill="#eaf6ff" opacity="0.5" />
          {/* 叶片环绕 */}
          <path d="M98 52 C116 34 136 38 134 56 C132 72 112 74 98 62 Z" fill="url(#zy-leaf)" />
          <path d="M62 54 C46 38 28 44 32 60 C36 74 56 72 66 62 Z" fill="url(#zy-leaf)" opacity="0.85" />
          <path d="M104 76 C122 68 138 80 132 94 C126 106 108 102 100 92 Z" fill="url(#zy-leaf)" opacity="0.8" />
          {/* 暖光点缀 */}
          <circle cx="74" cy="78" r="3" fill="#ffd98a" opacity="0.9" />
        </g>
      );
    case 'lush':
      return (
        <g className="zy-sway">
          <ellipse cx="80" cy="138" rx="38" ry="10" fill="#e9dcc4" opacity="0.5" />
          {/* 最饱满 */}
          <path d="M80 134 C52 134 44 98 62 86 C48 76 52 48 72 46 C70 26 94 22 98 40 C112 30 130 46 118 64 C132 74 124 108 102 108 C104 122 92 134 80 134 Z" fill="url(#zy-body)" />
          <ellipse cx="76" cy="88" rx="17" ry="13" fill="#eaf6ff" opacity="0.5" />
          {/* 多片叶 */}
          <path d="M100 44 C122 22 146 28 142 50 C138 68 114 70 98 56 Z" fill="url(#zy-leaf)" />
          <path d="M60 46 C40 26 20 34 26 54 C32 70 54 66 66 54 Z" fill="url(#zy-leaf)" opacity="0.9" />
          <path d="M108 72 C130 62 148 76 140 94 C132 108 110 102 102 90 Z" fill="url(#zy-leaf)" opacity="0.85" />
          <path d="M54 74 C36 66 22 80 30 94 C38 106 58 100 64 88 Z" fill="url(#zy-leaf)" opacity="0.8" />
          {/* 花与暖光 */}
          <circle cx="96" cy="58" r="4" fill="#ffd98a" />
          <circle cx="70" cy="66" r="3" fill="#ffc1d0" opacity="0.9" />
          <circle cx="116" cy="86" r="3" fill="#ffd98a" opacity="0.9" />
        </g>
      );
  }
}
