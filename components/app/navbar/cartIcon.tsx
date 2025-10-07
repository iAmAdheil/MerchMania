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
								offset: [6, -5],
							},
						},
					],
				},
			}}
		>
			<div className="relative flex items-center justify-center rounded-full hover:opacity-70 transition-all duration-300 active:scale-75">
				<FiShoppingCart className="text-gray-600 dark:text-white" size={28} />
				<div className="absolute bottom-[8.5px] left-[57.5%] -translate-x-1/2 flex items-center justify-center">
					<span className="text-[9px] font-bold font-roboto text-black dark:text-black">0</span>
				</div>
			</div>
		</Tooltip>
	);
}
