'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';

interface EngagementDataPoint {
  date: string;
  activeStudents?: number;
  lessonsCompleted?: number;
  quizzesPassed?: number;
}

interface EngagementChartProps {
  data: EngagementDataPoint[];
  height?: number;
  showLegend?: boolean;
  className?: string;
}

export function EngagementChart({ data, height = 200, showLegend = true, className }: EngagementChartProps) {
  return (
    <div className={cn('w-full', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="date" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }}
          />
          {showLegend && <Legend wrapperStyle={{ fontSize: '11px', color: 'hsl(var(--muted-foreground))' }} />}
          {data[0]?.activeStudents !== undefined && (
            <Line type="monotone" dataKey="activeStudents" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} name="Active Students" />
          )}
          {data[0]?.lessonsCompleted !== undefined && (
            <Line type="monotone" dataKey="lessonsCompleted" stroke="#8b5cf6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} name="Lessons" />
          )}
          {data[0]?.quizzesPassed !== undefined && (
            <Line type="monotone" dataKey="quizzesPassed" stroke="#10b981" strokeWidth={2} dot={false} activeDot={{ r: 4 }} name="Quizzes" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
