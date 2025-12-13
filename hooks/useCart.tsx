import { useEffect, useState } from 'react';
import { fetchCartItems } from '@/actions/fetch';
import { CartItemSchema } from '@/types';

export default function useCart(userId: string) {
	const [cartItems, setCartItems] = useState<CartItemSchema[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchCart = async () => {
			setIsLoading(true);

			const items = await fetchCartItems(userId);
			setCartItems(items);

			setIsLoading(false);
		};

		if (userId && userId.length > 0) {
			fetchCart();
		}
	}, [userId]);

	return { cartItems, isLoading };
}
