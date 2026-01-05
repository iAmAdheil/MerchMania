import { fetchShopByShopId, fetchShopProductsById } from '@/actions/fetch';
// import { getSession } from '@/lib/auth';

import Main from './components/Main';

interface Props {
  params: Promise<{
    shopId: string;
  }>;
}

async function Page({ params }: Props) {
  const Aparams = await params;
  // const session = await getSession();

  const shopDetails = await fetchShopByShopId(Aparams.shopId);
  const products = await fetchShopProductsById(Aparams.shopId);

  return (
    <Main shopDetails={shopDetails} products={products} />
  );
}

export default Page;