import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Only protect /admin
    if (path.startsWith('/admin')) {
      // If not authenticated or not admin, redirect to home
      if (!token || (token as any)?.role !== 'admin') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    // Allow all other routes
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        // Only require auth for /admin
        if (path.startsWith('/admin')) {
          return !!token && (token as any)?.role === 'admin';
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