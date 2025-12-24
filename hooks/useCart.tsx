import { useEffect, useState } from 'react';
import { fetchCart } from '@/actions/fetch';
import { CartItemSchema } from '@/types/types';

export default function useCart(userId: string) {
  const [cart, setCart] = useState<CartItemSchema[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const items = await fetchCart(userId);
        setCart(items);
      } catch (e: any) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId && userId.length > 0) {
      fetch();
    }
  }, [userId]);

  return { cart, isLoading };
}
