import { auth } from '@/auth/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Navbar from '@/components/app/navbar/Main';
import Main from '@/components/app/pages/influ-onboarding/form/Main';
import Footer from '@/components/app/ui/Footer';
import { Roles } from '@/types/types';

async function Page() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session || !session.user || session.user.role !== 'creator' || session.user.isOnboarded) {
    redirect('/');
  }

  return (
    <div className="w-full">
      <Navbar role={session.user.role as Roles || 'anonymous'} />
      <Main userId={session.user.id} />
      <Footer />
    </div>
  );
}

export default Page;