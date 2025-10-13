'use client';

import { useEffect } from 'react';
import Navbar from '@/components/app/navbar/main';
import Footer from '@/components/app/ui/footer';
import Form from '@/components/app/pages/influencer-new-product/form';
import Loader from '@/components/app/ui/loader';
import { useSession } from '@/auth/auth-client';
import { Roles } from '@/types';
import { useRouter } from 'next/navigation';

const AddProduct = () => {
	const router = useRouter();
	const { data: session, isPending } = useSession();

	useEffect(() => {
		if (!(!isPending && session && session.user.role === 'creator')) {
			router.push('/');
		}
	}, [router, isPending, session]);

	if (isPending) {
		return (
			<div className="min-h-screen flex justify-center items-center">
				<Loader size={60} />
			</div>
		);
	}

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
			<Navbar role={(session?.user?.role as Roles) || 'anonymous'} />
			<Form userId={session?.user?.id || ''} />
			<Footer />
		</div>
	);
};

export default AddProduct;
