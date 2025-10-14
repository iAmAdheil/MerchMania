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
import Footer from '@/components/app/ui/footer';
import Header from '@/components/app/pages/cart/header';
import { useRouter } from 'next/navigation';

export default function Cart() {
	const router = useRouter();
	const { setQuantity } = useCartQuantityStore.getState();
	const { data: session, isPending } = useSession();
	const { cartItems: ci, isLoading } = useCart(session?.user?.id || '');

	const [cartItems, setCartItems] = useState<CartItemSchema[]>(ci);

	useEffect(() => {
		setQuantity(ci.length);
		setCartItems(ci);
	}, [ci]);

	useEffect(() => {
		if (!isPending && session?.user?.role !== 'customer') {
			router.push('/');
		}
	}, [router, session, isPending]);

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
			<div className="w-full flex flex-col px-6 md:px-10 lg:px-12 pt-10 pb-14 gap-8">
				<Header />
				{cartItems.length === 0 ? (
					<EmptyCart />
				) : (
					<div className="w-full flex flex-col gap-4 md:gap-6">
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
				)}
			</div>
			<Footer />
		</div>
	);
}

function EmptyCart() {
	const router = useRouter();
	const handleContinueShopping = () => {
		router.push('/');
	};

	return (
		<div className="h-[20rem] w-full flex flex-col justify-center items-center gap-4 border border-solid border-gray-200 rounded-md p-4">
			<p className="text-gray-500 text-base md:text-lg font-medium">Why so Empty?</p>
			<button
				onClick={handleContinueShopping}
				className="px-4 py-2 text-sm md:text-base font-roboto bg-white text-black rounded-sm border border-solid border-purple-500 sm:hover:opacity-60 active:bg-slate-100 duration-200"
			>
				Continue Shopping
			</button>
		</div>
	);
}
