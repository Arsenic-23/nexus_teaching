'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, ArrowLeft, Copy, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import Link from 'next/link';

export default function CreateAssignmentPage({ params }: { params: Promise<{ classId: string }> }) {
  const { classId } = use(params);
  const router = useRouter();
  const [form, setForm] = useState({ title: '', description: '', type: '', dueDate: '', points: '100' });

  return (
    <div className="space-y-6 animate-fade-in max-w-xl mx-auto">
      <Breadcrumbs items={[
        { label: 'Classrooms', href: '/teacher/classrooms' },
        { label: 'Advanced Math', href: `/teacher/classrooms/${classId}` },
        { label: 'Assignments', href: `/teacher/classrooms/${classId}/assignments` },
        { label: 'Create' },
      ]} />

      <div className="flex items-center gap-3">
        <Link href={`/teacher/classrooms/${classId}/assignments`}>
          <Button size="icon-sm" variant="ghost"><ArrowLeft className="w-4 h-4" /></Button>
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold">Create Assignment</h1>
          <p className="text-muted-foreground text-sm">Assign work to your students</p>
        </div>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="pt-6 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title *</label>
            <Input
              value={form.title}
              onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="Assignment title..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Instructions and description..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select onValueChange={(v) => setForm(f => ({ ...f, type: v }))}>
                <SelectTrigger><SelectValue placeholder="Select type..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="problem_set">Problem Set</SelectItem>
                  <SelectItem value="quiz">Quiz</SelectItem>
                  <SelectItem value="worksheet">Worksheet</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Points</label>
              <Input
                type="number"
                value={form.points}
                onChange={(e) => setForm(f => ({ ...f, points: e.target.value }))}
                min={1}
                max={1000}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Due Date</label>
            <Input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm(f => ({ ...f, dueDate: e.target.value }))}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Link href={`/teacher/classrooms/${classId}/assignments`} className="flex-1">
              <Button variant="outline" className="w-full">Cancel</Button>
            </Link>
            <Button
              disabled={!form.title.trim()}
              className="flex-1 gap-2"
              variant="glow"
              onClick={() => router.push(`/teacher/classrooms/${classId}/assignments`)}
            >
              <BookOpen className="w-4 h-4" />
              Create Assignment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
