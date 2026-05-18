import { Target, CheckCircle2, BookOpen, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MasteryRing } from '@/components/gamification/mastery-ring';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import Link from 'next/link';

const masteryData = [
  {
    subject: 'Mathematics', emoji: '📐', color: '#3b82f6',
    topics: [
      { id: 'linear-equations', name: 'Linear Equations', mastery: 0.92, status: 'mastered' as const },
      { id: 'quadratic-equations', name: 'Quadratic Equations', mastery: 0.68, status: 'in_progress' as const },
      { id: 'functions', name: 'Functions', mastery: 0.35, status: 'in_progress' as const },
      { id: 'polynomials', name: 'Polynomials', mastery: 0.12, status: 'in_progress' as const },
      { id: 'exponents-logs', name: 'Exponents & Logs', mastery: 0, status: 'locked' as const },
      { id: 'trigonometry', name: 'Trigonometry', mastery: 0, status: 'locked' as const },
    ],
  },
  {
    subject: 'Physics', emoji: '⚡', color: '#8b5cf6',
    topics: [
      { id: 'kinematics', name: 'Kinematics', mastery: 0.85, status: 'mastered' as const },
      { id: 'forces', name: "Newton's Laws", mastery: 0.40, status: 'in_progress' as const },
      { id: 'energy', name: 'Energy & Work', mastery: 0, status: 'available' as const },
    ],
  },
];

const statusLabel: Record<string, string> = {
  mastered: 'Mastered',
  in_progress: 'In Progress',
  available: 'Not Started',
  locked: 'Locked',
};

const statusVariant: Record<string, 'success' | 'default' | 'secondary' | 'outline'> = {
  mastered: 'success',
  in_progress: 'default',
  available: 'secondary',
  locked: 'outline',
};

export default function MasteryPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Breadcrumbs items={[{ label: 'Progress', href: '/student/progress' }, { label: 'Mastery' }]} />

      <div>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2">
          <Target className="w-6 h-6 text-mastery" />
          Mastery Breakdown
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Your topic-by-topic mastery progress</p>
      </div>

      {masteryData.map((subject) => {
        const avgMastery = subject.topics.reduce((sum, t) => sum + t.mastery, 0) / subject.topics.length;
        return (
          <div key={subject.subject}>
            {/* Subject header */}
            <div className="flex items-center gap-3 mb-3 p-4 rounded-xl border" style={{ borderColor: subject.color + '30', background: subject.color + '08' }}>
              <span className="text-2xl">{subject.emoji}</span>
              <div className="flex-1">
                <p className="font-display font-bold">{subject.subject}</p>
                <p className="text-xs text-muted-foreground">Overall mastery</p>
              </div>
              <div className="flex items-center gap-3">
                <MasteryRing level={avgMastery} size={44} />
                <span className="font-bold text-lg" style={{ color: subject.color }}>{Math.round(avgMastery * 100)}%</span>
              </div>
            </div>

            {/* Topics */}
            <div className="space-y-2 ml-4">
              {subject.topics.map((topic) => {
                const isLocked = topic.status === 'locked';
                return (
                  <div key={topic.id} className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${isLocked ? 'border-border bg-muted/50 opacity-60' : 'border-border bg-card hover:border-primary/30'}`}>
                    <MasteryRing level={topic.mastery} size={36} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium">{topic.name}</p>
                        <Badge variant={statusVariant[topic.status]} className="text-xs shrink-0">
                          {statusLabel[topic.status]}
                        </Badge>
                      </div>
                      {topic.mastery > 0 && (
                        <div className="mt-1">
                          <Progress value={topic.mastery * 100} className="h-1" />
                          <p className="text-[10px] text-muted-foreground mt-0.5">{Math.round(topic.mastery * 100)}% mastery</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
