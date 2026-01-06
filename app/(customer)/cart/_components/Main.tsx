'use client';

import { useState } from "react";

import { updateCartItem, deleteCartItem } from "@/actions/update";
import { useCartQty } from "@/store/cart";
import { CartItemSchema } from "@/types";

import Empty from "./Empty";
import CartItem from "./Item";
import Header from "./Header";

export default function Main({ items }: { items: CartItemSchema[] }) {
  const { setQty } = useCartQty();

  const [cartItems, setCartItems] = useState(items);

  const handleQuantityIncrement = (pId: string) => {
    const oldQuantity = cartItems.find(item => item.id === pId)?.quantity || 0;
    setCartItems(
      cartItems.map(item => (item.id === pId ? { ...item, quantity: item.quantity + 1 } : item))
    );
    updateCartItem(pId, oldQuantity + 1);
  };

  const handleQuantityDecrement = (pId: string) => {
    const oldQuantity = cartItems.find(item => item.id === pId)?.quantity || 0;
    setCartItems(
      cartItems.map(item => (item.id === pId ? { ...item, quantity: item.quantity - 1 } : item))
    );
    updateCartItem(pId, oldQuantity - 1);
  };

  const handleDeleteCartItem = (pId: string) => {
    setCartItems(prevState => {
      const newState = prevState.filter(item => item.id !== pId);
      setQty(newState.length);
      return newState;
    });
    deleteCartItem(pId);
  };

  return (
    <div className="w-full px-6 md:px-10 lg:px-12 pt-10 pb-14 flex flex-col gap-8">
      <Header />
      {items.length === 0 ? (
        <Empty />
      ) : (
        <div className="w-full flex flex-col gap-4 md:gap-6">
          {items.map(item => (
            <CartItem
              key={item.id}
              handlePlus={handleQuantityIncrement}
              handleMinus={handleQuantityDecrement}
              handleDelete={handleDeleteCartItem}
              item={item}
            />
          ))}
        </div>
      )}
    </div>
  )
}