import { AlertTriangle, TrendingDown, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type RiskLevel = 'high' | 'medium' | 'low';

interface AtRiskStudent {
  id: string;
  name: string;
  avatarUrl?: string;
  riskLevel: RiskLevel;
  reason: string;
  lastActive: string;
  masteryPercent: number;
}

interface AtRiskStudentsProps {
  students: AtRiskStudent[];
  classId?: string;
  className?: string;
}

const riskConfig: Record<RiskLevel, { color: string; bg: string; label: string }> = {
  high: { color: 'text-destructive', bg: 'bg-destructive/10 border-destructive/30', label: 'High Risk' },
  medium: { color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30', label: 'At Risk' },
  low: { color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30', label: 'Monitor' },
};

export function AtRiskStudents({ students, classId, className }: AtRiskStudentsProps) {
  if (!students.length) return null;

  return (
    <Card className={cn('border-orange-500/20 bg-orange-500/5', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center justify-between">
          <span className="flex items-center gap-2 text-orange-400">
            <AlertTriangle className="w-4 h-4" />
            Students Needing Attention
          </span>
          <Badge variant="warning" className="text-xs">
            {students.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {students.map((student) => {
            const config = riskConfig[student.riskLevel];
            return (
              <div
                key={student.id}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-lg border',
                  config.bg,
                )}
              >
                <Avatar className="w-8 h-8 shrink-0">
                  <AvatarImage src={student.avatarUrl} />
                  <AvatarFallback className="text-xs">
                    {student.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold truncate">{student.name}</p>
                    <Badge className={cn('text-[10px] h-4 px-1.5', config.bg, config.color, 'border')}>
                      {config.label}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{student.reason}</p>
                  <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                    <span>Last active: {student.lastActive}</span>
                    <span className="flex items-center gap-0.5">
                      <TrendingDown className="w-2.5 h-2.5 text-destructive" />
                      {student.masteryPercent}% mastery
                    </span>
                  </div>
                </div>

                <Link href={`/teacher/students/${student.id}`}>
                  <Button size="icon-sm" variant="ghost">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>

        {classId && (
          <Link href={`/teacher/classrooms/${classId}/students`} className="block mt-3">
            <p className="text-xs text-center text-primary hover:underline">View all students →</p>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
