'use client';

import { cn } from '@/lib/utils';

interface RetentionDay {
  date: Date;
  intensity: number; // 0-4
  value?: number;
}

interface RetentionChartProps {
  data: RetentionDay[][];
  className?: string;
}

const intensityColors = [
  'bg-secondary/30',
  'bg-primary/20',
  'bg-primary/40',
  'bg-primary/65',
  'bg-primary',
];

export function RetentionChart({ data, className }: RetentionChartProps) {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className={cn('overflow-x-auto', className)}>
      <div className="flex gap-1">
        {/* Day labels */}
        <div className="flex flex-col gap-1 mr-1 pt-6">
          {days.map((d, i) => (
            <div key={i} className="w-4 h-4 flex items-center justify-center text-[9px] text-muted-foreground">{d}</div>
          ))}
        </div>

        {/* Weeks */}
        {data.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {wi % 4 === 0 && (
              <div className="h-5 text-[9px] text-muted-foreground">
                {new Date(week[0]?.date || '').toLocaleDateString('en', { month: 'short' })}
              </div>
            )}
            {wi % 4 !== 0 && <div className="h-5" />}
            {week.map((day, di) => (
              <div
                key={di}
                className={cn('w-4 h-4 rounded-sm transition-all hover:scale-125 cursor-pointer', intensityColors[day.intensity] || intensityColors[0])}
                title={day.date ? `${day.date.toLocaleDateString()}: ${day.value || 0}` : ''}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-3 text-[10px] text-muted-foreground">
        <span>Less</span>
        {intensityColors.map((c, i) => <div key={i} className={cn('w-3 h-3 rounded-sm', c)} />)}
        <span>More</span>
      </div>
    </div>
  );
}
