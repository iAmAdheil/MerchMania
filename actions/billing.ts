'use server';

import axios from 'axios';

export const createOrder = async () => {

  const response: any = await axios({
    method: 'POST',
    url: 'https://sandbox.cashfree.com/pg/orders',
    headers: {
      'Content-Type': 'application/json',
      'x-client-id': process.env.CASHFREE_APPID,
      'x-client-secret': process.env.CASHFREE_KEY,
      'x-api-version': '2022-09-01',
    },
    data: {
      order_amount: 100,
      order_currency: 'INR',
      customer_details: {
        "customer_id": "7112AAA812234",
        "customer_email": "john@cashfree.com",
        "customer_phone": "9908734801",
        "customer_name": "John Doe",
      }
    },
  })

  return response.data.payment_session_id || null;
};