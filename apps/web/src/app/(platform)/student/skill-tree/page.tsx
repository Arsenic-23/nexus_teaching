import { Network, Info } from 'lucide-react';
import { SkillTreeCanvas, type SkillTreeNode } from '@/components/learning/skill-tree/skill-tree-canvas';
import { Badge } from '@/components/ui/badge';

const mockNodes: SkillTreeNode[] = [
  // Row 1
  { id: 'linear', title: 'Linear Equations', masteryState: 'mastered', masteryPercent: 95, x: 200, y: 80, connections: ['quadratic', 'functions'] },
  // Row 2
  { id: 'quadratic', title: 'Quadratic Equations', masteryState: 'in_progress', masteryPercent: 68, x: 120, y: 200, connections: ['polynomials', 'discriminant'] },
  { id: 'functions', title: 'Functions', masteryState: 'in_progress', masteryPercent: 35, x: 280, y: 200, connections: ['composition', 'inverse'] },
  // Row 3
  { id: 'polynomials', title: 'Polynomials', masteryState: 'available', x: 80, y: 320, connections: ['rational'] },
  { id: 'discriminant', title: 'Discriminant', masteryState: 'available', x: 200, y: 320, connections: ['complex'] },
  { id: 'composition', title: 'Composition', masteryState: 'locked', x: 320, y: 320, connections: [] },
  { id: 'inverse', title: 'Inverse Functions', masteryState: 'locked', x: 440, y: 320, connections: [] },
  // Row 4
  { id: 'rational', title: 'Rational Funcs', masteryState: 'locked', x: 100, y: 440, connections: [] },
  { id: 'complex', title: 'Complex Numbers', masteryState: 'locked', x: 240, y: 440, connections: ['trig'] },
  // Row 5
  { id: 'trig', title: 'Trigonometry', masteryState: 'locked', x: 300, y: 560, connections: [] },
];

export default function SkillTreePage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <Network className="w-6 h-6 text-primary" />
            Skill Tree
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Visualize your learning path and mastery progress
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" className="text-xs">1 Mastered</Badge>
          <Badge variant="default" className="text-xs">2 In Progress</Badge>
          <Badge variant="secondary" className="text-xs">7 Locked</Badge>
        </div>
      </div>

      {/* Info tip */}
      <div className="flex items-start gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20 text-sm">
        <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <p className="text-muted-foreground">
          <span className="font-medium text-foreground">Navigate the tree:</span> Drag to pan, scroll to zoom, click nodes to see details. Complete topics to unlock new paths.
        </p>
      </div>

      {/* Subject selector */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'mathematics', name: 'Mathematics', emoji: '📐', active: true },
          { id: 'physics', name: 'Physics', emoji: '⚡', active: false },
          { id: 'chemistry', name: 'Chemistry', emoji: '🧪', active: false },
        ].map((subject) => (
          <button
            key={subject.id}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
              subject.active
                ? 'bg-primary/10 border-primary/40 text-primary'
                : 'bg-card border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'
            }`}
          >
            <span>{subject.emoji}</span>
            {subject.name}
          </button>
        ))}
      </div>

      {/* Canvas */}
      <SkillTreeCanvas
        nodes={mockNodes}
        width={560}
        height={620}
        className="w-full"
      />
    </div>
  );
}
