import { Input, InputGroup } from '@chakra-ui/react';
import { CiSearch } from 'react-icons/ci';

export default function Searchbar() {
	return (
		<div className="relative flex-1 sm:max-w-[30rem]">
			<InputGroup className="flex flex-row items-center w-full">
				<Input
					className="h-fit py-2 w-full pl-4 pr-12 border-[0.5px] border-gray-700 rounded-2xl border-opacity-20 font-roboto text-[13px] sm:text-sm lg:text-[15px] text-gray-700 dark:text-white dark:placeholder:text-gray-300"
					placeholder="Search products, brands, or influencers..."
				/>
			</InputGroup>
			<div className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center hover:bg-gray-100 rounded-full p-2 duration-150">
				<CiSearch
					className="text-black dark:text-white z-100 hover:opacity-70 transition-all duration-300"
					size={18}
				/>
			</div>
		</div>
	);
}
