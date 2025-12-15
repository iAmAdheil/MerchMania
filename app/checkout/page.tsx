'use client';

import { useEffect } from 'react';
import Navbar from '@/components/app/navbar/Main';
import Footer from '@/components/app/ui/Footer';
import { useSession } from '@/auth/auth-client';
import { useRouter } from 'next/navigation';
import { Roles } from '@/types/types';
import Loader from '@/components/app/ui/Loader';
import useCart from '@/hooks/useCart';
import CheckoutDetails from '@/components/app/pages/checkout/checkoutDetails';
import OrderSummary from '@/components/app/pages/checkout/orderSummary';

export interface SavedAddress {
  id: string;
  label: string;
  fullAddress: string;
  isDefault?: boolean;
}

const savedAddresses: SavedAddress[] = [
  {
    id: '1',
    label: 'Home',
    fullAddress: '123 Main St, Apt 4B, New York, NY 10001',
    isDefault: true,
  },
  {
    id: '2',
    label: 'Work',
    fullAddress: '456 Office Plaza, Suite 200, New York, NY 10002',
  },
];

export default function Checkout() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { cartItems: ci, isLoading: isLoadingCart } = useCart(session?.user?.id || '');

  useEffect(() => {
    if (!isPending && session?.user?.role !== 'customer') {
      router.push('/');
    }
  }, [router, session, isPending]);

  if (isLoadingCart || isPending) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader size={60} />
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-50">
      <Navbar role={(session?.user?.role as Roles) || 'anonymous'} />
      <div className="mt-4 bg-gray-50 w-full py-10 px-6 md:px-10 max-w-5xl mx-auto flex flex-col justify-center items-center gap-12 md:gap-16">
        <CheckoutDetails savedAddresses={savedAddresses} />
        <OrderSummary cartItems={ci} />
      </div>
      <Footer />
    </div>
  );
}
