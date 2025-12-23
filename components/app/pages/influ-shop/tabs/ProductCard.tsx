'use client'

import { ProductCardSchema } from '@/types/types';
import Link from 'next/link';

export default function ProductCard({
  product,
}: {
  product: ProductCardSchema;
}) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="w-full max-w-[25rem]">
        <div className="cursor-pointer group w-full flex flex-col items-start border border-solid border-gray-200 rounded-sm overflow-hidden hover:shadow-md duration-150">
          <div className="relative w-full overflow-hidden">
            <img
              src={product.image}
              alt={'nike air forces'}
              className="w-full aspect-square object-cover group-hover:scale-105 duration-150"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-black/10 p-2 sm:p-3" />
          </div>
          <div className="flex flex-col items-start gap-1 py-4 px-4 lg:px-6">
            <h2 className="font-semibold text-wrap text-sm sm:text-base lg:text-lg group-hover:text-purple-500 duration-150">
              {product.name}
            </h2>
            <h3 className="font-bold text-sm sm:text-base lg:text-lg">₹ {product.price}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
}
