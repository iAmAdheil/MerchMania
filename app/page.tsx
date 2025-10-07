'use client';

import Navbar from '@/components/app/navbar/main';
import HeroSection, { BottomMain } from '@/components/app/pages/landing/main';
import Footer from '@/components/app/ui/footer';
import { useRouter } from 'next/navigation';

export default function Home() {
	// const router = useRouter();

	// if (isPending) {
	// 	return (
	// 		<div className="min-h-screen flex justify-center items-center">
	// 			<Loader size={60} />
	// 		</div>
	// 	);
	// }

	return (
		<div className="w-full flex flex-col">
			<div className="flex flex-col w-full lg:min-h-screen">
				<Navbar role={'anonymous'} />
				<HeroSection />
			</div>
			<BottomMain />
			<Footer />
		</div>
	);
}
