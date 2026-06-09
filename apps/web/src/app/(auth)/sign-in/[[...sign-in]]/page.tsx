import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';
import { Orbit } from 'lucide-react';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-page flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none" />

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mb-8 group">
        <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-105 group-hover:rotate-12 transition-all duration-500">
          <Orbit className="w-5 h-5 text-primary-foreground group-hover:animate-spin-slow" />
        </div>
        <span className="font-display text-xl font-bold tracking-tight">Nexsori Learning</span>
      </Link>

      <SignIn
        afterSignInUrl="/onboarding"
        appearance={{
          elements: {
            rootBox: 'w-full max-w-md',
            card: 'bg-card border border-border shadow-2xl shadow-primary/5 rounded-2xl p-8',
            headerTitle: 'text-foreground font-display font-bold text-2xl',
            headerSubtitle: 'text-muted-foreground text-sm',
            socialButtonsBlockButton: 'bg-card border border-border text-foreground hover:bg-muted/50 transition-colors h-11 rounded-xl',
            socialButtonsBlockButtonText: 'font-semibold',
            dividerLine: 'bg-border',
            dividerText: 'text-muted-foreground text-xs font-medium',
            formFieldLabel: 'text-foreground font-semibold text-sm',
            formFieldInput: 'bg-background border border-border text-foreground rounded-xl h-11 focus:ring-2 focus:ring-primary/20 transition-all',
            formButtonPrimary: 'bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-11 font-bold shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-all',
            footerActionLink: 'text-primary hover:text-primary/80 font-bold',
            identityPreviewEditButton: 'text-primary',
          },
          variables: {
            colorBackground: 'hsl(var(--card))',
            colorText: 'hsl(var(--foreground))',
            colorPrimary: 'hsl(var(--primary))',
            colorInputBackground: 'hsl(var(--background))',
            colorInputText: 'hsl(var(--foreground))',
            borderRadius: '0.75rem',
            colorDanger: 'hsl(var(--destructive))',
          },
        }}
      />
    </div>
  );
}
