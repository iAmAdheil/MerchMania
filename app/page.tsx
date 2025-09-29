'use client';

import Navbar from '@/components/app/navbar/main';
import HeroSection from '@/components/app/pages/landing/main';
import Footer from '@/components/app/ui/footer';
import { useSession } from '@/auth/auth-client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/app/ui/loader';
import { Roles } from '@/types';

export default function Home() {
	const router = useRouter();
	const { data: session, isPending, error, refetch } = useSession();
	const [role, setRole] = useState<Roles>('STRANGER');

	useEffect(() => {
		if (!isPending && !session) {
			console.log('User not signed in!');
		} else {
			setRole((session?.role as Roles) || 'STRANGER');
		}
	}, [isPending, session]);

	if (isPending) {
		return (
			<div className="min-h-screen flex justify-center items-center">
				<Loader size={60} />
			</div>
		);
	}

	return (
		<div>
			<div className="flex flex-col w-full h-screen">
				<Navbar role={role} />
				<HeroSection />
			</div>
			{/* <Footer /> */}
		</div>
	);
}
