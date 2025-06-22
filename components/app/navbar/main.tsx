import Searchbar from './searchbar';
import { Button } from '@chakra-ui/react';
import CartIcon from './cartIcon';
import { signOut } from 'next-auth/react';

export default function Navbar() {
	return (
		<div className="bg-white dark:bg-black px-14 py-3 border-b-[0.5px] border-solid border-gray-200 shadow-lg flex flex-row justify-between items-center z-10">
			<div className="flex flex-row items-center gap-6">
				<span className="text-2xl font-roboto font-bold bg-gradient-to-r from-purple-600 to-purple-300 bg-clip-text text-transparent">
					MerchMania
				</span>
				<Searchbar />
			</div>
			<div className='flex-1 flex flex-row justify-between px-12'>
				<button className='text-sm font-roboto text-gray-600 hover:text-purple-500 duration-200'>Explore</button>
				<button className='text-sm font-roboto text-gray-600 hover:text-purple-500 duration-200'>Our Influencers</button>
			</div>
			<div className="flex flex-row items-center gap-6">
				<CartIcon />
				<Button
					onClick={async () => {
						await signOut();
					}}
					className="ml-4 text-xs font-semibold font-roboto text-white bg-purple-500 border-gray-600 px-4 rounded-md hover:opacity-80 active:opacity-60">
					Log In
				</Button>
				<Button className="text-xs font-semibold font-roboto bg-black text-white border border-solid border-gray-600 px-4 rounded-md hover:opacity-80 active:opacity-60">
					Sign Up
				</Button>
			</div>
		</div>
	);
}
