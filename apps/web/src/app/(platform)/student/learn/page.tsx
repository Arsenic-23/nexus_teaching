import { BookOpen, Lock, ChevronRight, Zap, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const mockSubjects = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    emoji: '📐',
    description: 'Algebra, calculus, geometry, and beyond',
    color: '#3b82f6',
    totalTopics: 24,
    completedTopics: 8,
    masteryPercent: 45,
    xpEarned: 2400,
    locked: false,
  },
  {
    id: 'physics',
    name: 'Physics',
    emoji: '⚡',
    description: 'Mechanics, thermodynamics, waves & more',
    color: '#8b5cf6',
    totalTopics: 20,
    completedTopics: 3,
    masteryPercent: 22,
    xpEarned: 800,
    locked: false,
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    emoji: '🧪',
    description: 'Elements, reactions, organic chemistry',
    color: '#10b981',
    totalTopics: 18,
    completedTopics: 0,
    masteryPercent: 0,
    xpEarned: 0,
    locked: false,
  },
  {
    id: 'biology',
    name: 'Biology',
    emoji: '🔬',
    description: 'Cell biology, genetics, ecosystems',
    color: '#f97316',
    totalTopics: 22,
    completedTopics: 0,
    masteryPercent: 0,
    xpEarned: 0,
    locked: true,
  },
  {
    id: 'computer-science',
    name: 'Computer Science',
    emoji: '💻',
    description: 'Algorithms, data structures, programming',
    color: '#06b6d4',
    totalTopics: 16,
    completedTopics: 0,
    masteryPercent: 0,
    xpEarned: 0,
    locked: true,
  },
  {
    id: 'economics',
    name: 'Economics',
    emoji: '📈',
    description: 'Microeconomics, macroeconomics, finance',
    color: '#fbbf24',
    totalTopics: 14,
    completedTopics: 0,
    masteryPercent: 0,
    xpEarned: 0,
    locked: true,
  },
];

export default function LearnPage() {
  const activeSubjects = mockSubjects.filter((s) => !s.locked);
  const lockedSubjects = mockSubjects.filter((s) => s.locked);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold">Learn</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Choose a subject to continue your learning journey
        </p>
      </div>

      {/* Active Subjects */}
      <section>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Your Subjects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeSubjects.map((subject) => (
            <Link key={subject.id} href={`/student/learn/${subject.id}`}>
              <Card
                className="h-full border-border bg-card/50 hover:border-primary/30 hover:bg-card hover:shadow-lg transition-all duration-200 cursor-pointer group"
                style={{ borderColor: subject.color + '20' }}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110"
                      style={{ background: subject.color + '20' }}
                    >
                      {subject.emoji}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Zap className="w-3 h-3 text-brand" />
                      {subject.xpEarned.toLocaleString()} XP
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-base mb-1">{subject.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{subject.description}</p>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {subject.completedTopics}/{subject.totalTopics} topics
                      </span>
                      <span
                        className="font-semibold"
                        style={{ color: subject.color }}
                      >
                        {subject.masteryPercent}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${subject.masteryPercent}%`,
                          background: subject.color,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Locked Subjects */}
      {lockedSubjects.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Coming Soon
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {lockedSubjects.map((subject) => (
              <Card
                key={subject.id}
                className="border-border bg-card/30 opacity-60 cursor-not-allowed"
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl grayscale">
                      {subject.emoji}
                    </div>
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <h3 className="font-display font-bold text-base mb-1 text-muted-foreground">{subject.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">{subject.description}</p>
                  <Badge variant="secondary" className="mt-3 text-xs">
                    {subject.totalTopics} topics
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
