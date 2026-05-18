import { User, BookOpen, BarChart3, Flame, Zap, AlertTriangle, TrendingDown, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { MasteryRing } from '@/components/gamification/mastery-ring';
import { LevelIndicator } from '@/components/gamification/level-indicator';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import Link from 'next/link';

const mockStudentDetail = {
  id: 's4',
  name: 'Liam K.',
  email: 'liam.k@school.edu',
  classroom: 'Advanced Mathematics',
  level: 6,
  xp: 1950,
  nextLevelXp: 2200,
  streak: 5,
  mastery: 0.55,
  accuracy: 68,
  lessonsCompleted: 18,
  quizzesPassed: 12,
  status: 'at-risk' as const,
  issues: ['Mastery declining in quadratic topics', 'Missed 3 assignments'],
  topicProgress: [
    { name: 'Linear Equations', mastery: 0.88 },
    { name: 'Quadratic Equations', mastery: 0.45 },
    { name: 'Functions', mastery: 0.32 },
    { name: 'Polynomials', mastery: 0.18 },
  ],
  recentActivity: [
    { action: 'Completed lesson', item: 'Factoring Quadratics', time: '2 days ago', result: 'pass' },
    { action: 'Quiz attempt', item: 'Quadratic Formula', time: '3 days ago', result: 'fail' },
    { action: 'Completed lesson', item: 'Completing the Square', time: '5 days ago', result: 'pass' },
  ],
};

export default function StudentDetailPage({ params }: { params: { studentId: string } }) {
  const student = mockStudentDetail;

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      <Breadcrumbs items={[{ label: 'Students', href: '/teacher/students' }, { label: student.name }]} />

      {/* Student header */}
      <div className={`p-6 rounded-2xl border ${student.status === 'at-risk' ? 'border-orange-500/20 bg-orange-500/5' : 'border-border bg-card/50'}`}>
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16 border-2 border-border">
            <AvatarFallback className="text-xl">{student.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h1 className="text-xl font-display font-bold">{student.name}</h1>
                <p className="text-sm text-muted-foreground">{student.email}</p>
                <p className="text-xs text-muted-foreground">{student.classroom}</p>
              </div>
              {student.status === 'at-risk' && (
                <Badge variant="warning" className="shrink-0 gap-1">
                  <AlertTriangle className="w-3 h-3" />At Risk
                </Badge>
              )}
            </div>
            <div className="mt-3">
              <LevelIndicator level={student.level} currentXp={student.xp} nextLevelXp={student.nextLevelXp} size="sm" />
            </div>
          </div>
        </div>

        {student.issues.length > 0 && (
          <div className="mt-4 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 space-y-1">
            {student.issues.map((issue, i) => (
              <p key={i} className="text-xs text-orange-300 flex items-center gap-1.5">
                <TrendingDown className="w-3 h-3 shrink-0" />{issue}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Mastery', value: `${Math.round(student.mastery * 100)}%`, icon: BarChart3, color: 'text-primary' },
          { label: 'Accuracy', value: `${student.accuracy}%`, icon: Zap, color: 'text-mastery' },
          { label: 'Streak', value: `${student.streak}🔥`, icon: Flame, color: 'text-streak' },
          { label: 'Lessons', value: student.lessonsCompleted, icon: BookOpen, color: 'text-success' },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-border bg-card/50 text-center">
            <CardContent className="pt-4 pb-4">
              <Icon className={`w-4 h-4 mx-auto mb-1 ${color}`} />
              <p className="text-xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Topic progress */}
      <Card className="border-border bg-card/50">
        <CardHeader className="pb-3"><CardTitle className="text-sm">Topic Mastery</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {student.topicProgress.map((t) => (
            <div key={t.name}>
              <div className="flex justify-between text-sm mb-1">
                <span>{t.name}</span>
                <span className={t.mastery < 0.5 ? 'text-destructive font-semibold' : 'text-muted-foreground'}>{Math.round(t.mastery * 100)}%</span>
              </div>
              <Progress value={t.mastery * 100} className="h-1.5" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent activity */}
      <Card className="border-border bg-card/50">
        <CardHeader className="pb-3"><CardTitle className="text-sm">Recent Activity</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {student.recentActivity.map((a, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50">
              <span>{a.result === 'pass' ? '✅' : '❌'}</span>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">{a.action}</p>
                <p className="text-sm">{a.item}</p>
              </div>
              <p className="text-xs text-muted-foreground">{a.time}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
