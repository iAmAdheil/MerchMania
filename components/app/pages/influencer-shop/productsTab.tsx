import ProductCard from '../../ui/productCard';
import useFetchCreatorProducts from '@/hooks/useCreatorProducts';

export default function ProductsTab({ shopId }: { shopId: string }) {
	const { products, isLoading, error } = useFetchCreatorProducts(shopId);

	return (
		<div>
			{products.map(product => {
				return <ProductCard key={product.id} product={product} />;
			})}
		</div>
	);
}
