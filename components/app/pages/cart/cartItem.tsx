import { CartItemSchema } from '@/types';
import { FiTrash } from 'react-icons/fi';

export default function CartItem({
	item,
	handlePlus,
	handleMinus,
	handleDelete,
}: {
	item: CartItemSchema;
	handlePlus: (id: string) => void;
	handleMinus: (id: string) => void;
	handleDelete: (id: string) => void;
}) {
	return (
		<div className="px-4 md:px-6 py-4 md:py-6 flex flex-row justify-between items-center border border-solid border-gray-200 rounded-md">
			<div className="flex flex-row items-start gap-4 md:gap-6">
				<div className="">
					<img
						src={item.product.image}
						alt={item.product.name}
						className="w-20 sm:w-28 md:w-32 lg:w-40 aspect-square object-cover rounded-md"
					/>
				</div>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col">
						<h1 className="text-xl md:text-2xl font-semibold">{item.product.name}</h1>
						<p className="font-roboto text-gray-500 text-sm md:text-base font-medium">
							by {item.product.shopName}
						</p>
						<p className="font-roboto text-gray-500 text-sm md:text-base font-medium">
							Size: {item.size}
						</p>
					</div>
					<div className="flex flex-row items-center">
						<button
							onClick={() => handleMinus(item.id)}
							className={`px-3 py-1 rounded-l-sm text-sm md:text-base font-roboto border-y-[1px] border-l-[1px] border-solid border-gray-300 ${item.quantity <= 1 ? 'opacity-40' : ''}`}
							disabled={item.quantity <= 1}
						>
							-
						</button>
						<p className="px-3 py-1 text-sm md:text-base font-roboto border-[1px] border-solid border-gray-300">
							{item.quantity}
						</p>
						<button
							onClick={() => handlePlus(item.id)}
							className={`px-3 py-1 rounded-r-sm text-sm md:text-base font-roboto border-y-[1px] border-r-[1px] border-solid border-gray-300 ${item.quantity >= 10 ? 'opacity-40' : ''}`}
							disabled={item.quantity >= 10}
						>
							+
						</button>
					</div>
				</div>
			</div>
			<div className="flex flex-col self-stretch justify-between items-end">
				<p className="font-roboto text-base md:text-lg font-medium">&#8377;{item.product.price}</p>
				<button
					onClick={() => handleDelete(item.id)}
					className="flex flex-row items-center gap-2 px-2 py-2 sm:hover:bg-red-100 transition-all duration-300 rounded-xl"
				>
					<FiTrash className="text-red-500 h-5 w-5" />
				</button>
			</div>
		</div>
	);
}
