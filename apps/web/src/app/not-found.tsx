import { Home, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-page px-4 text-center">
      {/* 404 visual */}
      <div className="relative mb-8">
        <div className="text-[120px] font-display font-black leading-none select-none">
          <span className="text-gradient-brand">4</span>
          <span className="text-6xl mx-2">🎮</span>
          <span className="text-gradient-brand">4</span>
        </div>
        <div className="absolute inset-0 blur-3xl opacity-20 bg-gradient-brand rounded-full" />
      </div>

      <h1 className="text-2xl font-display font-bold mb-2">Page Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md">
        This page seems to have vanished into the void. Don&apos;t worry — your learning progress is safe!
      </p>

      {/* Quick nav */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/student/dashboard">
          <Button variant="glow" className="gap-2">
            <Home className="w-4 h-4" />
            Go to Dashboard
          </Button>
        </Link>
        <Link href="/student/learn">
          <Button variant="outline" className="gap-2">
            <BookOpen className="w-4 h-4" />
            Continue Learning
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Quick links */}
      <div className="flex items-center gap-4 mt-8 text-sm text-muted-foreground flex-wrap justify-center">
        {[
          { label: 'Practice', href: '/student/practice' },
          { label: 'AI Tutor', href: '/student/ai-tutor' },
          { label: 'Leaderboard', href: '/student/leaderboard' },
          { label: 'Settings', href: '/student/settings' },
        ].map(({ label, href }) => (
          <Link key={href} href={href} className="hover:text-foreground transition-colors hover:underline">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
