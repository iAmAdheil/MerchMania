'use server';

import { Cashfree, CFEnvironment } from "cashfree-pg";
import prisma from "@/lib/prisma";
import { CartItemSchema } from "@/types/types";

interface UserDets {
  firstName: string,
  lastName: string,
  email: string,
  phone: string
}

export const createOrder = async (userId: string, cartItems: CartItemSchema[], userDetails: UserDets, address: string, totalAmt: number) => {
  try {
    const order = await prisma.order.create({
      data: {
        userId,
        address,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        phone: userDetails.phone,
        totalAmt: totalAmt.toString(),
        paid: false,
        status: "PENDING",
        items: {
          create: cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            size: item.size
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    const cashfree = new Cashfree(
      CFEnvironment.SANDBOX,
      process.env.CASHFREE_APPID,
      process.env.CASHFREE_KEY
    );
    const CFrequest = {
      order_amount: totalAmt,
      order_currency: "INR",
      order_id: order.id,
      customer_details: {
        customer_id: userId,
        customer_name: `${userDetails.firstName} ${userDetails.lastName}`,
        customer_email: userDetails.email,
        customer_phone: userDetails.phone,
      },
      items: cartItems.map(item => ({
        item_id: item.productId,
        item_name: item.product.name,
        item_quantity: item.quantity,
        item_price: item.product.price,
      })),
      order_meta: {
        return_url:
          `${process.env.DEV_BASE_URL}/order_id=${order.id}`,
      },
    };

    const response: { payment_sessions_id: string } = await cashfree.PGCreateOrder(CFrequest);
    return response;
  } catch (e) {
    console.log(e);
    return null;
  }
}