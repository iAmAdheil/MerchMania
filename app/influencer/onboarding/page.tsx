'use client';

import Navbar from '@/components/app/navbar/main';
import OnboardingForm from '@/components/app/pages/influencer-onboarding/mainForm';
import Footer from '@/components/app/ui/footer';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/auth/auth-client';
import Loader from '@/components/app/ui/loader';

export default function Onboarding() {
	const router = useRouter();
	const { data: session, isPending, error } = useSession();

	useEffect(() => {
		if ((!isPending && !session) || (!isPending && error)) {
			router.push('/signin');
		}

		if (session && session.isOnboarded && !isPending) {
			router.push('/');
		}
	}, [session, isPending, error]);

	if (isPending) {
		return (
			<div className="min-h-screen flex justify-center items-center">
				<Loader size={60} />
			</div>
		);
	}

	return (
		<div>
			{/* <Navbar /> */}
			<OnboardingForm userId={session?.id || ''} />
			<Footer />
		</div>
	);
}
