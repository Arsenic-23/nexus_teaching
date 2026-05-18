import { TutorChat } from '@/components/learning/ai-tutor/tutor-chat';
import { Bot, Sparkles, BookOpen, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AITutorPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight mb-2 flex items-center gap-3">
            <Bot className="w-8 h-8 text-white" />
            AI Tutor
          </h1>
          <p className="text-muted-foreground text-lg font-medium">
            Get personalized explanations, hints, and practice problems
          </p>
        </div>
        <div className="shrink-0 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center shadow-inner">
          <span className="w-2 h-2 rounded-full bg-green-500 mr-2 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-wider text-white">Online</span>
        </div>
      </div>

      {/* Capability chips */}
      <div className="flex flex-wrap gap-2 mb-2">
        {[
          { icon: BookOpen, label: 'Explain concepts' },
          { icon: Target, label: 'Practice problems' },
          { icon: Sparkles, label: 'Step-by-step solutions' },
          { icon: Bot, label: 'Personalized hints' },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-300 shadow-inner"
          >
            <Icon className="w-3.5 h-3.5 text-white" />
            {label}
          </div>
        ))}
      </div>

      {/* Chat interface */}
      <div className="flex-1 min-h-0 rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-2xl shadow-2xl relative">
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] z-10" />
        <TutorChat className="h-full relative z-0" />
      </div>
    </div>
  );
}
