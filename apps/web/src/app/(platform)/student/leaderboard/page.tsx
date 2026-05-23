import { Trophy, Zap, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const weeklyData = [
 { rank: 1, prevRank: 2, name: 'Emma L.', xp: 3200, level: 12, rankName: 'Diamond I', rankColor: '#ffffff', avatarUrl: null },
 { rank: 2, prevRank: 1, name: 'James R.', xp: 2800, level: 10, rankName: 'Platinum III', rankColor: '#e5e4e2', avatarUrl: null },
 { rank: 3, prevRank: 3, name: 'You', xp: 2450, level: 8, rankName: 'Gold III', rankColor: '#ffd700', isMe: true, avatarUrl: null },
 { rank: 4, prevRank: 5, name: 'Sofia M.', xp: 2100, level: 7, rankName: 'Gold II', rankColor: '#ffd700', avatarUrl: null },
 { rank: 5, prevRank: 4, name: 'Liam K.', xp: 1950, level: 7, rankName: 'Gold I', rankColor: '#ffd700', avatarUrl: null },
 { rank: 6, prevRank: 6, name: 'Mia P.', xp: 1780, level: 6, rankName: 'Silver III', rankColor: '#c0c0c0', avatarUrl: null },
 { rank: 7, prevRank: 8, name: 'Noah C.', xp: 1620, level: 6, rankName: 'Silver II', rankColor: '#c0c0c0', avatarUrl: null },
 { rank: 8, prevRank: 7, name: 'Ava W.', xp: 1490, level: 5, rankName: 'Silver I', rankColor: '#c0c0c0', avatarUrl: null },
 { rank: 9, prevRank: 9, name: 'Ethan B.', xp: 1320, level: 5, rankName: 'Bronze III', rankColor: '#cd7f32', avatarUrl: null },
 { rank: 10, prevRank: 10, name: 'Olivia N.', xp: 1200, level: 4, rankName: 'Bronze II', rankColor: '#cd7f32', avatarUrl: null },
];

const positionEmojis: Record<number, string> = { 1: '🥇', 2: '🥈', 3: '🥉' };

function LeaderboardEntry({ entry }: { entry: typeof weeklyData[0] }) {
 const change = entry.prevRank - entry.rank;
 return (
 <div className={cn(
 'flex items-center gap-4 p-4 rounded-xl border transition-all',
 entry.isMe ? 'bg-secondary border-border/60 ' : 'bg-secondary/50 border-border hover:bg-secondary',
 )}>
 {/* Position */}
 <div className="w-10 text-center shrink-0">
 {positionEmojis[entry.rank] ? (
 <span className="text-2xl drop-shadow-md">{positionEmojis[entry.rank]}</span>
 ) : (
 <span className="text-sm font-black text-muted-foreground">#{entry.rank}</span>
 )}
 </div>

 {/* Avatar */}
 <Avatar className="w-12 h-12 shrink-0 border-2 border-border ">
 <AvatarImage src={entry.avatarUrl || undefined} />
 <AvatarFallback className="text-sm font-bold bg-primary text-primary-foreground">{entry.name.slice(0, 2)}</AvatarFallback>
 </Avatar>

 {/* Name + rank */}
 <div className="flex-1 min-w-0">
 <p className={cn('text-base truncate mb-0.5', entry.isMe ? 'font-black text-foreground' : 'font-bold text-muted-foreground')}>
 {entry.name} {entry.isMe && <span className="text-muted-foreground text-xs ml-1 uppercase tracking-wider">(You)</span>}
 </p>
 <p className="text-xs font-bold uppercase tracking-wider" style={{ color: entry.rankColor }}>{entry.rankName}</p>
 </div>

 {/* XP */}
 <div className="text-right shrink-0">
 <div className="flex items-center gap-1.5 justify-end mb-1">
 <Zap className="w-4 h-4 text-foreground" />
 <span className="text-lg font-black text-foreground">{entry.xp.toLocaleString()}</span>
 </div>
 {change !== 0 && (
 <p className={cn('text-[10px] font-bold uppercase tracking-wider', change > 0 ? 'text-green-400' : 'text-red-400')}>
 {change > 0 ? `▲ ${change}` : `▼ ${Math.abs(change)}`}
 </p>
 )}
 </div>
 </div>
 );
}

export default function LeaderboardPage() {
 const myEntry = weeklyData.find((e) => e.isMe);

 return (
 <div className="space-y-8 animate-fade-in">
 <div>
 <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-2 flex items-center gap-3">
 <Trophy className="w-8 h-8 text-foreground" />
 Leaderboard
 </h1>
 <p className="text-muted-foreground text-lg font-medium">Compete with your classmates</p>
 </div>

 {/* My position card */}
 {myEntry && (
 <div className="p-6 rounded-xl border border-border bg-secondary flex items-center gap-5 shadow-sm relative overflow-hidden group">
 <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
 <div className="w-16 h-16 rounded-xl bg-white border border-white flex items-center justify-center text-foreground font-black text-2xl ">
 #{myEntry.rank}
 </div>
 <div className="relative z-10">
 <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Your Position</p>
 <p className="font-display font-black text-2xl text-foreground">Rank #{myEntry.rank}</p>
 </div>
 <div className="ml-auto text-right relative z-10">
 <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Total XP</p>
 <p className="font-black text-2xl text-foreground">{myEntry.xp.toLocaleString()}</p>
 </div>
 </div>
 )}

 <Tabs defaultValue="weekly" className="w-full">
 <TabsList className="w-full sm:w-auto grid grid-cols-3 bg-secondary/50 border border-border p-1 rounded-xl">
 <TabsTrigger value="weekly" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-foreground font-bold text-xs uppercase tracking-wider py-2">Weekly</TabsTrigger>
 <TabsTrigger value="monthly" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-foreground font-bold text-xs uppercase tracking-wider py-2">Monthly</TabsTrigger>
 <TabsTrigger value="alltime" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-foreground font-bold text-xs uppercase tracking-wider py-2">All Time</TabsTrigger>
 </TabsList>

 <TabsContent value="weekly" className="space-y-3 mt-6">
 {weeklyData.map((entry) => (
 <LeaderboardEntry key={entry.rank} entry={entry} />
 ))}
 </TabsContent>
 <TabsContent value="monthly" className="mt-6">
 <div className="space-y-3">
 {[...weeklyData].sort(() => Math.random() - 0.5).map((entry, i) => (
 <LeaderboardEntry key={entry.rank} entry={{ ...entry, rank: i + 1, prevRank: entry.rank }} />
 ))}
 </div>
 </TabsContent>
 <TabsContent value="alltime" className="mt-6">
 <div className="space-y-3">
 {weeklyData.map((entry) => (
 <LeaderboardEntry key={entry.rank} entry={entry} />
 ))}
 </div>
 </TabsContent>
 </Tabs>
 </div>
 );
}
