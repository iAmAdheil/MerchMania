// 'use client';

import { useState } from 'react';
import { Tabs } from '@chakra-ui/react';
import SigninCard from '@/components/app/pages/signin/signinCard';

export default function SigninSection() {
	// const [tab, setTab] = useState<'customer' | 'creator'>('customer');

	return (
		<div className="w-full bg-white flex justify-center items-center py-12 border-b-[0.2px] border-solid border-gray-200">
			<div className="flex flex-col items-center w-full">
				<SigninCard />
			</div>
		</div>
	);
}






















{
	/* <Tabs.Root value={tab} variant={'subtle'} className="flex flex-col gap-6">
					<Tabs.List className="flex flex-row justify-between bg-gray-100 p-1 border border-solid border-gray-200 rounded-md">
						<Tabs.Trigger
							className={`flex justify-center items-center flex-1 text-sm font-roboto ${
								tab === 'customer' ? 'bg-white font-semibold text-purple-500' : 'text-black'
							}`}
							value="customer"
							onClick={() => setTab('customer')}
						>
							Customer
						</Tabs.Trigger>
						<Tabs.Trigger
							className={`flex justify-center items-center flex-1 text-sm font-roboto text-light ${
								tab === 'creator' ? 'bg-white font-semibold text-purple-500' : 'text-black'
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
				</Tabs.Root> */
}
