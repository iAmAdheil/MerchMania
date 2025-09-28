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

export default function OrdersTab() {
	const getStatusBase = (status: string) => {
		if (status === 'delivered') {
			return (
				<div className="bg-green-200 px-2 py-1 rounded-xl w-fit">
					<p className="text-[10px] text-green-800 font-semibold font-roboto">{status}</p>
				</div>
			);
		}
		if (status === 'printing') {
			return (
				<div className="bg-yellow-200 px-2 py-1 rounded-xl w-fit">
					<p className="text-[10px] text-yellow-800 font-semibold font-roboto">{status}</p>
				</div>
			);
		}
		if (status === 'shipped') {
			return (
				<div className="bg-blue-200 px-2 py-1 rounded-xl w-fit">
					<p className="text-[10px] text-blue-800 font-semibold font-roboto">{status}</p>
				</div>
			);
		} else {
			return null;
		}
	};

	return (
		<div className="flex flex-col gap-8 py-2">
			<h2 className="text-2xl font-bold">Order Management</h2>
			<div className="w-full">
				<table className="w-full border border-solid border-gray-200 rounded-md">
					<thead className="bg-gray-100 border-b">
						<tr>
							<th className="text-left p-4 font-semibold">Order ID</th>
							<th className="text-left p-4 font-semibold">Product</th>
							<th className="text-left p-4 font-semibold">Customer</th>
							<th className="text-left p-4 font-semibold">Amount</th>
							<th className="text-left p-4 font-semibold">Status</th>
							<th className="text-left p-4 font-semibold">Actions</th>
						</tr>
					</thead>
					<tbody>
						{mockRecentOrders.map((order, index) => (
							<tr key={`${order.id}-${index}`} className="border-b">
								<td className="p-4 font-mono text-sm">{order.id}</td>
								<td className="p-4 text-sm font-roboto">{order.product}</td>
								<td className="p-4 text-sm font-roboto">{order.customer}</td>
								<td className="p-4 text-sm font-semibold">${order.amount}</td>
								<td className="p-4">{getStatusBase(order.status)}</td>
								<td className="p-4">
									<button className="p-2 text-sm font-roboto rounded-lg hover:bg-slate-200 duration-200">
										View Details
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
