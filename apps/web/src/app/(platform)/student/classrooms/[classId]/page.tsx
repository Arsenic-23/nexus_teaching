import { School, BookOpen, Users, Trophy, ChevronRight, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const mockClassroom = {
  id: 'class1',
  name: 'Advanced Mathematics — Grade 11',
  teacherName: 'Ms. Sarah Chen',
  teacherAvatar: null,
  subjectEmoji: '📐',
  color: '#3b82f6',
  studentCount: 28,
  myRank: 3,
  myXp: 2450,
  assignments: [
    { id: 'a1', title: 'Quadratic Equations Problem Set', dueDate: 'Tomorrow', status: 'pending' as const, points: 100 },
    { id: 'a2', title: 'Functions Quiz', dueDate: 'In 3 days', status: 'pending' as const, points: 50 },
    { id: 'a3', title: 'Linear Equations Chapter Review', dueDate: 'Completed', status: 'completed' as const, points: 80, score: 92 },
  ],
  leaderboard: [
    { rank: 1, name: 'Emma L.', xp: 3200 },
    { rank: 2, name: 'James R.', xp: 2800 },
    { rank: 3, name: 'You', xp: 2450, isMe: true },
    { rank: 4, name: 'Sofia M.', xp: 2100 },
    { rank: 5, name: 'Liam K.', xp: 1950 },
  ],
  announcements: [
    { id: 'ann1', text: 'Quiz on Quadratic Equations next Friday. Please complete all practice problems.', date: 'Today', author: 'Ms. Sarah Chen' },
    { id: 'ann2', text: 'Great work on the linear equations test! Average class score was 84%.', date: '2 days ago', author: 'Ms. Sarah Chen' },
  ],
};

export default function ClassroomDetailPage({ params }: { params: { classId: string } }) {
  const cls = mockClassroom;
  const pendingCount = cls.assignments.filter((a) => a.status === 'pending').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumbs items={[{ label: 'Classrooms', href: '/student/classrooms' }, { label: cls.name }]} />

      {/* Class header */}
      <div className="p-6 rounded-2xl border" style={{ borderColor: cls.color + '30', background: cls.color + '08' }}>
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0" style={{ background: cls.color + '20' }}>
            {cls.subjectEmoji}
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-display font-bold">{cls.name}</h1>
            <p className="text-sm text-muted-foreground">{cls.teacherName}</p>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {cls.studentCount} students</span>
              <span className="flex items-center gap-1"><Trophy className="w-4 h-4 text-mastery" /> Rank #{cls.myRank}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href={`/student/classrooms/${params.classId}/assignments`}>
              <Button size="sm" variant="outline" className="gap-1 relative">
                <BookOpen className="w-4 h-4" />
                Assignments
                {pendingCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-destructive text-white text-[9px] font-bold flex items-center justify-center">
                    {pendingCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Announcements */}
          {cls.announcements.length > 0 && (
            <Card className="border-border bg-card/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">📢 Announcements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {cls.announcements.map((ann) => (
                  <div key={ann.id} className="p-3 rounded-lg bg-secondary/50 border border-border">
                    <p className="text-sm">{ann.text}</p>
                    <p className="text-xs text-muted-foreground mt-1.5">{ann.author} · {ann.date}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Pending assignments */}
          <Card className={cn('border', pendingCount > 0 ? 'border-orange-500/20 bg-orange-500/5' : 'border-border bg-card/50')}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                {pendingCount > 0 ? (
                  <><AlertTriangle className="w-4 h-4 text-orange-400" /> {pendingCount} Pending Assignments</>
                ) : (
                  <><CheckCircle2 className="w-4 h-4 text-success" /> All Caught Up!</>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cls.assignments.filter((a) => a.status === 'pending').slice(0, 2).map((a) => (
                <div key={a.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div>
                    <p className="text-sm font-medium">{a.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> Due {a.dueDate}</p>
                  </div>
                  <Badge variant="warning" className="text-xs">{a.points} pts</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments">
          <div className="space-y-2">
            {cls.assignments.map((a) => (
              <Card key={a.id} className={cn('border transition-all', a.status === 'completed' ? 'border-success/20 bg-success/5' : 'border-border bg-card/50 hover:border-primary/30')}>
                <CardContent className="p-4 flex items-center gap-4">
                  {a.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                  ) : (
                    <BookOpen className="w-5 h-5 text-primary shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{a.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {a.dueDate}</p>
                  </div>
                  <div className="text-right">
                    {a.score !== undefined ? (
                      <Badge variant="success" className="text-xs">{a.score}%</Badge>
                    ) : (
                      <Badge variant="warning" className="text-xs">{a.points} pts</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard">
          <div className="space-y-2">
            {cls.leaderboard.map((entry) => (
              <div key={entry.rank} className={cn('flex items-center gap-3 p-3 rounded-xl border', entry.isMe ? 'border-primary/30 bg-primary/10' : 'border-border hover:bg-secondary/50')}>
                <span className="text-sm font-bold w-6 text-center">
                  {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
                </span>
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs">{entry.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <span className={cn('flex-1 text-sm', entry.isMe && 'font-bold')}>{entry.name}</span>
                <span className="text-sm font-mono text-muted-foreground">{entry.xp.toLocaleString()} XP</span>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
