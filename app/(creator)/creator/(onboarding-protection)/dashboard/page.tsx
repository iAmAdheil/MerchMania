import { getSession } from '@/lib/auth';
import { fetchShopByUserId } from '@/actions/fetch';

import Main from './_components/Main';

async function Page() {
  const session = await getSession();
  const shopDetails = await fetchShopByUserId(session?.user.id || '');
  if (!shopDetails) {
    return <div>Shop not found</div>;
  }

  return (
    <Main shopDetails={shopDetails} />
  );
}

export default Page;