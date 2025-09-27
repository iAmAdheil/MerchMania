'use client';

import { Dispatch, SetStateAction } from 'react';
import { Store, Upload } from 'lucide-react';
import { Field, Input } from '@chakra-ui/react';
import type { ShopDetailsSchema } from '@/types';

export default function StoreDetailsForm({
	shopDetails,
	setShopDetails,
}: {
	shopDetails: ShopDetailsSchema;
	setShopDetails: Dispatch<SetStateAction<ShopDetailsSchema>>;
}) {
	return (
		<>
			<div className="flex flex-col justify-between items-center gap-3 w-full">
				<Store className="h-16 w-16 mx-auto text-brand-purple" />
				<div className="flex flex-col items-center">
					<h2 className="text-2xl font-bold font-roboto">Set Up Your Store</h2>
					<p className="text-sm text-gray-600 font-roboto">
						Let's create your unique brand identity
					</p>
				</div>
			</div>
			<div className="w-full flex flex-col gap-2">
				<Field.Root required className="flex flex-col gap-2">
					<Field.Label className="text-xs font-roboto">
						Shop Name <Field.RequiredIndicator color={'purple.500'} />
					</Field.Label>
					<Input
						value={shopDetails.name}
						onChange={e =>
							setShopDetails(prevState => {
								console.log(e.target.value);
								return {
									...prevState,
									name: e.target.value,
								};
							})
						}
						placeholder="eg. Cyber Ninja"
						className="border border-solid border-gray-200 text-xs font-light rounded-sm pl-3 py-1"
					/>
				</Field.Root>
				<p className="text-xs font-roboto text-gray-600">
					This will be your unique store URL
				</p>
			</div>
			<div className="w-full flex flex-col gap-2">
				<p className="text-xs font-roboto ">
					Store Logo <span className="text-purple-500">*</span>
				</p>
				<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center flex justify-center items-center">
					{shopDetails.logo.length === 0 && (
						<div className="flex flex-col justify-center items-center">
							<Upload className="h-10 w-10 mx-auto text-gray-400 mb-4" />
							<div>
								<button
									onClick={() => {
										const res = document.getElementById('logo-upload')?.click();
									}}
									className="px-3 py-2 rounded-md bg-white text-sm font-semibold font-roboto border border-solid border-gray-400 hover:bg-slate-100 duration-200"
								>
									Upload Logo
								</button>
								<input
									id="logo-upload"
									type="file"
									accept="image/*"
									className="hidden"
									onChange={e => {
										const img = e.target.files?.[0];
										if (img) {
											const url = URL.createObjectURL(img);
											console.log(url);
											setShopDetails(prevState => {
												return {
													...prevState,
													logo: url,
												};
											});
										}
									}}
								/>
							</div>
							<p className="text-xs text-gray-500 mt-3">PNG, JPG up to 10MB</p>
						</div>
					)}
					{shopDetails.logo.length > 0 && <img src={shopDetails.logo} alt="shop logo" />}
				</div>
			</div>
		</>
	);
}
