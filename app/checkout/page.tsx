import { auth } from '@/auth/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { fetchCart } from '@/actions/fetch';
import Navbar from '@/components/app/navbar/Main';
import Details from '@/components/app/pages/checkout/Details';
import Summary from '@/components/app/pages/checkout/Summary';
import Footer from '@/components/app/ui/Footer';
import { Roles } from '@/types/types';

export interface SavedAddress {
  id: string;
  label: string;
  fullAddress: string;
  isDefault?: boolean;
}

const SavedAddresses: SavedAddress[] = [
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

async function Page() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session || session.user.role !== 'customer') {
    redirect('/');
  }
  const cartItems = await fetchCart(session.user.id);

  return (
    <div className="w-full bg-gray-50">
      <Navbar role={session.user.role as Roles || 'anonymous'} />
      <div className="mt-4 bg-gray-50 w-full py-10 px-6 md:px-10 max-w-5xl mx-auto flex flex-col justify-center items-center gap-12 md:gap-16">
        <Details savedAddresses={SavedAddresses} />
        <Summary cartItems={cartItems} />
      </div>
      <Footer />
    </div>
  );
}

export default Page;
