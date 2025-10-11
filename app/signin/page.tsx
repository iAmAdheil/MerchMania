'use client';

import { useEffect } from 'react';
import Navbar from '@/components/app/navbar/main';
import SigninSection from '@/components/app/pages/signin/signinSection';
import Footer from '@/components/app/ui/footer';
import { useSession } from '@/auth/auth-client';
import Loader from '@/components/app/ui/loader';
import { useRouter } from 'next/navigation';

export default function SignIn() {
	const router = useRouter();
	const { data: session, isPending } = useSession();

	useEffect(() => {
		if (!isPending && session) {
			router.push('/');
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
		<div className="w-full">
			<Navbar role={'anonymous'} />
			<SigninSection />
			<Footer />
		</div>
	);
}
