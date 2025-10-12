import { useState, useEffect } from 'react';
import { ShopDetailsSchema } from '@/types';
import { fetchShopDetailsByShopId } from '@/actions/fetch';

const useShopDetails = (shopId: string) => {
	const [shopDetails, setShopDetails] = useState<ShopDetailsSchema | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchCreatorShopDetails = async () => {
			try {
				setIsLoading(true);

				const details: ShopDetailsSchema | null = await fetchShopDetailsByShopId(shopId);
				console.log('Fetched shop details:', details);

				setShopDetails(details);
			} catch (e: any) {
				console.log(e);
			} finally {
				setIsLoading(false);
			}
		};

		if (shopId && shopId.length > 0) {
			fetchCreatorShopDetails();
		}
	}, [shopId]);

	return {
		shopDetails,
		isLoading,
	};
};

export default useShopDetails;
