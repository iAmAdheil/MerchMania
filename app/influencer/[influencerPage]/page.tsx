'use client';

import { useState } from 'react';
import Header from '@/components/app/pages/influencer-shop/header';
import Navbar from '@/components/app/navbar/main';
import ShopTabs from '@/components/app/pages/influencer-shop/shopTabs';

type InfluencerHeaderProps = {
	influencer: {
		name: string;
		handle: string;
		avatar: string;
		coverImage: string;
		bio: string;
		followers: string;
		products: number;
		location: string;
		website: string;
		joinedDate: string;
		verified: boolean;
		socialLinks: {
			youtube?: string;
			twitter?: string;
			instagram?: string;
			twitch?: string;
		};
	};
};

// Mock influencer data
const mockInfluencer = {
	id: '1',
	name: 'GamingWithAlex',
	handle: '@gamingwithalex',
	avatar: '/placeholder.svg',
	coverImage: '/placeholder.svg',
	bio: 'Gaming content creator passionate about indie games and tech reviews. Creating awesome merchandise for the gaming community!',
	followers: '125K',
	products: 24,
	location: 'San Francisco, CA',
	website: 'gamingwithalex.com',
	joinedDate: 'January 2020',
	verified: true,
	socialLinks: {
		youtube: 'https://youtube.com/@gamingwithalex',
		twitter: 'https://twitter.com/gamingwithalex',
		instagram: 'https://instagram.com/gamingwithalex',
		twitch: 'https://twitch.tv/gamingwithalex',
	},
};

type Tabs = 'products' | 'collections' | 'about';

export default function InfluencerShop() {
	const [activeTab, setActiveTab] = useState<Tabs>('products');

	const onTabChange = (tab: Tabs) => {
		setActiveTab(tab);
	}

	return (
		<div>
			<Navbar />
			<div className='flex flex-col gap-[10rem]'>
				<Header influencer={mockInfluencer} />
				<ShopTabs activeTab={activeTab} onTabChange={onTabChange} productCount={0} />
			</div>
		</div>
	);
}
