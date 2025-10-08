'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from './auth/auth-client';
import ProviderWrapper from './clientProvider';
import Loader from './components/app/ui/loader';

export function Router({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const router = useRouter();
	const { data: session, isPending } = authClient.useSession();

	useEffect(() => {
		if (
			!isPending &&
			session?.user?.role === 'creator' &&
			!session.user.isOnboarded &&
			pathname !== '/creator/onboarding'
		) {
			router.push('/creator/onboarding');
		}
	}, [session, pathname, router, isPending]);

	if (isPending) {
		return (
			<div className="min-h-screen flex justify-center items-center bg-white">
				<Loader size={60} />
			</div>
		);
	}

	return <ProviderWrapper>{children}</ProviderWrapper>;
}
