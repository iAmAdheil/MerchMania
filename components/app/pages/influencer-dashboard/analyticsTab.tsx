import { BarChart3, DollarSign, Users } from 'lucide-react';

const mockStats = {
	totalEarnings: 2847.5,
	totalOrders: 156,
	totalProducts: 12,
	totalViews: 8945,
	conversionRate: 3.2,
	avgOrderValue: 45.6,
};

export default function AnalyticsTab() {
	return (
		<div className="flex flex-col gap-8 py-2">
			<h2 className="text-2xl font-bold">Analytics & insights</h2>
			<div className="flex flex-row justify-between gap-10">
				<div className="flex-1 bg-white flex flex-col gap-4 pl-8 py-5 border border-solid border-gray-200 rounded-lg">
					<div className="flex items-center gap-1">
						<BarChart3 className="h-5 w-5 mr-2" />
						<h2 className="text-xl font-bold">Conversion Rate</h2>
					</div>
					<div>
						<div className="text-3xl font-bold text-brand-purple">{mockStats.conversionRate}%</div>
						<p className="text-sm text-gray-600 mt-1">
							<span className="text-green-600">+0.5%</span> from last month
						</p>
					</div>
				</div>
				<div className="flex-1 bg-white flex flex-col gap-4 pl-8 py-5 border border-solid border-gray-200 rounded-lg">
					<div className="flex items-center gap-1">
						<DollarSign className="h-5 w-5 mr-2" />
						<h2 className="text-xl font-bold">Avg Order Value</h2>
					</div>
					<div>
						<div className="text-3xl font-bold text-brand-purple">${mockStats.avgOrderValue}</div>
						<p className="text-sm text-gray-600 mt-1">
							<span className="text-green-600">+$2.30</span> from last month
						</p>
					</div>
				</div>
				<div className="flex-1 bg-white flex flex-col gap-4 pl-8 py-5 border border-solid border-gray-200 rounded-lg">
					<div className="flex items-center gap-1">
						<Users className="h-5 w-5 mr-2" />
						<h2 className="text-xl font-bold">Repeat Customers</h2>
					</div>
					<div>
						<div className="text-3xl font-bold text-brand-purple">24%</div>
						<p className="text-sm text-gray-600 mt-1">
							<span className="text-green-600">+3%</span> from last month
						</p>
					</div>
				</div>
			</div>
			<div className="bg-white w-full border border-solid border-gray-200 px-6 py-6 flex flex-col gap-6">
				<div>
					<h2 className="text-xl font-semibold">Sales Chart</h2>
					<p className="text-sm font-roboto text-gray-600">
						Your sales performance over the last 30 days
					</p>
				</div>
				<div className="h-64 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
					<p className="text-gray-500">Chart visualization would go here</p>
					<p className="text-gray-500">{'(Coming soon)'}</p>
				</div>
			</div>
		</div>
	);
}
