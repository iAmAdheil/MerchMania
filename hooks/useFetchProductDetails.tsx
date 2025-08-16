import { useEffect, useState } from 'react';
import { fetchProductDetails } from '@/actions/fetch';
import type { ProductPageDetailsSchema } from '@/types';

const useFetchProductDetails = (productId: string, shopId: string) => {
	const [productDetails, setProductDetails] = useState<ProductPageDetailsSchema | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const getProductDetails = async () => {
		try {
			setIsLoading(true);
			const data = await fetchProductDetails(productId, shopId);
			setProductDetails(data);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (productId && shopId) {
			console.log('Fetching product details for:', productId, 'in shop:', shopId);
			getProductDetails();
		}
	}, [productId, shopId]);

	return { productDetails, isLoading, error };
};

export default useFetchProductDetails;
