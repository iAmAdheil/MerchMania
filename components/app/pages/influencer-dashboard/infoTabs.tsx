'use client';

import { useState } from 'react';
import { Tabs } from '@chakra-ui/react';
import OverviewTab from './overviewTab';

const mockStats = {
	totalEarnings: 2847.5,
	totalOrders: 156,
	totalProducts: 12,
	totalViews: 8945,
	conversionRate: 3.2,
	avgOrderValue: 45.6,
};

const mockRecentOrders = [
	{
		id: 'ORD-001',
		product: 'Neon Dragon Tee',
		customer: 'John D.',
		amount: 29.99,
		status: 'shipped',
	},
	{
		id: 'ORD-002',
		product: 'Retro Wave Hoodie',
		customer: 'Sarah M.',
		amount: 59.99,
		status: 'printing',
	},
	{
		id: 'ORD-003',
		product: 'Cosmic Patterns Tee',
		customer: 'Mike R.',
		amount: 34.99,
		status: 'delivered',
	},
];

const mockProducts = [
	{
		id: 1,
		name: 'Neon Dragon Tee',
		sales: 45,
		revenue: 1349.55,
		image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&auto=format',
	},
	{
		id: 2,
		name: 'Retro Wave Hoodie',
		sales: 28,
		revenue: 1679.72,
		image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200&auto=format',
	},
	{
		id: 3,
		name: 'Cosmic Patterns',
		sales: 33,
		revenue: 1154.67,
		image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=200&auto=format',
	},
];

export default function InfoTabs() {
	const [activeTab, setActiveTab] = useState('overview');

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'delivered':
				return 'bg-green-100 text-green-800';
			case 'shipped':
				return 'bg-blue-100 text-blue-800';
			case 'printing':
				return 'bg-yellow-100 text-yellow-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	return (
		<div className='bg-gray-50 px-12 py-10'>
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
			</Tabs.Root>
		</div>
	);
}
