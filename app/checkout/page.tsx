'use client';

import { useEffect } from 'react';
import Navbar from '@/components/app/navbar/main';
import Footer from '@/components/app/ui/footer';
import { useSession } from '@/auth/auth-client';
import { useRouter } from 'next/navigation';
import { Roles } from '@/types';
import { Field, Input } from '@chakra-ui/react';

const savedAddresses = [
	{
		id: '1',
		label: 'Home',
		fullAddress: '123 Main St, Apt 4B, New York, NY 10001',
		isDefault: true,
	},
	{
		id: '2',
		label: 'Work',
		fullAddress: '456 Office Plaza, Suite 200, New York, NY 10002',
	},
];

export default function Checkout() {
	const router = useRouter();
	const { data: session, isPending } = useSession();

	useEffect(() => {
		if (!isPending && session?.user?.role !== 'customer') {
			router.push('/');
		}
	}, [router, session, isPending]);

	return (
		<div className="w-full bg-gray-50">
			<Navbar role={(session?.user?.role as Roles) || 'anonymous'} />
			<CheckoutSection />
			<Footer />
		</div>
	);
}

function CheckoutSection() {
	return (
		<div className="mt-4 bg-gray-50 w-full py-16 md:py-6 px-6 md:px-10 max-w-5xl mx-auto flex flex-col justify-center items-center gap-12">
			<div className="w-full flex flex-col gap-4 md:gap-5">
				<h1 className="text-2xl md:text-3xl font-bold font-roboto">Contact Information</h1>
				<div className="w-full flex flex-col gap-6">
					<div className="w-full flex flex-row items-center gap-12">
						<div className="w-full flex flex-col gap-2">
							<Field.Root required className="flex flex-col gap-2">
								<Field.Label className="text-sm md:text-base font-roboto">
									First Name <Field.RequiredIndicator color={'purple.500'} />
								</Field.Label>
							</Field.Root>
							<Input
								placeholder="John"
								className="w-full border border-solid border-gray-300 text-sm md:text-base rounded-sm pl-3 py-1"
								// value={shopName}
								// onChange={e => setShopName(e.target.value)}
							/>
						</div>
						<div className="w-full flex flex-col gap-2">
							<Field.Root required className="flex flex-col gap-2">
								<Field.Label className="text-sm md:text-base font-roboto">Last Name</Field.Label>
							</Field.Root>
							<Input
								placeholder="Doe"
								className="w-full border border-solid border-gray-300 text-sm md:text-base rounded-sm pl-3 py-1"
								// value={shopName}
								// onChange={e => setShopName(e.target.value)}
							/>
						</div>
					</div>
					<div className="w-full flex flex-row items-center gap-12">
						<div className="w-full flex flex-col gap-2">
							<Field.Root required className="flex flex-col gap-2">
								<Field.Label className="text-sm md:text-base font-roboto">Email</Field.Label>
							</Field.Root>
							<Input
								placeholder="john@example.com"
								className="w-full border border-solid border-gray-300 text-sm md:text-base rounded-sm pl-3 py-1"
								// value={shopName}
								// onChange={e => setShopName(e.target.value)}
							/>
						</div>
						<div className="w-full flex flex-col gap-2">
							<Field.Root required className="flex flex-col gap-2">
								<Field.Label className="text-sm md:text-base font-roboto">
									Phone Number <Field.RequiredIndicator color={'purple.500'} />
								</Field.Label>
							</Field.Root>
							<Input
								placeholder="+91 9876543210"
								className="w-full border border-solid border-gray-300 text-sm md:text-base rounded-sm pl-3 py-1"
								// value={shopName}
								// onChange={e => setShopName(e.target.value)}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="w-full flex flex-col gap-4 md:gap-5">
				<h1 className="text-2xl md:text-3xl font-bold font-roboto">Shipping Address</h1>
			</div>
		</div>
	);
}
