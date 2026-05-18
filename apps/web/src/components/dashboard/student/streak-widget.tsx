import { Flame } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StreakWidgetProps {
  current: number;
  longest: number;
  className?: string;
}

export function StreakWidget({ current, longest, className }: StreakWidgetProps) {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const activeCount = current % 7 || 7;

  return (
    <Card className={cn('border-streak/20 bg-streak/5', className)}>
      <CardContent className="pt-5 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-6 h-6 text-streak animate-flame-flicker" />
              <span className="text-3xl font-bold">{current}</span>
            </div>
            <p className="text-sm font-medium">Day Streak</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              🏅 Best: {longest} days
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-2">This week</p>
            <div className="flex gap-1">
              {days.map((day, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className={cn(
                      'w-6 h-6 rounded-full flex items-center justify-center text-[10px]',
                      i < activeCount
                        ? 'bg-streak/20 text-streak font-bold'
                        : 'bg-secondary text-muted-foreground',
                    )}
                  >
                    {i < activeCount ? '🔥' : '·'}
                  </div>
                  <span className="text-[9px] text-muted-foreground">{day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
