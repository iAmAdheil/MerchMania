'use client';

import { useEffect, useState, useMemo } from 'react';
import Navbar from '@/components/app/navbar/main';
import Footer from '@/components/app/ui/footer';
import { CreditCard } from 'lucide-react';
import { useSession } from '@/auth/auth-client';
import { useRouter } from 'next/navigation';
import { Roles } from '@/types';
import { Field, Input } from '@chakra-ui/react';
import Loader from '@/components/app/ui/loader';
import useCart from '@/hooks/useCart';
import { CartItemSchema } from '@/types';
// import { cashfree } from '@/lib/cashfree';
// import { createOrder } from '@/actions/billing';

interface SavedAddress {
	id: string;
	label: string;
	fullAddress: string;
	isDefault?: boolean;
}

const savedAddresses: SavedAddress[] = [
	{
		id: '1',
		label: 'Home',
		fullAddress: '123 Main St, Apt 4B, New York, NY 10001',
		isDefault: true,
	},
	{
		id: '2',
		label: 'Work',
		fullAddress: '456 Office Plaza, Suite 200, New York, NY 10002',
	},
];

export default function Checkout() {
	const router = useRouter();
	const { data: session, isPending } = useSession();
	const { cartItems: ci, isLoading: isLoadingCart } = useCart(session?.user?.id || '');

	useEffect(() => {
		if (!isPending && session?.user?.role !== 'customer') {
			router.push('/');
		}
	}, [router, session, isPending]);

	if (isLoadingCart || isPending) {
		return (
			<div className="min-h-screen flex justify-center items-center">
				<Loader size={60} />
			</div>
		);
	}

	return (
		<div className="w-full bg-gray-50">
			<Navbar role={(session?.user?.role as Roles) || 'anonymous'} />
			<div className="mt-4 bg-gray-50 w-full py-10 px-6 md:px-10 max-w-5xl mx-auto flex flex-col justify-center items-center gap-12 md:gap-16">
				<CheckoutSection savedAddresses={savedAddresses} />
				<OrderSummary cartItems={ci} />
			</div>
			<Footer />
		</div>
	);
}

