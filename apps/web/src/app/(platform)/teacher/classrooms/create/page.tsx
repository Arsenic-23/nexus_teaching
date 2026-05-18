'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { School, ArrowLeft, Copy, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

function generateCode(subject: string) {
  const prefix = subject ? subject.toUpperCase().slice(0, 4).replace(/[^A-Z]/g, 'X') : 'XXXX';
  return `${prefix}${new Date().getFullYear()}`;
}

export default function CreateClassroomPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', description: '', subject: '', grade: '' });
  const [copied, setCopied] = useState(false);

  const code = generateCode(form.subject);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-xl mx-auto">
      {/* Header */}
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
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Classroom Name <span className="text-destructive">*</span>
            </label>
            <Input
              value={form.name}
              onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Advanced Mathematics — Grade 11"
            />
          </div>

          {/* Subject + Grade */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Subject</label>
              <Input
                value={form.subject}
                onChange={(e) => setForm(f => ({ ...f, subject: e.target.value }))}
                placeholder="e.g. Mathematics"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Grade Level</label>
              <Input
                value={form.grade}
                onChange={(e) => setForm(f => ({ ...f, grade: e.target.value }))}
                placeholder="e.g. Grade 11"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Description <span className="text-muted-foreground">(optional)</span></label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Brief description of this classroom..."
              rows={3}
            />
          </div>

          {/* Auto-generated code */}
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-sm font-semibold mb-2 flex items-center gap-2">
              <School className="w-4 h-4 text-primary" />
              Auto-generated Class Code
            </p>
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-2xl font-black text-primary tracking-widest">{code}</p>
              <Button size="sm" variant="outline" onClick={handleCopy} className="gap-2 shrink-0">
                {copied ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Share this code with students to join your classroom.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Link href="/teacher/classrooms" className="flex-1">
              <Button variant="outline" className="w-full">Cancel</Button>
            </Link>
            <Button
              onClick={() => router.push('/teacher/classrooms')}
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
