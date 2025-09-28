'use client';

import { useState, useEffect } from 'react';
import { blobUrlToFile } from '@/utils/convert';
import Navbar from '@/components/app/navbar/main';
import Footer from '@/components/app/ui/footer';
import { Field, Input, Textarea } from '@chakra-ui/react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Upload, Shirt } from 'lucide-react';
import type { InputProductDetailsSchema, Roles } from '@/types';
import { useSession } from '@/auth/auth-client';
import { useRouter } from 'next/navigation';
import { saveProductDetails } from '@/actions/save';

const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const AddProduct = () => {
	const { data: session, isPending } = useSession();
	const router = useRouter();

	const [role, setRole] = useState<Roles>('STRANGER');
	const [productDetails, setProductDetails] = useState<InputProductDetailsSchema>({
		name: '',
		description: '',
		gender: 'unisex',
		designs: [],
		sizes: {
			XS: false,
			S: false,
			M: false,
			L: false,
			XL: false,
			XXL: false,
		},
		price: '',
		remainingStock: '0',
	});

	useEffect(() => {
		console.log(productDetails.designs);
	}, [productDetails]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if ((!session && !isPending) || (session?.role !== 'CREATOR' && !isPending)) {
			router.replace('/signin');
		} else if (session && session.role === 'CREATOR' && !isPending) {
			setRole(session.role);
		}
	}, [session, isPending]);

	useEffect(() => {
		return () => {
			// Cleanup function
			if (productDetails.designs.length > 0) {
				productDetails.designs.forEach(url => {
					if (url.startsWith('blob:')) {
						URL.revokeObjectURL(url);
					}
				});
			}
		};
	}, []);

	const handleSaveProduct = async () => {
		if (productDetails.designs.length === 0) {
			alert('Please upload at least one product design.');
			return;
		}

		const productDesignFiles = await Promise.all(
			productDetails.designs.map(async (url, index) => {
				const designFile = await blobUrlToFile(url, `product-design-${index}.jpg`);
				return designFile;
			})
		);

		const response = await saveProductDetails(
			productDetails,
			session?.shopId || '',
			productDesignFiles
		);
		if (response.status === 200) {
			alert('Product saved successfully!');
			router.push('/influencer/products');
		} else {
			alert(response.msg || 'Failed to save product. Please try again.');
		}
	};

	return (
		<div className="flex flex-col">
			<Navbar role={role} />
			<div className="max-w-6xl mx-auto px-4 py-8">
				<Shirt className="h-16 w-16 mx-auto text-brand-purple" />
				<div className="flex flex-col items-center">
					<h2 className="text-2xl font-bold font-roboto">Product Details</h2>
					<p className="text-sm text-gray-600 font-roboto">Tell us about your first product</p>
				</div>
				<div className="w-full flex flex-col gap-2">
					<Field.Root required className="flex flex-col gap-2">
						<Field.Label className="text-xs font-roboto">
							Product Name <Field.RequiredIndicator color={'purple.500'} />
						</Field.Label>
						<Input
							value={productDetails.name}
							onChange={e => {
								setProductDetails(prevState => {
									return {
										...prevState,
										name: e.target.value,
									};
								});
							}}
							placeholder="eg. Cyber Ninja"
							className="border border-solid border-gray-200 text-xs font-light rounded-sm pl-3 py-1"
						/>
					</Field.Root>
				</div>
				<div className="w-full flex flex-col gap-2">
					<p className="text-xs font-roboto">
						Product Description <span className="text-purple-500">*</span>
					</p>
					<Textarea
						value={productDetails.description}
						onChange={e => {
							setProductDetails(prevState => {
								return {
									...prevState,
									description: e.target.value,
								};
							});
						}}
						minH="3lh"
						maxH="8lh"
						placeholder=""
						className="text-xs py-1.5 px-2 border border-solid border-gray-300"
						autoresize
					/>
				</div>
				<div className="w-full mt-4">
					<FormControl sx={{ minWidth: 120, width: '100%' }} size="small">
						<InputLabel sx={{ fontSize: 12 }}>Gender</InputLabel>
						<Select
							value={productDetails.gender}
							label="Gender"
							onChange={e => {
								setProductDetails(prevState => {
									return {
										...prevState,
										gender: e.target.value,
									};
								});
							}}
							sx={{ fontSize: 12, paddingY: 1 }}
						>
							<MenuItem sx={{ fontSize: 12 }} value={'male'}>
								Male
							</MenuItem>
							<MenuItem sx={{ fontSize: 12 }} value={'female'}>
								Female
							</MenuItem>
							<MenuItem sx={{ fontSize: 12 }} value={'unisex'}>
								Unisex
							</MenuItem>
						</Select>
					</FormControl>
				</div>
				<div className="w-full flex flex-col gap-2">
					<p className="text-xs font-roboto ">
						Design Upload (Min. 1, Max. 5) <span className="text-purple-500">*</span>
					</p>
					<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center flex justify-center items-center">
						<div className="flex flex-col justify-cenetr items-center">
							<Upload className="h-10 w-10 mx-auto text-gray-400 mb-4" />
							<div>
								<button
									onClick={() => document.getElementById('logo-upload')?.click()}
									className="px-3 py-2 rounded-md bg-white text-sm font-semibold font-roboto border border-solid border-gray-400 hover:bg-slate-100 duration-200"
									disabled={productDetails.designs.length >= 5}
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
											setProductDetails(prevState => {
												return {
													...prevState,
													designs: [...prevState.designs, url],
												};
											});
										}
									}}
								/>
							</div>
							<p className="text-xs text-gray-500 mt-3">PNG, JPG up to 50MB</p>
						</div>
					</div>
				</div>
				<div>
					{productDetails.designs.length > 0 &&
						productDetails.designs.map((design, index) => (
							<img
								key={index}
								src={design}
								alt={`product design ${index + 1}`}
								className="w-full h-32 object-cover rounded-lg"
							/>
						))}
				</div>
				<div className="w-full flex flex-col gap-2">
					<p className="text-xs font-roboto ">
						Available Sizes <span className="text-purple-500">*</span>
					</p>
					<div className="w-full grid grid-cols-3 gap-y-3">
						<button
							onClick={() => {
								setProductDetails(prevState => {
									const prevValue = prevState.sizes.XS;
									return {
										...prevState,
										sizes: {
											...prevState.sizes,
											XS: !prevValue,
										},
									};
								});
							}}
							className={`w-[10rem] py-2 text-xs font-roboto border border-solid border-gray-300 rounded-md ${!productDetails.sizes.XS ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'} duration-200`}
						>
							XS
						</button>
						<button
							onClick={() => {
								setProductDetails(prevState => {
									const prevValue = prevState.sizes.S;
									return {
										...prevState,
										sizes: {
											...prevState.sizes,
											S: !prevValue,
										},
									};
								});
							}}
							className={`w-[10rem] py-2 text-xs font-roboto border border-solid border-gray-300 rounded-md ${!productDetails.sizes.S ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'} duration-200`}
						>
							S
						</button>
						<button
							onClick={() => {
								setProductDetails(prevState => {
									const prevValue = prevState.sizes.M;
									return {
										...prevState,
										sizes: {
											...prevState.sizes,
											M: !prevValue,
										},
									};
								});
							}}
							className={`w-[10rem] py-2 text-xs font-roboto border border-solid border-gray-300 rounded-md ${!productDetails.sizes.M ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'} duration-200`}
						>
							M
						</button>
						<button
							onClick={() => {
								setProductDetails(prevState => {
									const prevValue = prevState.sizes.L;
									return {
										...prevState,
										sizes: {
											...prevState.sizes,
											L: !prevValue,
										},
									};
								});
							}}
							className={`w-[10rem] py-2 text-xs font-roboto border border-solid border-gray-300 rounded-md ${!productDetails.sizes.L ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'} duration-200`}
						>
							L
						</button>
						<button
							onClick={() => {
								setProductDetails(prevState => {
									const prevValue = prevState.sizes.XL;
									return {
										...prevState,
										sizes: {
											...prevState.sizes,
											XL: !prevValue,
										},
									};
								});
							}}
							className={`w-[10rem] py-2 text-xs font-roboto border border-solid border-gray-300 rounded-md ${!productDetails.sizes.XL ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'} duration-200`}
						>
							XL
						</button>
						<button
							onClick={() => {
								setProductDetails(prevState => {
									const prevValue = prevState.sizes.XXL;
									return {
										...prevState,
										sizes: {
											...prevState.sizes,
											XXL: !prevValue,
										},
									};
								});
							}}
							className={`w-[10rem] py-2 text-xs font-roboto border border-solid border-gray-300 rounded-md ${!productDetails.sizes.XXL ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'} duration-200`}
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
							value={productDetails.remainingStock}
							onChange={e => {
								setProductDetails(prevState => {
									return {
										...prevState,
										remainingStock: e.target.value,
									};
								});
							}}
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
							value={productDetails.price}
							onChange={e => {
								setProductDetails(prevState => {
									return {
										...prevState,
										price: e.target.value,
									};
								});
							}}
							placeholder="eg. 1000"
							className="border border-solid border-gray-200 text-xs font-light rounded-sm pl-3 py-1"
						/>
					</Field.Root>
				</div>
				<button onClick={handleSaveProduct}>Save Product</button>
			</div>
			<Footer />
		</div>
	);
};

export default AddProduct;
