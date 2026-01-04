import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth";
import { Roles } from '@/types';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  if (!session) {
    redirect('/');
  }

  return (
    <>
      <Navbar role={session?.user?.role as Roles || 'anonymous'} />
      {children}
      <Footer />
    </>
  );
}

export default Layout;