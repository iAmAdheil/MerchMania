'use client'

import { User } from 'lucide-react';
import { signOut } from '@/auth/auth-client';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <button onClick={handleSignOut} className="flex items-center justify-center w-10 h-10 bg-purple-100 hover:bg-purple-200 rounded-full cursor-pointer transition-colors duration-200">
      <User size={22} className="text-purple-600" />
    </button>
  );
}