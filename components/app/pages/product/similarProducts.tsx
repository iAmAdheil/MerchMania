import { ProductCardSchema } from '@/types';

export default function SimilarProducts({ products }: { products: ProductCardSchema[] }) {
	return (
		<div className="w-full px-8 md:px-10 lg:px-12 xl:px-16 py-12">
			<div className="mx-auto w-fit grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-8 md:gap-x-10 gap-y-10">
				{products.map(product => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}

function ProductCard({ product }: { product: ProductCardSchema }) {
	return (
		<div className="max-w-[25rem] w-full flex flex-col border border-solid border-gray-200 rounded-sm overflow-hidden group hover:shadow-md duration-150">
			<div className="relative w-full overflow-hidden">
				<img
					src={product.image}
					alt={'nike air forces'}
					className="w-full aspect-square object-cover hover:scale-105 duration-150"
				/>
				<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-black/10 p-2 sm:p-3">
					<div className="px-2 sm:px-3 flex items-center gap-2">
						<div className="h-4 w-4 sm:h-6 sm:w-6 rounded-full overflow-hidden bg-gray-300">
							<img
								src={
									'https://media.about.nike.com/img/cf68f541-fc92-4373-91cb-086ae0fe2f88/002-nike-logos-swoosh-white.jpg?m=eyJlZGl0cyI6eyJqcGVnIjp7InF1YWxpdHkiOjEwMH0sIndlYnAiOnsicXVhbGl0eSI6MTAwfSwiZXh0cmFjdCI6eyJsZWZ0IjozMzQsInRvcCI6MCwid2lkdGgiOjQwOTAsImhlaWdodCI6MjcyOH0sInJlc2l6ZSI6eyJ3aWR0aCI6OTAwfX19&s=b47e8cc4991bc508a5b762df7d8679aa1406407f56bc774089362de8797930f1'
								}
								alt={'Nike'}
								className="h-full w-full object-fit"
							/>
						</div>
						<p className="text-white text-sm sm:text-base font-medium truncate">{'Nike'}</p>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-1 py-4 px-4 lg:px-6">
				<h2 className="font-semibold text-wrap text-sm sm:text-base lg:text-lg group-hover:text-purple-500 duration-150">
					{product.name}
				</h2>
				<h3 className="font-bold text-sm sm:text-base lg:text-lg">₹ {product.price}</h3>
			</div>
		</div>
	);
}
