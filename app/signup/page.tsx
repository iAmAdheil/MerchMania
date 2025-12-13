'use client';

import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import LeftSection from '@/components/app/pages/signup/leftSection';
import OptionsBox from '@/components/app/pages/signup/optionsBox';
import CustomerSignup from '@/components/app/pages/signup/customerSignup';
import CreatorSignup from '@/components/app/pages/signup/creatorSignup';
import { useSession } from '@/auth/auth-client';
import { useRouter } from 'next/navigation';
import Loader from '@/components/app/ui/loader';

export type Display = 'options' | 'customer' | 'creator';

export default function Signup() {
	const router = useRouter();
	const { data: session, isPending } = useSession();

	useEffect(() => {
		if (!isPending && session) {
			router.push('/');
		}
	}, [router, isPending, session]);

	const [display, setDisplay] = useState<Display>('options');

	if (isPending) {
		return (
			<div className="min-h-screen flex justify-center items-center">
				<Loader size={60} />
			</div>
		);
	}

	return (
		<div className="min-h-screen w-full flex lg:flex-row">
			<div className="flex-1">
				<LeftSection />
			</div>
			<div className="flex-1 hidden justify-center items-center bg-gray-50 lg:flex">
				<Form display={display} setDisplay={setDisplay} />
			</div>
		</div>
	);
}

export function Form({
	display,
	setDisplay,
}: {
	display: Display;
	setDisplay: Dispatch<SetStateAction<Display>>;
}) {
	return (
		<>
			{display === 'options' && <OptionsBox setDisplay={setDisplay} />}
			{display === 'customer' && <CustomerSignup setDisplay={setDisplay} />}
			{display === 'creator' && <CreatorSignup setDisplay={setDisplay} />}
		</>
	);
}
