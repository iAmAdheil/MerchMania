import { Button } from '@chakra-ui/react';
import { ShoppingBag, Info } from 'lucide-react';
import { Tabs } from '@/app/creator/[shopId]/page';

type props = {
	activeTab: string;
	onTabChange: (tab: Tabs) => void;
	productCount: number;
};

type Tab = {
	id: Tabs;
	label: string;
	icon: React.ElementType;
	count: number | null;
};

const ShopTabs = ({ activeTab, onTabChange, productCount }: props) => {
	const tabs: Tab[] = [
		{
			id: 'products',
			label: 'Products',
			icon: ShoppingBag,
			count: productCount,
		},
		{
			id: 'about',
			label: 'About',
			icon: Info,
			count: null,
		},
	];

	return (
		<div className="w-full border-b border-gray-200">
			<nav className="flex flex-row items-center gap-8">
				{tabs.map(tab => {
					const Icon = tab.icon;
					const isActive = activeTab === tab.id;

					return (
						<Button
							key={tab.id}
							variant="ghost"
							onClick={() => onTabChange(tab.id)}
							className={`flex flex-row items-center text-base font-medium gap-3 px-1 py-5 border-b-2 transition-colors rounded-none ${
								isActive
									? 'border-purple-500 text-purple-500'
									: 'border-transparent text-gray-500 hover:text-gray-700'
							}`}
						>
							<Icon className="h-4 w-4" />
							{tab.label}
							{tab.count !== null && (
								<span className="ml-1 bg-gray-100 text-gray-600 text-sm px-2 py-0.5 rounded-full">
									{tab.count}
								</span>
							)}
						</Button>
					);
				})}
			</nav>
		</div>
	);
};

export default ShopTabs;
