type Product = {
	id: string;
	name: string;
	image: string;
	price: number;
	brand: string;
	brandImage?: string;
};

// Sample products data
const featuredProducts: Product[] = [
	{
		id: '1',
		name: 'Classic Black Tee',
		image: '/placeholder.svg',
		price: 24.99,
		brand: 'GamingWithAlex',
		brandImage: '/placeholder.svg',
	},
	{
		id: '2',
		name: 'Vintage Logo Hoodie',
		image: '/placeholder.svg',
		price: 49.99,
		brand: 'FashionByEmma',
		brandImage: '/placeholder.svg',
	},
	{
		id: '3',
		name: 'Limited Edition Art Tee',
		image: '/placeholder.svg',
		price: 32.99,
		brand: 'CreativeJordan',
		brandImage: '/placeholder.svg',
	},
	{
		id: '4',
		name: 'Minimalist White Tee',
		image: '/placeholder.svg',
		price: 22.99,
		brand: 'StyleWithSam',
		brandImage: '/placeholder.svg',
	},
	{
		id: '5',
		name: 'Graphic Print Sweater',
		image: '/placeholder.svg',
		price: 39.99,
		brand: 'ArtistryByLia',
		brandImage: '/placeholder.svg',
	},
	{
		id: '6',
		name: 'Eco-Friendly Canvas Tote',
		image: '/placeholder.svg',
		price: 18.99,
		brand: 'EcoWithTaylor',
		brandImage: '/placeholder.svg',
	},
	{
		id: '7',
		name: 'Signature Cap',
		image: '/placeholder.svg',
		price: 19.99,
		brand: 'SportsFanatic',
		brandImage: '/placeholder.svg',
	},
	{
		id: '8',
		name: 'Statement Longsleeve',
		image: '/placeholder.svg',
		price: 34.99,
		brand: 'UrbanExplorer',
		brandImage: '/placeholder.svg',
	},
];

export default function ProductCard() {
	return (
		<div className="w-[20rem] flex flex-col border border-solid border-gray-200 rounded-xl">
			<div className="relative w-full">
				<img
					src={
						'https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png'
					}
					alt={'nike air forces'}
					className="w-full h-[20rem] object-cover"
				/>
				<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
					<div className="flex items-center gap-3">
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
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-1 py-4 px-4">
				<h2 className="font-semibold text-wrap">Air Force 1</h2>
				<h3 className="font-bold text-sm">$ 49.99</h3>
			</div>
		</div>
	);
}
