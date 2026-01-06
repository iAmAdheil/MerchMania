'use client'

import { CreditCard } from "lucide-react";
import { CartItemSchema } from "@/types";

type Props = {
  cartItems: CartItemSchema[],
  productsAmount: number,
  tax: number,
  totalAmount: number,
  handlePayment: () => void
}

export default function Summary({ cartItems, productsAmount, tax, totalAmount, handlePayment }: Props) {
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-2xl md:text-3xl font-roboto font-bold">Order Summary</h1>
      <div className="py-4 md:py-6 w-full flex flex-col gap-4 md:gap-6">
        {cartItems.map(item => (
          <div key={item.id} className="flex flex-row items-start gap-4 md:gap-6">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-24 md:w-28 lg:w-32 aspect-square object-cover rounded-md"
            />
            <div className="flex flex-col justify-between self-stretch gap-4">
              <div className="flex flex-col">
                <h1 className="text-xl md:text-2xl font-semibold">{item.product.name}</h1>
                <p className="text-sm md:text-base font-roboto font-medium">Size: {item.size}</p>
              </div>
              <p className="flex flex-row items-center gap-2 text-base md:text-lg font-roboto font-medium">
                &#8377;{item.product.price}{' '}
                <span className="text-sm md:text-base text-gray-500">x {item.quantity}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full h-[1px] bg-gray-300" />
        <div className="px-2 py-3 md:py-4 w-full">
          <div className="w-full flex flex-col gap-0 md:gap-1">
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-base md:text-lg font-semibold">Subtotal</p>
              <p className="text-base md:text-lg font-roboto font-medium">&#8377;{productsAmount}</p>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-base md:text-lg font-semibold">Shipping</p>
              <p className="text-base md:text-lg font-roboto font-medium">&#8377;100</p>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-base md:text-lg font-semibold">Tax (18%)</p>
              <p className="text-base md:text-lg font-roboto font-medium">&#8377;{tax}</p>
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-gray-300" />
        <div className="px-2 py-2 md:py-3 w-full flex flex-row justify-between">
          <p className="text-lg md:text-xl font-semibold">Total</p>
          <p className="text-lg md:text-xl font-roboto font-medium">&#8377;{totalAmount}</p>
        </div>
        <div className="my-5 w-full flex flex-col gap-3">
          <button onClick={handlePayment} className="w-full px-3 py-2 md:py-3 flex flex-row justify-center items-center gap-4 text-sm md:text-base text-white font-semibold bg-purple-500 rounded-md">
            <CreditCard />
            Proceed To Pay
          </button>
          <p className="w-full text-xs md:text-sm text-center font-light">
            By placing your order, you agree to our{' '}
            <a href="" className="text-purple-500 hover:underline duration-200">
              terms and conditions
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}