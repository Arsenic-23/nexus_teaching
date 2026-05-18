'use client';

import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';

interface RadarDataPoint {
  subject: string;
  value: number;
  fullMark?: number;
}

interface RadarChartProps {
  data: RadarDataPoint[];
  color?: string;
  height?: number;
  className?: string;
}

export function RadarChart({ data, color = '#8b5cf6', height = 220, className }: RadarChartProps) {
  return (
    <div className={cn('w-full', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsRadarChart data={data} margin={{ top: 8, right: 24, left: 24, bottom: 8 }}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
          <Radar
            name="Performance"
            dataKey="value"
            stroke={color}
            fill={color}
            fillOpacity={0.15}
            dot={{ fill: color, r: 3 }}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
