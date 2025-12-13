import { FiShoppingCart } from 'react-icons/fi';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/navigation';
import { useCartQuantityStore } from '@/store/cart';

export default function CartIcon() {
	const router = useRouter();
	const { quantity } = useCartQuantityStore.getState();

	const handleCartNavigation = () => {
		router.push('/cart');
	};

	return (
		<Tooltip
			title="Cart"
			arrow
			slotProps={{
				popper: {
					modifiers: [
						{
							name: 'offset',
							options: {
								offset: [6, 0],
							},
						},
					],
				},
			}}
		>
			<button
				onClick={handleCartNavigation}
				className="relative flex items-center justify-center rounded-full hover:opacity-70 transition-all duration-300 active:scale-75 cursor-pointer"
			>
				<FiShoppingCart className="text-gray-600 dark:text-white" size={28} />
				<div className="absolute bottom-[8.5px] left-[57.5%] -translate-x-1/2 flex items-center justify-center">
					<span className="text-[9px] font-bold font-roboto text-black dark:text-black">{quantity}</span>
				</div>
			</button>
		</Tooltip>
	);
}
