import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { TeacherSidebar } from '@/components/layout/teacher-sidebar';
import { TopBar } from '@/components/layout/topbar';
import { SidebarProvider } from '@/providers/sidebar-provider';
import { PlatformMain } from '@/components/layout/platform-main';

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const unsafeMeta = sessionClaims?.unsafeMetadata as { role?: string } | undefined;
  const publicMeta = sessionClaims?.metadata as { role?: string } | undefined;
  const role = unsafeMeta?.role || publicMeta?.role;

  // Only redirect if we have an explicit non-teacher role
  // If role is undefined, allow through — the user just completed onboarding
  // and the JWT may not reflect the update yet (hard redirect timing)
  if (role && role !== 'TEACHER') {
    if (role === 'STUDENT') {
      redirect('/student/dashboard');
    }
    redirect('/onboarding');
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-page">
        <TeacherSidebar />
        <TopBar streak={0} xp={0} level={0} unreadNotifications={2} />
        <PlatformMain>{children}</PlatformMain>
      </div>
    </SidebarProvider>
  );
}
