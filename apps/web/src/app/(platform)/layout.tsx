import { ClerkProvider } from '@clerk/nextjs';

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <div className="min-h-screen bg-gradient-page">
        {children}
      </div>
    </ClerkProvider>
  );
}
