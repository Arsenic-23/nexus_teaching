'use client';

import { useState } from 'react';
import { School, Plus, Users, ChevronRight, BookOpen, Zap } from 'lucide-react';
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
    subjectEmoji: '📐',
    color: '#3b82f6',
    lastActivity: '2 hours ago',
    myRank: 3,
  },
  {
    id: 'class2',
    name: 'Physics — Grade 11',
    teacherName: 'Mr. David Kim',
    studentCount: 24,
    pendingAssignments: 1,
    subjectEmoji: '⚡',
    color: '#8b5cf6',
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
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <School className="w-6 h-6 text-primary" />
            My Classrooms
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Your enrolled classes and assignments</p>
        </div>
        <Button onClick={() => setJoinDialogOpen(true)} variant="outline" className="gap-2">
          <Plus className="w-4 h-4" />
          Join Classroom
        </Button>
      </div>

      {/* Classroom cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mockClassrooms.map((cls) => (
          <Link key={cls.id} href={`/student/classrooms/${cls.id}`}>
            <Card
              className="border-border bg-card/50 hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer h-full group"
              style={{ borderColor: cls.color + '20' }}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform"
                    style={{ background: cls.color + '20' }}
                  >
                    {cls.subjectEmoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-base leading-tight">{cls.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{cls.teacherName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center p-2 rounded-lg bg-secondary/50">
                    <p className="font-bold text-sm">{cls.studentCount}</p>
                    <p className="text-[10px] text-muted-foreground">Students</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-secondary/50">
                    <p className="font-bold text-sm text-mastery">#{cls.myRank}</p>
                    <p className="text-[10px] text-muted-foreground">My Rank</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-secondary/50">
                    <p className={`font-bold text-sm ${cls.pendingAssignments > 0 ? 'text-orange-400' : 'text-success'}`}>
                      {cls.pendingAssignments}
                    </p>
                    <p className="text-[10px] text-muted-foreground">Pending</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Active {cls.lastActivity}</span>
                  <ChevronRight className="w-4 h-4 group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}

        {/* Empty state / add more */}
        <Card className="border-dashed border-2 border-border bg-transparent hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer" onClick={() => setJoinDialogOpen(true)}>
          <CardContent className="p-5 flex flex-col items-center justify-center h-full min-h-[180px] gap-3">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
              <Plus className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-muted-foreground">Join a Classroom</p>
              <p className="text-xs text-muted-foreground/60 mt-0.5">Use a code from your teacher</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Join dialog */}
      <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join a Classroom</DialogTitle>
            <DialogDescription>Enter the classroom code provided by your teacher.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Input
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              placeholder="Enter code (e.g. MATH2024)"
              className="text-center font-mono text-lg tracking-widest h-12"
              maxLength={10}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setJoinDialogOpen(false)}>Cancel</Button>
            <Button disabled={!joinCode.trim()}>Join Classroom</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
