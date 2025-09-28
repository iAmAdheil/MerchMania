'use client';

import { type Dispatch, type SetStateAction } from 'react';
import { DollarSign } from 'lucide-react';
import { Field, Input } from '@chakra-ui/react';
import { ProductDetails } from './mainForm';

export default function ProductPrice({
	productDetails,
	setProductDetails,
}: {
	productDetails: ProductDetails;
	setProductDetails: Dispatch<SetStateAction<ProductDetails>>;
}) {
	return (
		<>
			<div className="flex flex-col justify-between items-center gap-3 w-full">
				<DollarSign className="h-16 w-16 mx-auto text-brand-purple" />
				<div className="flex flex-col items-center">
					<h2 className="text-2xl font-bold font-roboto">Set Your Price</h2>
					<p className="text-sm text-gray-600 font-roboto">
						Choose a competitive price for your product
					</p>
				</div>
			</div>
			<div className="w-full flex flex-col gap-2">
				<Field.Root required className="flex flex-col gap-2">
					<Field.Label className="text-xs font-roboto">
						Product Price <Field.RequiredIndicator color={'purple.500'} />
					</Field.Label>
					<Input
						value={productDetails.price}
						onChange={e => {
							setProductDetails(prevState => {
								return {
									...prevState,
									price: e.target.value,
								};
							});
						}}
						placeholder="$ 29.99"
						className="border border-solid border-gray-200 text-xs font-light rounded-sm pl-3 py-1"
					/>
				</Field.Root>
				<p className="text-xs font-roboto text-gray-600">Recommended price range: $15 - $50</p>
			</div>
		</>
	);
}
