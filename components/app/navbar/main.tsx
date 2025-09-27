'use client';

import Searchbar from './searchbar';
import { Button } from '@chakra-ui/react';
import CartIcon from './cartIcon';
import { signOut } from '@/auth/auth-client';
import { useRouter } from 'next/navigation';
import { User } from 'lucide-react';

type Props = {
	role?: string | null;
};

export default function Navbar({ role }: Props) {
	const router = useRouter();
	const handleSignOut = async () => {
		try {
			console.log('Signing out...');
			const res = await signOut();
			router.push('/signin');
			console.log(res);
		} catch (e: any) {
			console.log(e);
		}
	};

	const handleNavigation = (route: string) => {
		router.push(route);
	};

	return (
		<div className="bg-white dark:bg-black py-3 border-b-[0.5px] border-solid border-gray-200 shadow-lg flex flex-row justify-between items-center z-10 lg:px-14">
			<div className="flex-1 flex flex-row items-center px-10">
				<div className="w-full flex flex-row items-center gap-6">
					<span className="text-2xl font-roboto font-bold bg-gradient-to-r from-purple-600 to-purple-300 bg-clip-text text-transparent">
						MerchMania
					</span>
					<Searchbar />
				</div>
			</div>
			<div className="hidden flex-1 flex-row items-center lg:flex">
				{role === 'CREATOR' && (
					<div className="w-full flex flex-row items-center justify-end gap-8">
						<button onClick={() => handleNavigation('/influencer/dashboard')}>
							Dashboard
						</button>
						<button onClick={() => handleNavigation('/influencer/new-product')}>
							Create New Product
						</button>
						<button
							onClick={handleSignOut}
							className="flex items-center justify-center w-8 h-8 bg-purple-100 hover:bg-purple-200 rounded-full cursor-pointer transition-colors duration-200"
						>
							<User size={18} className="text-purple-600" />
						</button>
					</div>
				)}
				{role === 'CUSTOMER' && (
					<>
						<div className="w-full flex flex-row items-center justify-end gap-8">
							<button className="text-sm font-roboto text-gray-600 hover:text-purple-500 duration-200">
								Explore
							</button>
							<button className="text-sm font-roboto text-gray-600 hover:text-purple-500 duration-200">
								Our Influencers
							</button>
						</div>
						<div className="flex flex-row items-center gap-6">
							<button>Cart</button>
							<button
								onClick={handleSignOut}
								className="flex items-center justify-center w-8 h-8 bg-purple-100 hover:bg-purple-200 rounded-full cursor-pointer transition-colors duration-200"
							>
								<User size={18} className="text-purple-600" />
							</button>
						</div>
					</>
				)}
				{role === 'STRANGER' && (
					<div className="w-full flex flex-row items-center justify-end gap-8">
						<div className="w-fit flex flex-row justify-between gap-16">
							<button className="text-sm font-roboto text-gray-600 hover:text-purple-500 duration-200">
								Explore
							</button>
							<button className="text-sm font-roboto text-gray-600 hover:text-purple-500 duration-200">
								Our Influencers
							</button>
						</div>
						<div className="flex flex-row items-center gap-6">
							<Button
								// onClick={() => handleNavigation('/signin')}
								onClick={() => handleNavigation('/signin')}
								className="ml-4 text-xs font-semibold font-roboto text-white bg-purple-500 border-gray-600 px-4 rounded-md hover:opacity-80 active:opacity-60"
							>
								Log In
							</Button>
							<Button
								onClick={() => handleNavigation('/signup')}
								className="text-xs font-semibold font-roboto bg-black text-white border border-solid border-gray-600 px-4 rounded-md hover:opacity-80 active:opacity-60"
							>
								Sign Up
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

{
	/* <CartIcon /> */
}
