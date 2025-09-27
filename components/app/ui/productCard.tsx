import { ProductCardSchema } from '@/types';

export default function ProductCard({ product }: { product: ProductCardSchema }) {
	return (
		<div className="group w-[20rem] flex flex-col border border-solid border-gray-200 rounded-xl hover:scale-105 hover:shadow-lg duration-150">
			<div className="relative w-full">
				<img
					src={product.image}
					alt={'nike air forces'}
					className="w-full h-[20rem] object-cover"
				/>
				<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
					{/* <div className="flex items-center gap-3">
						<div className="h-6 w-6 rounded-full overflow-hidden bg-gray-300">
							<img
								src={
									'https://media.about.nike.com/img/cf68f541-fc92-4373-91cb-086ae0fe2f88/002-nike-logos-swoosh-white.jpg?m=eyJlZGl0cyI6eyJqcGVnIjp7InF1YWxpdHkiOjEwMH0sIndlYnAiOnsicXVhbGl0eSI6MTAwfSwiZXh0cmFjdCI6eyJsZWZ0IjozMzQsInRvcCI6MCwid2lkdGgiOjQwOTAsImhlaWdodCI6MjcyOH0sInJlc2l6ZSI6eyJ3aWR0aCI6OTAwfX19&s=b47e8cc4991bc508a5b762df7d8679aa1406407f56bc774089362de8797930f1'
								}
								alt={'Nike'}
								className="h-full w-full object-fit"
							/>
						</div>
						<span className="text-white text-sm font-medium truncate">{'Nike'}</span>
					</div> */}
				</div>
			</div>
			<div className="flex flex-col gap-1 py-3 px-4">
				<h2 className="font-semibold text-wrap group-hover:text-purple-500 duration-150">
					{product.name}
				</h2>
				<h3 className="font-bold text-sm">$ {product.price}</h3>
			</div>
		</div>
	);
}
