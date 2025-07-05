import { useState, useEffect } from 'react';
import { fetchShopDetails } from '@/actions/fetch';
import type { InfluencerDetailsSchema } from '@/types';

const useFetchCreatorShopDetails = (shopId: string) => {
	const [shopDetails, setShopDetails] = useState<InfluencerDetailsSchema | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCreatorShopDetails = async () => {
			try {
				setIsLoading(true);

				const details: InfluencerDetailsSchema | null = await fetchShopDetails(shopId);
				console.log('Fetched shop details:', details);

				setShopDetails(details);
			} catch (e: any) {
				console.log(e);
				setShopDetails(null);
			} finally {
				setIsLoading(false);
			}
		};

		if (shopId) {
			fetchCreatorShopDetails();
		}
	}, [shopId]);

	return {
		shopDetails,
		isLoading,
		error,
	};
};

export default useFetchCreatorShopDetails;
