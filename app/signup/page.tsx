'use client';

import { useState, Dispatch, SetStateAction } from 'react';
import LeftSection from '@/components/app/pages/signup/leftSection';
import OptionsBox from '@/components/app/pages/signup/optionsBox';
import CustomerSignup from '@/components/app/pages/signup/customerSignup';
import CreatorSignup from '@/components/app/pages/signup/creatorSignup';

export type Display = 'options' | 'customer' | 'creator';

export default function Signup() {
	const [display, setDisplay] = useState<Display>('options');

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
