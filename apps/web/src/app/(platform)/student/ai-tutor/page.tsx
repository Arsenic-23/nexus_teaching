import { TutorChat } from '@/components/learning/ai-tutor/tutor-chat';
import { Bot, Sparkles, BookOpen, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AITutorPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            AI Tutor
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Get personalized explanations, hints, and practice problems
          </p>
        </div>
        <Badge variant="success" className="shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-success mr-1.5" />
          Online
        </Badge>
      </div>

      {/* Capability chips */}
      <div className="flex flex-wrap gap-2">
        {[
          { icon: BookOpen, label: 'Explain concepts' },
          { icon: Target, label: 'Practice problems' },
          { icon: Sparkles, label: 'Step-by-step solutions' },
          { icon: Bot, label: 'Personalized hints' },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/80 border border-border text-xs text-muted-foreground"
          >
            <Icon className="w-3 h-3" />
            {label}
          </div>
        ))}
      </div>

      {/* Chat interface */}
      <div className="flex-1 min-h-0">
        <TutorChat className="h-full" />
      </div>
    </div>
  );
}
