import { BookOpen, ChevronRight, Lock, CheckCircle2, Circle, Zap, Network, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Mock data
const subjectData: Record<string, {
  name: string;
  emoji: string;
  color: string;
  description: string;
  masteryPercent: number;
  xpEarned: number;
  topics: Array<{
    id: string;
    name: string;
    description: string;
    lessonCount: number;
    completedLessons: number;
    masteryPercent: number;
    status: 'locked' | 'available' | 'in_progress' | 'mastered';
    xpReward: number;
  }>;
}> = {
  mathematics: {
    name: 'Mathematics',
    emoji: '📐',
    color: '#3b82f6',
    description: 'Build strong mathematical foundations from algebra through calculus',
    masteryPercent: 45,
    xpEarned: 2400,
    topics: [
      { id: 'linear-equations', name: 'Linear Equations', description: 'Solve and graph linear equations', lessonCount: 5, completedLessons: 5, masteryPercent: 92, status: 'mastered', xpReward: 250 },
      { id: 'quadratic-equations', name: 'Quadratic Equations', description: 'Factoring, completing the square, quadratic formula', lessonCount: 6, completedLessons: 4, masteryPercent: 68, status: 'in_progress', xpReward: 300 },
      { id: 'functions', name: 'Functions', description: 'Domain, range, composition, and transformations', lessonCount: 7, completedLessons: 2, masteryPercent: 35, status: 'in_progress', xpReward: 350 },
      { id: 'polynomials', name: 'Polynomials', description: 'Operations, factoring, and root finding', lessonCount: 5, completedLessons: 0, masteryPercent: 0, status: 'available', xpReward: 250 },
      { id: 'exponents-logs', name: 'Exponents & Logarithms', description: 'Exponential and logarithmic functions', lessonCount: 6, completedLessons: 0, masteryPercent: 0, status: 'locked', xpReward: 300 },
      { id: 'trigonometry', name: 'Trigonometry', description: 'Trig functions, identities, and applications', lessonCount: 8, completedLessons: 0, masteryPercent: 0, status: 'locked', xpReward: 400 },
    ],
  },
  physics: {
    name: 'Physics',
    emoji: '⚡',
    color: '#8b5cf6',
    description: 'Explore the fundamental laws that govern our universe',
    masteryPercent: 22,
    xpEarned: 800,
    topics: [
      { id: 'kinematics', name: 'Kinematics', description: 'Motion, velocity, and acceleration', lessonCount: 5, completedLessons: 5, masteryPercent: 85, status: 'mastered', xpReward: 250 },
      { id: 'forces', name: "Newton's Laws", description: 'Forces, mass, and Newton\'s laws of motion', lessonCount: 6, completedLessons: 2, masteryPercent: 40, status: 'in_progress', xpReward: 300 },
      { id: 'energy', name: 'Energy & Work', description: 'Kinetic, potential energy and work-energy theorem', lessonCount: 5, completedLessons: 0, masteryPercent: 0, status: 'available', xpReward: 250 },
      { id: 'waves', name: 'Waves & Sound', description: 'Wave properties, sound, and light', lessonCount: 7, completedLessons: 0, masteryPercent: 0, status: 'locked', xpReward: 350 },
    ],
  },
};

const statusConfig = {
  locked: { icon: Lock, color: 'text-muted-foreground', bg: 'bg-secondary/30 opacity-60' },
  available: { icon: Circle, color: 'text-primary', bg: 'hover:border-primary/40 hover:bg-card' },
  in_progress: { icon: BookOpen, color: 'text-primary', bg: 'border-primary/30 hover:border-primary/50' },
  mastered: { icon: CheckCircle2, color: 'text-success', bg: 'border-success/20 bg-success/5 hover:border-success/40' },
};

export default async function SubjectPage({ params }: { params: Promise<{ subjectId: string }> }) {
  const resolvedParams = await params;
  const subject = subjectData[resolvedParams.subjectId] || subjectData.mathematics;

  const masteredCount = subject.topics.filter((t) => t.status === 'mastered').length;
  const inProgressCount = subject.topics.filter((t) => t.status === 'in_progress').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumbs
        items={[
          { label: 'Learn', href: '/student/learn' },
          { label: subject.name },
        ]}
      />

      {/* Subject header */}
      <div
        className="p-6 rounded-2xl border"
        style={{ borderColor: subject.color + '30', background: subject.color + '08' }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0"
            style={{ background: subject.color + '20' }}
          >
            {subject.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-display font-bold">{subject.name}</h1>
                <p className="text-muted-foreground text-sm mt-0.5">{subject.description}</p>
              </div>
              <Link href={`/student/skill-tree?subject=${resolvedParams.subjectId}`}>
                <Button variant="outline" size="sm" className="gap-2 shrink-0">
                  <Network className="w-4 h-4" />
                  Skill Tree
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>{masteredCount} mastered</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <BookOpen className="w-4 h-4 text-primary" />
                <span>{inProgressCount} in progress</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <Zap className="w-4 h-4 text-brand" />
                <span>{subject.xpEarned.toLocaleString()} XP</span>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Overall Mastery</span>
                <span className="font-semibold" style={{ color: subject.color }}>{subject.masteryPercent}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted/40 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${subject.masteryPercent}%`, background: subject.color }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Topics list */}
      <div>
        <h2 className="text-base font-semibold mb-4">Topics</h2>
        <div className="space-y-3">
          {subject.topics.map((topic, index) => {
            const config = statusConfig[topic.status];
            const Icon = config.icon;
            const isLocked = topic.status === 'locked';

            return (
              <div key={topic.id}>
                {isLocked ? (
                  <Card className={cn('border-border transition-all', config.bg)}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-muted-foreground">{index + 1}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm text-muted-foreground">{topic.name}</p>
                            <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                          </div>
                          <p className="text-xs text-muted-foreground/70">{topic.description}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs shrink-0">{topic.lessonCount} lessons</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Link href={`/student/learn/${resolvedParams.subjectId}/${topic.id}`}>
                    <Card className={cn('border-border bg-card transition-all cursor-pointer group', config.bg)}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className={cn(
                            'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
                            topic.status === 'mastered' ? 'bg-success/20' : 'bg-primary/10',
                          )}>
                            <Icon className={cn('w-4 h-4', config.color)} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-semibold text-sm group-hover:text-primary transition-colors">{topic.name}</p>
                              <div className="flex items-center gap-2 shrink-0">
                                <Badge variant="xp" className="text-xs">+{topic.xpReward}</Badge>
                                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">{topic.description}</p>
                            {topic.status !== 'available' && topic.masteryPercent > 0 && (
                              <div className="mt-2 space-y-1">
                                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                                  <span>{topic.completedLessons}/{topic.lessonCount} lessons</span>
                                  <span>{topic.masteryPercent}% mastery</span>
                                </div>
                                <Progress value={topic.masteryPercent} className="h-1" />
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
