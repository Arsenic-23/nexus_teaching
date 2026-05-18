'use client';

import { cn } from '@/lib/utils';

export type RankTier = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND' | 'MASTER';

interface RankBadgeProps {
  tier: RankTier;
  division: number;
  name?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

const RANK_STYLES: Record<RankTier, { bg: string; text: string; glow: string; emoji: string }> = {
  BRONZE: { bg: 'bg-amber-900/20', text: 'text-amber-600', glow: 'shadow-amber-700/20', emoji: '🥉' },
  SILVER: { bg: 'bg-slate-400/20', text: 'text-slate-300', glow: 'shadow-slate-400/20', emoji: '⚔️' },
  GOLD: { bg: 'bg-yellow-400/20', text: 'text-yellow-400', glow: 'shadow-yellow-400/30', emoji: '🏆' },
  PLATINUM: { bg: 'bg-cyan-300/20', text: 'text-cyan-300', glow: 'shadow-cyan-300/20', emoji: '💎' },
  DIAMOND: { bg: 'bg-blue-300/20', text: 'text-blue-300', glow: 'shadow-blue-300/30', emoji: '💠' },
  MASTER: { bg: 'bg-orange-500/20', text: 'text-orange-400', glow: 'shadow-orange-400/30', emoji: '👑' },
};

const sizeConfig = {
  sm: { container: 'px-2 py-1 text-xs', emoji: 'text-sm' },
  md: { container: 'px-3 py-1.5 text-sm', emoji: 'text-base' },
  lg: { container: 'px-4 py-2 text-base', emoji: 'text-xl' },
};

export function RankBadge({
  tier,
  division,
  name,
  className,
  size = 'md',
  showLabel = true,
  animated = false,
}: RankBadgeProps) {
  const styles = RANK_STYLES[tier];
  const config = sizeConfig[size];
  const displayName = name || `${tier.charAt(0) + tier.slice(1).toLowerCase()} ${division === 1 ? 'I' : division === 2 ? 'II' : 'III'}`;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-semibold',
        styles.bg,
        styles.text,
        `border-current/30`,
        animated && `shadow-md ${styles.glow}`,
        config.container,
        className,
      )}
    >
      <span className={config.emoji}>{styles.emoji}</span>
      {showLabel && <span>{displayName}</span>}
    </span>
  );
}
