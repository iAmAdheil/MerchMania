import { Input, InputGroup } from '@chakra-ui/react';
import { CiSearch } from 'react-icons/ci';

export default function Searchbar() {
	return (
		<div>
			<InputGroup
				className="flex flex-row items-center"
				startElement={
					<CiSearch
						className="ml-3 cursor-pointer text-black dark:text-white"
						size={18}
					/>
				}
			>
				<Input
					className="h-fit py-2 w-[30rem] px-5 border-[0.5px] border-gray-700 border-opacity-20 font-roboto text-xs font-light dark:text-white dark:placeholder:text-gray-300"
					placeholder="Search products, brands, or influencers..."
				/>
			</InputGroup>
		</div>
	);
}
