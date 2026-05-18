import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { StudentSidebar } from '@/components/layout/student-sidebar';
import { TopBar } from '@/components/layout/topbar';
import { SidebarProvider } from '@/providers/sidebar-provider';
import { PlatformMain } from '@/components/layout/platform-main';

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  // Read role from both metadata sources
  const unsafeMeta = sessionClaims?.unsafeMetadata as { role?: string; onboardingComplete?: boolean } | undefined;
  const publicMeta = sessionClaims?.metadata as { role?: string } | undefined;
  const role = unsafeMeta?.role || publicMeta?.role;

  // Only redirect if we have an explicit non-student role
  // If role is undefined, allow through — the user just completed onboarding
  // and the JWT may not reflect the update yet (hard redirect timing)
  if (role && role !== 'STUDENT') {
    if (role === 'TEACHER') {
      redirect('/teacher/dashboard');
    }
    redirect('/onboarding');
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-page">
        <StudentSidebar />
        <TopBar streak={12} xp={2450} level={8} unreadNotifications={3} />
        <PlatformMain>{children}</PlatformMain>
      </div>
    </SidebarProvider>
  );
}
