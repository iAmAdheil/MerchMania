import { auth } from '@/auth/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Navbar from '@/components/app/navbar/Main';
import Form from '@/components/app/pages/influ-create-product/Form';
import Footer from '@/components/Footer';
import { Roles } from '@/types';

async function Page() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session?.user || session.user.role !== 'creator' || !session.user.isOnboarded) {
    redirect('/');
  }

  return (
    <div className="flex flex-col">
      <Navbar role={session?.user?.role as Roles || 'anonymous'} />
      <Form userId={session?.user?.id} />
      <Footer />
    </div>
  );
};

export default Page;
