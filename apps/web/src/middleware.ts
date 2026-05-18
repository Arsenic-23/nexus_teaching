import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/pricing',
  '/about',
  '/features',
  '/api/webhooks(.*)',
]);

const isStudentRoute = createRouteMatcher(['/student(.*)']);
const isTeacherRoute = createRouteMatcher(['/teacher(.*)']);
const isAdminRoute = createRouteMatcher(['/admin(.*)']);
const isSuperAdminRoute = createRouteMatcher(['/super-admin(.*)']);

export default clerkMiddleware(async (auth, request) => {
  const { userId, sessionClaims } = await auth();

  // Allow public routes
  if (isPublicRoute(request)) return NextResponse.next();

  // Require authentication for protected routes
  if (!userId) {
    const signInUrl = new URL('/sign-in', request.url);
    signInUrl.searchParams.set('redirect_url', request.url);
    return NextResponse.redirect(signInUrl);
  }

  const role = (sessionClaims?.metadata as { role?: string })?.role;

  // Role-based access control
  if (isStudentRoute(request) && role !== 'STUDENT') {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  if (isTeacherRoute(request) && role !== 'TEACHER') {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  if (isAdminRoute(request) && role !== 'SCHOOL_ADMIN') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isSuperAdminRoute(request) && role !== 'SUPER_ADMIN') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
