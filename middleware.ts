import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if user is authenticated by looking for auth token/cookie
  // For now, we'll check localStorage equivalent in server-side
  const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true';
  
  // Define protected routes
  const protectedRoutes = ['/dashboard', '/fingerprints'];
  
  // Define public routes that don't require authentication
  const publicRoutes = ['/login'];
  
  // Check if current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  // Check if current path is a public route
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  
  // If user is not authenticated and trying to access protected route
  if (!isAuthenticated && isProtectedRoute) {
    // Redirect to login page
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  // If user is authenticated and trying to access login page
  if (isAuthenticated && isPublicRoute) {
    // Redirect to dashboard
    const dashboardUrl = new URL('/dashboard', request.url);
    return NextResponse.redirect(dashboardUrl);
  }
  
  // Allow the request to continue
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$).*)',
  ],
};
