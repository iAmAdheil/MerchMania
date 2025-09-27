import ProductCard from '../../ui/productCard';

export default function FeaturedProducts() {
	return (
		<div className="py-10 flex flex-col gap-8 border-b-[0.5px] border-solid border-gray-200">
			<p className="pl-20 w-full text-2xl font-roboto font-bold">Featured Products</p>
			{/* <div className="flex flex-row items-center justify-center gap-x-20 gap-y-16 flex-wrap">
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
				<ProductCard />
			</div> */}
			<div className="flex justify-center">
				<button className="bg-purple-500 px-3 py-2 rounded-md text-sm font-roboto text-white font-semibold hover:opacity-90 hover:scale-95 active:opacity-80 duration-150">
					Explore All Products
				</button>
			</div>
		</div>
	);
}
