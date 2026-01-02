import { auth } from '@/auth/auth'
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (session && session.user && session.user.role == 'creator' && !session.user.isOnboarded) {
    redirect('/creator/onboarding');
  }

  return (
    <>{children}</>
  )
}