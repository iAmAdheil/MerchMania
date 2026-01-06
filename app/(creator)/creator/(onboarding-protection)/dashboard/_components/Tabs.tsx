'use client';

import { useState } from 'react';

import { Tabs } from '@chakra-ui/react';

import Overview from './Overview';
import Products from './Products';
import Orders from './Orders';
import Analytics from './Analytics';

export default function PageTabs({ shopId }: { shopId: string }) {
  const [activeTab, setActiveTab] = useState('overview');
  return (
    <div className="px-6 md:px-8 lg:px-12 py-10 bg-gray-50">
      <Tabs.Root value={activeTab} variant={'subtle'} className="flex flex-col gap-6" lazyMount>
        <Tabs.List className="p-1 flex flex-row justify-between bg-gray-200 rounded-sm">
          <Tabs.Trigger
            onClick={() => setActiveTab('overview')}
            value="overview"
            className={`flex-1 flex justify-center items-center text-sm md:text-base text-black font-roboto text-light ${activeTab === 'overview' ? 'bg-white' : ''
              }`}
          >
            Overview
          </Tabs.Trigger>
          <Tabs.Trigger
            onClick={() => setActiveTab('products')}
            value="products"
            className={`flex-1 flex justify-center items-center text-sm md:text-base text-black font-roboto text-light ${activeTab === 'products' ? 'bg-white' : ''
              }`}
          >
            Products
          </Tabs.Trigger>
          <Tabs.Trigger
            onClick={() => setActiveTab('orders')}
            value="orders"
            className={`flex-1 flex justify-center items-center text-sm md:text-base text-black font-roboto text-light ${activeTab === 'orders' ? 'bg-white' : ''
              }`}
          >
            Orders
          </Tabs.Trigger>
          <Tabs.Trigger
            onClick={() => setActiveTab('analytics')}
            value="analytics"
            className={`flex-1 flex justify-center items-center text-sm md:text-base text-black font-roboto text-light ${activeTab === 'analytics' ? 'bg-white' : ''
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
