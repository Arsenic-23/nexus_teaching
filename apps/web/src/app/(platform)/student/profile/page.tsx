import { Zap, Flame, Trophy, Star, BookOpen, Target, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { MasteryRing } from '@/components/gamification/mastery-ring';
import { LevelIndicator } from '@/components/gamification/level-indicator';
import Link from 'next/link';

const mockProfile = {
  name: 'Alex Johnson',
  username: '@alexj',
  bio: 'Aspiring mathematician and physics enthusiast. Learning one concept at a time.',
  joinedDate: 'September 2024',
  level: 8,
  totalXp: 2450,
  nextLevelXp: 3000,
  rank: { name: 'Gold III', tier: 'GOLD', color: '#ffd700' },
  streak: 12,
  longestStreak: 28,
  totalLessons: 32,
  totalQuizzes: 18,
  avgAccuracy: 82,
  masteryAvg: 0.52,
  recentAchievements: [
    { name: 'Problem Solver', icon: Trophy, rarity: 'RARE' },
    { name: 'Boss Slayer', icon: Zap, rarity: 'EPIC' },
    { name: 'Quiz Master', icon: Star, rarity: 'RARE' },
  ],
};

const rankGlowMap: Record<string, string> = {
  BRONZE: '0 0 20px rgba(205,127,50,0.3)',
  SILVER: '0 0 20px rgba(192,192,192,0.3)',
  GOLD: '0 0 25px rgba(255,215,0,0.4)',
  PLATINUM: '0 0 25px rgba(229,228,226,0.3)',
  DIAMOND: '0 0 30px rgba(185,242,255,0.4)',
  MASTER: '0 0 35px rgba(255,107,53,0.5)',
};

export default function ProfilePage() {
  const profile = mockProfile;

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      {/* Profile header */}
      <Card className="border-white/5 bg-black/40 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden group">
        {/* Banner */}
        <div className="h-32 bg-white/5 border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50" />
        </div>
        <CardContent className="pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 -mt-16 mb-6">
            <Avatar className="w-32 h-32 border-4 border-black shadow-2xl rounded-2xl relative">
              <AvatarFallback className="text-4xl font-black bg-white text-black rounded-2xl">
                {profile.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="pb-2 flex-1 min-w-0">
              <h1 className="text-3xl font-display font-black text-white truncate">{profile.name}</h1>
              <p className="text-base font-bold text-gray-500">{profile.username}</p>
            </div>
            <div
              className="sm:ml-auto mb-2 px-4 py-2 rounded-xl border text-xs font-black uppercase tracking-wider backdrop-blur-md"
              style={{
                color: profile.rank.color,
                borderColor: profile.rank.color + '40',
                background: profile.rank.color + '10',
                boxShadow: rankGlowMap[profile.rank.tier],
              }}
            >
              <Star className="w-4 h-4 inline mr-1.5" />
              {profile.rank.name}
            </div>
          </div>

          {profile.bio && (
            <p className="text-base font-medium text-gray-400 mb-8 max-w-lg">{profile.bio}</p>
          )}

          {/* Level indicator */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-inner">
            <LevelIndicator
              level={profile.level}
              currentXp={profile.totalXp}
              nextLevelXp={profile.nextLevelXp}
              size="md"
            />
          </div>

          <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mt-6 text-center sm:text-left">Member since {profile.joinedDate}</p>
        </CardContent>
      </Card>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total XP', value: profile.totalXp.toLocaleString(), icon: Zap, color: 'text-white' },
          { label: 'Day Streak', value: `${profile.streak} 🔥`, icon: Flame, color: 'text-orange-500' },
          { label: 'Lessons', value: profile.totalLessons, icon: BookOpen, color: 'text-gray-300' },
          { label: 'Accuracy', value: `${profile.avgAccuracy}%`, icon: Target, color: 'text-white' },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-white/5 bg-black/40 backdrop-blur-2xl rounded-3xl shadow-xl overflow-hidden group">
            <CardContent className="p-6 text-center relative">
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors pointer-events-none" />
              <div className="w-12 h-12 mx-auto rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 shadow-inner group-hover:scale-110 transition-transform">
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <p className="text-2xl font-black text-white mb-1">{value}</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mastery overview */}
      <Card className="border-white/5 bg-black/40 backdrop-blur-2xl rounded-3xl shadow-xl overflow-hidden">
        <CardHeader className="pb-4 border-b border-white/5">
          <CardTitle className="text-sm font-semibold text-gray-400 uppercase tracking-widest flex items-center justify-between">
            <span className="flex items-center gap-2 text-white">
              <Target className="w-4 h-4" />
              Mastery
            </span>
            <Link href="/student/progress/mastery" className="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-wider transition-colors">View details →</Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
          <MasteryRing level={profile.masteryAvg} size={80} className="shrink-0 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" showLabel />
          <div className="flex-1 text-center sm:text-left w-full min-w-0">
            <p className="font-black text-3xl text-white mb-1">{Math.round(profile.masteryAvg * 100)}%</p>
            <p className="text-sm font-medium text-gray-400 mb-4">Overall mastery across all topics</p>
            <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden shadow-inner">
              <div className="h-full rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all" style={{ width: `${profile.masteryAvg * 100}%` }} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent achievements */}
      <Card className="border-white/5 bg-black/40 backdrop-blur-2xl rounded-3xl shadow-xl overflow-hidden">
        <CardHeader className="pb-4 border-b border-white/5">
          <CardTitle className="text-sm font-semibold text-gray-400 uppercase tracking-widest flex items-center justify-between">
            <span className="flex items-center gap-2 text-white">
              <Award className="w-4 h-4" />
              Recent Achievements
            </span>
            <Link href="/student/achievements" className="text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-wider transition-colors">View all →</Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {profile.recentAchievements.map((a) => {
              const Icon = a.icon;
              return (
                <div
                  key={a.name}
                  className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 shadow-inner hover:scale-[1.02] transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center w-full">
                    <p className="text-sm font-bold text-white mb-1 truncate w-full">{a.name}</p>
                    <div className={cn(
                      "px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider inline-block",
                      a.rarity === 'LEGENDARY' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' :
                      a.rarity === 'EPIC' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                      'bg-white/10 text-gray-300 border border-white/20'
                    )}>
                      {a.rarity}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
