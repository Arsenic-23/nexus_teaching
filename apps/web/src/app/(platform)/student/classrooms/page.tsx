'use client';

import { useState } from 'react';
import { School, Plus, Users, ChevronRight, BookOpen, Zap, Calculator, Atom } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import Link from 'next/link';

const mockClassrooms = [
 {
 id: 'class1',
 name: 'Advanced Mathematics — Grade 11',
 teacherName: 'Ms. Sarah Chen',
 studentCount: 28,
 pendingAssignments: 2,
 icon: Calculator,
 color: '#ffffff',
 lastActivity: '2 hours ago',
 myRank: 3,
 },
 {
 id: 'class2',
 name: 'Physics — Grade 11',
 teacherName: 'Mr. David Kim',
 studentCount: 24,
 pendingAssignments: 1,
 icon: Atom,
 color: '#ffffff',
 lastActivity: 'Yesterday',
 myRank: 7,
 },
];

export default function ClassroomsPage() {
 const [joinDialogOpen, setJoinDialogOpen] = useState(false);
 const [joinCode, setJoinCode] = useState('');

 return (
 <div className="space-y-6 animate-fade-in">
 <div className="flex items-center justify-between">
 <div>
 <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-2 flex items-center gap-3">
 <School className="w-8 h-8 text-foreground" />
 My Classrooms
 </h1>
 <p className="text-muted-foreground text-lg font-medium">Your enrolled classes and assignments</p>
 </div>
 <Button onClick={() => setJoinDialogOpen(true)} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6 font-bold shadow-lg shadow-white/5">
 <Plus className="w-5 h-5" />
 Join Classroom
 </Button>
 </div>

 {/* Classroom cards */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 {mockClassrooms.map((cls) => {
 const Icon = cls.icon;
 return (
 <Link key={cls.id} href={`/student/classrooms/${cls.id}`} className="block">
 <Card
 className="border-border bg-card hover:border-border hover:bg-accent shadow-sm transition-all duration-300 cursor-pointer h-full rounded-xl group"
 >
 <CardContent className="p-6">
 <div className="flex items-start gap-4 mb-6">
 <div
 className="w-14 h-14 rounded-xl flex items-center justify-center text-foreground bg-secondary/50 border border-border group-hover:scale-110 transition-transform shrink-0"
 >
 <Icon className="w-7 h-7" />
 </div>
 <div className="flex-1 min-w-0">
 <p className="font-display font-bold text-xl text-foreground leading-tight mb-1">{cls.name}</p>
 <p className="text-sm font-medium text-muted-foreground">{cls.teacherName}</p>
 </div>
 </div>

 <div className="grid grid-cols-3 gap-3 mb-5">
 <div className="text-center p-3 rounded-xl bg-secondary/50 border border-border ">
 <p className="font-bold text-base text-foreground mb-0.5">{cls.studentCount}</p>
 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Students</p>
 </div>
 <div className="text-center p-3 rounded-xl bg-secondary/50 border border-border ">
 <p className="font-bold text-base text-foreground mb-0.5">#{cls.myRank}</p>
 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">My Rank</p>
 </div>
 <div className="text-center p-3 rounded-xl bg-secondary/50 border border-border ">
 <p className={`font-bold text-base mb-0.5 ${cls.pendingAssignments > 0 ? 'text-foreground drop-' : 'text-muted-foreground'}`}>
 {cls.pendingAssignments}
 </p>
 <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Pending</p>
 </div>
 </div>

 <div className="flex items-center justify-between text-xs font-bold text-muted-foreground pt-4 border-t border-border">
 <span>Active {cls.lastActivity}</span>
 <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
 </div>
 </CardContent>
 </Card>
 </Link>
 );
 })}

 {/* Empty state / add more */}
 <Card className="border-dashed border-2 border-border bg-transparent hover:border-border/60 hover:bg-secondary/50 transition-all cursor-pointer rounded-xl group" onClick={() => setJoinDialogOpen(true)}>
 <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[220px] gap-4">
 <div className="w-16 h-16 rounded-xl bg-secondary/50 border border-border flex items-center justify-center group-hover:scale-110 transition-transform ">
 <Plus className="w-8 h-8 text-foreground" />
 </div>
 <div className="text-center">
 <p className="font-bold text-foreground mb-1">Join a Classroom</p>
 <p className="text-sm font-medium text-muted-foreground">Use a code from your teacher</p>
 </div>
 </CardContent>
 </Card>
 </div>

 {/* Join dialog */}
 <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
 <DialogContent className="bg-black/90 border-border backdrop-blur-3xl rounded-xl shadow-sm text-foreground">
 <DialogHeader>
 <DialogTitle className="text-2xl font-black">Join a Classroom</DialogTitle>
 <DialogDescription className="text-muted-foreground font-medium">Enter the classroom code provided by your teacher.</DialogDescription>
 </DialogHeader>
 <div className="space-y-4 py-4">
 <Input
 value={joinCode}
 onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
 placeholder="Enter code (e.g. MATH2024)"
 className="text-center font-mono text-xl tracking-[0.3em] h-14 bg-secondary/50 border-border text-foreground rounded-xl placeholder:text-muted-foreground focus-visible:ring-white/20"
 maxLength={10}
 />
 </div>
 <DialogFooter className="gap-3 sm:gap-0">
 <Button variant="outline" onClick={() => setJoinDialogOpen(false)} className="rounded-xl border-border bg-transparent text-foreground hover:bg-secondary hover:text-foreground">Cancel</Button>
 <Button disabled={!joinCode.trim()} className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold">Join Classroom</Button>
 </DialogFooter>
 </DialogContent>
 </Dialog>
 </div>
 );
}
