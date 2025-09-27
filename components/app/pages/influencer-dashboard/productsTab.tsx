import { Plus, Star } from 'lucide-react';

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
	{
		id: 4,
		name: 'Neon Dragon Tee',
		sales: 45,
		revenue: 1349.55,
		image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&auto=format',
	},
];

export default function ProductsTab() {
	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-row justify-between items-center">
				<h2 className="text-2xl font-bold">Your Products</h2>
				<button className="flex flex-row items-center gap-3 bg-purple-500 rounded-sm px-3 py-2 hover:opacity-80">
					<Plus className="h-3.5 w-3.5" color="white" />
					<p className="text-xs font-semibold text-white font-roboto">Add New Product</p>
				</button>
			</div>
			<div className="flex-wrap gap-y-10 flex flex-row justify-between">
				{mockProducts.map(product => {
					return (
						<div
							key={product.id}
							className="flex flex-col gap-5 pb-6 w-[24rem] bg-white border-[1px] border-solid border-gray-200 rounded-lg"
						>
							<div className="h-[30rem]">
								<img
									src={product.image}
									alt={product.name}
									className="w-full h-full object-cover border-b-[1px] border-solid border-gray-200 rounded-t-lg"
								/>
							</div>
							<div className="px-3">
								<h2 className="text-lg font-semibold font-roboto">
									{product.name}
								</h2>
								<p className="text-sm text-gray-600">
									{product.sales} sales • ${product.revenue} revenue
								</p>
							</div>
							<div className="px-3 flex flex-row gap-4">
								<button className="flex-1 py-1 text-sm font-semibold border border-solid border-gray-300 rounded-md hover:bg-slate-100">
									Edit
								</button>
								<button className="flex-1 py-1 text-sm font-semibold border border-solid border-gray-300 rounded-md hover:bg-slate-100">
									View
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
