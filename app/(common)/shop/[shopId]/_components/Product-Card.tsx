'use client'

import Link from 'next/link';

import { ProductCardSchema } from '@/types';

export default function ProductCard({
  product,
}: {
  product: ProductCardSchema;
}) {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="max-w-[25rem] w-full">
        <div className="group w-full flex flex-col items-start border border-solid border-gray-200 rounded-sm overflow-hidden hover:shadow-md duration-150 cursor-pointer">
          <div className="relative w-full overflow-hidden">
            <img
              src={product.image}
              alt={'nike air forces'}
              className="w-full aspect-square object-cover group-hover:scale-105 duration-150"
            />
            <div className="p-2 sm:p-3 absolute left-0 right-0 bottom-0 bg-gradient-to-t from-black/60 to-black/10" />
          </div>
          <div className="py-4 px-4 lg:px-6 flex flex-col items-start gap-1">
            <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-wrap group-hover:text-purple-500 duration-150">
              {product.name}
            </h2>
            <h3 className="text-sm sm:text-base lg:text-lg font-bold">₹ {product.price}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
}
