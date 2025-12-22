'use client'

import { useState } from "react";
import { ProductDisplaySchema } from "@/types/types";

export default function ImageSection({
  productDetails,
}: {
  productDetails: ProductDisplaySchema;
}) {
  const [activeImage, setActiveImage] = useState(0);
  return (
    <div className="w-full flex flex-col md:flex-row lg:flex-col xl:flex-row items-center gap-2 sm:gap-4">
      <div className="flex flex-row md:flex-col lg:flex-row xl:flex-col items-center gap-2 sm:gap-4">
        {productDetails?.product.images.map((image: string, index: number) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`w-14 h-14 sm:h-24 sm:w-24 rounded-md overflow-hidden border-2 ${activeImage === index ? 'border-brand-purple' : 'border-transparent'
              }`}
          >
            <img
              src={image}
              alt={`${productDetails?.product.name} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={productDetails?.product.images[activeImage]}
          alt={productDetails?.product.name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}