import { ProductDetailsSchema } from '@/types';
import { useState } from 'react';
import { Sizes } from '@/types';
import { FiShoppingCart } from 'react-icons/fi';
import { Roles } from '@/types';

export interface ReqShopDetailsSchema {
	id: string;
	name: string;
	logo: string;
}

export interface Details {
	product: ProductDetailsSchema;
	shop: ReqShopDetailsSchema;
}

export default function ProductDetails({
	productDetails,
	role,
}: {
	productDetails: Details | null;
	role: Roles;
}) {
	const [activeImage, setActiveImage] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [sizes, setSizes] = useState<Sizes>(productDetails?.product.sizes[0] || 'S');

	const incrementQuantity = () => {
		setQuantity(prev => Math.min(prev + 1, 10)); // Max 10 items
	};

	const decrementQuantity = () => {
		setQuantity(prev => Math.max(prev - 1, 1)); // Min 1 item
	};

	return (
		<div
			className={`w-full flex flex-col lg:flex-row items-center lg:${role === 'customer' ? 'items-end' : 'items-center'} xl:items-center py-12 px-8 sm:px-12 gap-8 lg:gap-12`}
		>
			<div className="w-full flex flex-col md:flex-row lg:flex-col xl:flex-row items-center gap-2 sm:gap-4">
				<div className="flex flex-row md:flex-col lg:flex-row xl:flex-col items-center gap-2 sm:gap-4">
					{productDetails?.product.images.map((image: string, index: number) => (
						<button
							key={index}
							onClick={() => setActiveImage(index)}
							className={`w-14 h-14 sm:h-24 sm:w-24 rounded-md overflow-hidden border-2 ${
								activeImage === index ? 'border-brand-purple' : 'border-transparent'
							}`}
						>
							<img
								src={image}
								alt={`${productDetails?.product.name} thumbnail ${index + 1}`}
								className="w-full h-full object-cover"
							/>
						</button>
					))}
				</div>
				<div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden">
					<img
						src={productDetails?.product.images[activeImage]}
						alt={productDetails?.product.name}
						className="w-full h-full object-cover"
					/>
				</div>
			</div>

			{/* Product Details */}
			<div className="w-full flex flex-col gap-6 lg:max-w-lg xl:max-w-md">
				<div className="flex flex-row items-center gap-4">
					<div className="h-8 w-8 rounded-full overflow-hidden">
						<img
							src={productDetails?.shop.logo || ''}
							alt={productDetails?.shop.name}
							className="h-full w-full object-cover"
						/>
					</div>
					<h3 className="text-xl font-medium font-roboto text-gray-500">
						{productDetails?.shop.name}
					</h3>
				</div>
				<div className="flex flex-col gap-3">
					<h1 className="text-3xl font-bold font-roboto">{productDetails?.product.name}</h1>
					<div>
						<span className="text-3xl font-roboto font-semibold">
							&#8377;{productDetails?.product.price}
						</span>
					</div>
					<p className="text-gray-700 font-roboto text-base">{productDetails?.product.description}</p>
				</div>
				{role === 'customer' && (
					<>
						<div className="flex flex-col gap-2">
							<h3 className="text-base font-roboto font-medium">Quantity</h3>
							<div className="flex items-center">
								<button
									onClick={decrementQuantity}
									disabled={quantity <= 1}
									className={`px-3 py-1 rounded-l-sm text-lg font-roboto border-y-[1px] border-l-[1px] border-solid border-gray-300 ${quantity <= 1 ? 'opacity-20' : ''}`}
								>
									-
								</button>
								<p className="px-3 py-1 text-lg font-roboto border-[1px] border-solid border-gray-300">
									{quantity}
								</p>
								<button
									onClick={incrementQuantity}
									disabled={quantity >= 10}
									className={`px-3 py-1 rounded-r-sm text-lg font-roboto border-y-[1px] border-r-[1px] border-solid border-gray-300 ${quantity >= 10 ? 'opacity-20' : ''}`}
								>
									+
								</button>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<h3 className="text-base font-roboto font-medium">Sizes</h3>
							<div className="flex flex-row gap-2">
								{productDetails?.product.sizes.map((size: Sizes) => (
									<button
										key={size}
										className={`px-3 py-1 rounded-sm text-base font-roboto border-solid border-gray-300 ${sizes === size ? 'border-[1px] border-purple-500' : ''}`}
										onClick={() => setSizes(size)}
									>
										{size}
									</button>
								))}
							</div>
						</div>
						<div className="w-full flex justify-center mt-4">
							<button className="w-full flex flex-row items-center justify-center bg-purple-500 text-white rounded-md py-2 gap-4">
								<FiShoppingCart className="text-white text-base md:text-lg" />
								<p className="text-base md:text-lg font-medium font-roboto">Add to Cart</p>
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
