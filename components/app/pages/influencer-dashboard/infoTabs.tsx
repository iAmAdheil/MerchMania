'use client';

import { useState } from 'react';
import { Tabs } from '@chakra-ui/react';
import OverviewTab from './overviewTab';
import ProductsTab from './productsTab';
import OrdersTab from './ordersTab';
import AnalyticsTab from './analyticsTab';

export default function InfoTabs() {
	const [activeTab, setActiveTab] = useState('overview');

	return (
		<div className="bg-gray-50 px-12 py-10">
			<Tabs.Root value={activeTab} variant={'subtle'} className="flex flex-col gap-6">
				<Tabs.List className="flex flex-row justify-between bg-gray-200 p-1">
					<Tabs.Trigger
						onClick={() => setActiveTab('overview')}
						value="overview"
						className={`flex justify-center items-center flex-1 text-sm font-roboto text-light text-black ${
							activeTab === 'overview' ? 'bg-white' : ''
						}`}
					>
						Overview
					</Tabs.Trigger>
					<Tabs.Trigger
						onClick={() => setActiveTab('products')}
						value="products"
						className={`flex justify-center items-center flex-1 text-sm font-roboto text-light text-black ${
							activeTab === 'products' ? 'bg-white' : ''
						}`}
					>
						Products
					</Tabs.Trigger>
					<Tabs.Trigger
						onClick={() => setActiveTab('orders')}
						value="orders"
						className={`flex justify-center items-center flex-1 text-sm font-roboto text-light text-black ${
							activeTab === 'orders' ? 'bg-white' : ''
						}`}
					>
						Orders
					</Tabs.Trigger>
					<Tabs.Trigger
						onClick={() => setActiveTab('analytics')}
						value="analytics"
						className={`flex justify-center items-center flex-1 text-sm font-roboto text-light text-black ${
							activeTab === 'analytics' ? 'bg-white' : ''
						}`}
					>
						Analytics
					</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="overview">
					<OverviewTab />
				</Tabs.Content>
				<Tabs.Content value="products">
					<ProductsTab />
				</Tabs.Content>
				<Tabs.Content value="orders">
					<OrdersTab />
				</Tabs.Content>
				<Tabs.Content value="analytics">
					<AnalyticsTab />
				</Tabs.Content>
			</Tabs.Root>
		</div>
	);
}
