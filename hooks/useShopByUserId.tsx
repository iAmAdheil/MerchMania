import { useState, useEffect } from 'react';
import { fetchShopByUserId } from '@/actions/fetch';
import { ShopDetailsSchema } from '@/types';

const useShopByUserId = (userId: string) => {
  const [shopDetails, setShopDetails] = useState<ShopDetailsSchema | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        setLoading(true);
        const shop: ShopDetailsSchema | null = await fetchShopByUserId(userId);
        setShopDetails(shop);
      } catch (e: any) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    if (userId && userId.length > 0) {
      fetchShop();
    }
  }, [userId]);

  return {
    shopDetails,
    loading,
    err
  };
};

export default useShopByUserId;
