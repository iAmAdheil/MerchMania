'use client';

import { useState, use, useEffect } from 'react';
import Header from '@/components/app/pages/influencer-shop/header';
import Navbar from '@/components/app/navbar/main';
import ShopTabs from '@/components/app/pages/influencer-shop/shopTabs';
import ProductsTab from '@/components/app/pages/influencer-shop/productsTab';
import AboutTab from '@/components/app/pages/influencer-shop/aboutTab';
import Footer from '@/components/app/ui/footer';
import useFetchCreatorShopDetails from '@/hooks/useShopDetails';
import Loader from '@/components/app/ui/loader';
import { useRouter } from 'next/navigation';
import { useSession } from '@/auth/auth-client';
import { Roles } from '@/types';

interface Props {
	params: Promise<{
		shopId: string;
	}>;
}

type Tabs = 'products' | 'collections' | 'about';

export default function InfluencerShop({ params }: Props) {
	const { data: session, isPending, error: sessionError } = useSession();
	const { shopId } = use(params);
	const router = useRouter();
	const { shopDetails, isLoading, error } = useFetchCreatorShopDetails(shopId);

	const [activeTab, setActiveTab] = useState<Tabs>('products');
	const [role, setRole] = useState<Roles>('STRANGER');

	const onTabChange = (tab: Tabs) => {
		setActiveTab(tab);
	};

	if (isLoading || isPending) {
		return (
			<div className="min-h-screen flex justify-center items-center">
				<Loader size={60} />
			</div>
		);
	}

	return (
		<div>
			<Navbar role={role} />
			<div className="flex flex-col gap-[10rem] pb-10">
				<Header shopDetails={shopDetails} />
				<div className="px-16 flex flex-col gap-5 w-[100%]">
					<ShopTabs activeTab={activeTab} onTabChange={onTabChange} productCount={0} />
					<div className={`${activeTab === 'products' ? 'block' : 'hidden'} w-full`}>
						<ProductsTab shopId={shopId} />
					</div>
					<div className={`${activeTab === 'about' ? 'block' : 'hidden'} w-full`}>
						<AboutTab />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
