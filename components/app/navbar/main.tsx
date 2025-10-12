'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@chakra-ui/react';
import CartIcon from './cartIcon';
import { RxHamburgerMenu } from 'react-icons/rx';
import { User } from 'lucide-react';
import { signOut } from '@/auth/auth-client';
import Link from 'next/link';
import Searchbar from './searchbar';
import { Roles } from '@/types';

export default function Navbar({ role }: { role: Roles }) {
	const router = useRouter();

	const handleNavigation = (route: string) => {
		router.push(route);
	};

	const handleSignOut = async () => {
		await signOut();
		router.push('/');
	};

	return (
		<div className="border-b-[0.5px] border-solid border-gray-200 shadow-md flex flex-row justify-between items-center z-10">
			<div className="flex-1 flex flex-row items-center px-4 sm:px-6 lg:px-8 xl:px-10">
				<div className="py-2 w-full flex flex-row items-center justify-between gap-4 sm:hidden">
					<RxHamburgerMenu />
					<Searchbar />
					{role === 'creator' && (
						<button className="flex items-center justify-center w-10 h-10 bg-purple-100 hover:bg-purple-200 rounded-full cursor-pointer transition-colors duration-200">
							<User size={22} className="text-purple-600" />
						</button>
					)}
					{role === 'customer' && (
						<>
							<div className="flex flex-row items-center gap-4">
								<CartIcon />
								<button className="flex items-center justify-center w-9 h-9 bg-purple-100 hover:bg-purple-200 rounded-full cursor-pointer transition-colors duration-200">
									<User onClick={handleSignOut} size={20} className="text-purple-600" />
								</button>
							</div>
						</>
					)}
					{(role === 'anonymous' || (role !== 'creator' && role !== 'customer')) && (
						<div className="flex flex-row items-center gap-4">
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

				{/* small screen size navbar */}
				<div className="py-2 w-full hidden flex-row items-center justify-between gap-4 md:gap-6 sm:flex lg:hidden">
					<div className="flex flex-row items-center gap-4 md:gap-6">
						<RxHamburgerMenu className="h-4 w-4 md:h-[18px] md:w-[18px]" />
						<Link
							href="/"
							className="text-2xl font-roboto font-bold bg-gradient-to-r from-purple-600 to-purple-300 bg-clip-text text-transparent hover:cursor-pointer"
						>
							MerchMania
						</Link>
					</div>
					<Searchbar />
					{role === 'creator' && (
						<button className="flex items-center justify-center w-10 h-10 bg-purple-100 hover:bg-purple-200 rounded-full cursor-pointer transition-colors duration-200">
							<User onClick={handleSignOut} size={22} className="text-purple-600" />
						</button>
					)}
					{role === 'customer' && (
						<>
							<div className="flex flex-row items-center gap-4 md:gap-6">
								<CartIcon />
								<button
									onClick={handleSignOut}
									className="flex items-center justify-center w-9 h-9 bg-purple-100 hover:bg-purple-200 rounded-full cursor-pointer transition-colors duration-200"
								>
									<User size={20} className="text-purple-600" />
								</button>
							</div>
						</>
					)}
					{(role === 'anonymous' || (role !== 'creator' && role !== 'customer')) && (
						<div className="flex flex-row items-center gap-4">
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

				{/* large screen size navbar */}
				<div className="py-3 w-full hidden flex-row items-center lg:flex">
					<div className="w-full flex flex-row items-center justify-between gap-8">
						<Link
							href="/"
							className="text-3xl font-roboto font-bold bg-gradient-to-r from-purple-600 to-purple-300 bg-clip-text text-transparent hover:cursor-pointer"
						>
							MerchMania
						</Link>
						<Searchbar />
						<div className="flex flex-row items-center justify-between gap-10">
							{role !== 'creator' ? (
								<>
									<button className="text-[15px] font-roboto text-gray-600 hover:text-purple-500 duration-200">
										Explore
									</button>
									<button className="text-[15px] text-nowrap font-roboto text-gray-600 hover:text-purple-500 duration-200">
										Our Influencers
									</button>
								</>
							) : (
								<div className="flex flex-row items-center gap-8">
									<button
										className="text-sm px-2.5 py-1.5 border border-solid border-purple-600 bg-white text-black text-nowrap font-roboto font-medium rounded-sm hover:opacity-80 active:opacity-50 duration-200"
										onClick={() => handleNavigation('/creator/dashboard')}
									>
										Dashboard
									</button>
									<button
										className="text-sm px-2.5 py-1.5 border border-solid border-purple-600 bg-white text-black text-nowrap font-roboto font-medium rounded-sm hover:opacity-80 active:opacity-50 duration-200"
										onClick={() => handleNavigation('/creator/new-product')}
									>
										Create New Product
									</button>
								</div>
							)}
							<div className="flex flex-row items-center gap-8">
								{role === 'creator' && (
									<>
										<button
											onClick={handleSignOut}
											className="flex items-center justify-center w-10 h-10 bg-purple-100 hover:bg-purple-200 rounded-full cursor-pointer transition-colors duration-200"
										>
											<User size={22} className="text-purple-600" />
										</button>
									</>
								)}
								{role === 'customer' && (
									<>
										<CartIcon />
										<button
											onClick={handleSignOut}
											className="flex items-center justify-center w-10 h-10 bg-purple-100 hover:bg-purple-200 rounded-full cursor-pointer transition-colors duration-200"
										>
											<User size={22} className="text-purple-600" />
										</button>
									</>
								)}
								{(role === 'anonymous' || (role !== 'creator' && role !== 'customer')) && (
									<div className="flex flex-row items-center gap-4 xl:gap-6">
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
		</div>
	);
}
