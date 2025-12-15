'use client';

import { useEffect } from 'react';
import Navbar from '@/components/app/navbar/Main';
import OnboardingForm from '@/components/app/pages/influ-onboarding/mainForm';
import Footer from '@/components/app/ui/Footer';
import Loader from '@/components/app/ui/Loader';
import { useRouter } from 'next/navigation';
import { useSession } from '@/auth/auth-client';
import { Roles } from '@/types/types';

export default function Onboarding() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!(!isPending && session && session.user.role === 'creator' && !session.user.isOnboarded)) {
      router.push('/');
    }
  }, [router, isPending, session]);

  if (isPending) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader size={60} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <Navbar role={(session?.user?.role as Roles) || 'anonymous'} />
      <OnboardingForm userId={session?.user?.id || ''} />
      <Footer />
    </div>
  );
}
