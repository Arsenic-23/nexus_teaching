import { Star, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface RankWidgetProps {
  rank: {
    name: string;
    tier: string;
    color: string;
    currentXp: number;
    nextRankXp: number;
    position?: number;
  };
  className?: string;
}

export function RankWidget({ rank, className }: RankWidgetProps) {
  const progress = Math.min((rank.currentXp / rank.nextRankXp) * 100, 100);
  const remaining = rank.nextRankXp - rank.currentXp;

  return (
    <Card
      className={cn('overflow-hidden', className)}
      style={{ borderColor: rank.color + '30', background: rank.color + '08' }}
    >
      <CardContent className="pt-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5" style={{ color: rank.color }} />
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Current Rank</p>
              <p className="font-display font-bold text-lg" style={{ color: rank.color }}>
                {rank.name}
              </p>
            </div>
          </div>
          {rank.position && (
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Class Rank</p>
              <p className="font-bold text-2xl">#{rank.position}</p>
            </div>
          )}
        </div>

        {/* Rank progress */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Rank Progress</span>
            <span className="font-semibold">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${rank.color}80, ${rank.color})`,
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {remaining.toLocaleString()} XP to next rank
          </p>
        </div>

        <Link href="/student/leaderboard" className="flex items-center justify-end mt-3 text-xs text-primary hover:underline gap-1">
          View Leaderboard
          <ChevronRight className="w-3 h-3" />
        </Link>
      </CardContent>
    </Card>
  );
}
