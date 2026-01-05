import { redirect } from 'next/navigation';

import { getSession } from '@/lib/auth';
import Main from './components/Main';

async function Page() {
  const session = await getSession();
  if (session && session.user.isOnboarded) {
    redirect('/');
  }

  return (
    <Main userId={session?.user.id || ''} />
  );
}

export default Page;