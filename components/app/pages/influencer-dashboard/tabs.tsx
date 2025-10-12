'use client';

import { useState } from 'react';
import { Tabs } from '@chakra-ui/react';
import Overview from './overview';
import Products from './products';
import Orders from './orders';
import Analytics from './analytics';

export default function InfoTabs({ shopId }: { shopId: string }) {
	const [activeTab, setActiveTab] = useState('overview');

	return (
		<div className="bg-gray-50 px-6 md:px-8 lg:px-12 py-10">
			<Tabs.Root value={activeTab} variant={'subtle'} className="flex flex-col gap-6" lazyMount>
				<Tabs.List className="flex flex-row justify-between bg-gray-200 p-1 rounded-sm">
					<Tabs.Trigger
						onClick={() => setActiveTab('overview')}
						value="overview"
						className={`flex justify-center items-center flex-1 md:text-base text-sm font-roboto text-light text-black ${
							activeTab === 'overview' ? 'bg-white' : ''
						}`}
					>
						Overview
					</Tabs.Trigger>
					<Tabs.Trigger
						onClick={() => setActiveTab('products')}
						value="products"
						className={`flex justify-center items-center flex-1 md:text-base text-sm font-roboto text-light text-black ${
							activeTab === 'products' ? 'bg-white' : ''
						}`}
					>
						Products
					</Tabs.Trigger>
					<Tabs.Trigger
						onClick={() => setActiveTab('orders')}
						value="orders"
						className={`flex justify-center items-center flex-1 md:text-base text-sm font-roboto text-light text-black ${
							activeTab === 'orders' ? 'bg-white' : ''
						}`}
					>
						Orders
					</Tabs.Trigger>
					<Tabs.Trigger
						onClick={() => setActiveTab('analytics')}
						value="analytics"
						className={`flex justify-center items-center flex-1 md:text-base text-sm font-roboto text-light text-black ${
							activeTab === 'analytics' ? 'bg-white' : ''
						}`}
					>
						Analytics
					</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="overview">
					<Overview />
				</Tabs.Content>
				<Tabs.Content value="products">
					<Products shopId={shopId} />
				</Tabs.Content>
				<Tabs.Content value="orders">
					<Orders />
				</Tabs.Content>
				<Tabs.Content value="analytics">
					<Analytics />
				</Tabs.Content>
			</Tabs.Root>
		</div>
	);
}