function CheckoutSection({ savedAddresses }: { savedAddresses: SavedAddress[] }) {
	const [selectedAddress, setSelectedAddress] = useState<string>(savedAddresses[0].id);
	const [addressType, setAddressType] = useState<'new' | 'saved'>('saved');

	return (
		<div className="w-full flex flex-col gap-12 md:gap-16">
			<div className="w-full flex flex-col gap-4 md:gap-5">
				<h1 className="text-2xl md:text-3xl font-bold font-roboto">Contact Information</h1>
				<div className="w-full flex flex-col gap-6">
					<div className="w-full flex flex-row items-center gap-8 md:gap-12">
						<div className="w-full flex flex-col gap-2">
							<Field.Root required className="flex flex-col gap-2">
								<Field.Label className="text-sm md:text-base font-roboto">
									First Name <Field.RequiredIndicator color={'purple.500'} />
								</Field.Label>
							</Field.Root>
							<Input
								placeholder="John"
								className="w-full border border-solid border-gray-300 text-sm md:text-base rounded-sm pl-3 py-1"
								// value={shopName}
								// onChange={e => setShopName(e.target.value)}
							/>
						</div>
						<div className="w-full flex flex-col gap-2">
							<Field.Root required className="flex flex-col gap-2">
								<Field.Label className="text-sm md:text-base font-roboto">Last Name</Field.Label>
							</Field.Root>
							<Input
								placeholder="Doe"
								className="w-full border border-solid border-gray-300 text-sm md:text-base rounded-sm pl-3 py-1"
								// value={shopName}
								// onChange={e => setShopName(e.target.value)}
							/>
						</div>
					</div>
					<div className="w-full flex flex-row items-center gap-8 md:gap-12">
						<div className="w-full flex flex-col gap-2">
							<Field.Root required className="flex flex-col gap-2">
								<Field.Label className="text-sm md:text-base font-roboto">Email</Field.Label>
							</Field.Root>
							<Input
								placeholder="john@example.com"
								className="w-full border border-solid border-gray-300 text-sm md:text-base rounded-sm pl-3 py-1"
								// value={shopName}
								// onChange={e => setShopName(e.target.value)}
							/>
						</div>
						<div className="w-full flex flex-col gap-2">
							<Field.Root required className="flex flex-col gap-2">
								<Field.Label className="text-sm md:text-base font-roboto">
									Phone Number <Field.RequiredIndicator color={'purple.500'} />
								</Field.Label>
							</Field.Root>
							<Input
								placeholder="+91 9876543210"
								className="w-full border border-solid border-gray-300 text-sm md:text-base rounded-sm pl-3 py-1"
								// value={shopName}
								// onChange={e => setShopName(e.target.value)}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full flex flex-col gap-4 md:gap-5">
				<div className="w-full flex flex-row justify-between items-center">
					<h1 className="text-2xl md:text-3xl font-bold font-roboto">Shipping Address</h1>
					<button
						onClick={() => setAddressType(addressType === 'saved' ? 'new' : 'saved')}
						className="text-sm md:text-base font-roboto text-purple-500 hover:underline duration-200"
					>
						{addressType === 'saved' ? 'Use New Address' : 'Use Saved Address'}
					</button>
				</div>
				{addressType === 'saved' && (
					<div className="w-full flex flex-row items-start gap-5 overflow-x-scroll pb-4">
						{savedAddresses.map((address: SavedAddress) => (
							<button
								key={address.id}
								onClick={() => setSelectedAddress(address.id)}
								className={`w-[150px] md:w-[200px] flex flex-col flex-shrink-0 gap-3 bg-white p-4 rounded-md border-solid items-start ${selectedAddress === address.id ? 'border-purple-500 border-2' : 'border-gray-300 border'}`}
							>
								<h2 className="text-base md:text-lg font-semibold font-roboto text-left">
									{address.label}
								</h2>
								<p className="text-sm md:text-base font-roboto text-left">{address.fullAddress}</p>
							</button>
						))}
					</div>
				)}
				{addressType === 'new' && (
					<div className="w-full gap-6">
						<div className="w-full flex flex-col items-center gap-6">
							<div className="w-full flex flex-col gap-2">
								<Field.Root required className="flex flex-col gap-2">
									<Field.Label className="text-sm md:text-base font-roboto">
										Apartment/Suite/Unit <Field.RequiredIndicator color={'purple.500'} />
									</Field.Label>
								</Field.Root>
								<Input
									placeholder="123, Buliding 1, Wing A"
									className="w-full border border-solid border-gray-300 text-sm md:text-base rounded-sm pl-3 py-1"
									// value={shopName}
									// onChange={e => setShopName(e.target.value)}
								/>
							</div>
							<div className="w-full flex flex-col gap-2">
								<Field.Root required className="flex flex-col gap-2">
									<Field.Label className="text-sm md:text-base font-roboto">
										Street Address <Field.RequiredIndicator color={'purple.500'} />
									</Field.Label>
								</Field.Root>
								<Input
									placeholder="123 Main St"
									className="w-full border border-solid border-gray-300 text-sm md:text-base rounded-sm pl-3 py-1"
									// value={shopName}
									// onChange={e => setShopName(e.target.value)}
								/>
							</div>
							<div className="w-full flex flex-row items-center gap-8 md:gap-12">
								<div className="w-full flex flex-col gap-2">
									<Field.Root required className="flex flex-col gap-2">
										<Field.Label className="text-sm md:text-base font-roboto">
											City <Field.RequiredIndicator color={'purple.500'} />
										</Field.Label>
									</Field.Root>
									<Input
										placeholder="Thane"
										className="w-full border border-solid border-gray-300 text-sm md:text-base rounded-sm pl-3 py-1"
										// value={shopName}
										// onChange={e => setShopName(e.target.value)}
									/>
								</div>
								<div className="w-full flex flex-col gap-2">
									<Field.Root required className="flex flex-col gap-2">
										<Field.Label className="text-sm md:text-base font-roboto">
											State <Field.RequiredIndicator color={'purple.500'} />
										</Field.Label>
									</Field.Root>
									<Input
										placeholder="Maharashtra"
										className="w-full border border-solid border-gray-300 text-sm md:text-base rounded-sm pl-3 py-1"
										// value={shopName}
										// onChange={e => setShopName(e.target.value)}
									/>
								</div>
							</div>
							<div className="w-full flex flex-col gap-2">
								<Field.Root required className="flex flex-col gap-2">
									<Field.Label className="text-sm md:text-base font-roboto">
										Pincode <Field.RequiredIndicator color={'purple.500'} />
									</Field.Label>
								</Field.Root>
								<Input
									placeholder="400001"
									className="w-full border border-solid border-gray-300 text-sm md:text-base rounded-sm pl-3 py-1"
									// value={shopName}
									// onChange={e => setShopName(e.target.value)}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

function OrderSummary({ cartItems }: { cartItems: CartItemSchema[] }) {
	const productsAmount = useMemo(() => {
		return cartItems.reduce((acc, item) => acc + Number(item.product.price) * item.quantity, 0);
	}, [cartItems]);

	const tax = useMemo(() => {
		return productsAmount * 0.18;
	}, [productsAmount]);

	const totalAmount = useMemo(() => {
		return productsAmount + tax + 100;
	}, [productsAmount, tax]);

	// const handleCheckout = async () => {
	// 	// create order using server action => return session id
	// 	const sessionId = await createOrder();

	// 	if (!sessionId) {
	// 		alert('Failed to create order');
	// 		return;
	// 	}

	// 	const checkoutOptions = {
	// 		paymentSessionId: sessionId,
	// 		returnUrl: 'http://localhost:3000/',
	// 	};
	// 	cashfree.checkout(checkoutOptions).then(function (result: any) {
	// 		console.log(result);
	// 		if (result.error) {
	// 			alert(result.error.message);
	// 		}

	// 		if (result.redirect) {
	// 			console.log('Redirection');
	// 		}
	// 	});
	// };

	return (
		<div className=" w-full flex flex-col">
			<h1 className="text-2xl md:text-3xl font-bold font-roboto">Order Summary</h1>
			<div className="w-full flex flex-col py-4 md:py-6 gap-4 md:gap-6">
				{cartItems.map(item => (
					<div key={item.id} className="flex flex-row items-start gap-4 md:gap-6">
						<div>
							<img
								src={item.product.image}
								alt={item.product.name}
								className="w-24 md:w-28 lg:w-32 aspect-square object-cover rounded-md"
							/>
						</div>
						<div className="flex flex-col justify-between self-stretch gap-4">
							<div className="flex flex-col">
								<h1 className="text-xl md:text-2xl font-semibold">{item.product.name}</h1>
								<p className="font-roboto text-sm md:text-base font-medium">Size: {item.size}</p>
							</div>
							<p className="font-roboto text-base md:text-lg font-medium flex flex-row items-center gap-2">
								&#8377;{item.product.price}{' '}
								<span className="text-sm md:text-base text-gray-500">x {item.quantity}</span>
							</p>
						</div>
					</div>
				))}
			</div>
			<div className="w-full flex flex-col">
				<div className="w-full h-px bg-gray-300" />
				<div className="w-full px-2 py-3 md:py-4">
					<div className="w-full flex flex-col gap-0 md:gap-1">
						<div className="w-full flex flex-row items-center justify-between">
							<p className="text-base md:text-lg font-semibold">Subtotal</p>
							<p className="text-base md:text-lg">&#8377;{productsAmount}</p>
						</div>
						<div className="w-full flex flex-row items-center justify-between">
							<p className="text-base md:text-lg font-semibold">Shipping</p>
							<p className="text-base md:text-lg">&#8377;100</p>
						</div>
						<div className="w-full flex flex-row items-center justify-between">
							<p className="text-base md:text-lg font-semibold">Tax (18%)</p>
							<p className="text-base md:text-lg">&#8377;{tax}</p>
						</div>
					</div>
				</div>
				<div className="w-full h-px bg-gray-300" />
				<div className="w-full px-2 py-2 md:py-3 flex flex-row justify-between">
					<p className="text-lg md:text-xl font-semibold">Total</p>
					<p className="text-lg md:text-xl">&#8377;{totalAmount}</p>
				</div>
				<div className="w-full my-5 flex flex-col gap-3">
					<button className="flex flex-row justify-center items-center gap-4 w-full px-3 py-2 md:py-3 rounded-md bg-purple-500 text-white text-sm md:text-base font-semibold">
						<CreditCard />
						Proceed To Pay
					</button>
					<p className="w-full text-center text-xs md:text-sm font-light">
						By placing your order, you agree to our{' '}
						<a href="" className="text-purple-500 hover:underline duration-200">
							terms and conditions
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
