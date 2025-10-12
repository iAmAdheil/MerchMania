'use client';

import { useState, use } from 'react';
import Header from '@/components/app/pages/influencer-shop/header';
import Navbar from '@/components/app/navbar/main';
import ShopTabs from '@/components/app/pages/influencer-shop/shopTabs';
import ProductsTab from '@/components/app/pages/influencer-shop/productsTab';
import AboutTab from '@/components/app/pages/influencer-shop/aboutTab';
import Footer from '@/components/app/ui/footer';
import { useSession } from '@/auth/auth-client';
import { Roles } from '@/types';
import Loader from '@/components/app/ui/loader';

interface Props {
	params: Promise<{
		shopId: string;
	}>;
}

export type Tabs = 'products' | 'about';

export default function InfluencerShop({ params }: Props) {
	const { shopId } = use(params);
	const { data: session, isPending } = useSession();

	const [activeTab, setActiveTab] = useState<Tabs>('products');

	const onTabChange = (tab: Tabs) => {
		setActiveTab(tab);
	};

	if (isPending) {
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
					src="https://res.cloudinary.com/dzaj1xdgz/image/upload/v1759867755/shop-logos/cmggztk3n0000uauf36dtb682-logo.png.jpg"
					alt="shop-banner"
					className="absolute left-0 right-0 top-0 w-full h-36 object-cover z-0"
				/>
				<div className="relative w-full flex flex-col gap-10">
					<Header />
					<div className="w-full flex flex-col gap-10 z-10">
						<ShopTabs activeTab={activeTab} onTabChange={onTabChange} productCount={0} />
						<div className={`${activeTab === 'products' ? 'block' : 'hidden'} w-full`}>
							<ProductsTab />
						</div>
						<div className={`${activeTab === 'about' ? 'block' : 'hidden'} w-full`}>
							<AboutTab />
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
