'use client';

import { Field, Input, Textarea } from '@chakra-ui/react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Upload, Shirt } from 'lucide-react';

// const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function Form() {
	return (
		<div className="w-full md:py-10 bg-gray-50">
			<div className="bg-gray-50 w-full py-16 md:py-6 px-6 md:px-10 max-w-5xl mx-auto flex flex-col justify-center items-center gap-8 rounded-lg">
				<div className="w-full flex flex-col gap-4">
					<Shirt className="h-16 w-16 mx-auto text-brand-purple" />
					<div className="flex flex-col items-center">
						<h2 className="text-2xl font-bold font-roboto">Product Details</h2>
						<p className="text-sm md:text-base text-gray-600 font-roboto">
							Let&apos;s create your first product
						</p>
					</div>
				</div>
				<div className="w-full flex flex-col gap-6">
					<div className="w-full flex flex-col gap-2">
						<Field.Root required className="flex flex-col gap-2">
							<Field.Label className="text-sm md:text-base font-roboto">
								Shop Name <Field.RequiredIndicator color={'purple.500'} />
							</Field.Label>
						</Field.Root>
						<Input
							placeholder="Cyber Ninja"
							className="w-full border border-solid border-gray-300 text-sm md:text-base font-light rounded-sm pl-3 py-1"
						/>
					</div>
					<div className="w-full flex flex-col gap-2">
						<Field.Root required className="flex flex-col gap-2">
							<Field.Label className="text-sm md:text-base font-roboto">
								Product Description <Field.RequiredIndicator color={'purple.500'} />
							</Field.Label>
						</Field.Root>
						<Textarea
							minH="3lh"
							maxH="8lh"
							placeholder="Cyber Ninja is a brand that sells cyber ninja products"
							className="text-sm md:text-base py-1.5 px-2 border border-solid placeholder:text-gray-400 placeholder:font-light border-gray-300 rounded-sm"
							autoresize
						/>
					</div>
					<div className="w-full flex flex-col gap-2">
						<Field.Root required className="flex flex-col gap-2">
							<Field.Label className="text-sm md:text-base font-roboto">
								Select Gender <Field.RequiredIndicator color={'purple.500'} />
							</Field.Label>
						</Field.Root>
						<FormControl
							sx={{ width: '100%', justifyItems: 'center', justifyContent: 'center' }}
							size="small"
						>
							<InputLabel sx={{ fontSize: 15, paddingTop: 0.75, color: '#9ca3af' }}>
								Gender
							</InputLabel>
							<Select
								// value={productDetails.gender}
								label="Gender"
								// onChange={e => {
								// 	setProductDetails(prevState => {
								// 		return {
								// 			...prevState,
								// 			gender: e.target.value,
								// 		};
								// 	});
								// }}
								sx={{ paddingY: 1 }}
							>
								<MenuItem sx={{ fontSize: 15 }} value={'male'}>
									Male
								</MenuItem>
								<MenuItem sx={{ fontSize: 15 }} value={'female'}>
									Female
								</MenuItem>
								<MenuItem sx={{ fontSize: 15 }} value={'unisex'}>
									Unisex
								</MenuItem>
							</Select>
						</FormControl>
					</div>
				</div>
				<div className="w-full flex flex-col gap-2">
					<Field.Root required className="flex flex-col gap-2">
						<Field.Label className="text-sm md:text-base font-roboto">
							Upload Product Images (Min 1, Max 5) <Field.RequiredIndicator color={'purple.500'} />
						</Field.Label>
					</Field.Root>
					<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center flex justify-center items-center">
						<div className="flex flex-col justify-cenetr items-center">
							<Upload className="h-10 w-10 mx-auto text-gray-400 mb-4" />
							<div>
								<button
									onClick={() => document.getElementById('logo-upload')?.click()}
									className="px-3 py-2 rounded-md bg-white text-sm font-semibold font-roboto border border-solid border-gray-400 hover:bg-slate-100 duration-200"
									// disabled={productDetails.designs.length >= 5}
								>
									Upload Designs
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
											// setProductDetails(prevState => {
											// 	return {
											// 		...prevState,
											// 		designs: [...prevState.designs, url],
											// 	};
											// });
										}
									}}
								/>
							</div>
							<p className="text-xs text-gray-500 mt-3">PNG, JPG up to 50MB</p>
						</div>
					</div>
				</div>
				<div>
					{/* {productDetails.designs.length > 0 &&
						productDetails.designs.map((design, index) => (
							<img
								key={index}
								src={design}
								alt={`product design ${index + 1}`}
								className="w-full h-32 object-cover rounded-lg"
							/>
						))} */}
				</div>
				<div className="w-full flex flex-col gap-2">
					<p className="text-xs font-roboto ">
						Available Sizes <span className="text-purple-500">*</span>
					</p>
					<div className="w-full grid grid-cols-3 gap-y-3">
						<button
							// onClick={() => {
							// 	setProductDetails(prevState => {
							// 		const prevValue = prevState.sizes.XS;
							// 		return {
							// 			...prevState,
							// 			sizes: {
							// 				...prevState.sizes,
							// 				XS: !prevValue,
							// 			},
							// 		};
							// 	});
							// }}
							className={`w-[10rem] py-2 text-xs font-roboto border border-solid border-gray-300 rounded-md  duration-200`} // ${!productDetails.sizes.XS ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'}
						>
							XS
						</button>
						<button
							// onClick={() => {
							// 	setProductDetails(prevState => {
							// 		const prevValue = prevState.sizes.S;
							// 		return {
							// 			...prevState,
							// 			sizes: {
							// 				...prevState.sizes,
							// 				S: !prevValue,
							// 			},
							// 		};
							// 	});
							// }}
							className={`w-[10rem] py-2 text-xs font-roboto border border-solid border-gray-300 rounded-md  duration-200`} // ${!productDetails.sizes.S ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'}
						>
							S
						</button>
						<button
							// onClick={() => {
							// 	setProductDetails(prevState => {
							// 		const prevValue = prevState.sizes.M;
							// 		return {
							// 			...prevState,
							// 			sizes: {
							// 				...prevState.sizes,
							// 				M: !prevValue,
							// 			},
							// 		};
							// 	});
							// }}
							className={`w-[10rem] py-2 text-xs font-roboto border border-solid border-gray-300 rounded-md  duration-200`} // ${!productDetails.sizes.M ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'}
						>
							M
						</button>
						<button
							// onClick={() => {
							// 	setProductDetails(prevState => {
							// 		const prevValue = prevState.sizes.L;
							// 		return {
							// 			...prevState,
							// 			sizes: {
							// 				...prevState.sizes,
							// 				L: !prevValue,
							// 			},
							// 		};
							// 	});
							// }}
							className={`w-[10rem] py-2 text-xs font-roboto border border-solid border-gray-300 rounded-md  duration-200`} // ${!productDetails.sizes.L ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'}
						>
							L
						</button>
						<button
							// onClick={() => {
							// 	setProductDetails(prevState => {
							// 		const prevValue = prevState.sizes.XL;
							// 		return {
							// 			...prevState,
							// 			sizes: {
							// 				...prevState.sizes,
							// 				XL: !prevValue,
							// 			},
							// 		};
							// 	});
							// }}
							className={`w-[10rem] py-2 text-xs font-roboto border border-solid border-gray-300 rounded-md duration-200`} // ${!productDetails.sizes.XL ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'}
						>
							XL
						</button>
						<button
							// onClick={() => {
							// 	setProductDetails(prevState => {
							// 		const prevValue = prevState.sizes.XXL;
							// 		return {
							// 			...prevState,
							// 			sizes: {
							// 				...prevState.sizes,
							// 				XXL: !prevValue,
							// 			},
							// 		};
							// 	});
							// }}
							className={`w-[10rem] py-2 text-xs font-roboto border border-solid border-gray-300 rounded-md duration-200`} // ${!productDetails.sizes.XXL ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'}
						>
							XXL
						</button>
					</div>
				</div>
				<div className="w-full flex flex-col gap-2">
					<Field.Root required className="flex flex-col gap-2">
						<Field.Label className="text-xs font-roboto">
							Remaining Stock <Field.RequiredIndicator color={'purple.500'} />
						</Field.Label>
						<Input
							// value={productDetails.remainingStock}
							// onChange={e => {
							// 	setProductDetails(prevState => {
							// 		return {
							// 			...prevState,
							// 			remainingStock: e.target.value,
							// 		};
							// 	});
							// }}
							placeholder="eg. 100"
							className="border border-solid border-gray-200 text-xs font-light rounded-sm pl-3 py-1"
						/>
					</Field.Root>
				</div>
				<div className="w-full flex flex-col gap-2">
					<Field.Root required className="flex flex-col gap-2">
						<Field.Label className="text-xs font-roboto">
							Product Price <Field.RequiredIndicator color={'purple.500'} />
						</Field.Label>
						<Input
							// value={productDetails.price}
							// onChange={e => {
							// 	setProductDetails(prevState => {
							// 		return {
							// 			...prevState,
							// 			price: e.target.value,
							// 		};
							// 	});
							// }}
							placeholder="eg. 1000"
							className="border border-solid border-gray-200 text-xs font-light rounded-sm pl-3 py-1"
						/>
					</Field.Root>
				</div>
				<button>Save Product</button>
			</div>
		</div>
	);
}
