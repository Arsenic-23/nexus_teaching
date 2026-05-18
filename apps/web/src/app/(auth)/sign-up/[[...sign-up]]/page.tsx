import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-page flex items-center justify-center p-6">
      <SignUp
        appearance={{
          elements: {
            rootBox: 'w-full max-w-md',
            card: 'bg-card border border-border shadow-xl',
            headerTitle: 'text-foreground font-display',
            headerSubtitle: 'text-muted-foreground',
            socialButtonsBlockButton:
              'bg-secondary border-border text-foreground hover:bg-secondary/80',
            formFieldLabel: 'text-foreground',
            formFieldInput: 'bg-secondary border-border text-foreground',
            footerActionLink: 'text-primary',
          },
          variables: {
            colorBackground: 'hsl(240 6% 8%)',
            colorText: 'hsl(0 0% 95%)',
            colorPrimary: 'hsl(217 91% 60%)',
            colorInputBackground: 'hsl(240 5% 15%)',
            colorInputText: 'hsl(0 0% 95%)',
            borderRadius: '0.75rem',
          },
        }}
      />
    </div>
  );
}
