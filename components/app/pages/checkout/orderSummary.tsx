import { useMemo } from "react";
import { type CartItemSchema } from "@/types";
import { CreditCard } from "lucide-react";
// import { cashfree } from '@/lib/cashfree';
// import { createOrder } from '@/actions/billing';

export default function OrderSummary({ cartItems }: { cartItems: CartItemSchema[] }) {
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