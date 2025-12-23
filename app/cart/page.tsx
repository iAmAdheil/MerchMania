import { auth } from "@/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { fetchCart } from "@/actions/fetch";
import Navbar from '@/components/app/navbar/Main';
import Header from '@/components/app/pages/cart/Header';
import Main from '@/components/app/pages/cart/Main';
import Footer from '@/components/app/ui/Footer';
import { Roles } from '@/types/types';

async function Page() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session || session.user.role !== 'customer') {
    redirect('/');
  }
  const cartItems = await fetchCart(session.user.id);

  return (
    <div className="w-full">
      <Navbar role={session?.user?.role as Roles || 'anonymous'} />
      <div className="w-full flex flex-col px-6 md:px-10 lg:px-12 pt-10 pb-14 gap-8">
        <Header />
        <Main items={cartItems} />
      </div>
      <Footer />
    </div>
  );
}

export default Page;