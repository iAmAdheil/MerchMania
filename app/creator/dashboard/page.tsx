'use client';

import { useEffect } from 'react';
import Navbar from '@/components/app/navbar/main';
import Header from '@/components/app/pages/influencer-dashboard/header';
import Tabs from '@/components/app/pages/influencer-dashboard/tabs';
import Footer from '@/components/app/ui/footer';
import { useRouter } from 'next/navigation';
import { useSession } from '@/auth/auth-client';
import { Roles } from '@/types';
import Loader from '@/components/app/ui/loader';
import useShopDetails from '@/hooks/useShopByUserId';

export default function InfluencerDashBoard() {
	const router = useRouter();
	const { data: session, isPending } = useSession();
	const { shopDetails, isLoading } = useShopDetails(session?.user?.id || '');

	useEffect(() => {
		if (!(!isPending && session && session.user.role === 'creator')) {
			// && session.user.isOnboarded
			router.push('/');
		}
	}, [router, isPending, session]);

	if (isPending || isLoading) {
		return (
			<div className="min-h-screen flex justify-center items-center">
				<Loader size={60} />
			</div>
		);
	}
	return (
		<div className="w-full border-[0.5px] border-solid border-gray-300">
			<Navbar role={(session?.user?.role as Roles) || 'anonymous'} />
			<Header name={shopDetails?.name || ''} />
			<Tabs shopId={shopDetails?.id || ''} />
			<Footer />
		</div>
	);
}
