'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@chakra-ui/react';
import CartIcon from './cartIcon';
import { RxHamburgerMenu } from 'react-icons/rx';
import { User } from 'lucide-react';
import Link from 'next/link';
import Searchbar from './searchbar';
import { Roles } from '@/types';

export default function Navbar({ role }: { role: Roles }) {
	const router = useRouter();

	const handleNavigation = (route: string) => {
		router.push(route);
	};

	return (
		<div className="py-2 border-b-[0.5px] border-solid border-gray-200 shadow-lg flex flex-row justify-between items-center z-10 lg:py-4">
			<div className="flex-1 flex flex-row items-center px-6 lg:px-10">
				<div className="w-full flex flex-row items-center justify-between sm:hidden">
					<RxHamburgerMenu />
					<Searchbar />
				</div>

				{/* small screen size navbar */}
				<div className="w-full hidden flex-row items-center justify-between gap-10 sm:flex lg:hidden">
					<div className="flex-1 flex flex-row items-center gap-4 md:gap-6">
						<RxHamburgerMenu />
						<Link
							href="/"
							className="text-xl font-roboto font-bold bg-gradient-to-r from-purple-600 to-purple-300 bg-clip-text text-transparent hover:cursor-pointer"
						>
							MerchMania
						</Link>
						<Searchbar />
					</div>
					<div className="flex flex-row items-center justify-end flex-shrink-0">
						{role === 'creator' && (
							<div className="flex flex-row items-center gap-10">
								<button className="flex items-center justify-center w-9 h-9 bg-purple-100 hover:bg-purple-200 rounded-full cursor-pointer transition-colors duration-200">
									<User size={20} className="text-purple-600" />
								</button>
							</div>
						)}
						{role === 'customer' && (
							<div className="flex flex-row items-center gap-10">
								<CartIcon />
								<button className="flex items-center justify-center w-9 h-9 bg-purple-100 hover:bg-purple-200 rounded-full cursor-pointer transition-colors duration-200">
									<User size={20} className="text-purple-600" />
								</button>
							</div>
						)}
						{(role === 'anonymous' || (role !== 'creator' && role !== 'customer')) && (
							<div className="flex flex-row items-center gap-6">
								<Button
									onClick={() => handleNavigation('/signin')}
									className="text-xs font-semibold font-roboto text-white bg-purple-500 border-gray-600 px-4 rounded-md hover:opacity-80 active:opacity-60"
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
						)}
					</div>
				</div>

				{/* large screen size navbar */}
				<div className="w-full hidden flex-row items-center lg:flex gap-10">
					<div className="flex-1 flex flex-row items-center justify-start gap-4">
						<Link
							href="/"
							className="text-3xl font-roboto font-bold bg-gradient-to-r from-purple-600 to-purple-300 bg-clip-text text-transparent hover:cursor-pointer"
						>
							MerchMania
						</Link>
						<Searchbar />
					</div>
					<div className="flex-shrink-0 flex flex-row items-center gap-20">
						<div className="flex flex-row items-center flex-shrink-0">
							{role !== 'creator' ? (
								<div className="flex flex-row items-center gap-10">
									<button className="text-sm font-roboto text-gray-600 hover:text-purple-500 duration-200">
										Explore
									</button>
									<button className="text-nowrap text-sm font-roboto text-gray-600 hover:text-purple-500 duration-200">
										Our Influencers
									</button>
								</div>
							) : (
								<div className="flex flex-row items-center gap-10">
									<button onClick={() => handleNavigation('/influencer/dashboard')}>
										Dashboard
									</button>
									<button onClick={() => handleNavigation('/influencer/new-product')}>
										Create New Product
									</button>
								</div>
							)}
						</div>
						<div className="flex-1 flex flex-row items-center justify-end flex-shrink-0">
							{role === 'creator' && (
								<>
									<button className="flex items-center justify-center w-10 h-10 bg-purple-100 hover:bg-purple-200 rounded-full cursor-pointer transition-colors duration-200">
										<User size={22} className="text-purple-600" />
									</button>
								</>
							)}
							{role === 'customer' && (
								<div className="flex flex-row items-center gap-10">
									<CartIcon />
									<button className="flex items-center justify-center w-10 h-10 bg-purple-100 hover:bg-purple-200 rounded-full cursor-pointer transition-colors duration-200">
										<User size={22} className="text-purple-600" />
									</button>
								</div>
							)}
							{(role === 'anonymous' || (role !== 'creator' && role !== 'customer')) && (
								<div className="flex flex-row items-center gap-6">
									<Button
										onClick={() => handleNavigation('/signin')}
										className="text-xs font-semibold font-roboto text-white bg-purple-500 border-gray-600 px-4 rounded-md hover:opacity-80 active:opacity-60"
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
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
