import { FiShoppingCart } from 'react-icons/fi';

export default function Header({ handleCheckout }: { handleCheckout: () => void }) {
	return (
		<div className="w-full flex flex-row justify-between items-center">
			<div className="flex flex-row items-center gap-5">
				<FiShoppingCart className="text-gray-600 dark:text-white" size={26} />
				<h1 className="text-3xl font-bold">Your Cart</h1>
			</div>
			<button
				onClick={handleCheckout}
				className="w-fit px-3 sm:px-4 py-2 rounded-md bg-purple-500 text-white text-xs sm:text-sm lg:text-base font-semibold"
			>
				Check Out
			</button>
		</div>
	);
}
