'use client';

import Navbar from '@/components/app/navbar/main';
import MainSection from '@/components/app/pages/landing/main';
import Footer from '@/components/app/ui/footer';
import { useSession } from '@/auth/auth-client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/app/ui/loader';

export default function Home() {
	const router = useRouter();
	const { data: session, isPending, error, refetch } = useSession();

	const [isAuth, setIsAuth] = useState<boolean>(false);
	const [role, setRole] = useState<string | null>(null);

	useEffect(() => {
		if (!isPending && !session) {
			console.log('User not signed in!');
		} else {
			setIsAuth(true);
			setRole(session?.role || null);
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
		<div className="min-h-screen w-screen">
			<Navbar isAuth={isAuth} role={role} />
			<MainSection />
			<Footer />
		</div>
	);
}
