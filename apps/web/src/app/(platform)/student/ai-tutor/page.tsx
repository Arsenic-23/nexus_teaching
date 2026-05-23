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
 <Bot className="w-8 h-8 text-foreground" />
 AI Tutor
 </h1>
 <p className="text-muted-foreground text-lg font-medium">
 Get personalized explanations, hints, and practice problems
 </p>
 </div>
 <div className="shrink-0 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border flex items-center ">
 <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
 <span className="text-[10px] font-black uppercase tracking-wider text-foreground">Online</span>
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
 className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary/50 border border-border text-xs font-bold text-muted-foreground "
 >
 <Icon className="w-3.5 h-3.5 text-foreground" />
 {label}
 </div>
 ))}
 </div>

 {/* Chat interface */}
 <div className="flex-1 min-h-0 rounded-xl overflow-hidden border border-border bg-card shadow-sm relative">
 <div className="absolute inset-0 pointer-events-none z-10" />
 <TutorChat className="h-full relative z-0" />
 </div>
 </div>
 );
}
