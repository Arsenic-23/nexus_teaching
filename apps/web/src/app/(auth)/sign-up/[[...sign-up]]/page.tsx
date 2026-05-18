import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-page flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none" />

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-8">
        <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-lg shadow-primary/30">
          <Zap className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="font-display text-xl font-bold tracking-tight">Nexus Learning</span>
      </Link>

      <SignUp
        afterSignUpUrl="/onboarding"
        appearance={{
          elements: {
            rootBox: 'w-full max-w-md',
            card: 'bg-card border border-border shadow-2xl shadow-black/40 rounded-2xl',
            headerTitle: 'text-foreground font-display font-bold',
            headerSubtitle: 'text-muted-foreground',
            socialButtonsBlockButton: 'bg-secondary border border-border text-foreground hover:bg-secondary/80 transition-colors',
            socialButtonsBlockButtonText: 'font-medium',
            dividerLine: 'bg-border',
            dividerText: 'text-muted-foreground',
            formFieldLabel: 'text-foreground font-medium',
            formFieldInput: 'bg-secondary border border-border text-foreground rounded-lg focus:ring-2 focus:ring-primary/30',
            formButtonPrimary: 'bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold shadow-lg shadow-primary/25',
            footerActionLink: 'text-primary hover:text-primary/80 font-semibold',
            identityPreviewEditButton: 'text-primary',
          },
          variables: {
            colorBackground: 'hsl(220 8% 11%)',
            colorText: 'hsl(220 10% 90%)',
            colorPrimary: 'hsl(220 6% 68%)',
            colorInputBackground: 'hsl(220 8% 14%)',
            colorInputText: 'hsl(220 10% 90%)',
            borderRadius: '0.75rem',
            colorDanger: 'hsl(0 55% 52%)',
          },
        }}
      />
    </div>
  );
}
