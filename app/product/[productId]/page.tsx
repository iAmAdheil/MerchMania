'use client';

import { use } from 'react';
import Navbar from '@/components/app/navbar/main';
import Footer from '@/components/app/ui/footer';
import ProductDetails from '@/components/app/pages/product/productDetails';
import SimilarProducts from '@/components/app/pages/product/similarProducts';
import useFetchProductDetails from '@/hooks/useProductDetails';
import useFetchShopProducts from '@/hooks/useShopProducts';
import Loader from '@/components/app/ui/loader';
import { useSession } from '@/auth/auth-client';
import { Roles } from '@/types';

interface Props {
	params: Promise<{
		productId: string;
	}>;
}

const ProductDetail = ({ params }: Props) => {
	const { productId } = use(params);
	const { productDetails, isLoading } = useFetchProductDetails(productId);
	const { products } = useFetchShopProducts(productDetails?.shop.id || '');
	const { data: session, isPending } = useSession();

	if (isLoading || isPending) {
		return (
			<div className="min-h-screen flex justify-center items-center">
				<Loader size={60} />
			</div>
		);
	}

	return (
		<div className="w-full flex flex-col min-h-screen">
			<Navbar role={(session?.user?.role as Roles) || 'anonymous'} />
			<div className="w-full flex flex-col">
				<ProductDetails productDetails={productDetails} role={(session?.user?.role as Roles) || 'anonymous'} userId={session?.user?.id || ''} />
				{products.length > 0 && (
					<>
						<div className="w-[100%] mx-auto h-px bg-gray-200" />
						<SimilarProducts products={products} />
					</>
				)}
			</div>
			<Footer />
		</div>
	);
};

export default ProductDetail;
