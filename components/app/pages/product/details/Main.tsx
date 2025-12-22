'use server'

import { Roles } from '@/types/types';
import { fetchProductById } from '@/actions/fetch';
import ImageSection from './ImageSection';
import MainDetails from './MainDetails';

export default async function Main({
  productId,
  userId,
  role,
}: {
  productId: string;
  userId: string;
  role: Roles;
}) {
  const productDetails = await fetchProductById(productId);

  if (!productDetails) {
    return <div>Product not found</div>;
  }

  return (
    <div
      className={`w-full flex flex-col lg:flex-row items-center lg:${role === 'customer' ? 'items-end' : 'items-center'} xl:items-center py-12 px-8 sm:px-12 gap-8 lg:gap-12`}
    >
      <ImageSection productDetails={productDetails} />
      <MainDetails role={role} userId={userId} productDetails={productDetails} />
    </div>
  );
}
