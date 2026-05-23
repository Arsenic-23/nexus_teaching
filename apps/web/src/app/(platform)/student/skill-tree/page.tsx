'use client';

import { useState } from 'react';
import { Network, Info, Calculator, Atom, FlaskConical } from 'lucide-react';
import { SkillTreeCanvas, type SkillTreeNode } from '@/components/learning/skill-tree/skill-tree-canvas';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const subjectNodes: Record<string, SkillTreeNode[]> = {
 mathematics: [
 { id: 'linear', title: 'Linear Equations', masteryState: 'mastered', masteryPercent: 95, x: 200, y: 80, connections: ['quadratic', 'functions'] },
 { id: 'quadratic', title: 'Quadratic Equations', masteryState: 'in_progress', masteryPercent: 68, x: 120, y: 200, connections: ['polynomials', 'discriminant'] },
 { id: 'functions', title: 'Functions', masteryState: 'in_progress', masteryPercent: 35, x: 280, y: 200, connections: ['composition', 'inverse'] },
 { id: 'polynomials', title: 'Polynomials', masteryState: 'available', x: 80, y: 320, connections: ['rational'] },
 { id: 'discriminant', title: 'Discriminant', masteryState: 'available', x: 200, y: 320, connections: ['complex'] },
 { id: 'composition', title: 'Composition', masteryState: 'locked', x: 320, y: 320, connections: [] },
 { id: 'inverse', title: 'Inverse Functions', masteryState: 'locked', x: 440, y: 320, connections: [] },
 { id: 'rational', title: 'Rational Funcs', masteryState: 'locked', x: 100, y: 440, connections: [] },
 { id: 'complex', title: 'Complex Numbers', masteryState: 'locked', x: 240, y: 440, connections: ['trig'] },
 { id: 'trig', title: 'Trigonometry', masteryState: 'locked', x: 300, y: 560, connections: [] },
 ],
 physics: [
 { id: 'kinematics', title: 'Kinematics', masteryState: 'mastered', masteryPercent: 85, x: 200, y: 80, connections: ['forces', 'energy'] },
 { id: 'forces', title: "Newton's Laws", masteryState: 'in_progress', masteryPercent: 40, x: 120, y: 200, connections: ['momentum'] },
 { id: 'energy', title: 'Energy & Work', masteryState: 'available', x: 280, y: 200, connections: ['waves'] },
 { id: 'momentum', title: 'Momentum', masteryState: 'locked', x: 100, y: 320, connections: [] },
 { id: 'waves', title: 'Waves & Sound', masteryState: 'locked', x: 300, y: 320, connections: ['optics'] },
 { id: 'optics', title: 'Optics', masteryState: 'locked', x: 340, y: 440, connections: [] },
 ],
 chemistry: [
 { id: 'atoms', title: 'Atomic Structure', masteryState: 'available', x: 200, y: 80, connections: ['bonding', 'periodic'] },
 { id: 'bonding', title: 'Chemical Bonding', masteryState: 'locked', x: 120, y: 200, connections: ['reactions'] },
 { id: 'periodic', title: 'Periodic Table', masteryState: 'locked', x: 300, y: 200, connections: ['reactions'] },
 { id: 'reactions', title: 'Chemical Reactions', masteryState: 'locked', x: 200, y: 320, connections: ['organic'] },
 { id: 'organic', title: 'Organic Chemistry', masteryState: 'locked', x: 200, y: 440, connections: [] },
 ],
};

const subjectMeta: Record<string, { mastered: number; inProgress: number; locked: number }> = {
 mathematics: { mastered: 1, inProgress: 2, locked: 7 },
 physics: { mastered: 1, inProgress: 1, locked: 4 },
 chemistry: { mastered: 0, inProgress: 0, locked: 5 },
};

const subjects = [
 { id: 'mathematics', name: 'Mathematics', icon: Calculator },
 { id: 'physics', name: 'Physics', icon: Atom },
 { id: 'chemistry', name: 'Chemistry', icon: FlaskConical },
];

export default function SkillTreePage() {
 const [activeSubject, setActiveSubject] = useState('mathematics');
 const nodes = subjectNodes[activeSubject] ?? [];
 const meta = subjectMeta[activeSubject] ?? { mastered: 0, inProgress: 0, locked: 0 };

 return (
 <div className="space-y-8 animate-fade-in">
 {/* Header */}
 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
 <div>
 <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-2 flex items-center gap-3">
 <Network className="w-8 h-8 text-foreground" />
 Skill Tree
 </h1>
 <p className="text-muted-foreground text-lg font-medium">
 Visualize your learning path and mastery progress
 </p>
 </div>
 <div className="flex items-center gap-3 bg-secondary/50 border border-border p-2 rounded-xl ">
 <div className="px-3 py-1.5 rounded-xl bg-white text-[10px] font-black uppercase tracking-wider text-foreground">
 {meta.mastered} Mastered
 </div>
 <div className="px-3 py-1.5 rounded-xl bg-secondary border border-border text-[10px] font-black uppercase tracking-wider text-foreground">
 {meta.inProgress} In Progress
 </div>
 <div className="px-3 py-1.5 rounded-xl bg-muted/50 border border-border text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
 {meta.locked} Locked
 </div>
 </div>
 </div>

 {/* Info tip */}
 <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50 border border-border ">
 <Info className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
 <p className="text-muted-foreground text-sm font-medium">
 <span className="font-bold text-foreground uppercase tracking-wider text-xs mr-2">Navigate the tree:</span>
 Drag to pan, scroll to zoom, click nodes to see details. Complete topics to unlock new paths.
 </p>
 </div>

 {/* Subject selector */}
 <div className="flex gap-3 flex-wrap">
 {subjects.map((subject) => {
 const Icon = subject.icon;
 return (
 <button
 key={subject.id}
 onClick={() => setActiveSubject(subject.id)}
 className={cn(
 'flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-bold transition-all',
 activeSubject === subject.id
 ? 'bg-white text-foreground border-white '
 : 'bg-secondary/50 border-border text-muted-foreground hover:border-border/60 hover:text-foreground',
 )}
 >
 <Icon className="w-4 h-4" />
 {subject.name}
 </button>
 );
 })}
 </div>

 {/* Canvas */}
 <div className="rounded-xl overflow-hidden border border-border bg-card shadow-sm relative">
 <div className="absolute inset-0 pointer-events-none z-10" />
 <SkillTreeCanvas
 nodes={nodes}
 width={560}
 height={620}
 className="w-full relative z-0"
 />
 </div>
 </div>
 );
}
