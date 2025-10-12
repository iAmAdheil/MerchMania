import { useState, useEffect } from 'react';
import { ShopDetailsSchema } from '@/types';
import { fetchShopDetailsByUserId } from '@/actions/fetch';

const useShopDetails = (userId: string) => {
	const [shopDetails, setShopDetails] = useState<ShopDetailsSchema | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchCreatorShopDetails = async () => {
			try {
				setIsLoading(true);

				const details: ShopDetailsSchema | null = await fetchShopDetailsByUserId(userId);
				console.log('Fetched shop details:', details);

				setShopDetails(details);
			} catch (e: any) {
				console.log(e);
			} finally {
				setIsLoading(false);
			}
		};

		if (userId && userId.length > 0) {
			fetchCreatorShopDetails();
		}
	}, [userId]);

	return {
		shopDetails,
		isLoading,
	};
};

export default useShopDetails;
