import { Zap } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-page gap-6">
      {/* Animated logo */}
      <div className="relative">
        <div className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center animate-pulse">
          <Zap className="w-8 h-8 text-primary-foreground" />
        </div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-brand blur-xl opacity-40 animate-ping" />
      </div>

      <div className="text-center space-y-2">
        <p className="text-xl font-display font-bold">Nexus</p>
        <p className="text-sm text-muted-foreground animate-pulse">Loading your learning journey...</p>
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
