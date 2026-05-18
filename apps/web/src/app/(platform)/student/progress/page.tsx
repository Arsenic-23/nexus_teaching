import { BarChart3, TrendingUp, Target, Brain, ChevronRight, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MasteryRing } from '@/components/gamification/mastery-ring';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Link from 'next/link';

const mockProgressData = {
  overall: {
    xpTotal: 2450,
    xpThisWeek: 380,
    masteryAvg: 0.52,
    topicsStarted: 7,
    topicsMastered: 4,
    lessonsCompleted: 32,
    quizzesPassed: 18,
    streakDays: 12,
  },
  subjects: [
    { id: 'mathematics', name: 'Mathematics', emoji: '📐', mastery: 0.45, xp: 1800, topics: 8, color: '#3b82f6' },
    { id: 'physics', name: 'Physics', emoji: '⚡', mastery: 0.28, xp: 650, topics: 3, color: '#8b5cf6' },
  ],
  weeklyXp: [120, 95, 180, 210, 140, 380, 0],
  recentActivity: [
    { action: 'Completed lesson', item: 'The Quadratic Formula', xp: 75, time: '2h ago' },
    { action: 'Passed quiz', item: 'Factoring Quadratics', xp: 60, time: '3h ago' },
    { action: 'Boss Battle Victory', item: 'Algebra Titan', xp: 200, time: 'Yesterday' },
    { action: 'Completed lesson', item: 'Completing the Square', xp: 90, time: 'Yesterday' },
  ],
};

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const maxXp = Math.max(...mockProgressData.weeklyXp, 1);

export default function ProgressPage() {
  const { overall, subjects, weeklyXp, recentActivity } = mockProgressData;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            Progress
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Track your learning journey</p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total XP', value: overall.xpTotal.toLocaleString(), icon: Zap, color: 'text-brand' },
          { label: 'This Week', value: `+${overall.xpThisWeek}`, icon: TrendingUp, color: 'text-success' },
          { label: 'Topics Done', value: `${overall.topicsMastered}/${overall.topicsStarted}`, icon: Target, color: 'text-mastery' },
          { label: 'Day Streak', value: `${overall.streakDays}🔥`, icon: Brain, color: 'text-streak' },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-border bg-card/50">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
              <p className="text-xl font-bold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly XP chart */}
      <Card className="border-border bg-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            <span>Weekly XP</span>
            <Badge variant="success" className="text-xs">+{overall.xpThisWeek} this week</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 h-24">
            {weeklyXp.map((xp, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md bg-gradient-xp opacity-80 transition-all hover:opacity-100"
                  style={{ height: `${(xp / maxXp) * 80}px`, minHeight: xp > 0 ? '4px' : '0' }}
                />
                <span className="text-[9px] text-muted-foreground">{days[i]}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subject mastery */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">Subject Mastery</h2>
          <Link href="/student/progress/mastery" className="text-xs text-primary hover:underline">
            Detailed View →
          </Link>
        </div>
        {subjects.map((subject) => (
          <Link key={subject.id} href={`/student/progress/mastery?subject=${subject.id}`}>
            <Card className="border-border bg-card/50 hover:border-primary/30 transition-all cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <MasteryRing level={subject.mastery} size={52} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{subject.emoji}</span>
                      <p className="font-semibold">{subject.name}</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{Math.round(subject.mastery * 100)}% mastery</span>
                      <span>{subject.xp.toLocaleString()} XP</span>
                      <span>{subject.topics} topics</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${subject.mastery * 100}%`, background: subject.color }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Detailed analytics links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: 'Analytics', desc: 'Performance trends', href: '/student/progress/analytics', icon: BarChart3, color: 'text-primary' },
          { label: 'Mastery Breakdown', desc: 'Topic by topic', href: '/student/progress/mastery', icon: Target, color: 'text-mastery' },
          { label: 'Retention Heatmap', desc: 'Memory tracking', href: '/student/progress/retention', icon: Brain, color: 'text-purple-400' },
        ].map(({ label, desc, href, icon: Icon, color }) => (
          <Link key={href} href={href}>
            <Card className="border-border bg-card/50 hover:border-primary/30 transition-all cursor-pointer h-full">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div>
                  <p className="font-semibold text-sm">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent activity */}
      <Card className="border-border bg-card/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">{activity.action}</p>
                  <p className="text-sm font-medium truncate">{activity.item}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-brand">+{activity.xp} XP</p>
                  <p className="text-[10px] text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
