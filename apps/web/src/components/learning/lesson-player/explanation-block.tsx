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
  info: { icon: Info, colors: 'border-border/30 bg-primary/5 text-primary' },
  warning: { icon: AlertTriangle, colors: 'border-orange-500/30 bg-orange-500/5 text-orange-400' },
  tip: { icon: Lightbulb, colors: 'border-mastery/30 bg-mastery/5 text-mastery' },
  definition: { icon: BookOpen, colors: 'border-primary/30 bg-primary/5 text-primary' },
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
    <div className={cn('space-y-8', className)}>
      {title && (
        <h2 className="text-2xl font-display font-black tracking-tight text-foreground">{title}</h2>
      )}

      {/* Main content */}
      <div className="prose prose-invert max-w-none">
        <p className="text-base text-foreground/90 leading-relaxed whitespace-pre-line">{content}</p>
      </div>

      {/* Formula block */}
      {formula && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-secondary/40 to-secondary/10 border border-border/50 backdrop-blur-md font-mono text-center shadow-inner relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <p className="text-xl font-bold text-foreground drop-shadow-sm">{formula}</p>
        </div>
      )}

      {/* Image */}
      {imageUrl && (
        <div className="rounded-2xl overflow-hidden border border-border/50 shadow-lg relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <img src={imageUrl} alt={imageAlt || ''} className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
          {imageAlt && (
            <p className="absolute bottom-0 left-0 w-full p-4 text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
              {imageAlt}
            </p>
          )}
        </div>
      )}

      {/* Callouts */}
      {callouts && callouts.length > 0 && (
        <div className="grid gap-4 mt-8">
          {callouts.map((callout, i) => {
            const { icon: Icon, colors } = calloutConfig[callout.type];
            return (
              <div key={i} className={cn('flex gap-4 p-5 rounded-2xl border shadow-sm backdrop-blur-md transition-all hover:shadow-md', colors)}>
                <div className="mt-0.5 shrink-0 p-1.5 rounded-lg bg-background/50 backdrop-blur-sm border border-inherit">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  {callout.title && (
                    <p className="font-bold text-sm mb-1 text-foreground/90">{callout.title}</p>
                  )}
                  <p className="text-sm text-foreground/70 leading-relaxed">{callout.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
