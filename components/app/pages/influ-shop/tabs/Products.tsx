'use client'

import { useRouter } from 'next/navigation';
import ProductCard from './ProductCard';
import { ProductCardSchema } from '@/types/types';

export default function ProductsTab({ products }: { products: ProductCardSchema[] }) {
  const router = useRouter();

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div className="w-full">
      <div className="mx-auto w-fit grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-8 md:gap-x-10 gap-y-10">
        {products.map(product => (
          <ProductCard key={product.id} product={product} handleProductClick={handleProductClick} />
        ))}
      </div>
    </div>
  );
}