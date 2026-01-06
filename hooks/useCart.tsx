import { useEffect, useState } from 'react';
import { fetchCart } from '@/actions/fetch';
import { CartItemSchema } from '@/types';

export default function useCart(userId: string) {
  const [cart, setCart] = useState<CartItemSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const items = await fetchCart(userId);
        setCart(items);
      } catch (e: any) {
        console.log(e);
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId && userId.length > 0) {
      fetch();
    }
  }, [userId]);

  return { cart, loading, err };
}
