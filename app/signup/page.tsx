'use client';

import { useState, useEffect } from 'react';
import { useSession } from '@/auth/auth-client';
import { useRouter } from 'next/navigation';
import LeftSection from '@/components/app/pages/signup/leftSection';
import OptionsBox from '@/components/app/pages/signup/optionsBox';
import CustomerSignup from '@/components/app/pages/signup/customerSignup';
import CreatorSignup from '@/components/app/pages/signup/creatorSignup';
import Loader from '@/components/app/ui/loader';

export type Display = 'options' | 'customerSignup' | 'creatorSignup';

export default function Signup() {
	const router = useRouter();
	const {
		data: session,
		isPending, //loading state
		error, //error object
		refetch, //refetch the session
	} = useSession();

	const [display, setDisplay] = useState<Display>('options');

	useEffect(() => {
		if((!isPending && !session) || (!isPending && error)) {
			console.log(isPending);
			console.log(session);
			console.log(error);			
		} else if (!isPending && session) {
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
		<div className="min-h-screen flex flex-row">
			<LeftSection />
			<div className="flex-1 flex justify-center items-center bg-gray-50">
				{display === 'options' && <OptionsBox setDisplay={setDisplay} />}
				{display === 'customerSignup' && <CustomerSignup setDisplay={setDisplay} />}
				{display === 'creatorSignup' && <CreatorSignup setDisplay={setDisplay} />}
			</div>
		</div>
	);
}
