import { cn } from '@/lib/utils';
import { Info, AlertTriangle, Lightbulb, BookOpen, ChevronDown } from 'lucide-react';

type CalloutType = 'info' | 'warning' | 'tip' | 'definition';

interface Callout {
  type: CalloutType;
  title?: string;
  content: string;
}

interface ExplanationBlockProps {
  title?: string;
  content: string;
  callouts?: Callout[];
  imageUrl?: string;
  imageAlt?: string;
  formula?: string;
  className?: string;
}

const calloutConfig: Record<CalloutType, { icon: React.ElementType; colors: string }> = {
  info: { icon: Info, colors: 'border-blue-500/30 bg-blue-500/5 text-blue-400' },
  warning: { icon: AlertTriangle, colors: 'border-orange-500/30 bg-orange-500/5 text-orange-400' },
  tip: { icon: Lightbulb, colors: 'border-mastery/30 bg-mastery/5 text-mastery' },
  definition: { icon: BookOpen, colors: 'border-purple-500/30 bg-purple-500/5 text-purple-400' },
};

export function ExplanationBlock({
  title,
  content,
  callouts,
  imageUrl,
  imageAlt,
  formula,
  className,
}: ExplanationBlockProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {title && (
        <h2 className="text-xl font-display font-bold text-foreground">{title}</h2>
      )}

      {/* Main content */}
      <div className="prose prose-invert max-w-none">
        <p className="text-base text-foreground/90 leading-relaxed whitespace-pre-line">{content}</p>
      </div>

      {/* Formula block */}
      {formula && (
        <div className="p-4 rounded-xl bg-secondary/80 border border-border font-mono text-center">
          <p className="text-lg font-bold text-primary">{formula}</p>
        </div>
      )}

      {/* Image */}
      {imageUrl && (
        <div className="rounded-xl overflow-hidden border border-border bg-secondary/50">
          <img src={imageUrl} alt={imageAlt || ''} className="w-full h-auto object-cover" />
          {imageAlt && (
            <p className="px-4 py-2 text-xs text-muted-foreground text-center">{imageAlt}</p>
          )}
        </div>
      )}

      {/* Callouts */}
      {callouts && callouts.length > 0 && (
        <div className="space-y-3">
          {callouts.map((callout, i) => {
            const { icon: Icon, colors } = calloutConfig[callout.type];
            return (
              <div key={i} className={cn('flex gap-3 p-4 rounded-xl border', colors)}>
                <Icon className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  {callout.title && (
                    <p className="font-semibold text-sm mb-1">{callout.title}</p>
                  )}
                  <p className="text-sm text-foreground/80">{callout.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
