'use server';

import { auth } from '@/auth/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import Navbar from '@/components/app/navbar/Main';
import Header from '@/components/app/pages/influ-dashboard/Header';
import Tabs from '@/components/app/pages/influ-dashboard/tabs/Main';
import Footer from '@/components/app/ui/Footer';
import { Roles } from '@/types/types';
import { fetchShopByUserId } from '@/actions/fetch';

async function Page() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session?.user || session.user.role !== 'creator' || !session.user.isOnboarded) {
    redirect('/');
  }
  const shopDetails = await fetchShopByUserId(session.user.id);
  if (!shopDetails) {
    alert('Shop not found');
    redirect('/');
  }

  return (
    <div className="w-full border-[0.5px] border-solid border-gray-300">
      <Navbar role={session.user.role as Roles || 'anonymous'} />
      <Header name={shopDetails.name} />
      <Tabs shopId={shopDetails.id as string} />
      <Footer />
    </div>
  );
}

export default Page;