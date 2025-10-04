// 'use client';
import SigninCard from '@/components/app/pages/signin/signinCard';

export default function SigninSection() {
	// const [tab, setTab] = useState<'customer' | 'creator'>('customer');

	return (
		<div className="px-6 w-full flex items-center justify-center py-20">
			<SigninCard />
		</div>
	);
}
