import { Input, InputGroup } from '@chakra-ui/react';
import { CiSearch } from 'react-icons/ci';

export default function Searchbar() {
    return (
        <div>            
            <InputGroup
                className="flex flex-row items-center"
                startElement={
                    <CiSearch className="ml-3 cursor-pointer" size={18} />
                }
            >
                <Input
                    className="h-fit py-2 w-[30rem] px-5 border border-white border-opacity-20 font-roboto text-xs font-light"
                    placeholder="Search products, brands, or influencers..."
                />
            </InputGroup>
        </div>
    );
}
