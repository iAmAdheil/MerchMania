import { FiShoppingCart } from 'react-icons/fi';
import Tooltip from '@mui/material/Tooltip';

export default function CartIcon() {
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
								offset: [0, -8],
							},
						},
					],
				},
			}}
		>
			<div className="relative flex items-center justify-center p-2 rounded-full hover:opacity-70 transition-all duration-300 active:scale-75">
				<FiShoppingCart className="text-gray-600 dark:text-white" size={22} />
				<div className="absolute bottom-5 left-5 bg-black dark:bg-white rounded-full w-4 h-4 flex items-center justify-center">
					<span className="text-[10px] font-bold font-roboto text-white dark:text-black">
						3
					</span>
				</div>
			</div>
		</Tooltip>
	);
}
