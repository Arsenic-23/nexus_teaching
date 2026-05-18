import { Sword, CheckCircle2, Circle, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Quest {
  id: string;
  title: string;
  current: number;
  target: number;
  xpReward: number;
  completed: boolean;
}

interface DailyQuestsWidgetProps {
  quests: Quest[];
  className?: string;
}

export function DailyQuestsWidget({ quests, className }: DailyQuestsWidgetProps) {
  const completed = quests.filter((q) => q.completed).length;

  return (
    <Card className={cn('border-border bg-card', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Sword className="w-4 h-4 text-primary" />
            Daily Quests
          </span>
          <Badge variant="secondary" className="text-xs">
            {completed}/{quests.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Progress bar */}
        <div className="mb-4">
          <Progress value={(completed / quests.length) * 100} className="h-1.5" />
        </div>
        <div className="space-y-2">
          {quests.map((quest) => (
            <div
              key={quest.id}
              className={cn(
                'flex items-center gap-3 p-2 rounded-lg transition-colors',
                quest.completed ? 'opacity-60' : 'hover:bg-secondary/50',
              )}
            >
              {quest.completed ? (
                <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className={cn('text-sm truncate', quest.completed && 'line-through text-muted-foreground')}>
                  {quest.title}
                </p>
                {!quest.completed && quest.current > 0 && (
                  <div className="mt-1">
                    <Progress value={(quest.current / quest.target) * 100} className="h-1" />
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {quest.current}/{quest.target}
                    </p>
                  </div>
                )}
              </div>
              <Badge variant="xp" className="text-xs shrink-0">
                <Zap className="w-2.5 h-2.5 mr-0.5" />
                {quest.xpReward}
              </Badge>
            </div>
          ))}
        </div>
        <Link href="/student/practice/daily" className="block mt-4">
          <p className="text-xs text-center text-primary hover:underline">View all quests →</p>
        </Link>
      </CardContent>
    </Card>
  );
}
