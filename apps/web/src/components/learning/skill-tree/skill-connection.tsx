import { type MasteryState } from './skill-node';
import { cn } from '@/lib/utils';

interface SkillConnectionProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  sourceState: MasteryState;
  targetState: MasteryState;
}

const stateColors: Record<MasteryState, string> = {
  locked: 'rgba(71,85,105,0.4)',
  available: 'rgba(59,130,246,0.4)',
  in_progress: 'rgba(59,130,246,0.6)',
  mastered: 'rgba(16,185,129,0.6)',
};

export function SkillConnection({
  x1, y1, x2, y2, sourceState, targetState,
}: SkillConnectionProps) {
  // Use cubic bezier for nice curve
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const cpX1 = x1;
  const cpY1 = midY;
  const cpX2 = x2;
  const cpY2 = midY;

  const isMastered = sourceState === 'mastered' && targetState === 'mastered';
  const isActive = sourceState === 'mastered' || sourceState === 'in_progress';

  const color = isActive ? stateColors[targetState] : stateColors.locked;
  const strokeWidth = isMastered ? 2.5 : 1.5;
  const dashArray = isActive ? 'none' : '6 4';

  return (
    <g>
      <path
        d={`M ${x1} ${y1} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x2} ${y2}`}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        strokeLinecap="round"
        opacity={0.8}
      />
      {/* Arrow tip */}
      <circle cx={x2} cy={y2} r={3} fill={color} opacity={0.8} />
    </g>
  );
}
