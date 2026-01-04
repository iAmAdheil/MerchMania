import { redirect } from 'next/navigation';
import Navbar from '@/components/app/navbar/Main';
import Footer from '@/components/Footer';
import { auth } from "@/auth/auth";
import { headers } from "next/headers";
import SigninCard from '@/components/app/pages/signin/Card';

async function Page() {
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })

  if (session) {
    redirect('/');
  }

  return (
    <div className="w-full">
      <Navbar role={'anonymous'} />
      <SigninCard />
      <Footer />
    </div>
  );
}

export default Page;