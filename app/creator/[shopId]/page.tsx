'use client';

import { useState, use, useEffect } from 'react';
import Header from '@/components/app/pages/influencer-shop/header';
import Navbar from '@/components/app/navbar/main';
import ShopTabs from '@/components/app/pages/influencer-shop/shopTabs';
import ProductsTab from '@/components/app/pages/influencer-shop/productsTab';
import AboutTab from '@/components/app/pages/influencer-shop/aboutTab';
import Footer from '@/components/app/ui/footer';
import { useSession } from '@/auth/auth-client';
import { Roles } from '@/types';
import Loader from '@/components/app/ui/loader';
import useShopDetails from '@/hooks/useShopByShopId';
import useFetchShopProducts from '@/hooks/useShopProducts';

interface Props {
	params: Promise<{
		shopId: string;
	}>;
}

export type Tabs = 'products' | 'about';

export default function InfluencerShop({ params }: Props) {
	const { shopId } = use(params);
	const { data: session, isPending } = useSession();
	const { shopDetails, isLoading } = useShopDetails(shopId);
	const { products } = useFetchShopProducts(shopId);

	const [activeTab, setActiveTab] = useState<Tabs>('products');
	const [productCount, setProductCount] = useState<number>(0);

	const onTabChange = (tab: Tabs) => {
		setActiveTab(tab);
	};

	const handleProductCount = (count: number) => {
		setProductCount(count);
	};

	useEffect(() => {
		handleProductCount(products.length);
	}, [products]);

	if (isPending || isLoading) {
		return (
			<div className="min-h-screen flex justify-center items-center">
				<Loader size={60} />
			</div>
		);
	}

	return (
		<div className="w-full">
			<Navbar role={(session?.user?.role as Roles) || 'anonymous'} />
			<div className="relative w-full min-h-36 px-8 sm:px-10 md:px-12 lg:px-16 xl:px-24 py-16">
				<img
					src={shopDetails?.banner || ''}
					alt="shop-banner"
					className="absolute left-0 right-0 top-0 w-full h-36 object-cover z-0"
				/>
				<div className="relative w-full flex flex-col gap-10">
					<Header shopDetails={shopDetails} />
					<div className="w-full flex flex-col gap-10 z-10">
						<ShopTabs activeTab={activeTab} onTabChange={onTabChange} productCount={productCount} />
						<div className={`${activeTab === 'products' ? 'block' : 'hidden'} w-full`}>
							<ProductsTab products={products} />
						</div>
						<div className={`${activeTab === 'about' ? 'block' : 'hidden'} w-full`}>
							<AboutTab shopDetails={shopDetails} />
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
