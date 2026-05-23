import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LandingCtaProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  showArrow?: boolean;
}

export function LandingCta({
  href,
  children,
  variant = 'primary',
  className,
  showArrow = true,
}: LandingCtaProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center',
        variant === 'primary' && 'landing-cta-primary',
        variant === 'secondary' && 'landing-cta-secondary',
        className,
      )}
    >
      {children}
      {showArrow && variant === 'primary' && (
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      )}
    </Link>
  );
}
