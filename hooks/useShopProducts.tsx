import { useState, useEffect } from 'react';
import type { ProductCardSchema } from '@/types';
import { fetchShopProducts } from '@/actions/fetch';

const useFetchCreatorProducts = (shopId: string) => {
	const [products, setProducts] = useState<ProductCardSchema[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchCreatorProducts = async () => {
			setIsLoading(true);
			const similarProducts: ProductCardSchema[] = await fetchShopProducts(shopId, 8);
			console.log('Fetched products:', similarProducts);
			setProducts(similarProducts);
			setIsLoading(false);
		};

		if (shopId && shopId.length > 0) {
			fetchCreatorProducts();
		}
	}, [shopId]);

	return {
		products,
		isLoading,
	};
};

export default useFetchCreatorProducts;
