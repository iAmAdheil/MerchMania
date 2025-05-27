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

export default function OverviewTab() {
	return (
		<div className="flex flex-col">
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
			</div>
		</div>
	);
}

{
	/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.1 }}
				>
					<div>
						<div className="flex flex-row items-center justify-between space-y-0 pb-2">
							<h2 className="text-sm font-medium">Total Earnings</h2>
							<DollarSign className="h-4 w-4 text-muted-foreground" />
						</div>
						<div>
							<div className="text-2xl font-bold">${mockStats.totalEarnings}</div>
							<p className="text-xs text-muted-foreground">
								<span className="text-green-600">+12.5%</span> from last month
							</p>
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					<div>
						<div className="flex flex-row items-center justify-between space-y-0 pb-2">
							<h2 className="text-sm font-medium">Total Orders</h2 >
							<ShoppingBag className="h-4 w-4 text-muted-foreground" />
						</div>
						<div>
							<div className="text-2xl font-bold">{mockStats.totalOrders}</div>
							<p className="text-xs text-muted-foreground">
								<span className="text-green-600">+8.2%</span> from last month
							</p>
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3 }}
				>
					<div>
						<div className="flex flex-row items-center justify-between space-y-0 pb-2">
							<h2 className="text-sm font-medium">Products</h2>
							<Package className="h-4 w-4 text-muted-foreground" />
						</div>
						<div>
							<div className="text-2xl font-bold">{mockStats.totalProducts}</div>
							<p className="text-xs text-muted-foreground">
								<span className="text-blue-600">+2</span> this month
							</p>
						</div>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
				>
					<div>
						<div className="flex flex-row items-center justify-between space-y-0 pb-2">
							<h2 className="text-sm font-medium">Store Views</h2>
							<Eye className="h-4 w-4 text-muted-foreground" />
						</div>
						<div>
							<div className="text-2xl font-bold">
								{mockStats.totalViews.toLocaleString()}
							</div>
							<p className="text-xs text-muted-foreground">
								<span className="text-green-600">+15.3%</span> from last month
							</p>
						</div>
					</div>
				</motion.div>
			</div> */
}

{
	/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">				
				<div>
					<div>
						<h2>Recent Orders</h2>
						<p>Your latest customer orders</p>
					</div>
					<div>
						<div className="space-y-4">
							{mockRecentOrders.map(order => (
								<div key={order.id} className="flex items-center justify-between">
									<div>
										<p className="font-medium">{order.product}</p>
										<p className="text-sm text-gray-600">
											{order.customer} • {order.id}
										</p>
									</div>
									<div className="text-right">
										<p className="font-medium">${order.amount}</p>
										<Badge className={getStatusColor(order.status)}>
											{order.status}
										</Badge>
									</div>
								</div>
							))}
						</div>
					<div>
				</div>
				
				<div>
					<div>
						<h2>Top Products</h2>
						<p>Your best performing products</p>
					</div>
					<div>
						<div className="space-y-4">
							{mockProducts.map((product, index) => (
								<div key={product.id} className="flex items-center space-x-4">
									<img
										src={product.image}
										alt={product.name}
										className="w-12 h-12 rounded-lg object-cover"
									/>
									<div className="flex-1">
										<p className="font-medium">{product.name}</p>
										<p className="text-sm text-gray-600">
											{product.sales} sales
										</p>
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
			</div> */
}
