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

	useEffect(() => {
		if (!isPending && !session) {
			console.log('User not signed in!');
			// router.push('/signin');
		} else {
			console.log(session);
			setIsAuth(true);
		}
	}, [isPending]);

	if (isPending) {
		return (
			<div className="min-h-screen flex justify-center items-center">
				<Loader size={60} />
			</div>
		);
	}

	return (
		<div className="min-h-screen w-screen">
			<Navbar isAuth={isAuth} />
			<MainSection />
			<Footer />
		</div>
	);
}
