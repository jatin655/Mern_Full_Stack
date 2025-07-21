import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAdmin = (token as any)?.role === 'admin';
    const path = req.nextUrl.pathname;

    // Only protect /dashboard and /admin
    if (path.startsWith('/dashboard') || path.startsWith('/admin')) {
      if (!isAuth) {
        const loginUrl = new URL('/login', req.url);
        loginUrl.searchParams.set('callbackUrl', path);
        return NextResponse.redirect(loginUrl);
      }
      // If /admin, check for admin role
      if (path.startsWith('/admin') && !isAdmin) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    }

    // Allow all other routes (/, /about, /login, /register, /forgot-password, /reset-password, /api/*, etc.)
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        // Only require auth for /dashboard and /admin
        if (path.startsWith('/dashboard') || path.startsWith('/admin')) {
          return !!token;
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 