import { motion } from 'framer-motion';

import {
	TrendingUp,
	Package,
	ShoppingBag,
	DollarSign,
	Eye,
	Plus,
	BarChart3,
	Users,
	Star,
	Settings,
} from 'lucide-react';

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

type Status = 'shipped' | 'printing' | 'delivered';

export default function OverviewTab() {
	const getStatusBase = (status: string) => {
		if (status === 'delivered') {
			return (
				<div className="bg-green-200 px-2 py-1 rounded-xl">
					<p className="text-[10px] text-green-800 font-semibold font-roboto">{status}</p>
				</div>
			);
		}
		if (status === 'printing') {
			return (
				<div className="bg-yellow-200 px-2 py-1 rounded-xl">
					<p className="text-[10px] text-yellow-800 font-semibold font-roboto">{status}</p>
				</div>
			);
		}
		if (status === 'shipped') {
			return (
				<div className="bg-blue-200 px-2 py-1 rounded-xl">
					<p className="text-[10px] text-blue-800 font-semibold font-roboto">{status}</p>
				</div>
			);
		} else {
			return null;
		}
	};

	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-row justify-between items-center">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
					className="w-[18rem] flex flex-col gap-3 px-5 py-2 bg-white border-[1px] border-solid border-gray-200"
				>
					<div className="flex flex-row justify-between items-center">
						<h2 className="text-sm font-medium">Total Earnings</h2>
						<DollarSign className="h-4 w-4 text-muted-foreground" />
					</div>
					<div className="flex flex-col gap-2">
						<h1 className="text-2xl font-bold">$2847.5</h1>
						<p className="text-xs text-muted-foreground">
							<span className="text-green-600">+12.5%</span> from last month
						</p>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className="w-[18rem] flex flex-col gap-3 px-5 py-2 bg-white border-[1px] border-solid border-gray-200"
				>
					<div className="flex flex-row justify-between items-center">
						<h2 className="text-sm font-medium">Total Orders</h2>
						<ShoppingBag className="h-4 w-4 text-muted-foreground" />
					</div>
					<div className="flex flex-col gap-2">
						<h1 className="text-2xl font-bold">156</h1>
						<p className="text-xs text-muted-foreground">
							<span className="text-green-600">+8.2%</span> from last month
						</p>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
					className="w-[18rem] flex flex-col gap-3 px-5 py-2 bg-white border-[1px] border-solid border-gray-200"
				>
					<div className="flex flex-row justify-between items-center">
						<h2 className="text-sm font-medium">Products</h2>
						<Package className="h-4 w-4 text-muted-foreground" />
					</div>
					<div className="flex flex-col gap-2">
						<h1 className="text-2xl font-bold">12</h1>
						<p className="text-xs text-muted-foreground">
							<span className="text-green-600">+2</span> this month
						</p>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
					className="w-[18rem] flex flex-col gap-3 px-5 py-2 bg-white border-[1px] border-solid border-gray-200"
				>
					<div className="flex flex-row justify-between items-center">
						<h2 className="text-sm font-medium">Store Views</h2>
						<DollarSign className="h-4 w-4 text-muted-foreground" />
					</div>
					<div className="flex flex-col gap-2">
						<h1 className="text-2xl font-bold">8945</h1>
						<p className="text-xs text-muted-foreground">
							<span className="text-green-600">+15.3%</span> from last month
						</p>
					</div>
				</motion.div>
			</div>
			<div className="flex flex-row gap-8">
				<div className="flex-1 h-fit flex flex-col gap-6 px-6 py-4 bg-white border-[1px] border-solid border-gray-200">
					<div className="flex flex-col gap-1">
						<h2 className="text-2xl font-bold">Recent Orders</h2>
						<p className="text-sm text-gray-600">Your latest customer orders</p>
					</div>
					<div className="flex flex-col gap-6">
						{mockRecentOrders.map(order => {
							return (
								<div key={order.id} className="flex flex-row items-center justify-between">
									<div className="flex flex-col">
										<p className="text-base font-semibold">{order.product}</p>
										<p className="text-sm text-gray-600">
											{order.customer} • {order.id}
										</p>
									</div>
									<div className="flex flex-col items-center gap-1">
										<p className="font-semibold text-base">${order.amount}</p>
										<div>{getStatusBase(order.status)}</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className="flex-1 h-fit flex flex-col gap-8 px-6 py-4 bg-white border-[1px] border-solid border-gray-200">
					<div className="flex flex-col gap-1">
						<h2 className="text-2xl font-bold">Top Products</h2>
						<p className="text-sm text-gray-600">Your best performing products</p>
					</div>
					<div className="flex flex-col gap-6">
						{mockProducts.map((product, index) => (
							<div key={product.id} className="flex items-center space-x-4">
								<img
									src={product.image}
									alt={product.name}
									className="w-12 h-12 rounded-lg object-cover"
								/>
								<div className="flex-1">
									<p className="font-medium">{product.name}</p>
									<p className="text-sm text-gray-600">{product.sales} sales</p>
								</div>
								<div className="text-right">
									<p className="font-medium">${product.revenue}</p>
									<div className="flex items-center text-sm text-gray-600">
										<Star className="h-3 w-3 mr-1" />#{index + 1}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
