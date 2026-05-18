import { Sword, Target, RotateCcw, Zap, ChevronRight, Flame, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

const mockPracticeData = {
  dailyQuests: [
    { id: '1', title: 'Complete 2 lessons', type: 'lesson' as const, current: 1, target: 2, xpReward: 30, completed: false, estimatedMinutes: 20, description: 'Pick up where you left off', href: '/student/learn' },
    { id: '2', title: 'Practice 10 problems', type: 'quiz' as const, current: 10, target: 10, xpReward: 25, completed: true, estimatedMinutes: 15, description: 'Problem solving practice', href: '/student/practice/daily' },
    { id: '3', title: 'Review weak topics', type: 'review' as const, current: 0, target: 3, xpReward: 30, completed: false, estimatedMinutes: 10, description: 'Spaced repetition review', href: '/student/practice/review' },
    { id: '4', title: 'Defeat a Boss Battle', type: 'boss' as const, current: 0, target: 1, xpReward: 50, completed: false, estimatedMinutes: 30, description: 'Challenge boss level questions', href: '/student/practice/boss' },
  ],
  bossBattles: [
    { id: 'algebra-boss', name: 'The Algebra Titan', emoji: '🦾', topic: 'Algebra Mastery', difficulty: 'medium' as const, xpReward: 200, available: true },
    { id: 'calculus-boss', name: 'Derivative Dragon', emoji: '🐉', topic: 'Calculus Concepts', difficulty: 'hard' as const, xpReward: 350, available: false },
  ],
  reviewItems: {
    dueToday: 8,
    overdue: 3,
    upcoming: 12,
  },
  streak: 12,
};

export default function PracticePage() {
  const { dailyQuests, bossBattles, reviewItems } = mockPracticeData;
  const completedQuests = dailyQuests.filter((q) => q.completed).length;
  const questProgress = (completedQuests / dailyQuests.length) * 100;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold flex items-center gap-2">
          <Sword className="w-6 h-6 text-purple-400" />
          Practice Hub
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Sharpen your skills with daily practice and boss battles
        </p>
      </div>

      {/* Daily progress bar */}
      <Card className="border-border bg-card/50">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-semibold">Daily Goal</p>
              <p className="text-xs text-muted-foreground">{completedQuests}/{dailyQuests.length} quests completed</p>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-streak" />
              <span className="font-bold">{mockPracticeData.streak} day streak</span>
            </div>
          </div>
          <Progress value={questProgress} className="h-3" />
          {questProgress === 100 && (
            <p className="text-xs text-success mt-2">🎉 Daily goal complete! +50 bonus XP earned</p>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Quests */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              Daily Quests
            </h2>
            <Link href="/student/practice/daily">
              <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                Start All
                <ChevronRight className="w-3 h-3" />
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {dailyQuests.map((quest) => (
              <Link key={quest.id} href={quest.href}>
                <Card className={`border-border bg-card/50 hover:border-primary/30 transition-all cursor-pointer ${quest.completed ? 'opacity-70' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-xl">
                        {quest.completed ? '✅' : quest.type === 'lesson' ? '📚' : quest.type === 'quiz' ? '⚡' : quest.type === 'review' ? '🔄' : '⚔️'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className={`font-semibold text-sm ${quest.completed ? 'line-through text-muted-foreground' : ''}`}>{quest.title}</p>
                          <Badge variant="xp" className="text-xs shrink-0">+{quest.xpReward}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{quest.description}</p>
                        {!quest.completed && quest.current > 0 && (
                          <div className="mt-2">
                            <Progress value={(quest.current / quest.target) * 100} className="h-1" />
                            <p className="text-[10px] text-muted-foreground mt-0.5">{quest.current}/{quest.target}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Right column: Review + Boss */}
        <div className="space-y-6">
          {/* Spaced Repetition Review */}
          <Card className="border-purple-500/20 bg-purple-500/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                <span className="flex items-center gap-2 text-purple-400">
                  <RotateCcw className="w-4 h-4" />
                  Spaced Review
                </span>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                  {reviewItems.dueToday + reviewItems.overdue} due
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                <div className="p-2 rounded-lg bg-secondary/50">
                  <p className="font-bold text-destructive">{reviewItems.overdue}</p>
                  <p className="text-[10px] text-muted-foreground">Overdue</p>
                </div>
                <div className="p-2 rounded-lg bg-secondary/50">
                  <p className="font-bold text-mastery">{reviewItems.dueToday}</p>
                  <p className="text-[10px] text-muted-foreground">Due Today</p>
                </div>
                <div className="p-2 rounded-lg bg-secondary/50">
                  <p className="font-bold text-muted-foreground">{reviewItems.upcoming}</p>
                  <p className="text-[10px] text-muted-foreground">Upcoming</p>
                </div>
              </div>
              <Link href="/student/practice/review">
                <Button variant="outline" size="sm" className="w-full gap-2 border-purple-500/30 text-purple-400 hover:bg-purple-500/5">
                  <RotateCcw className="w-4 h-4" />
                  Start Review Session
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Boss Battles */}
          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between text-destructive">
                <span className="flex items-center gap-2">
                  <Sword className="w-4 h-4" />
                  Boss Battles
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bossBattles.map((boss) => (
                  <div key={boss.id} className={`flex items-center gap-3 p-3 rounded-lg border ${boss.available ? 'border-destructive/30 bg-card' : 'border-border bg-secondary/30 opacity-60'}`}>
                    <span className="text-2xl">{boss.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{boss.name}</p>
                      <p className="text-xs text-muted-foreground">{boss.topic}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-bold text-brand">+{boss.xpReward} XP</p>
                      {boss.available ? (
                        <Link href="/student/practice/boss">
                          <Button size="sm" className="h-6 text-xs mt-1 gap-1">
                            Fight <Sword className="w-2.5 h-2.5" />
                          </Button>
                        </Link>
                      ) : (
                        <Badge variant="secondary" className="text-xs mt-1">Locked</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/student/practice/boss" className="block mt-3">
                <p className="text-xs text-center text-primary hover:underline">View all boss battles →</p>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
