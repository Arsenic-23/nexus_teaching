import { BarChart3, TrendingUp, TrendingDown, Users, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';

const classAnalytics = {
  avgMastery: 0.62,
  avgAccuracy: 79,
  activeRate: 0.79,
  weeklyXp: [850, 920, 1200, 980, 750, 1100, 200],
  topicBreakdown: [
    { topic: 'Linear Equations', avgMastery: 0.88, students: 28 },
    { topic: 'Quadratic Equations', avgMastery: 0.62, students: 28 },
    { topic: 'Functions', avgMastery: 0.48, students: 22 },
    { topic: 'Polynomials', avgMastery: 0.31, students: 15 },
  ],
};

const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const maxXp = Math.max(...classAnalytics.weeklyXp, 1);

export default async function ClassAnalyticsPage({ params }: { params: Promise<{ classId: string }> }) {
  const resolvedParams = await params;
  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumbs items={[{ label: 'Classrooms', href: '/teacher/classrooms' }, { label: 'Advanced Math', href: `/teacher/classrooms/${resolvedParams.classId}` }, { label: 'Analytics' }]} />

      <div>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary" /> Class Analytics
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Advanced Mathematics — Grade 11</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Avg Mastery', value: `${Math.round(classAnalytics.avgMastery * 100)}%`, icon: Target, color: 'text-mastery' },
          { label: 'Avg Accuracy', value: `${classAnalytics.avgAccuracy}%`, icon: TrendingUp, color: 'text-success' },
          { label: 'Activity Rate', value: `${Math.round(classAnalytics.activeRate * 100)}%`, icon: Users, color: 'text-primary' },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-border bg-card text-center">
            <CardContent className="pt-4 pb-4">
              <Icon className={`w-5 h-5 mx-auto mb-1 ${color}`} />
              <p className="text-xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly XP chart */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3"><CardTitle className="text-base">Weekly Class XP</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 h-20">
            {classAnalytics.weeklyXp.map((xp, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-md bg-gradient-brand opacity-80" style={{ height: `${(xp / maxXp) * 64}px`, minHeight: xp > 0 ? '2px' : '0' }} />
                <span className="text-[9px] text-muted-foreground">{days[i]}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Topic breakdown */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3"><CardTitle className="text-base">Topic Performance</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {classAnalytics.topicBreakdown.map((t) => (
            <div key={t.topic}>
              <div className="flex items-center justify-between mb-1.5 text-sm">
                <span className="font-medium">{t.topic}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{t.students} students</span>
                  <Badge variant={t.avgMastery >= 0.7 ? 'success' : t.avgMastery >= 0.5 ? 'default' : 'warning'} className="text-xs">
                    {Math.round(t.avgMastery * 100)}%
                  </Badge>
                </div>
              </div>
              <Progress value={t.avgMastery * 100} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
