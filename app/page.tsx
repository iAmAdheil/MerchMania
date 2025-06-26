'use client';

import Navbar from '@/components/app/navbar/main';
import MainSection from '@/components/app/pages/landing/main';
import Footer from '@/components/app/ui/footer';
import { useSession } from '@/auth/auth-client';

export default function Home() {

	return (
		<div className="min-h-screen w-screen">
			<Navbar />
			<MainSection />
			<Footer />
		</div>
	);
}
