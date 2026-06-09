import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest, NextFetchEvent } from 'next/server';

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

const isClerkConfigured = !!(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  process.env.CLERK_SECRET_KEY &&
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== 'pk_test_ZXhhbXBsZS5hY2NvdW50cy5kZXYk'
);

export default function middleware(request: NextRequest, event: NextFetchEvent) {
  if (!isClerkConfigured) {
    // Graceful fallback when Clerk is not configured yet
    if (isPublicRoute(request)) {
      return NextResponse.next();
    }

    if (isProtectedRoute(request)) {
      const signInUrl = new URL('/sign-in', request.url);
      return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
  }

  return clerkMiddleware(async (auth, req) => {
    // Always allow public routes
    if (isPublicRoute(req)) return NextResponse.next();

    // For protected routes, just verify authentication
    if (isProtectedRoute(req)) {
      const { userId } = await auth();

      if (!userId) {
        const signInUrl = new URL('/sign-in', req.url);
        signInUrl.searchParams.set('redirect_url', req.url);
        return NextResponse.redirect(signInUrl);
      }
    }

    return NextResponse.next();
  })(request, event);
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};

