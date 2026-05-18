import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

// Root redirect — send authenticated users with roles to their dashboard
export default async function RootRedirectPage() {
  const { userId, sessionClaims } = await auth();

  if (userId) {
    const unsafeMeta = sessionClaims?.unsafeMetadata as { role?: string; onboardingComplete?: boolean } | undefined;
    const publicMeta = sessionClaims?.metadata as { role?: string } | undefined;
    const role = unsafeMeta?.role || publicMeta?.role;

    if (!role) {
      redirect('/onboarding');
    }
    if (role === 'TEACHER') {
      redirect('/teacher/dashboard');
    }
    redirect('/student/dashboard');
  }

  // Not authenticated — this component won't render since the landing page is at /
  return null;
}
