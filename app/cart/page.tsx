'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/app/navbar/main';
import { useSession } from '@/auth/auth-client';
import useCart from '@/hooks/useCart';
import { useCartQuantityStore } from '@/store/cart';
import Loader from '@/components/app/ui/loader';
import CartItem from '@/components/app/pages/cart/cartItem';
import { CartItemSchema, Roles } from '@/types';
import { updateCart, deleteCartItem } from '@/actions/update';

export default function Cart() {
	const { setQuantity } = useCartQuantityStore.getState();
	const { data: session, isPending } = useSession();
	const { cartItems: ci, isLoading } = useCart(session?.user?.id || '');

	const [cartItems, setCartItems] = useState<CartItemSchema[]>(ci);

	useEffect(() => {
		setQuantity(ci.length);
		setCartItems(ci);
	}, [ci]);

	const handleQuantityIncrement = (id: string) => {
		const oldQuantity = cartItems.find(item => item.id === id)?.quantity || 0;
		setCartItems(
			cartItems.map(item => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
		);
		updateCart(id, oldQuantity + 1);
	};

	const handleQuantityDecrement = (id: string) => {
		const oldQuantity = cartItems.find(item => item.id === id)?.quantity || 0;
		setCartItems(
			cartItems.map(item => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
		);
		updateCart(id, oldQuantity - 1);
	};

	const handleDeleteCartItem = (id: string) => {
		setCartItems(prevState => {
			const newState = prevState.filter(item => item.id !== id);
			setQuantity(newState.length);
			return newState;
		});
		deleteCartItem(id);
	};

	if (isLoading || isPending) {
		return (
			<div className="min-h-screen flex justify-center items-center">
				<Loader size={60} />
			</div>
		);
	}

	return (
		<div className="w-full">
			<Navbar role={(session?.user?.role as Roles) || 'anonymous'} />
			<div className="h-full w-full flex flex-col px-6 md:px-10 lg:px-12 py-10 gap-6">
				{cartItems.map(item => (
					<CartItem
						key={item.id}
						handlePlus={handleQuantityIncrement}
						handleMinus={handleQuantityDecrement}
						handleDelete={handleDeleteCartItem}
						item={item}
					/>
				))}
			</div>
		</div>
	);
}
