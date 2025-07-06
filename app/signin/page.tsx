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
	const {
		data: session,
		isPending, //loading state
		error, //error object
		refetch, //refetch the session
	} = useSession();

	useEffect(() => {
		if ((!isPending && !session) || (!isPending && error)) {
			console.log(isPending);
			console.log(session);
			console.log(error);
		} else if (!isPending && session) {
			console.log(session, isPending);
			router.push('/');
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
		<div>
			{/* <Navbar /> */}
			<SigninSection />
			<Footer />
		</div>
	);
}
