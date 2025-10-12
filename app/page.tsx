'use client';

import Navbar from '@/components/app/navbar/main';
import HeroSection, { BottomMain } from '@/components/app/pages/landing/main';
import Footer from '@/components/app/ui/footer';
import { useSession } from '@/auth/auth-client';
import Loader from '@/components/app/ui/loader';
import { Roles } from '@/types';

export default function Home() {
	const { data: session, isPending } = useSession();

	if (isPending) {
		return (
			<div className="min-h-screen flex justify-center items-center">
				<Loader size={60} />
			</div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<div className="flex flex-col w-full lg:min-h-screen">
				<Navbar role={(session?.user?.role as Roles) || 'anonymous'} />
				<HeroSection />
			</div>
			<BottomMain />
			<Footer />
		</div>
	);
}
