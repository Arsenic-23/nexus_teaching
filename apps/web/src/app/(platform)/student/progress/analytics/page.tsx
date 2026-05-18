import { BarChart3, TrendingUp, TrendingDown, Target, Zap, Clock, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';

const analyticsData = {
  thisWeek: { xp: 380, lessonsCompleted: 5, quizzesPassed: 3, accuracy: 82 },
  lastWeek: { xp: 290, lessonsCompleted: 4, quizzesPassed: 2, accuracy: 75 },
  monthlyXp: [250, 310, 420, 380, 290, 380, 420, 190, 330, 450, 280, 390, 510, 380, 220, 410, 480, 360, 290, 380, 440, 310, 380, 420, 510, 290, 340, 400, 380, 490],
  subjectBreakdown: [
    { subject: 'Mathematics', percent: 65, xp: 1800, color: '#3b82f6' },
    { subject: 'Physics', percent: 35, xp: 650, color: '#8b5cf6' },
  ],
  timeSpent: [1.5, 0.5, 2.0, 1.0, 0, 1.5, 0],
  strongTopics: [
    { name: 'Linear Equations', mastery: 92 },
    { name: 'Kinematics', mastery: 85 },
    { name: 'Factoring', mastery: 78 },
  ],
  weakTopics: [
    { name: 'Complex Numbers', mastery: 28 },
    { name: 'Function Composition', mastery: 35 },
  ],
};

function ChangeIndicator({ current, previous, suffix = '' }: { current: number; previous: number; suffix?: string }) {
  const diff = current - previous;
  const isUp = diff > 0;
  return (
    <div className={`flex items-center gap-0.5 text-xs ${isUp ? 'text-success' : 'text-destructive'}`}>
      {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
      <span>{isUp ? '+' : ''}{diff}{suffix}</span>
    </div>
  );
}

export default function AnalyticsPage() {
  const { thisWeek, lastWeek, monthlyXp, subjectBreakdown, timeSpent, strongTopics, weakTopics } = analyticsData;
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxXp = Math.max(...monthlyXp, 1);
  const maxTime = Math.max(...timeSpent, 1);

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumbs items={[{ label: 'Progress', href: '/student/progress' }, { label: 'Analytics' }]} />

      <div>
        <h1 className="text-2xl font-display font-bold">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Detailed performance data and trends</p>
      </div>

      {/* This week vs last */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'XP Earned', current: thisWeek.xp, previous: lastWeek.xp, suffix: '', icon: Zap, color: 'text-brand' },
          { label: 'Lessons', current: thisWeek.lessonsCompleted, previous: lastWeek.lessonsCompleted, suffix: '', icon: Target, color: 'text-primary' },
          { label: 'Quizzes', current: thisWeek.quizzesPassed, previous: lastWeek.quizzesPassed, suffix: '', icon: Award, color: 'text-mastery' },
          { label: 'Accuracy', current: thisWeek.accuracy, previous: lastWeek.accuracy, suffix: '%', icon: TrendingUp, color: 'text-success' },
        ].map(({ label, current, previous, suffix, icon: Icon, color }) => (
          <Card key={label} className="border-border bg-card/50">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
              <p className="text-xl font-bold mb-0.5">{current}{suffix}</p>
              <ChangeIndicator current={current} previous={previous} suffix={suffix} />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly XP chart */}
      <Card className="border-border bg-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">30-Day XP History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-0.5 h-20">
            {monthlyXp.map((xp, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-gradient-xp opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                style={{ height: `${(xp / maxXp) * 72}px`, minHeight: xp > 0 ? '2px' : '0' }}
                title={`Day ${i + 1}: ${xp} XP`}
              />
            ))}
          </div>
          <div className="flex justify-between text-[9px] text-muted-foreground mt-1">
            <span>30 days ago</span><span>Today</span>
          </div>
        </CardContent>
      </Card>

      {/* Time spent this week */}
      <Card className="border-border bg-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Study Time This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 h-20">
            {timeSpent.map((hours, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-md bg-accent/60 hover:bg-accent transition-colors" style={{ height: `${(hours / maxTime) * 64}px`, minHeight: hours > 0 ? '2px' : '0' }} />
                <span className="text-[9px] text-muted-foreground">{days[i]}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Total: {timeSpent.reduce((a, b) => a + b, 0).toFixed(1)} hours this week
          </p>
        </CardContent>
      </Card>

      {/* Subject distribution */}
      <Card className="border-border bg-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Study Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-3 rounded-full overflow-hidden mb-3">
            {subjectBreakdown.map((s) => (
              <div key={s.subject} className="h-full" style={{ width: `${s.percent}%`, background: s.color }} />
            ))}
          </div>
          <div className="space-y-2">
            {subjectBreakdown.map((s) => (
              <div key={s.subject} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: s.color }} />
                  <span>{s.subject}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>{s.percent}%</span>
                  <span className="text-xs">{s.xp.toLocaleString()} XP</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strong vs Weak */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border-success/20 bg-success/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-success flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Strong Topics
            </CardTitle>
          </CardHeader>
          <CardContent>
            {strongTopics.map((t) => (
              <div key={t.name} className="flex items-center justify-between py-1.5 text-sm">
                <span className="text-muted-foreground truncate">{t.name}</span>
                <Badge variant="success" className="text-xs ml-2">{t.mastery}%</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="border-orange-500/20 bg-orange-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-orange-400 flex items-center gap-2">
              <TrendingDown className="w-4 h-4" /> Needs Work
            </CardTitle>
          </CardHeader>
          <CardContent>
            {weakTopics.map((t) => (
              <div key={t.name} className="flex items-center justify-between py-1.5 text-sm">
                <span className="text-muted-foreground truncate">{t.name}</span>
                <Badge variant="warning" className="text-xs ml-2">{t.mastery}%</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
