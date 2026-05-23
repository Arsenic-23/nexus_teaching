'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SkillNode } from './skill-node';
import { SkillConnection } from './skill-connection';
import type { MasteryState } from './skill-node';

export interface SkillTreeNode {
  id: string;
  title: string;
  masteryState: MasteryState;
  masteryPercent?: number;
  lessonCount?: number;
  href?: string;
  x: number;
  y: number;
  connections: string[];
}

interface SkillTreeCanvasProps {
  nodes: SkillTreeNode[];
  width?: number;
  height?: number;
  className?: string;
}

export function SkillTreeCanvas({
  nodes,
  width = 900,
  height = 600,
  className,
}: SkillTreeCanvasProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as Element).closest('[data-skill-node]')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  }, [pan]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.15, 2.5));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.15, 0.4));
  const handleReset = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

  return (
    <div className={cn('relative overflow-hidden rounded-xl border border-border bg-background/50', className)}>
      {/* Controls */}
      <div className="absolute top-3 right-3 z-10 flex items-center gap-1 p-1 rounded-lg bg-card border border-border">
        <Button size="icon-sm" variant="ghost" onClick={handleZoomIn}>
          <ZoomIn className="w-4 h-4" />
        </Button>
        <span className="text-xs font-mono text-muted-foreground px-1 min-w-[3rem] text-center">
          {Math.round(zoom * 100)}%
        </span>
        <Button size="icon-sm" variant="ghost" onClick={handleZoomOut}>
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button size="icon-sm" variant="ghost" onClick={handleReset}>
          <Maximize className="w-4 h-4" />
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 z-10 flex items-center gap-3 p-2 rounded-lg bg-card backdrop-blur-sm border border-border text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-success/80" />
          <span>Mastered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-primary/80" />
          <span>In Progress</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-secondary" />
          <span>Locked</span>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className={cn('w-full h-full', isDragging ? 'cursor-grabbing' : 'cursor-grab')}
        style={{ height: '600px' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <motion.div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '50% 50%',
            width,
            height,
            position: 'relative',
          }}
          transition={{ type: 'tween', duration: 0 }}
        >
          {/* SVG for connections */}
          <svg
            width={width}
            height={height}
            className="absolute inset-0 pointer-events-none"
          >
            {nodes.flatMap((node) =>
              node.connections.map((targetId) => {
                const target = nodeMap[targetId];
                if (!target) return null;
                return (
                  <SkillConnection
                    key={`${node.id}-${targetId}`}
                    x1={node.x}
                    y1={node.y}
                    x2={target.x}
                    y2={target.y}
                    sourceState={node.masteryState}
                    targetState={target.masteryState}
                  />
                );
              }),
            )}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => (
            <div
              key={node.id}
              data-skill-node
              style={{
                position: 'absolute',
                left: node.x - 40,
                top: node.y - 40,
              }}
            >
              <SkillNode
                node={node}
                isSelected={selectedNodeId === node.id}
                onClick={() => setSelectedNodeId(selectedNodeId === node.id ? null : node.id)}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
