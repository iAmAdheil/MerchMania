'use client';

import Navbar from '@/components/app/navbar/main';
import OnboardingForm from '@/components/app/pages/influencer-onboarding/mainForm';
import Footer from '@/components/app/ui/footer';
import { useRouter } from 'next/navigation';

export default function Onboarding() {
	const router = useRouter();

	return (
		<div className="w-full">
			<Navbar role="customer" />
			<OnboardingForm />
			<Footer />
		</div>
	);
}
