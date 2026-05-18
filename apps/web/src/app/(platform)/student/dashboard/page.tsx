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
  Brain,
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
    lessonId: 'quadratic-formula',
    subjectId: 'mathematics',
    topicId: 'quadratic-equations',
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
    { topicId: 'complex-numbers', subjectId: 'mathematics', topicName: 'Complex Numbers', severity: 'moderate' as 'critical' | 'moderate' | 'mild' },
    { topicId: 'functions', subjectId: 'mathematics', topicName: 'Function Composition', severity: 'mild' as 'critical' | 'moderate' | 'mild' },
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter drop-shadow-sm mb-3">
            Good morning, {student.name}.
          </h1>
          <p className="text-muted-foreground text-lg font-medium flex items-center gap-2">
            {streak.current > 0 ? (
              <><Flame className="w-5 h-5 text-gray-300" /> {streak.current} day streak — keep it up!</>
            ) : (
              "Start your streak today!"
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/10 bg-white/5 shadow-inner text-sm font-bold text-foreground transition-transform hover:scale-105"
          >
            <Star className="w-4 h-4 text-white" />
            {student.rank.name}
          </div>
        </div>
      </div>

      {/* XP Progress Bar */}
      <Card className="border-white/5 bg-black/40 backdrop-blur-2xl shadow-2xl overflow-hidden rounded-3xl">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
                <Zap className="w-5 h-5 text-gray-200" />
              </div>
              <span className="text-xl font-bold">Level {student.level}</span>
            </div>
            <span className="text-sm font-bold text-muted-foreground bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              {student.totalXp.toLocaleString()} / {student.nextLevelXp.toLocaleString()} XP
            </span>
          </div>
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10 shadow-inner mb-3">
            <div
              className="h-full bg-white transition-all duration-1000 ease-out rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {(student.nextLevelXp - student.totalXp).toLocaleString()} XP to Level {student.level + 1}
          </p>
        </CardContent>
      </Card>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column - Continue Learning + Streak */}
        <div className="lg:col-span-2 space-y-6">

          {/* Continue Learning */}
          <Card className="border-white/5 bg-black/40 backdrop-blur-2xl hover:border-white/10 hover:bg-black/60 shadow-2xl transition-all duration-500 group overflow-hidden rounded-3xl">
            <CardHeader className="pb-3 border-b border-white/5">
              <CardTitle className="text-sm font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Continue Learning
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-2xl font-bold mb-1">{continueLearning.lesson}</p>
                  <p className="text-sm font-medium text-muted-foreground">{continueLearning.topic}</p>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/5 text-xs font-bold shadow-inner text-white">
                  +{continueLearning.xpReward} XP
                </div>
              </div>
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10 mb-4 shadow-inner">
                <div className="h-full bg-gray-300 rounded-full" style={{ width: `${continueLearning.progress}%` }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500">{continueLearning.progress}% complete</span>
                <Link href={`/student/learn/${continueLearning.subjectId}/${continueLearning.topicId}/${continueLearning.lessonId}`}>
                  <Button size="sm" className="gap-2 bg-white text-black hover:bg-gray-200 shadow-lg shadow-white/10 rounded-xl px-6 py-5 text-sm font-bold">
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Mastery Overview */}
          <Card className="border-white/5 bg-black/40 backdrop-blur-2xl shadow-2xl rounded-3xl">
            <CardHeader className="pb-3 border-b border-white/5">
              <CardTitle className="text-sm font-semibold text-gray-400 uppercase tracking-widest flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Mastery Overview
                </span>
                <Link href="/student/skill-tree" className="text-xs font-bold text-white hover:text-gray-300 flex items-center gap-1">
                  View Skill Tree <ArrowRight className="w-3 h-3" />
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
                  <p className="text-3xl font-bold text-white mb-1">{masteryOverview.masteredTopics}</p>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Mastered</p>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
                  <p className="text-3xl font-bold text-gray-300 mb-1">{masteryOverview.inProgressTopics}</p>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">In Progress</p>
                </div>
                <div className="text-center p-4 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
                  <p className="text-3xl font-bold text-gray-600 mb-1">{masteryOverview.totalTopics - masteryOverview.masteredTopics - masteryOverview.inProgressTopics}</p>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Locked</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Overall Mastery</span>
                <span className="text-sm font-black">{Math.round(masteryOverview.overallMastery * 100)}%</span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10 shadow-inner">
                <div
                  className="h-full bg-gray-300 transition-all duration-1000 rounded-full"
                  style={{ width: `${masteryOverview.overallMastery * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Weak Areas */}
          {weakAreas.length > 0 && (
            <Card className="border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl rounded-3xl">
              <CardHeader className="pb-3 border-b border-white/5">
                <CardTitle className="text-sm font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-gray-300" />
                  Areas to Review
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-5">
                <div className="space-y-3">
                  {weakAreas.map((area) => (
                    <div key={area.topicId} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${area.severity === 'critical' ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'bg-gray-400'}`} />
                        <span className="text-sm font-bold text-white">{area.topicName}</span>
                      </div>
                      <Link href={`/student/learn/${area.subjectId}/${area.topicId}`}>
                        <Button size="sm" className="bg-white/10 text-white hover:bg-white/20 rounded-xl px-4 text-xs font-bold border border-white/10">
                          Review
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Quests, Streak, Leaderboard */}
        <div className="space-y-6">

          {/* Streak Widget */}
          <Card className="border-white/5 bg-black/40 backdrop-blur-2xl shadow-2xl rounded-3xl">
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 shadow-inner">
                  <Flame className="w-8 h-8 text-white" />
                </div>
                <span className="text-6xl font-display font-black mb-2">{streak.current}</span>
                <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">Day Streak</p>
                
                <div className="flex gap-2 w-full justify-center bg-white/5 p-4 rounded-2xl border border-white/10 shadow-inner">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold border transition-colors ${
                        i < (streak.current % 7 || 7) ? 'bg-white text-black border-white shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'bg-transparent text-gray-600 border-white/10'
                      }`}
                    >
                      {i < (streak.current % 7 || 7) ? <Flame className="w-4 h-4" /> : '·'}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Quests */}
          <Card className="border-white/5 bg-black/40 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="pb-4 border-b border-white/5">
              <CardTitle className="text-sm font-semibold text-gray-400 uppercase tracking-widest flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Daily Quests
                </span>
                <div className="px-3 py-1 rounded-lg bg-white/10 text-xs font-bold text-white border border-white/10">
                  {completedQuests}/{dailyQuests.length}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 px-2 pb-2">
              <div className="space-y-1">
                {dailyQuests.map((quest) => (
                  <div key={quest.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors group">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 transition-colors ${quest.completed ? 'bg-white border-white text-black' : 'bg-white/5 border-white/10 text-gray-500 group-hover:border-white/20'}`}>
                      {quest.completed ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold truncate transition-colors ${quest.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                        {quest.title}
                      </p>
                      {!quest.completed && quest.current > 0 && (
                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden shadow-inner">
                            <div className="h-full bg-white rounded-full" style={{ width: `${(quest.current / quest.target) * 100}%` }} />
                          </div>
                          <span className="text-[10px] font-bold text-gray-400 w-6 text-right">{quest.current}/{quest.target}</span>
                        </div>
                      )}
                    </div>
                    <div className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold shrink-0 text-gray-300">
                      +{quest.xpReward} XP
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card className="border-white/5 bg-black/40 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="pb-4 border-b border-white/5">
              <CardTitle className="text-sm font-semibold text-gray-400 uppercase tracking-widest flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Class Leaderboard
                </span>
                <Link href="/student/leaderboard" className="text-xs font-bold text-white hover:text-gray-300 flex items-center gap-1">
                  Full <ArrowRight className="w-3 h-3" />
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 px-2 pb-2">
              <div className="space-y-1">
                {leaderboard.map((entry) => (
                  <div
                    key={entry.position}
                    className={`flex items-center gap-4 p-3 rounded-2xl transition-colors ${
                      entry.isCurrentUser
                        ? 'bg-white text-black shadow-lg shadow-white/10'
                        : 'hover:bg-white/5 text-gray-300'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black ${
                      entry.isCurrentUser ? 'bg-black/10' : 'bg-white/5 border border-white/10 text-gray-400'
                    }`}>
                      {entry.position}
                    </div>
                    <span className={`flex-1 text-sm font-bold ${entry.isCurrentUser ? 'text-black' : 'text-white'}`}>
                      {entry.name}
                    </span>
                    <div className={`flex items-center gap-1.5 text-xs font-bold ${entry.isCurrentUser ? 'text-black/70' : 'text-gray-400'}`}>
                      <Zap className="w-3.5 h-3.5" />
                      {entry.xp.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Link href="/student/practice">
              <div className="flex flex-col items-center gap-3 p-6 rounded-3xl border border-white/10 bg-black/40 hover:bg-white/5 hover:border-white/20 transition-all shadow-2xl cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                  <Sword className="w-5 h-5 text-gray-200" />
                </div>
                <span className="text-sm font-bold text-white">Practice Hub</span>
              </div>
            </Link>
            <Link href="/student/ai-tutor">
              <div className="flex flex-col items-center gap-3 p-6 rounded-3xl border border-white/10 bg-black/40 hover:bg-white/5 hover:border-white/20 transition-all shadow-2xl cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                  <Brain className="w-5 h-5 text-gray-200" />
                </div>
                <span className="text-sm font-bold text-white">AI Tutor</span>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
