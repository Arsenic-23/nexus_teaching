import { GraduationCap, Users, AlertTriangle, BarChart3, BookOpen, TrendingUp, Zap, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const mockTeacherData = {
  teacher: { name: 'Sarah', classrooms: 3, totalStudents: 84 },
  overview: { avgMastery: 0.58, avgStreak: 8, activeToday: 62, topicsCompleted: 245 },
  classrooms: [
    { id: 'c1', name: 'Advanced Math — Grade 11', students: 28, avgMastery: 0.62, activeToday: 22, color: '#3b82f6' },
    { id: 'c2', name: 'Physics — Grade 11', students: 24, avgMastery: 0.54, activeToday: 18, color: '#8b5cf6' },
    { id: 'c3', name: 'Mathematics — Grade 10', students: 32, avgMastery: 0.51, activeToday: 22, color: '#10b981' },
  ],
  atRiskStudents: [
    { id: 's1', name: 'Marcus T.', classroom: 'Advanced Math', issue: 'No activity in 5 days', mastery: 28, severity: 'high' as const },
    { id: 's2', name: 'Priya R.', classroom: 'Physics', issue: 'Mastery declining', mastery: 35, severity: 'medium' as const },
    { id: 's3', name: 'Jake L.', classroom: 'Mathematics', issue: 'Quiz failure rate 70%', mastery: 42, severity: 'medium' as const },
  ],
  recentActivity: [
    { type: 'achievement', student: 'Emma L.', detail: 'Reached Gold III rank', time: '10 min ago' },
    { type: 'completion', student: 'James R.', detail: 'Completed Quadratic Equations', time: '25 min ago' },
    { type: 'quiz', student: 'Sofia M.', detail: 'Scored 95% on Functions quiz', time: '1 hour ago' },
  ],
};

export default function TeacherDashboard() {
  const { teacher, overview, classrooms, atRiskStudents, recentActivity } = mockTeacherData;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-bold">
          Good morning, {teacher.name}! 👋
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          You have {teacher.totalStudents} students across {teacher.classrooms} classrooms
        </p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Avg Mastery', value: `${Math.round(overview.avgMastery * 100)}%`, icon: BarChart3, color: 'text-primary' },
          { label: 'Active Today', value: `${overview.activeToday}/${teacher.totalStudents}`, icon: Users, color: 'text-success' },
          { label: 'Avg Streak', value: `${overview.avgStreak} 🔥`, icon: Zap, color: 'text-streak' },
          { label: 'Topics Done', value: overview.topicsCompleted, icon: BookOpen, color: 'text-mastery' },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-border bg-card">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Classrooms */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              <span className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-primary" />
                My Classrooms
              </span>
              <Link href="/teacher/classrooms" className="text-xs text-primary hover:underline">View all →</Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {classrooms.map((cls) => (
              <Link key={cls.id} href={`/teacher/classrooms/${cls.id}`}>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-card transition-all cursor-pointer">
                  <div className="w-3 h-3 rounded-full" style={{ background: cls.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{cls.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${cls.avgMastery * 100}%`, background: cls.color }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{Math.round(cls.avgMastery * 100)}%</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold">{cls.activeToday}/{cls.students}</p>
                    <p className="text-[10px] text-muted-foreground">active</p>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* At-risk students */}
        <Card className="border-orange-500/20 bg-orange-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between text-orange-400">
              <span className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Students Needing Attention
              </span>
              <Badge variant="warning" className="text-xs">{atRiskStudents.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {atRiskStudents.map((student) => (
              <Link key={student.id} href={`/teacher/students/${student.id}`}>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-orange-500/20 bg-card hover:border-orange-500/40 transition-all cursor-pointer">
                  <Avatar className="w-8 h-8 shrink-0">
                    <AvatarFallback className="text-xs">{student.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold">{student.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{student.issue}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-xs font-bold ${student.severity === 'high' ? 'text-destructive' : 'text-orange-400'}`}>
                      {student.mastery}%
                    </p>
                    <p className="text-[10px] text-muted-foreground">mastery</p>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card className="border-border bg-card lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Recent Student Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <span className="text-lg">{a.type === 'achievement' ? '🏆' : a.type === 'completion' ? '✅' : '📊'}</span>
                  <div className="flex-1">
                    <span className="font-semibold text-sm">{a.student}</span>
                    <span className="text-sm text-muted-foreground"> — {a.detail}</span>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{a.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
