import { FiShoppingCart } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

export default function Header() {
	const router = useRouter();

	return (
		<div className="w-full flex flex-row justify-between items-center px-3">
			<div className="flex flex-row items-center gap-5">
				<FiShoppingCart className="text-gray-600 dark:text-white" size={26} />
				<h1 className="text-3xl font-bold">Your Cart</h1>
			</div>
			<button
				onClick={() => router.push('/checkout')}
				className="w-fit px-3 sm:px-4 py-2 rounded-md bg-purple-500 text-white text-xs sm:text-sm lg:text-base font-semibold"
			>
				Checkout
			</button>
		</div>
	);
}
