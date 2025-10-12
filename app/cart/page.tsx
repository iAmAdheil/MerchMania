'use client';

import Navbar from '@/components/app/navbar/main';
import { FiTrash } from 'react-icons/fi';

const cartItems = [
	{
		id: 1,
		by: 'Cyber Ninja',
		name: 'Logic',
		image:
			'https://res.cloudinary.com/dzaj1xdgz/image/upload/v1759867755/shop-logos/cmggztk3n0000uauf36dtb682-logo.png.jpg',
		sizes: 'S',
		quantity: 1,
		price: 100,
	},
];

export default function Cart() {
	return (
		<div className="w-full">
			<Navbar role={'anonymous'} />
			<div className="h-full w-full flex flex-col px-6 md:px-10 lg:px-12 py-10">
				{/* {cartItems.map(item => (
					<CartItem key={item.id} item={item} />
				))} */}
				<CartItem />
			</div>
		</div>
	);
}

function CartItem() {
	return (
		<div className="px-4 md:px-6 py-4 md:py-6 flex flex-row justify-between items-center border border-solid border-gray-200 rounded-md">
			<div className="flex flex-row items-start gap-4 md:gap-6">
				<div className="">
					<img
						src={cartItems[0].image}
						alt={cartItems[0].name}
						className="w-20 sm:w-28 md:w-32 lg:w-40 aspect-square object-cover rounded-md"
					/>
				</div>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col">
						<h1 className="text-xl md:text-2xl font-semibold">{cartItems[0].name}</h1>
						<p className="font-roboto text-gray-500 text-sm md:text-base font-medium">
							by {cartItems[0].by}
						</p>
						<p className="font-roboto text-gray-500 text-sm md:text-base font-medium">
							Size: {cartItems[0].sizes}
						</p>
					</div>
					<div className="flex flex-row items-center">
						<button
							// onClick={decrementQuantity}
							// disabled={quantity <= 1}
							className={`px-3 py-1 rounded-l-sm text-sm md:text-base font-roboto border-y-[1px] border-l-[1px] border-solid border-gray-300 ${cartItems[0].quantity <= 1 ? 'opacity-40' : ''}`}
						>
							-
						</button>
						<p className="px-3 py-1 text-sm md:text-base font-roboto border-[1px] border-solid border-gray-300">
							1
						</p>
						<button
							// onClick={incrementQuantity}
							// disabled={quantity >= 10}
							className={`px-3 py-1 rounded-r-sm text-sm md:text-base font-roboto border-y-[1px] border-r-[1px] border-solid border-gray-300 ${cartItems[0].quantity >= 10 ? 'opacity-40' : ''}`}
						>
							+
						</button>
					</div>
				</div>
			</div>
			<div className="flex flex-col self-stretch justify-between items-end">
				<p className="font-roboto text-base md:text-lg font-medium">&#8377;{cartItems[0].price}</p>
				<button className="flex flex-row items-center gap-2 px-2 py-2 sm:hover:bg-red-100 transition-all duration-300 rounded-xl">
					<FiTrash className="text-red-500 h-5 w-5" />
				</button>
			</div>
		</div>
	);
}
