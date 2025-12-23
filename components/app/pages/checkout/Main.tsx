'use client'

import { useState, useMemo } from "react";
import Address from "./Address";
import UserDetails from "./UserDetails";
import Summary from "./Summary";
import { CartItemSchema } from "@/types/types";
import { SavedAddress } from "@/types/types";
import { createOrder } from "@/actions/billing";
//@ts-ignore
import { load } from "@cashfreepayments/cashfree-js";

interface Props {
  userId: string;
  savedAddresses: SavedAddress[];
  cartItems: CartItemSchema[];
}

export default function Main({ userId, savedAddresses, cartItems }: Props) {
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
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

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
      const cashfree = await load({
        mode: "sandbox",
      });
      const response = await createOrder(userId, cartItems, userDetails, finalAddr, totalAmount);
      if (!response) {
        throw new Error("Failed to create order");
      }
      const checkoutOptions = {
        paymentSessionId: response.payment_sessions_id,
        redirectTarget: "_self",
      };
      cashfree.checkout(checkoutOptions);
    } catch (e: any) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="w-full flex flex-col gap-12 md:gap-16">
        <UserDetails userDetails={userDetails} setUserDetails={setUserDetails} />
        <Address savedAddresses={savedAddresses} addrType={addrType} setAddrType={setAddrType} setSelectedAddr={setSelectedAddr} selectedAddr={selectedAddr} addr={addr} setAddr={setAddr} />
      </div>
      <Summary cartItems={cartItems} productsAmount={productsAmount} tax={tax} totalAmount={totalAmount} handlePayment={handlePayment} />
    </>
  )
}