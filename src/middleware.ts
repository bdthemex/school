
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: '/admin/:path*',
};

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    const validUser = process.env.ADMIN_USER || 'admin';
    const validPassword = process.env.ADMIN_PASSWORD || 'admin';

    if (user === validUser && pwd === validPassword) {
      return NextResponse.next();
    }
  }
  url.pathname = '/api/auth';

  return NextResponse.rewrite(url);
}
