import { FiShoppingCart } from 'react-icons/fi';

export default function Header() {
	return (
		<div className="w-full flex flex-row justify-center md:justify-start items-center gap-5">
			<FiShoppingCart className="text-gray-600 dark:text-white" size={26} />
			<h1 className="text-3xl font-bold">Your Cart</h1>
		</div>
	);
}
