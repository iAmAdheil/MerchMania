import { useState, useEffect } from 'react';
import type { ProductCardSchema } from '@/types';
import { fetchShopProducts as fetchProducts } from '@/actions/fetch';

const useFetchCreatorProducts = (shopId: string) => {
	const [products, setProducts] = useState<ProductCardSchema[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchShopProducts = async () => {
			try {
				setIsLoading(true);

				const formattedProducts: ProductCardSchema[] = await fetchProducts(shopId);

				if (!formattedProducts || formattedProducts.length === 0) {
					throw new Error('No products found for this shop.');
				}

				console.log('Fetched products:', formattedProducts);

				setProducts(formattedProducts);
			} catch (error: any) {
				console.error('Error fetching products:', error);
				setError(error.message as string);
			} finally {
				setIsLoading(false);
			}
		};

		fetchShopProducts();
	}, [shopId]);

	return {
		products,
		isLoading,
		error,
	};
};

export default useFetchCreatorProducts;
