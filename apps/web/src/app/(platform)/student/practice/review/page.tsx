import { RotateCcw, Clock, CheckCircle2, ArrowRight, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MasteryRing } from '@/components/gamification/mastery-ring';
import Link from 'next/link';

const reviewItems = [
  { id: 'r1', topic: 'Quadratic Formula', subject: 'Mathematics', dueIn: 'Overdue', masteryLevel: 0.45, priority: 'high' as const, lastReviewed: '5 days ago' },
  { id: 'r2', topic: 'Complex Numbers', subject: 'Mathematics', dueIn: 'Today', masteryLevel: 0.3, priority: 'high' as const, lastReviewed: '3 days ago' },
  { id: 'r3', topic: 'Newton\'s Laws', subject: 'Physics', dueIn: 'Today', masteryLevel: 0.6, priority: 'medium' as const, lastReviewed: '2 days ago' },
  { id: 'r4', topic: 'Linear Equations', subject: 'Mathematics', dueIn: 'Tomorrow', masteryLevel: 0.88, priority: 'low' as const, lastReviewed: '6 days ago' },
  { id: 'r5', topic: 'Kinematics', subject: 'Physics', dueIn: 'In 2 days', masteryLevel: 0.72, priority: 'low' as const, lastReviewed: '5 days ago' },
];

const priorityConfig = {
  high: { color: 'text-destructive', bg: 'border-destructive/30 bg-destructive/5', dot: 'bg-destructive' },
  medium: { color: 'text-orange-400', bg: 'border-orange-500/30 bg-orange-500/5', dot: 'bg-orange-400' },
  low: { color: 'text-muted-foreground', bg: 'border-border bg-card/50', dot: 'bg-muted-foreground' },
};

export default function ReviewPage() {
  const overdueCount = reviewItems.filter((i) => i.dueIn === 'Overdue').length;
  const dueTodayCount = reviewItems.filter((i) => i.dueIn === 'Today').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2">
          <RotateCcw className="w-6 h-6 text-purple-400" />
          Spaced Repetition Review
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Review topics at the optimal time to maximize retention
        </p>
      </div>

      {/* Info card */}
      <div className="flex items-start gap-2 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-sm">
        <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
        <p className="text-muted-foreground">
          <span className="font-medium text-foreground">Spaced repetition</span> helps you remember things longer by reviewing at increasing intervals right before you forget.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-destructive/20 bg-destructive/5 text-center">
          <CardContent className="pt-4 pb-4">
            <p className="text-2xl font-bold text-destructive">{overdueCount}</p>
            <p className="text-xs text-muted-foreground">Overdue</p>
          </CardContent>
        </Card>
        <Card className="border-mastery/20 bg-mastery/5 text-center">
          <CardContent className="pt-4 pb-4">
            <p className="text-2xl font-bold text-mastery">{dueTodayCount}</p>
            <p className="text-xs text-muted-foreground">Due Today</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card/50 text-center">
          <CardContent className="pt-4 pb-4">
            <p className="text-2xl font-bold">{reviewItems.length - overdueCount - dueTodayCount}</p>
            <p className="text-xs text-muted-foreground">Upcoming</p>
          </CardContent>
        </Card>
      </div>

      {/* Start session button */}
      {(overdueCount + dueTodayCount) > 0 && (
        <Button variant="glow" size="lg" className="w-full gap-2">
          <RotateCcw className="w-5 h-5" />
          Start Review Session ({overdueCount + dueTodayCount} items)
        </Button>
      )}

      {/* Review items */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Review Queue</h2>
        {reviewItems.map((item) => {
          const config = priorityConfig[item.priority];
          return (
            <Card key={item.id} className={`border transition-all hover:shadow-md ${config.bg}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <MasteryRing level={item.masteryLevel} size={48} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-semibold text-sm">{item.topic}</p>
                      <div className={`w-2 h-2 rounded-full shrink-0 ${config.dot}`} />
                    </div>
                    <p className="text-xs text-muted-foreground">{item.subject}</p>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.dueIn}
                      </span>
                      <span>Last: {item.lastReviewed}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="shrink-0 gap-1 text-xs">
                    Review
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
