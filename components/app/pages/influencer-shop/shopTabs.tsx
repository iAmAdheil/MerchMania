import { Button } from '@chakra-ui/react';
import { ShoppingBag, Grid3X3, Info } from 'lucide-react';

type InfluencerTabsProps = {
	activeTab: string;
	onTabChange: (tab: Tabs) => void;
	productCount: number;
};

type Tab = {
	id: Tabs;
	label: string;
	icon: any;
	count: number | null;
};

type Tabs = 'products' | 'collections' | 'about';

const ShopTabs = ({ activeTab, onTabChange, productCount }: InfluencerTabsProps) => {
	const tabs: Tab[] = [
		{
			id: 'products',
			label: 'Products',
			icon: ShoppingBag,
			count: productCount,
		},
		// {
		//   id: "collections",
		//   label: "Collections",
		//   icon: Grid3X3,
		//   count: 3
		// },
		{
			id: 'about',
			label: 'About',
			icon: Info,
			count: null,
		},
	];

	return (
		<div className="w-[100%] border-b border-gray-200">
			<nav className="flex flex-row items-center gap-8">
				{tabs.map(tab => {
					const Icon = tab.icon;
					const isActive = activeTab === tab.id;

					return (
						<Button
							key={tab.id}
							variant="ghost"
							onClick={() => onTabChange(tab.id)}
							className={`flex flex-row items-center text-sm font-medium gap-2 px-0 py-4 border-b-2 transition-colors ${
								isActive
									? 'border-purple-500 text-purple-500'
									: 'border-transparent text-gray-500 hover:text-gray-700'
							}`}
						>
							<Icon className="h-3.5 w-3.5" />
							{tab.label}
							{tab.count !== null && (
								<span className="ml-1 bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
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
