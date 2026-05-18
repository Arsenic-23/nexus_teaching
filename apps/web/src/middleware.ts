import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/onboarding(.*)',
  '/pricing',
  '/about',
  '/features',
  '/api/webhooks(.*)',
  '/api/health(.*)',
]);

const isProtectedRoute = createRouteMatcher([
  '/student(.*)',
  '/teacher(.*)',
  '/admin(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  // Always allow public routes
  if (isPublicRoute(request)) return NextResponse.next();

  // For protected routes, just verify authentication
  // Role-based routing is handled in individual layout server components
  // where the session token is always fresh (no caching issues)
  if (isProtectedRoute(request)) {
    const { userId } = await auth();

    if (!userId) {
      const signInUrl = new URL('/sign-in', request.url);
      signInUrl.searchParams.set('redirect_url', request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
