import { useState, useEffect } from 'react';
import type { ProductCardSchema } from '@/types';
import { fetchShopProductsById } from '@/actions/fetch';

const useShopProducts = (shopId: string) => {
  const [products, setProducts] = useState<ProductCardSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const products: ProductCardSchema[] = await fetchShopProductsById(shopId, 8);
      console.log('Fetched products:', products);
      setProducts(products);
      setLoading(false);
    };

    if (shopId && shopId.length > 0) {
      fetchProducts();
    }
  }, [shopId]);

  return {
    products,
    loading,
    err
  };
};

export default useShopProducts;
