import { useState, useEffect } from 'react';
import { fetchShopByUserId } from '@/actions/fetch';
import { ShopDetailsSchema } from '@/types';

const useShopByUserId = (userId: string) => {
  const [shopDetails, setShopDetails] = useState<ShopDetailsSchema | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        setIsLoading(true);
        const shop: ShopDetailsSchema | null = await fetchShopByUserId(userId);
        setShopDetails(shop);
      } catch (e: any) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    if (userId && userId.length > 0) {
      fetchShop();
    }
  }, [userId]);

  return {
    shopDetails,
    isLoading,
  };
};

export default useShopByUserId;
