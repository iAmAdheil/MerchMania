import { useState, useEffect } from 'react';
import type { ProductCardSchema } from '@/types';
import { fetchShopProducts } from '@/actions/fetch';

const useFetchCreatorProducts = (shopId: string) => {
	const [products, setProducts] = useState<ProductCardSchema[]>([]);

	useEffect(() => {
		const fetchSimilarProducts = async () => {
			const similarProducts: ProductCardSchema[] = await fetchShopProducts(shopId, 8);
			console.log('Fetched products:', similarProducts);
			setProducts(similarProducts);
		};

		if (shopId && shopId.length > 0) {
			fetchSimilarProducts();
		}
	}, [shopId]);

	return {
		products,
	};
};

export default useFetchCreatorProducts;
