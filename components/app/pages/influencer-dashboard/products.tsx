import { Plus } from 'lucide-react';
import useFetchCreatorProducts from '@/hooks/useShopProducts';
import Loader from '@/components/app/ui/loader';

export default function Products({ shopId }: { shopId: string }) {
	const { products, isLoading } = useFetchCreatorProducts(shopId);

	if (isLoading) {
		return (
			<div className="flex flex-col gap-6 justify-center items-center w-full h-[20rem]">
				<Loader size={60} />
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-row justify-between items-center">
				<h2 className="text-2xl md:text-3xl font-bold">Your Products</h2>
				<button className="flex flex-row items-center gap-3 bg-purple-500 rounded-sm px-3 py-2 hover:opacity-80">
					<Plus className="h-3.5 w-3.5" color="white" />
					<p className="text-sm font-semibold text-white font-roboto">Add New Product</p>
				</button>
			</div>
			<div className="w-full">
				<div className="mx-auto w-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
					{products.map(product => {
						return (
							<div
								key={product.id}
								className="flex flex-col gap-5 pb-6 bg-white border-[1px] border-solid border-gray-200 rounded-lg"
							>
								<div className="h-[30rem]">
									<img
										src={product.image}
										alt={product.name}
										className="w-full h-full object-cover border-b-[1px] border-solid border-gray-200 rounded-t-lg"
									/>
								</div>
								<div className="px-3">
									<h2 className="text-lg font-semibold font-roboto">{product.name}</h2>
									{/* <p className="text-sm text-gray-600">
										{product.sales} sales • ${product.revenue} revenue
									</p> */}
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
		</div>
	);
}
