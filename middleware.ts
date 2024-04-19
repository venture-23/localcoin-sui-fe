import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const cookie: any = request.cookies.get('local-coin');
  if (cookie?.value) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/merchant/:path*', '/campaign/:path*']
};
