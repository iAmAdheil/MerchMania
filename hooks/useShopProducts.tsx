import { useState, useEffect } from 'react';
import type { ProductCardSchema } from '@/types';
import { fetchShopProductsById } from '@/actions/fetch';

const useShopProducts = (shopId: string) => {
  const [products, setProducts] = useState<ProductCardSchema[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const products: ProductCardSchema[] = await fetchShopProductsById(shopId, 8);
      console.log('Fetched products:', products);
      setProducts(products);
      setIsLoading(false);
    };

    if (shopId && shopId.length > 0) {
      fetchProducts();
    }
  }, [shopId]);

  return {
    products,
    isLoading,
  };
};

export default useShopProducts;
