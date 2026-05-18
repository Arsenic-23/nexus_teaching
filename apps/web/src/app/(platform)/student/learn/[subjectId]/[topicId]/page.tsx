import { BookOpen, CheckCircle2, Circle, Zap, Play, FileQuestion, Bot, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { MasteryRing } from '@/components/gamification/mastery-ring';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface TopicPageProps {
  params: Promise<{
    subjectId: string;
    topicId: string;
  }>;
}

// Mock data
const mockTopicData = {
  id: 'quadratic-equations',
  name: 'Quadratic Equations',
  subjectName: 'Mathematics',
  subjectId: 'mathematics',
  description: 'Master the art of solving quadratic equations using factoring, completing the square, and the quadratic formula.',
  masteryPercent: 68,
  xpEarned: 420,
  xpTotal: 600,
  estimatedHours: 3,
  lessons: [
    { id: 'intro-quadratics', title: 'Introduction to Quadratics', duration: 15, xpReward: 60, completed: true, locked: false },
    { id: 'factoring', title: 'Factoring Quadratics', duration: 20, xpReward: 75, completed: true, locked: false },
    { id: 'completing-square', title: 'Completing the Square', duration: 25, xpReward: 90, completed: true, locked: false },
    { id: 'quadratic-formula', title: 'The Quadratic Formula', duration: 20, xpReward: 75, completed: false, locked: false },
    { id: 'discriminant', title: 'The Discriminant', duration: 15, xpReward: 60, completed: false, locked: false },
    { id: 'applications', title: 'Real-World Applications', duration: 30, xpReward: 100, completed: false, locked: true },
  ],
  quizAvailable: true,
  quizPassed: false,
  quizScore: null as number | null,
};

export default async function TopicPage({ params }: TopicPageProps) {
  const resolvedParams = await params;
  const topic = mockTopicData;
  const completedLessons = topic.lessons.filter((l) => l.completed).length;
  const nextLesson = topic.lessons.find((l) => !l.completed && !l.locked);

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumbs
        items={[
          { label: 'Learn', href: '/student/learn' },
          { label: topic.subjectName, href: `/student/learn/${resolvedParams.subjectId}` },
          { label: topic.name },
        ]}
      />

      {/* Topic header */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="secondary" className="text-xs">{topic.subjectName}</Badge>
              {topic.masteryPercent >= 80 && (
                <Badge variant="success" className="text-xs">✓ Mastered</Badge>
              )}
            </div>
            <h1 className="text-2xl font-display font-bold">{topic.name}</h1>
            <p className="text-muted-foreground text-sm mt-1">{topic.description}</p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <BookOpen className="w-4 h-4" />
              <span>{topic.lessons.length} lessons</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Zap className="w-4 h-4 text-brand" />
              <span>{topic.xpEarned}/{topic.xpTotal} XP</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span>{completedLessons}/{topic.lessons.length} done</span>
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex flex-wrap gap-3">
            {nextLesson && (
              <Link href={`/student/learn/${resolvedParams.subjectId}/${resolvedParams.topicId}/${nextLesson.id}`}>
                <Button variant="glow" className="gap-2">
                  <Play className="w-4 h-4" />
                  {completedLessons === 0 ? 'Start Learning' : 'Continue Learning'}
                </Button>
              </Link>
            )}
            {topic.quizAvailable && (
              <Link href={`/student/learn/${resolvedParams.subjectId}/${resolvedParams.topicId}/quiz`}>
                <Button
                  variant="outline"
                  className={cn('gap-2', !topic.quizPassed && 'border-mastery/30 text-mastery hover:bg-mastery/5')}
                >
                  <FileQuestion className="w-4 h-4" />
                  {topic.quizPassed ? 'Retake Quiz' : 'Take Quiz'}
                  {topic.quizScore !== null && (
                    <Badge variant="mastery" className="text-xs ml-1">{topic.quizScore}%</Badge>
                  )}
                </Button>
              </Link>
            )}
            <Link href={`/student/ai-tutor?topic=${resolvedParams.topicId}`}>
              <Button variant="outline" className="gap-2">
                <Bot className="w-4 h-4" />
                Ask AI Tutor
              </Button>
            </Link>
          </div>
        </div>

        {/* Mastery ring */}
        <div className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-border bg-card/50 lg:w-48">
          <MasteryRing level={topic.masteryPercent / 100} size={100} />
          <div className="text-center">
            <p className="text-2xl font-bold">{topic.masteryPercent}%</p>
            <p className="text-xs text-muted-foreground">Mastery</p>
          </div>
        </div>
      </div>

      {/* Overall progress */}
      <Card className="border-border bg-card/50">
        <CardContent className="pt-4 pb-4">
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="font-medium">Progress</span>
            <span className="text-muted-foreground">{completedLessons}/{topic.lessons.length} lessons</span>
          </div>
          <Progress value={(completedLessons / topic.lessons.length) * 100} className="h-2" />
        </CardContent>
      </Card>

      {/* Lessons list */}
      <div>
        <h2 className="text-base font-semibold mb-3">Lessons</h2>
        <div className="space-y-2">
          {topic.lessons.map((lesson, index) => (
            <div key={lesson.id}>
              {lesson.locked ? (
                <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card/30 opacity-60">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">{lesson.title}</p>
                    <p className="text-xs text-muted-foreground/60">{lesson.duration} min</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">Locked</Badge>
                </div>
              ) : (
                <Link href={`/student/learn/${resolvedParams.subjectId}/${resolvedParams.topicId}/${lesson.id}`}>
                  <div
                    className={cn(
                      'flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 cursor-pointer group',
                      lesson.completed
                        ? 'border-success/20 bg-success/5 hover:border-success/40'
                        : 'border-border bg-card/50 hover:border-primary/30 hover:bg-card',
                    )}
                  >
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                      lesson.completed ? 'bg-success/20' : 'bg-primary/10',
                    )}>
                      {lesson.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-success" />
                      ) : (
                        <span className="text-xs font-bold text-primary">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">{lesson.title}</p>
                      <p className="text-xs text-muted-foreground">{lesson.duration} min</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant="xp" className="text-xs">+{lesson.xpReward}</Badge>
                      <Play className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
