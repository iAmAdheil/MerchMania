import Navbar from '@/components/app/navbar/main';
import Footer from '@/components/app/ui/footer';
import Form from '@/components/app/pages/influencer-new-product/form';

const AddProduct = () => {
	// useEffect(() => {
	// 	return () => {
	// 		// Cleanup function
	// 		if (productDetails.designs.length > 0) {
	// 			productDetails.designs.forEach(url => {
	// 				if (url.startsWith('blob:')) {
	// 					URL.revokeObjectURL(url);
	// 				}
	// 			});
	// 		}
	// 	};
	// }, []);

	return (
		<div className="flex flex-col">
			<Navbar role={'creator'} />
			<Form />
			<Footer />
		</div>
	);
};

export default AddProduct;
