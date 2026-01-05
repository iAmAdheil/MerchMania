import { redirect } from 'next/navigation';

import { getSession } from '@/lib/auth';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  if (session && !session.user.isOnboarded) {
    redirect('/creator/onboarding');
  }

  return (
    <>{children}</>
  )
}