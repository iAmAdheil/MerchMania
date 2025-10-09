'use client';

import { use } from 'react';
import Navbar from '@/components/app/navbar/main';
import Footer from '@/components/app/ui/footer';
import ProductDetails from '@/components/app/pages/product/productDetails';
import useFetchProductDetails from '@/hooks/useProductDetails';
import Loader from '@/components/app/ui/loader';

interface Props {
	params: Promise<{
		productId: string;
	}>;
}

const ProductDetail = ({ params }: Props) => {
	const { productId } = use(params);
	const { productDetails, isLoading, error } = useFetchProductDetails(
		productId,
		'cmggztk3n0000uauf36dtb682'
	);

	if (isLoading) {
		return (
			<div className="min-h-screen flex justify-center items-center">
				<Loader size={60} />
			</div>
		);
	}

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar role="customer" />
			<ProductDetails productDetails={productDetails} />
			<Footer />
		</div>
	);
};

export default ProductDetail;
