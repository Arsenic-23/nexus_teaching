import Link from 'next/link';
import { ArrowRight, Zap, Brain, Trophy, Target, Flame, Star } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-page">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-xp flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold">Nexus</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/sign-in"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 text-sm text-muted-foreground mb-8">
            <Star className="w-4 h-4 text-mastery" />
            <span>Mastery-based learning meets gamification</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6">
            Learn. Master.{' '}
            <span className="text-gradient-brand">Rank Up.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            The next-generation learning platform where education meets gaming.
            Interactive lessons, AI tutoring, and a progression system that makes
            mastery irresistible.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              Start Learning Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/features"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-card transition-colors"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Built for Real Mastery
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
            Not another boring LMS. Nexus combines proven learning science with
            game design to create an experience that actually works.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl border border-border bg-card/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all group"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${feature.iconBg}`}>
                  <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-2xl border border-border bg-card/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Ready to Transform Your Learning?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Join thousands of students who are mastering subjects faster and
                having fun doing it.
              </p>
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-medium text-lg hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/25"
              >
                Get Started for Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-xp flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">Nexus Learning</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Nexus Learning. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: 'Interactive Lessons',
    description:
      'Learn by doing, not watching. Every concept is taught through interactive exercises and visualizations.',
    icon: Brain,
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-500',
  },
  {
    title: 'AI Tutor',
    description:
      'Get personalized help anytime. Our AI tutor guides you through problems using the Socratic method.',
    icon: Zap,
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
  },
  {
    title: 'Mastery Progression',
    description:
      'Progress is earned through understanding, not clicking. Prove mastery to unlock new challenges.',
    icon: Target,
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
  },
  {
    title: 'Rank System',
    description:
      'Climb from Bronze to Master. Your rank reflects real skill earned through consistent performance.',
    icon: Trophy,
    iconBg: 'bg-yellow-500/10',
    iconColor: 'text-yellow-500',
  },
  {
    title: 'Streak & XP',
    description:
      'Build daily habits with streaks. Earn XP for accuracy and consistency, not just showing up.',
    icon: Flame,
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-500',
  },
  {
    title: 'Smart Retention',
    description:
      'Spaced repetition ensures you remember what you learn. The system tracks decay and prompts review.',
    icon: Star,
    iconBg: 'bg-pink-500/10',
    iconColor: 'text-pink-500',
  },
];
