'use server';

import { auth } from '@/auth/auth';
import { headers } from 'next/headers';
import Header from '@/components/app/pages/influ-shop/Header';
import Main from '@/components/app/pages/influ-shop/tabs/Main';
import Navbar from '@/components/app/navbar/Main';
import Footer from '@/components/app/ui/Footer';
import { Roles } from '@/types/types';
import { fetchShopByShopId, fetchShopProductsById } from '@/actions/fetch';

export type Tabs = 'products' | 'about';

interface Props {
  params: Promise<{
    shopId: string;
  }>;
}

async function Page({ params }: Props) {
  const Aparams = await params;
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const shopDetails = await fetchShopByShopId(Aparams.shopId);
  const products = await fetchShopProductsById(Aparams.shopId);

  return (
    <div className="w-full">
      <Navbar role={session?.user?.role as Roles || 'anonymous'} />
      <div className="relative w-full min-h-36 px-8 sm:px-10 md:px-12 lg:px-16 xl:px-24 py-16">
        <img
          src={shopDetails?.banner || ''}
          alt="shop-banner"
          className="absolute left-0 right-0 top-0 w-full h-36 object-cover z-0"
        />
        <div className="relative w-full flex flex-col gap-10">
          <Header shopDetails={shopDetails} />
          <Main productCount={products.length} products={products} shopDetails={shopDetails} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Page;