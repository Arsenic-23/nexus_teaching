'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { School, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import Link from 'next/link';

export default function CreateClassroomPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', description: '', subject: '', grade: '' });

  const handleCreate = () => {
    // Mock creation
    router.push('/teacher/classrooms');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-xl mx-auto">
      <div className="flex items-center gap-3">
        <Link href="/teacher/classrooms">
          <Button size="icon-sm" variant="ghost"><ArrowLeft className="w-4 h-4" /></Button>
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold">Create Classroom</h1>
          <p className="text-muted-foreground text-sm">Set up a new class for your students</p>
        </div>
      </div>

      <Card className="border-border bg-card/50">
        <CardContent className="pt-6 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Classroom Name *</label>
            <Input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Advanced Mathematics — Grade 11"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input
                value={form.subject}
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                placeholder="e.g. Mathematics"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Grade Level</label>
              <Input
                value={form.grade}
                onChange={(e) => setForm((f) => ({ ...f, grade: e.target.value }))}
                placeholder="e.g. Grade 11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description (optional)</label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Brief description of this classroom..."
              rows={3}
            />
          </div>

          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-sm font-semibold mb-1">Auto-generated Class Code</p>
            <p className="font-mono text-xl font-bold text-primary tracking-widest">
              {form.subject ? form.subject.toUpperCase().slice(0, 4) + '2024' : 'XXXX2024'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Share this code with students to join</p>
          </div>

          <div className="flex gap-3 pt-2">
            <Link href="/teacher/classrooms" className="flex-1">
              <Button variant="outline" className="w-full">Cancel</Button>
            </Link>
            <Button
              onClick={handleCreate}
              disabled={!form.name.trim()}
              className="flex-1 gap-2"
              variant="glow"
            >
              <School className="w-4 h-4" />
              Create Classroom
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
