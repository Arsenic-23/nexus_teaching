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
            <School className="w-8 h-8 text-white" />
            My Classrooms
          </h1>
          <p className="text-muted-foreground text-lg font-medium">Your enrolled classes and assignments</p>
        </div>
        <Button onClick={() => setJoinDialogOpen(true)} className="gap-2 bg-white text-black hover:bg-gray-200 rounded-xl px-6 font-bold shadow-lg shadow-white/5">
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
                className="border-white/5 bg-black/40 backdrop-blur-2xl hover:border-white/20 hover:bg-black/60 shadow-2xl transition-all duration-300 cursor-pointer h-full rounded-3xl group"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-white/5 border border-white/10 shadow-inner group-hover:scale-110 transition-transform shrink-0"
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-xl text-white leading-tight mb-1">{cls.name}</p>
                      <p className="text-sm font-medium text-gray-400">{cls.teacherName}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="text-center p-3 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
                      <p className="font-bold text-base text-white mb-0.5">{cls.studentCount}</p>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Students</p>
                    </div>
                    <div className="text-center p-3 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
                      <p className="font-bold text-base text-white mb-0.5">#{cls.myRank}</p>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">My Rank</p>
                    </div>
                    <div className="text-center p-3 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
                      <p className={`font-bold text-base mb-0.5 ${cls.pendingAssignments > 0 ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-gray-400'}`}>
                        {cls.pendingAssignments}
                      </p>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Pending</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-gray-500 pt-4 border-t border-white/5">
                    <span>Active {cls.lastActivity}</span>
                    <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}

        {/* Empty state / add more */}
        <Card className="border-dashed border-2 border-white/10 bg-transparent hover:border-white/30 hover:bg-white/5 transition-all cursor-pointer rounded-3xl group" onClick={() => setJoinDialogOpen(true)}>
          <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[220px] gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <p className="font-bold text-white mb-1">Join a Classroom</p>
              <p className="text-sm font-medium text-gray-500">Use a code from your teacher</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Join dialog */}
      <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
        <DialogContent className="bg-black/90 border-white/10 backdrop-blur-3xl rounded-3xl shadow-2xl text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black">Join a Classroom</DialogTitle>
            <DialogDescription className="text-gray-400 font-medium">Enter the classroom code provided by your teacher.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              placeholder="Enter code (e.g. MATH2024)"
              className="text-center font-mono text-xl tracking-[0.3em] h-14 bg-white/5 border-white/10 text-white rounded-xl placeholder:text-gray-600 focus-visible:ring-white/20"
              maxLength={10}
            />
          </div>
          <DialogFooter className="gap-3 sm:gap-0">
            <Button variant="outline" onClick={() => setJoinDialogOpen(false)} className="rounded-xl border-white/10 bg-transparent text-white hover:bg-white/10 hover:text-white">Cancel</Button>
            <Button disabled={!joinCode.trim()} className="rounded-xl bg-white text-black hover:bg-gray-200 font-bold">Join Classroom</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
