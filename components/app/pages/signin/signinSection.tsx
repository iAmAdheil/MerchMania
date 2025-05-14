'use client';

import { useState } from 'react';
import { Tabs } from '@chakra-ui/react';
import CustomerSigninCard from '@/components/app/pages/signin/customerSigninCard';
import InfluencerSigninCard from '@/components/app/pages/signin/influencerSigninCard';

export default function SigninSection() {
	const [tab, setTab] = useState<'customer' | 'creator'>('customer');

	return (
		<div className="w-full flex justify-center items-center pt-6 pb-12 border-b-[0.2px] border-solid border-gray-700">
			<div className="flex flex-col items-center w-full">
				<Tabs.Root value={tab} variant={'subtle'} className="flex flex-col gap-6">
					<Tabs.List className="flex flex-row justify-between bg-[#1A202C]">
						<Tabs.Trigger
							className={`flex justify-center items-center flex-1 text-sm font-roboto text-light text-white ${
								tab === 'customer' ? 'bg-purple-600' : ''
							}`}
							value="customer"
							onClick={() => setTab('customer')}
						>
							Customer
						</Tabs.Trigger>
						<Tabs.Trigger
							className={`flex justify-center items-center flex-1 text-sm font-roboto text-light text-white ${
								tab === 'creator' ? 'bg-purple-600' : ''
							}`}
							value="creator"
							onClick={() => setTab('creator')}
						>
							Creator
						</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="customer">
						<CustomerSigninCard />
					</Tabs.Content>
					<Tabs.Content value="creator">
						<InfluencerSigninCard />
					</Tabs.Content>
				</Tabs.Root>
			</div>
		</div>
	);
}
