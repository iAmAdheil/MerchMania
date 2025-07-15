'use client';

import Searchbar from './searchbar';
import { Button } from '@chakra-ui/react';
import CartIcon from './cartIcon';
import { signOut } from '@/auth/auth-client';
import { useRouter } from 'next/navigation';
import { User } from 'lucide-react';

type Props = {
	isAuth: boolean;
	role: string | null;
};

export default function Navbar({ isAuth, role }: Props) {
	const router = useRouter();
	const handleSignOut = async () => {
		try {
			const res = await signOut();
			console.log(res);
		} catch (e: any) {
			console.log(e);
		}
	};

	const handleNavigation = (route: string) => {
		router.push(route);
	};

	return (
		<div className="bg-white dark:bg-black px-14 py-3 border-b-[0.5px] border-solid border-gray-200 shadow-lg flex flex-row justify-between items-center z-10">
			<div className="flex flex-row items-center gap-6">
				<span className="text-2xl font-roboto font-bold bg-gradient-to-r from-purple-600 to-purple-300 bg-clip-text text-transparent">
					MerchMania
				</span>
				{/* <Searchbar /> */}
				<input type="text" className='w-[30rem]' />
			</div>
			<div className="w-fit flex flex-row justify-between gap-16">
				<button className="text-sm font-roboto text-gray-600 hover:text-purple-500 duration-200">
					Explore
				</button>
				<button className="text-sm font-roboto text-gray-600 hover:text-purple-500 duration-200">
					Our Influencers
				</button>
			</div>
			<div className="flex flex-row items-center gap-6">
				{/* <Button
					// onClick={() => handleNavigation('/signin')}
					onClick={() => signOut()}
					className="ml-4 text-xs font-semibold font-roboto text-white bg-purple-500 border-gray-600 px-4 rounded-md hover:opacity-80 active:opacity-60"
				>
					Log In
				</Button>
				<Button
					onClick={() => handleNavigation('/signup')}
					className="text-xs font-semibold font-roboto bg-black text-white border border-solid border-gray-600 px-4 rounded-md hover:opacity-80 active:opacity-60"
				>
					Sign Up
				</Button> */}
			</div>
			<div className="flex flex-row items-center justify-between gap-4">
				<CartIcon />
				{isAuth && (
					<div className="flex items-center justify-center w-8 h-8 bg-purple-100 hover:bg-purple-200 rounded-full cursor-pointer transition-colors duration-200">
						<User size={18} className="text-purple-600" />
					</div>
				)}
			</div>
		</div>
	);
}

{
	/* <CartIcon /> */
}
