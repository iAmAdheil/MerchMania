'use server'

import { redirect } from 'next/navigation';
import LeftSection from '@/components/app/pages/signup/LeftSection';
import FormSection from '@/components/app/pages/signup/FormSection';
import { auth } from "@/auth/auth";
import { headers } from "next/headers";

export type Display = 'options' | 'customer' | 'creator';

async function Page() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session) {
    redirect('/');
  }

  return (
    <div className="min-h-screen w-full flex lg:flex-row">
      <div className="flex-1">
        <LeftSection />
      </div>
      <div className="flex-1 hidden justify-center items-center bg-gray-50 lg:flex">
        <FormSection />
      </div>
    </div>
  );
}

export default Page;