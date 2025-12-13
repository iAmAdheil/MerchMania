import { useEffect, useState } from 'react';
import { fetchProductDetails } from '@/actions/fetch';
import { Details } from '@/components/app/pages/product/productDetails';

const useFetchProductDetails = (productId: string) => {
	const [productDetails, setProductDetails] = useState<Details | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const getProductDetails = async () => {
		try {
			setIsLoading(true);
			const data = await fetchProductDetails(productId);
			setProductDetails(data);
		} catch (e: any) {
			setError(e.message || 'Failed to fetch product details.');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (productId && productId.length > 0) {
			getProductDetails();
		}
	}, [productId]);

	return { productDetails, isLoading, error };
};

export default useFetchProductDetails;
