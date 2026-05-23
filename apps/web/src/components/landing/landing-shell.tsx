import { LandingNavbar } from '@/components/layout/landing-navbar';
import { LandingFooter } from '@/components/layout/landing-footer';
import { cn } from '@/lib/utils';

interface LandingShellProps {
  children: React.ReactNode;
  className?: string;
  footer?: boolean;
}

export function LandingShell({ children, className, footer = true }: LandingShellProps) {
  return (
    <div className={cn('landing-page overflow-x-hidden', className)}>
      <div className="fixed inset-0 z-0 landing-grid-bg pointer-events-none" aria-hidden />
      <div className="fixed inset-0 z-0 landing-hero-glow pointer-events-none" aria-hidden />
      <div className="relative z-10 pt-16">
        <LandingNavbar />
        {children}
        {footer && <LandingFooter />}
      </div>
    </div>
  );
}
