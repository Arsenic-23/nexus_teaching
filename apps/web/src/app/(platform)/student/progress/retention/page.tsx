'use client';

import { useMemo } from 'react';
import { Brain, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { cn } from '@/lib/utils';

// Generate 12 weeks of heatmap data deterministically on client only
function generateHeatmapData() {
 const seed = [1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0];
 const intensitySeed = [3, 0, 2, 4, 0, 1, 3, 0, 0, 2, 4, 3, 0, 2, 1, 4, 0, 3, 0, 2, 1, 4, 0, 3, 2, 0, 4, 3, 1, 0, 2, 0, 4, 3, 0, 1, 2, 4, 0, 3, 0, 2, 1, 4, 3, 0, 2, 1, 4, 0, 3, 2, 0, 4, 1, 3, 2, 0, 4, 1, 3, 2, 4, 0, 3, 1, 2, 0, 4, 3, 1, 0, 2, 4, 3, 1, 0, 2, 4, 3, 0, 1, 2, 4];
 const weeks = [];
 let idx = 0;
 for (let w = 0; w < 12; w++) {
 const days = [];
 for (let d = 0; d < 7; d++) {
 const hasActivity = seed[idx % seed.length] === 1;
 const intensity = hasActivity ? (intensitySeed[idx % intensitySeed.length] % 4) + 1 : 0;
 days.push({
 date: new Date(Date.now() - (12 - w) * 7 * 86400000 + d * 86400000),
 intensity,
 xp: hasActivity ? (intensitySeed[idx % intensitySeed.length] + 1) * 60 : 0,
 });
 idx++;
 }
 weeks.push(days);
 }
 return weeks;
}

const intensityColors = ['bg-secondary/30', 'bg-primary/20', 'bg-primary/40', 'bg-primary/70', 'bg-primary'];

const topicRetention = [
 { topic: 'Linear Equations', retention: 94, trend: 'stable', lastReview: '2 days ago' },
 { topic: 'Kinematics', retention: 87, trend: 'up', lastReview: '3 days ago' },
 { topic: 'Quadratic Equations', retention: 72, trend: 'down', lastReview: '5 days ago' },
 { topic: "Newton's Laws", retention: 65, trend: 'down', lastReview: '6 days ago' },
 { topic: 'Functions', retention: 48, trend: 'down', lastReview: '8 days ago' },
];

export default function RetentionPage() {
 const heatmapData = useMemo(() => generateHeatmapData(), []);
 const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

 return (
 <div className="space-y-6 animate-fade-in">
 <Breadcrumbs items={[{ label: 'Progress', href: '/student/progress' }, { label: 'Retention' }]} />

 <div>
 <h1 className="text-2xl font-display font-bold flex items-center gap-2">
 <Brain className="w-6 h-6 text-primary" />
 Retention Heatmap
 </h1>
 <p className="text-muted-foreground text-sm mt-1">Track your study consistency and memory retention</p>
 </div>

 {/* Info */}
 <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/10 border border-border text-sm">
 <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
 <p className="text-muted-foreground">Darker = more study activity. Review consistently to maintain high retention rates.</p>
 </div>

 {/* Heatmap */}
 <Card className="border-border bg-card">
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
 <Card className="border-border bg-card">
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
 'text-xs font-semibold',
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
