import { NextResponse, type NextRequest } from 'next/server';
import { auth } from '@/auth/auth';

export default async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  const pathname = request.nextUrl.pathname;
  if (
    session &&
    session.user.role === 'creator' &&
    !session.user.isOnboarded &&
    !pathname.startsWith('/creator/onboarding')
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/creator/onboarding';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
