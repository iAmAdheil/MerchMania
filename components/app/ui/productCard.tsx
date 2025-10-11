import { ProductCardSchema } from '@/types';

const product: ProductCardSchema = {
	id: '1',
	name: 'Nike Air Forces',
	image:
		'https://res.cloudinary.com/dzaj1xdgz/image/upload/v1759867755/shop-logos/cmggztk3n0000uauf36dtb682-logo.png.jpg',
	price: '100',
};

export default function ProductCard() {
	return (
		<div className="max-w-[25rem] w-full flex flex-col border border-solid border-gray-200 rounded-sm overflow-hidden group hover:shadow-md duration-150">
			<div className="relative w-full overflow-hidden">
				<img
					src={product.image}
					alt={'nike air forces'}
					className="w-full aspect-square object-cover hover:scale-105 duration-150"
				/>
				<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-black/10 p-3">
					<div className="px-3 flex items-center gap-4">
						<div className="h-6 w-6 rounded-full overflow-hidden bg-gray-300">
							<img
								src={
									'https://media.about.nike.com/img/cf68f541-fc92-4373-91cb-086ae0fe2f88/002-nike-logos-swoosh-white.jpg?m=eyJlZGl0cyI6eyJqcGVnIjp7InF1YWxpdHkiOjEwMH0sIndlYnAiOnsicXVhbGl0eSI6MTAwfSwiZXh0cmFjdCI6eyJsZWZ0IjozMzQsInRvcCI6MCwid2lkdGgiOjQwOTAsImhlaWdodCI6MjcyOH0sInJlc2l6ZSI6eyJ3aWR0aCI6OTAwfX19&s=b47e8cc4991bc508a5b762df7d8679aa1406407f56bc774089362de8797930f1'
								}
								alt={'Nike'}
								className="h-full w-full object-fit"
							/>
						</div>
						<p className="text-white text-base font-medium truncate">{'Nike'}</p>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-1 py-4 px-6">
				<h2 className="font-semibold text-wrap text-lg group-hover:text-purple-500 duration-150">
					{product.name}
				</h2>
				<h3 className="font-bold text-lg">₹ {product.price}</h3>
			</div>
		</div>
	);
}
