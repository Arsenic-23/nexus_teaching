import { Brain, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { cn } from '@/lib/utils';

// Generate 12 weeks of heatmap data
const generateHeatmapData = () => {
  const weeks = [];
  for (let w = 0; w < 12; w++) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const hasActivity = Math.random() > 0.35;
      days.push({
        date: new Date(Date.now() - (12 - w) * 7 * 86400000 + d * 86400000),
        intensity: hasActivity ? Math.floor(Math.random() * 4) + 1 : 0,
        xp: hasActivity ? Math.floor(Math.random() * 300) + 50 : 0,
      });
    }
    weeks.push(days);
  }
  return weeks;
};

const heatmapData = generateHeatmapData();

const intensityColors = ['bg-secondary/30', 'bg-primary/20', 'bg-primary/40', 'bg-primary/70', 'bg-primary'];

const topicRetention = [
  { topic: 'Linear Equations', retention: 94, trend: 'stable', lastReview: '2 days ago' },
  { topic: 'Kinematics', retention: 87, trend: 'up', lastReview: '3 days ago' },
  { topic: 'Quadratic Equations', retention: 72, trend: 'down', lastReview: '5 days ago' },
  { topic: "Newton's Laws", retention: 65, trend: 'down', lastReview: '6 days ago' },
  { topic: 'Functions', retention: 48, trend: 'down', lastReview: '8 days ago' },
];

export default function RetentionPage() {
  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumbs items={[{ label: 'Progress', href: '/student/progress' }, { label: 'Retention' }]} />

      <div>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2">
          <Brain className="w-6 h-6 text-purple-400" />
          Retention Heatmap
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Track your study consistency and memory retention</p>
      </div>

      {/* Info */}
      <div className="flex items-start gap-2 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-sm">
        <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
        <p className="text-muted-foreground">Darker = more study activity. Review consistently to maintain high retention rates.</p>
      </div>

      {/* Heatmap */}
      <Card className="border-border bg-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">12-Week Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-1 overflow-x-auto pb-2">
            {/* Day labels */}
            <div className="flex flex-col gap-1 mr-1">
              {dayLabels.map((d, i) => (
                <div key={i} className="w-4 h-4 flex items-center justify-center text-[9px] text-muted-foreground">{d}</div>
              ))}
            </div>
            {heatmapData.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((day, di) => (
                  <div
                    key={di}
                    className={cn('w-4 h-4 rounded-sm cursor-pointer transition-all hover:scale-110', intensityColors[day.intensity])}
                    title={`${day.date.toLocaleDateString()}: ${day.xp} XP`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
            <span>Less</span>
            {intensityColors.map((c, i) => (
              <div key={i} className={cn('w-3 h-3 rounded-sm', c)} />
            ))}
            <span>More</span>
          </div>
        </CardContent>
      </Card>

      {/* Topic retention scores */}
      <Card className="border-border bg-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Topic Retention Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topicRetention.map((t) => (
              <div key={t.topic}>
                <div className="flex items-center justify-between mb-1 text-sm">
                  <span className="font-medium">{t.topic}</span>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      'text-xs',
                      t.retention >= 80 ? 'text-success' :
                      t.retention >= 60 ? 'text-mastery' : 'text-destructive',
                    )}>
                      {t.retention}%
                    </span>
                    <span className="text-xs text-muted-foreground">{t.lastReview}</span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-700',
                      t.retention >= 80 ? 'bg-success' :
                      t.retention >= 60 ? 'bg-mastery' : 'bg-destructive',
                    )}
                    style={{ width: `${t.retention}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
