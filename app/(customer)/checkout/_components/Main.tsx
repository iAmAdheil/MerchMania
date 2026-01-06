'use client'

import { useState, useMemo } from "react";

import { CartItemSchema, SavedAddress } from "@/types";
import { createOrder } from "@/actions/billing";

import Address from "./Address";
import UserDetails from "./UserDetails";
import Summary from "./Summary";

interface Props {
  userId: string;
  savedAddresses: SavedAddress[];
  cartItems: CartItemSchema[];
}

export default function Main({ userId, savedAddresses, cartItems }: Props) {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [addrType, setAddrType] = useState<'new' | 'saved'>('saved');
  const [selectedAddr, setSelectedAddr] = useState<string>('');
  const [addr, setAddr] = useState({
    aptSuiteUnit: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
  })

  const productsAmount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + Number(item.product.price) * item.quantity, 0);
  }, [cartItems]);
  const tax = useMemo(() => {
    return productsAmount * 0.18;
  }, [productsAmount]);
  const totalAmount = useMemo(() => {
    return productsAmount + tax + 100;
  }, [productsAmount, tax]);

  const finalAddr = useMemo(() => {
    if (addrType === 'new') {
      return `${addr.aptSuiteUnit}, ${addr.streetAddress}, ${addr.city}, ${addr.state}, ${addr.zipCode}, ${addr.country}`;
    } else {
      return savedAddresses.find(addr => addr.id === selectedAddr)?.fullAddress || '';
    }
  }, [addrType, selectedAddr, addr, savedAddresses]);

  const handlePayment = async () => {
    try {
      // const cashfree = await load({
      //   mode: "sandbox",
      // });
      // const response = await createOrder(userId, cartItems, userDetails, finalAddr, totalAmount);
      // if (!response) {
      //   throw new Error("Failed to create order");
      // }
      // const checkoutOptions = {
      //   paymentSessionId: response.payment_sessions_id,
      //   redirectTarget: "_self",
      // };
      // cashfree.checkout(checkoutOptions);
      console.log("Payment successful");
    } catch (e: any) {
      console.log(e);
    }
  }

  return (
    <div className="w-full bg-gray-50">
      <div className="mt-4 py-10 px-6 md:px-10 w-full max-w-5xl mx-auto flex flex-col justify-center items-center gap-12 md:gap-16">
        <UserDetails userDetails={userDetails} setUserDetails={setUserDetails} />
        <Address addrType={addrType} setAddrType={setAddrType} savedAddresses={savedAddresses} setSelectedAddr={setSelectedAddr} selectedAddr={selectedAddr} addr={addr} setAddr={setAddr} />
      </div>
      <Summary productsAmount={productsAmount} tax={tax} totalAmount={totalAmount} handlePayment={handlePayment} cartItems={cartItems} />
    </div>
  )
}