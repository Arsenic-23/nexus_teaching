import {
  Flame,
  Zap,
  Target,
  BookOpen,
  Sword,
  CheckCircle2,
  Circle,
  TrendingUp,
  AlertTriangle,
  Trophy,
  ArrowRight,
  Star,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock data until API integration
const mockData = {
  student: {
    name: 'Alex',
    level: 8,
    totalXp: 2450,
    nextLevelXp: 3000,
    rank: { name: 'Gold III', tier: 'GOLD', color: '#ffd700' },
  },
  streak: {
    current: 12,
    longest: 28,
  },
  dailyQuests: [
    { id: '1', title: 'Complete 2 lessons', type: 'COMPLETE_LESSONS', current: 1, target: 2, xpReward: 25, completed: false },
    { id: '2', title: 'Practice 10 problems', type: 'PASS_QUIZZES', current: 10, target: 10, xpReward: 25, completed: true },
    { id: '3', title: 'Review 3 topics', type: 'REVIEW_TOPICS', current: 0, target: 3, xpReward: 30, completed: false },
    { id: '4', title: 'Maintain your streak', type: 'MAINTAIN_STREAK', current: 1, target: 1, xpReward: 15, completed: true },
    { id: '5', title: 'Defeat a boss battle', type: 'DEFEAT_BOSS', current: 0, target: 1, xpReward: 50, completed: false },
  ],
  continueLearning: {
    topic: 'Quadratic Equations',
    lesson: 'The Quadratic Formula',
    lessonId: 'lesson_quadratic_formula',
    progress: 60,
    xpReward: 60,
  },
  masteryOverview: {
    totalTopics: 12,
    masteredTopics: 4,
    inProgressTopics: 3,
    overallMastery: 0.45,
  },
  weakAreas: [
    { topicId: '1', topicName: 'Complex Numbers', severity: 'moderate' as 'critical' | 'moderate' | 'mild' },
    { topicId: '2', topicName: 'Function Composition', severity: 'mild' as 'critical' | 'moderate' | 'mild' },
  ],
  leaderboard: [
    { position: 1, name: 'Sarah K.', xp: 3200, isCurrentUser: false },
    { position: 2, name: 'You', xp: 2450, isCurrentUser: true },
    { position: 3, name: 'Mike R.', xp: 2100, isCurrentUser: false },
    { position: 4, name: 'Emma L.', xp: 1890, isCurrentUser: false },
  ],
};

export default function StudentDashboard() {
  const { student, streak, dailyQuests, continueLearning, masteryOverview, weakAreas, leaderboard } = mockData;

  const completedQuests = dailyQuests.filter(q => q.completed).length;
  const xpProgress = (student.totalXp / student.nextLevelXp) * 100;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold">
            Good morning, {student.name}! 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {streak.current > 0 ? `🔥 ${streak.current} day streak — keep it up!` : "Start your streak today!"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-semibold"
            style={{ borderColor: student.rank.color + '40', color: student.rank.color }}
          >
            <Star className="w-4 h-4" />
            {student.rank.name}
          </div>
        </div>
      </div>

      {/* XP Progress Bar */}
      <Card className="border-border bg-card/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-xp" />
              <span className="text-sm font-medium">Level {student.level}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {student.totalXp.toLocaleString()} / {student.nextLevelXp.toLocaleString()} XP
            </span>
          </div>
          <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full bg-gradient-xp transition-all duration-1000 ease-out rounded-full"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {(student.nextLevelXp - student.totalXp).toLocaleString()} XP to Level {student.level + 1}
          </p>
        </CardContent>
      </Card>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column - Continue Learning + Streak */}
        <div className="lg:col-span-2 space-y-6">

          {/* Continue Learning */}
          <Card className="border-border bg-card/50 hover:border-primary/30 transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                Continue Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold">{continueLearning.lesson}</p>
                  <p className="text-sm text-muted-foreground">{continueLearning.topic}</p>
                </div>
                <Badge variant="xp" className="text-xs">+{continueLearning.xpReward} XP</Badge>
              </div>
              <Progress value={continueLearning.progress} className="h-2 mb-3" />
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{continueLearning.progress}% complete</span>
                <Link href={`/student/learn/math/quadratic-equations/${continueLearning.lessonId}`}>
                  <Button size="sm" className="gap-1">
                    Continue
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Mastery Overview */}
          <Card className="border-border bg-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-mastery" />
                  Mastery Overview
                </span>
                <Link href="/student/skill-tree" className="text-xs text-primary hover:underline">
                  View Skill Tree →
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 rounded-lg bg-secondary/50">
                  <p className="text-2xl font-bold text-mastery">{masteryOverview.masteredTopics}</p>
                  <p className="text-xs text-muted-foreground">Mastered</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary/50">
                  <p className="text-2xl font-bold text-primary">{masteryOverview.inProgressTopics}</p>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-secondary/50">
                  <p className="text-2xl font-bold text-muted-foreground">{masteryOverview.totalTopics - masteryOverview.masteredTopics - masteryOverview.inProgressTopics}</p>
                  <p className="text-xs text-muted-foreground">Locked</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Overall Mastery</span>
                <span className="text-sm font-semibold">{Math.round(masteryOverview.overallMastery * 100)}%</span>
              </div>
              <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-gradient-mastery transition-all duration-1000 rounded-full"
                  style={{ width: `${masteryOverview.overallMastery * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Weak Areas */}
          {weakAreas.length > 0 && (
            <Card className="border-orange-500/20 bg-orange-500/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2 text-orange-400">
                  <AlertTriangle className="w-4 h-4" />
                  Areas to Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {weakAreas.map((area) => (
                    <div key={area.topicId} className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${area.severity === 'critical' ? 'bg-destructive' : area.severity === 'moderate' ? 'bg-orange-400' : 'bg-yellow-400'}`} />
                        <span className="text-sm font-medium">{area.topicName}</span>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs h-7">
                        Review
                      </Button>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  💡 AI recommends reviewing these topics to maintain your mastery
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Quests, Streak, Leaderboard */}
        <div className="space-y-6">

          {/* Streak Widget */}
          <Card className="border-streak/20 bg-streak/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-6 h-6 text-streak animate-flame-flicker" />
                    <span className="text-3xl font-bold">{streak.current}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Day streak</p>
                  <p className="text-xs text-muted-foreground">Best: {streak.longest} days</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground mb-1">Today</p>
                  <div className="flex gap-1">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          i < (streak.current % 7 || 7) ? 'bg-streak/20 text-streak' : 'bg-secondary'
                        }`}
                      >
                        {i < (streak.current % 7 || 7) ? '🔥' : '·'}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Quests */}
          <Card className="border-border bg-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Sword className="w-4 h-4 text-purple-400" />
                  Daily Quests
                </span>
                <Badge variant="secondary" className="text-xs">
                  {completedQuests}/{dailyQuests.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {dailyQuests.map((quest) => (
                  <div key={quest.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                    {quest.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-muted-foreground shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm truncate ${quest.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {quest.title}
                      </p>
                      {!quest.completed && quest.current > 0 && (
                        <div className="mt-1">
                          <Progress value={(quest.current / quest.target) * 100} className="h-1" />
                          <p className="text-xs text-muted-foreground mt-0.5">{quest.current}/{quest.target}</p>
                        </div>
                      )}
                    </div>
                    <Badge variant="xp" className="text-xs shrink-0">+{quest.xpReward}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card className="border-border bg-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-mastery" />
                  Class Leaderboard
                </span>
                <Link href="/student/leaderboard" className="text-xs text-primary hover:underline">
                  Full →
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {leaderboard.map((entry) => (
                  <div
                    key={entry.position}
                    className={`flex items-center gap-3 p-2 rounded-lg ${
                      entry.isCurrentUser
                        ? 'bg-primary/10 border border-primary/20'
                        : 'hover:bg-secondary/50'
                    } transition-colors`}
                  >
                    <span className={`text-sm font-bold w-6 text-center ${
                      entry.position === 1 ? 'text-mastery' :
                      entry.position === 2 ? 'text-muted-foreground' :
                      entry.position === 3 ? 'text-orange-400' :
                      'text-muted-foreground'
                    }`}>
                      {entry.position === 1 ? '🥇' : entry.position === 2 ? '🥈' : entry.position === 3 ? '🥉' : entry.position}
                    </span>
                    <span className={`flex-1 text-sm ${entry.isCurrentUser ? 'font-semibold' : ''}`}>
                      {entry.name}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Zap className="w-3 h-3" />
                      {entry.xp.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Link href="/student/practice">
              <Button variant="outline" className="w-full h-auto flex-col gap-2 py-4">
                <Sword className="w-5 h-5 text-purple-400" />
                <span className="text-xs">Practice</span>
              </Button>
            </Link>
            <Link href="/student/ai-tutor">
              <Button variant="outline" className="w-full h-auto flex-col gap-2 py-4">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-xs">AI Tutor</span>
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
