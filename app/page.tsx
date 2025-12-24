import Navbar from '@/components/app/navbar/Main';
import HeroSection from '@/components/app/pages/landing/HeroSection';
import HeroFollower from '@/components/app/pages/landing/HeroFollower';
import Footer from '@/components/app/ui/Footer';
import { Roles } from '@/types/types';
import { auth } from "@/auth/auth"; // path to your Better Auth server instance
import { headers } from 'next/headers';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
  })

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col w-full lg:min-h-screen">
        <Navbar role={(session?.user?.role as Roles) || 'anonymous'} />
        <HeroSection />
      </div>
      <HeroFollower />
      <Footer />
    </div>
  );
}
