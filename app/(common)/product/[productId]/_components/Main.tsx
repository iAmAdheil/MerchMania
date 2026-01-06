import { Roles } from '@/types';
import { fetchProductById } from '@/actions/fetch';

import ImageSection from './Image-Section';
import Details from './Details';
// import Similar from './Similar';

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
      className={`py-12 px-8 sm:px-12 min-h-screen w-full flex flex-col lg:flex-row items-center lg:${role === 'customer' ? 'items-end' : 'items-center'} xl:items-center gap-8 lg:gap-12`}
    >
      <ImageSection productDetails={productDetails} />
      <Details role={role} userId={userId} productDetails={productDetails} />
      <div className="w-[100%] mx-auto h-px bg-gray-200" />
      {/* <Similar /> */}
    </div>
  );
}
