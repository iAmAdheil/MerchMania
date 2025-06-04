'use client'

import { useState } from 'react';

import LeftSection from '@/components/app/pages/signup/leftSection';
import OptionsBox from '@/components/app/pages/signup/optionsBox';
import CustomerSignup from '@/components/app/pages/signup/customerSignup';
import CreatorSignup from '@/components/app/pages/signup/creatorSignup';

export type Display = 'options' | 'customerSignup' | 'creatorSignup';

export default function Signup() {
	const [display, setDisplay] = useState<Display>('options');

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
