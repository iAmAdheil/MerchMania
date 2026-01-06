import { getSession } from '@/lib/auth';
import { fetchCart } from '@/actions/fetch';
import { SavedAddress } from '@/types';

import Main from './_components/Main';

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
  const session = await getSession();
  const cartItems = await fetchCart(session?.user?.id || '');

  return <Main userId={session?.user.id || ''} savedAddresses={SavedAddresses} cartItems={cartItems} />
}

export default Page;
