import Link from 'next/link';
import { Zap } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="border-t border-border/40 py-12 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-xp flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold text-lg">Nexus Learning</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              The gamified mastery platform for the next generation of learners.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {[
              {
                title: 'Product',
                links: [
                  { label: 'Features', href: '/features' },
                  { label: 'Pricing', href: '/pricing' },
                  { label: 'How It Works', href: '/how-it-works' },
                  { label: 'For Teachers', href: '/for-teachers' },
                ],
              },
              {
                title: 'Students',
                links: [
                  { label: 'How it works', href: '/how-it-works' },
                  { label: 'Sign Up Free', href: '/sign-up' },
                  { label: 'Sign In', href: '/sign-in' },
                  { label: 'Features', href: '/features' },
                ],
              },
              {
                title: 'Teachers',
                links: [
                  { label: 'For Teachers', href: '/for-teachers' },
                  { label: 'Pricing', href: '/pricing' },
                  { label: 'Start Teaching', href: '/sign-up' },
                  { label: 'Sign In', href: '/sign-in' },
                ],
              },
            ].map(({ title, links }) => (
              <div key={title}>
                <p className="font-semibold text-sm mb-3">{title}</p>
                <ul className="space-y-2">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/40 pt-8">
          <p className="text-sm text-muted-foreground">© 2025 Nexus Learning. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Status</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
