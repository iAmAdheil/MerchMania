import { Input, InputGroup } from '@chakra-ui/react';
import { CiSearch } from 'react-icons/ci';

export default function Searchbar() {
	return (
		<div className="flex-1 max-w-[16rem] sm:max-w-[20rem]">
			<InputGroup
				className="flex flex-row items-center w-full"
				startElement={
					<CiSearch className="ml-3 cursor-pointer text-black dark:text-white" size={16} />
				}
			>
				<Input
					className="h-fit py-2 w-full px-4 border-[0.5px] border-gray-700 rounded-2xl border-opacity-20 font-roboto text-[12px] text-gray-700 dark:text-white dark:placeholder:text-gray-300"
					placeholder="Search products, brands, or influencers..."
				/>
			</InputGroup>
		</div>
	);
}
