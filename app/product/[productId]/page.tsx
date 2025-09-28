'use client';

import { use, useEffect, useState } from 'react';
import Navbar from '@/components/app/navbar/main';
import Footer from '@/components/app/ui/footer';
import useFetchProductDetails from '@/hooks/useProductDetails';
import { useSession } from '@/auth/auth-client';
import Loader from '@/components/app/ui/loader';
import { useRouter } from 'next/navigation';

interface Props {
	params: Promise<{
		productId: string;
	}>;
}

const ProductDetail = ({ params }: Props) => {
	const { productId } = use(params);
	const router = useRouter();

	const { data: session, isPending } = useSession();
	const { productDetails, isLoading, error } = useFetchProductDetails(
		productId,
		session?.shopId || ''
	);

	const [quantity, setQuantity] = useState(1);
	const [activeImage, setActiveImage] = useState(0);

	useEffect(() => {
		if (!productDetails && !isLoading) {
			console.error('Product not found');
			router.push('/404');
		}
	}, [productDetails, isLoading]);

	const incrementQuantity = () => {
		setQuantity(prev => Math.min(prev + 1, 10)); // Max 10 items
	};

	const decrementQuantity = () => {
		setQuantity(prev => Math.max(prev - 1, 1)); // Min 1 item
	};

	if (isLoading || isPending) {
		return (
			<div className="min-h-screen flex justify-center items-center">
				<Loader size={60} />
			</div>
		);
	}

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />
			<main className="">
				<div className="flex flex-row items-start px-10 gap-10 py-12">
					<div className="space-y-4 flex-shrink-0	w-1/2">
						<div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
							<img
								src={productDetails?.designs[activeImage]}
								alt={productDetails?.name}
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="flex space-x-2">
							{productDetails?.designs.map((image, index) => (
								<button
									key={index}
									onClick={() => setActiveImage(index)}
									className={`w-20 h-20 rounded-md overflow-hidden border-2 ${
										activeImage === index ? 'border-brand-purple' : 'border-transparent'
									}`}
								>
									<img
										src={image}
										alt={`${productDetails?.name} thumbnail ${index + 1}`}
										className="w-full h-full object-cover"
									/>
								</button>
							))}
						</div>
					</div>

					{/* Product Details */}
					<div>
						<div className="flex items-center mb-2">
							<div className="h-6 w-6 rounded-full overflow-hidden mr-2">
								<img
									src={productDetails?.shop.logo || ''}
									alt={productDetails?.shop.name}
									className="h-full w-full object-cover"
								/>
							</div>
							<span className="text-sm text-gray-500">{productDetails?.shop.name}</span>
						</div>

						<h1 className="text-3xl font-bold mb-2">{productDetails?.name}</h1>

						{/* {product.rating && (
							<div className="flex items-center mb-4">
								<div className="flex">
									{[...Array(5)].map((_, i) => (
										<svg
											key={i}
											className={`w-5 h-5 ${
												i < Math.floor(product.rating || 0)
													? 'text-yellow-400'
													: 'text-gray-300'
											}`}
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
										</svg>
									))}
								</div>
								<span className="ml-2 text-sm text-gray-600">
									{product.rating.toFixed(1)} ({product.reviewCount} reviews)
								</span>
							</div>
						)} */}

						<div className="mb-4">
							{/* {product.discountPrice ? (
								<div className="flex items-center">
									<span className="text-2xl font-bold">
										${product.discountPrice.toFixed(2)}
									</span>
									<span className="ml-2 text-gray-500 line-through">
										${product.price.toFixed(2)}
									</span>
									<span className="ml-2 bg-red-100 text-red-800 text-xs font-semibold px-2 py-0.5 rounded">
										SAVE ${(product.price - product.discountPrice).toFixed(2)}
									</span>
								</div>
							) : (
								
							)} */}
							<span className="text-2xl font-bold">${productDetails?.price}</span>
						</div>

						<p className="text-gray-600 mb-6">{productDetails?.description}</p>

						{/* Quantity Selector */}
						<div className="mb-6">
							<h3 className="font-medium mb-2">Quantity</h3>
							<div className="flex items-center">
								<button onClick={decrementQuantity} disabled={quantity <= 1} className="h-10 w-10">
									-
								</button>
								<span className="w-12 text-center">{quantity}</span>
								<button onClick={incrementQuantity} disabled={quantity >= 10} className="h-10 w-10">
									+
								</button>
							</div>
						</div>

						{/* Action Buttons */}
						{/* <div className="flex space-x-4">
							<button
								className="bg-brand-purple hover:bg-opacity-90 flex-grow"
								// onClick={handleAddToCart}
								disabled={!product.inStock}
							>
								{product.inStock ? 'Add to Cart' : 'Out of Stock'}
							</button>
							<button className="flex-grow">Save for Later</button>
						</div> */}

						{/* Shipping Info Card */}
						<div className="mt-6 bg-gray-50">
							<div className="p-4">
								<div className="flex items-center">
									<svg
										className="w-5 h-5 text-green-600 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										></path>
									</svg>
									<span className="text-sm font-medium">Free shipping on orders over $50</span>
								</div>
								<div className="flex items-center mt-2">
									<svg
										className="w-5 h-5 text-green-600 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										></path>
									</svg>
									<span className="text-sm font-medium">Estimated delivery: 3-5 business days</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default ProductDetail;
