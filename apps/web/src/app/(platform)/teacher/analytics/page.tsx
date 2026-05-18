import { BarChart3, TrendingUp, TrendingDown, Users, Zap, BookOpen, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const analyticsData = {
  totalStudents: 84,
  avgMastery: 0.58,
  avgAccuracy: 76,
  avgStreak: 8,
  classrooms: [
    { name: 'Advanced Math', students: 28, avgMastery: 0.62, avgAccuracy: 82, color: '#3b82f6' },
    { name: 'Physics', students: 24, avgMastery: 0.54, avgAccuracy: 71, color: '#8b5cf6' },
    { name: 'Mathematics', students: 32, avgMastery: 0.51, avgAccuracy: 73, color: '#10b981' },
  ],
  weeklyXpByDay: [3200, 2800, 4100, 3600, 2900, 4200, 1100],
  topTopics: [
    { topic: 'Linear Equations', students: 45, avgMastery: 0.84 },
    { topic: 'Kinematics', students: 24, avgMastery: 0.79 },
    { topic: 'Newton\'s Laws', students: 24, avgMastery: 0.62 },
  ],
  strugglingTopics: [
    { topic: 'Complex Numbers', students: 28, avgMastery: 0.31, trend: 'down' },
    { topic: 'Function Composition', students: 28, avgMastery: 0.38, trend: 'stable' },
    { topic: 'Quadratic Equations', students: 45, avgMastery: 0.45, trend: 'up' },
  ],
};

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const maxXp = Math.max(...analyticsData.weeklyXpByDay, 1);

export default function TeacherAnalyticsPage() {
  const { classrooms, weeklyXpByDay, topTopics, strugglingTopics } = analyticsData;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary" />
          Analytics Overview
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Performance insights across all your classrooms</p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Students', value: analyticsData.totalStudents, icon: Users, color: 'text-primary' },
          { label: 'Avg Mastery', value: `${Math.round(analyticsData.avgMastery * 100)}%`, icon: Target, color: 'text-mastery' },
          { label: 'Avg Accuracy', value: `${analyticsData.avgAccuracy}%`, icon: Zap, color: 'text-success' },
          { label: 'Avg Streak', value: `${analyticsData.avgStreak}🔥`, icon: TrendingUp, color: 'text-streak' },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-border bg-card/50">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-2 mb-1"><Icon className={`w-4 h-4 ${color}`} /><span className="text-xs text-muted-foreground">{label}</span></div>
              <p className="text-xl font-bold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly XP */}
      <Card className="border-border bg-card/50">
        <CardHeader className="pb-3"><CardTitle className="text-base">Weekly XP — All Classes</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 h-24">
            {weeklyXpByDay.map((xp, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-md bg-gradient-xp opacity-80 hover:opacity-100 transition-opacity" style={{ height: `${(xp / maxXp) * 80}px` }} />
                <span className="text-[9px] text-muted-foreground">{days[i]}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Class comparison */}
      <Card className="border-border bg-card/50">
        <CardHeader className="pb-3"><CardTitle className="text-base">Class Performance Comparison</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {classrooms.map((cls) => (
            <div key={cls.name}>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: cls.color }} />
                  <span className="font-medium">{cls.name}</span>
                  <span className="text-xs text-muted-foreground">({cls.students} students)</span>
                </div>
                <span className="font-bold" style={{ color: cls.color }}>{Math.round(cls.avgMastery * 100)}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${cls.avgMastery * 100}%`, background: cls.color }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Topics performance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border-success/20 bg-success/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-success flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Top Performing Topics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topTopics.map((t) => (
              <div key={t.topic}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="truncate">{t.topic}</span>
                  <Badge variant="success" className="text-xs ml-2">{Math.round(t.avgMastery * 100)}%</Badge>
                </div>
                <Progress value={t.avgMastery * 100} className="h-1" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-orange-500/20 bg-orange-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-orange-400 flex items-center gap-2">
              <TrendingDown className="w-4 h-4" /> Topics Needing Attention
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {strugglingTopics.map((t) => (
              <div key={t.topic}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="truncate">{t.topic}</span>
                  <Badge variant="warning" className="text-xs ml-2">{Math.round(t.avgMastery * 100)}%</Badge>
                </div>
                <Progress value={t.avgMastery * 100} className="h-1" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
