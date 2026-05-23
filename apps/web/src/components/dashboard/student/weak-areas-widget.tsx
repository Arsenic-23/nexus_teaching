import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type Severity = 'critical' | 'moderate' | 'mild';

interface WeakArea {
  topicId: string;
  topicName: string;
  severity: Severity;
  lastStudied?: string;
  masteryPercent?: number;
  reviewHref?: string;
}

interface WeakAreasWidgetProps {
  areas: WeakArea[];
  className?: string;
}

const severityConfig: Record<Severity, { dot: string; label: string }> = {
  critical: { dot: 'bg-destructive', label: 'Critical' },
  moderate: { dot: 'bg-orange-400', label: 'Moderate' },
  mild: { dot: 'bg-yellow-400', label: 'Mild' },
};

export function WeakAreasWidget({ areas, className }: WeakAreasWidgetProps) {
  if (!areas.length) return null;

  return (
    <Card className={cn('border-orange-500/20 bg-orange-500/5', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2 text-orange-400">
          <AlertTriangle className="w-4 h-4" />
          Areas to Review
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {areas.map((area) => {
            const config = severityConfig[area.severity];
            return (
              <div
                key={area.topicId}
                className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:border-orange-500/30 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={cn('w-2 h-2 rounded-full shrink-0', config.dot)} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{area.topicName}</p>
                    {area.masteryPercent !== undefined && (
                      <p className="text-xs text-muted-foreground">
                        {area.masteryPercent}% mastery
                      </p>
                    )}
                  </div>
                </div>
                <Link href={area.reviewHref || '/student/practice/review'}>
                  <Button size="sm" variant="outline" className="text-xs h-7 shrink-0">
                    Review
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          💡 AI recommends reviewing these topics to maintain mastery
        </p>
      </CardContent>
    </Card>
  );
}
