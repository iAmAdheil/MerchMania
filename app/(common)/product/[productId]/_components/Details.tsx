'use client'

import { useState } from 'react';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { Sizes, Roles, ProductDisplaySchema } from '@/types';
import { addToCart } from '@/actions/update';

export default function Details({ role, userId, productDetails }: {
  role: Roles,
  userId: string,
  productDetails: ProductDisplaySchema
}) {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<Sizes>(productDetails?.product.sizes[0] || 'S');

  const incrementQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 10)); // Max 10 items
  };
  const decrementQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1)); // Min 1 item
  };

  const handleAddToCart = async () => {
    try {
      const response = await addToCart(userId, productDetails?.product.id || '', size, quantity);
      if (response === 1) {
        alert('Product added to cart successfully');
      } else {
        alert('Failed to add product to cart, please try again');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart, please try again');
    }
  };

  return (
    <div className="w-full lg:max-w-lg xl:max-w-md flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <div className="h-8 w-8 overflow-hidden rounded-full">
          <img
            src={productDetails?.shop.logo || ''}
            alt={productDetails?.shop.name}
            className="h-full w-full object-cover"
          />
        </div>
        <h3 className="text-xl text-gray-500 font-medium font-roboto">
          {productDetails?.shop.name}
        </h3>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold font-roboto">{productDetails?.product.name}</h1>
        <div>
          <span className="text-3xl font-roboto font-semibold">
            &#8377;{productDetails?.product.price}
          </span>
        </div>
        <p className="text-base text-gray-700 font-roboto">
          {productDetails?.product.description}
        </p>
      </div>
      {role === 'customer' && (
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-roboto font-medium">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className={`px-3 py-1 text-lg font-roboto border-y border-l border-solid border-gray-300 ${quantity <= 1 ? 'opacity-20' : ''} rounded-l-sm`}
              >
                -
              </button>
              <p className="px-3 py-1 text-lg font-roboto border-y border-x border-solid border-gray-300">
                {quantity}
              </p>
              <button
                onClick={incrementQuantity}
                disabled={quantity >= 10}
                className={`px-3 py-1 text-lg font-roboto border-y border-r border-solid border-gray-300 ${quantity >= 10 ? 'opacity-20' : ''} rounded-r-sm`}
              >
                +
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col gap-12">
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-roboto font-medium">Sizes</h3>
              <div className="flex flex-row gap-2">
                {productDetails?.product.sizes.map((s: Sizes) => (
                  <button
                    key={s}
                    className={`px-3 py-1 text-base font-roboto border-solid border-gray-300 ${size === s ? 'border border-purple-500' : ''} rounded-sm`}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full flex flex-col sm:flex-row lg:flex-col justify-center gap-4 sm:gap-6 lg:gap-4 duration-150">
              <button
                onClick={handleAddToCart}
                className="py-2 gap-4 w-full flex flex-row justify-center items-center text-white bg-purple-500 rounded-md sm:hover:opacity-80 duration-150"
              >
                <FiShoppingCart className="text-base md:text-lg text-white" />
                <p className="text-base md:text-lg font-medium font-roboto">Add to Cart</p>
              </button>
              <button className="py-2 w-full flex flex-row justify-center items-center gap-4 text-white bg-black sm:hover:opacity-80 rounded-md duration-150 ">
                <FiHeart className="text-base md:text-lg text-white" />
                <p className="text-base md:text-lg font-medium font-roboto">Add to Favourites</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}