'use server';

import { headers } from 'next/headers';
import { auth } from "@/auth/auth";
import { Roles } from '@/types';
import Navbar from '@/components/app/navbar/Main';
import Footer from '@/components/Footer';
import Details from '@/components/app/pages/product/details/Main';
import SimilarProducts from '@/components/app/pages/product/Similar';

interface Props {
  params: Promise<{
    productId: string;
  }>;
}

async function Page({ params }: Props) {
  const Aparams = await params;
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Navbar role={session?.user.role as Roles || 'anonymous'} />
      <div className="w-full flex flex-col">
        <Details
          productId={Aparams.productId}
          userId={session?.user?.id || ''}
          role={(session?.user?.role as Roles) || 'anonymous'}
        />
        <div className="w-[100%] mx-auto h-px bg-gray-200" />
        {/* <SimilarProducts /> */}
      </div>
      <Footer />
    </div>
  );
};

export default Page;
