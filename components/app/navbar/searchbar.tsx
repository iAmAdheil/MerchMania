import { Input, InputGroup } from '@chakra-ui/react';
import { CiSearch } from 'react-icons/ci';

export default function Searchbar() {
    return (
        <div>            
            <InputGroup startElement={<CiSearch 
				size={18}
			/>}>
                <Input
					placeholder="Search products, brands, or influencers..."
					className=""
				/>
            </InputGroup>
        </div>
    );
}
