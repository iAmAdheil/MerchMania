'use client';

import { useState } from 'react';
import { Field, Input, Textarea } from '@chakra-ui/react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { blobUrlToFile } from '@/utils/convert';
import { X } from 'lucide-react';
import { Upload, Shirt } from 'lucide-react';
import Loader from '@/components/app/ui/loader';
import { ProductDetailsSchema } from '@/types';
import { Sizes } from '@/types';
import { saveProductDetails } from '@/actions/save';
import { fetchShopDetailsByUserId } from '@/actions/fetch';

export default function Form({userId: ownerId}: {userId: string}) {
	const [productName, setProductName] = useState<string>('');
	const [productDescription, setProductDescription] = useState<string>('');
	const [gender, setGender] = useState<'male' | 'female' | 'unisex'>('unisex');
	const [price, setPrice] = useState<string>('');
	const [sizes, setSizes] = useState<Sizes[]>([]);

	const [images, setImages] = useState<string[]>([]);
	const [imageDragActive, setImageDragActive] = useState<boolean>(false);

	const [loading, setLoading] = useState<boolean>(false);

	const handleCreateProduct = async () => {
		try {
			setLoading(true);

			const shopDetails = await fetchShopDetailsByUserId(ownerId);

			const productDetails: ProductDetailsSchema = {
				name: productName,
				description: productDescription,
				gender: gender,
				images: images,
				sizes: sizes,
				price: price,
				inStock: true,
			};

			const imageFile1 = await blobUrlToFile(images[0], 'image1.png');
			const imageFile2 = await blobUrlToFile(images[1], 'image2.png');
			const imageFile3 = await blobUrlToFile(images[2], 'image3.png');
			const imageFile4 = await blobUrlToFile(images[3], 'image4.png');
			const imageFile5 = await blobUrlToFile(images[4], 'image5.png');

			const formData = new FormData();

			formData.append('productDetails', JSON.stringify(productDetails));
			formData.append('image1', imageFile1);
			formData.append('image2', imageFile2);
			formData.append('image3', imageFile3);
			formData.append('image4', imageFile4);
			formData.append('image5', imageFile5);
			formData.append('shopId', shopDetails?.id || '');

			const response = await saveProductDetails(formData);
			if (response === 1) {
				alert('Product created successfully');
			} else {
				alert('Failed to create product. Please try again.');
			}
		} catch (e) {
			console.log(e);
			alert('Failed to create product. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const handleSizeSelect = (size: Sizes) => {
		if (sizes.includes(size)) {
			setSizes(sizes.filter(s => s !== size));
		} else {
			setSizes([...sizes, size]);
		}
	};

	const handleImageUpload = (file: File) => {
		const url = URL.createObjectURL(file);
		setImages([...images, url]);
	};

	const handleDragOver = (e: React.DragEvent, type: 'image') => {
		e.preventDefault();
		e.stopPropagation();
		if (type === 'image') {
			setImageDragActive(true);
		} else {
			setImageDragActive(true);
		}
	};

	const handleDragLeave = (e: React.DragEvent, type: 'image') => {
		e.preventDefault();
		e.stopPropagation();
		if (type === 'image') {
			setImageDragActive(false);
		} else {
			setImageDragActive(false);
		}
	};

	const handleDrop = (e: React.DragEvent, type: 'image') => {
		e.preventDefault();
		e.stopPropagation();
		if (type === 'image') {
			setImageDragActive(false);
		} else {
			setImageDragActive(false);
		}

		const file = e.dataTransfer.files?.[0];
		if (file && images.length < 5) {
			handleImageUpload(file);
		}
	};

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
								Product Name <Field.RequiredIndicator color={'purple.500'} />
							</Field.Label>
						</Field.Root>
						<Input
							placeholder="Cyber Ninja"
							className="w-full border border-solid border-gray-300 placeholder:text-gray-400 text-sm md:text-base rounded-sm pl-3 py-1"
							value={productName}
							onChange={e => setProductName(e.target.value)}
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
							className="text-sm md:text-base py-1.5 px-2 border border-solid placeholder:text-gray-400 border-gray-300 rounded-sm"
							autoresize
							value={productDescription}
							onChange={e => setProductDescription(e.target.value)}
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
							<InputLabel sx={{ fontSize: 15, paddingTop: 1, color: '#9ca3af' }}>Gender</InputLabel>
							<Select
								label="Gender"
								sx={{ paddingY: 1 }}
								value={gender}
								onChange={e => setGender(e.target.value)}
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
					<div className="w-full flex flex-col gap-2">
						<Field.Root required className="flex flex-col gap-2">
							<Field.Label className="text-sm md:text-base font-roboto">
								Upload Images (Min 1, Max 5) <Field.RequiredIndicator color={'purple.500'} />
							</Field.Label>
						</Field.Root>
						<div
							className={`w-full flex flex-col justify-center items-center border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
								imageDragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
							}`}
							onDragOver={e => handleDragOver(e, 'image')}
							onDragLeave={e => handleDragLeave(e, 'image')}
							onDrop={e => handleDrop(e, 'image')}
						>
							<Upload className="h-10 w-10 mx-auto text-gray-400 mb-4" />
							<p className="text-sm md:text-base font-roboto mb-4">
								{imageDragActive ? 'Drop image here' : 'Drag and drop or click to upload'}
							</p>
							<button
								onClick={() => {
									document.getElementById('image-upload')?.click();
								}}
								className="px-3 py-2 rounded-md bg-white text-sm font-semibold font-roboto border border-solid border-gray-400 hover:bg-slate-100 duration-200"
							>
								Upload Images
							</button>
							<input
								id="image-upload"
								type="file"
								accept="image/*"
								className="hidden"
								onChange={e => {
									const img = e.target.files?.[0];
									if (img) {
										handleImageUpload(img);
									}
								}}
							/>
							<div className="flex flex-col gap-2">
								<p className="text-xs text-gray-500 mt-6">Preferred dimensions: 500 x 500</p>
								<p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
							</div>
						</div>
						{images.length > 0 && (
							<div className="flex-wrap flex flex-row items-center gap-x-4 gap-y-4 mt-4">
								{images.map((image, index) => (
									<div key={index} className="h-40 w-40 object-cover rounded-lg relative">
										<div
											className="absolute -top-3 -right-3 cursor-pointer z-10 p-1 bg-gray-50 rounded-full"
											onClick={() => setImages(images.filter((_, i) => i !== index))}
										>
											<X className="h-3 w-3 md:h-4 md:w-4 text-gray-400" />
										</div>
										<img
											src={image}
											alt={`product image ${index + 1}`}
											className="w-full h-full object-cover rounded-lg"
										/>
									</div>
								))}
							</div>
						)}
					</div>
					<div className="w-full flex flex-col gap-2">
						<Field.Root required className="flex flex-col gap-2">
							<Field.Label className="text-sm md:text-base font-roboto">
								Available Sizes <Field.RequiredIndicator color={'purple.500'} />
							</Field.Label>
						</Field.Root>
						<div className="w-full flex flex-col gap-4">
							<div className="w-full flex flex-row items-center gap-x-4">
								<button
									onClick={() => handleSizeSelect('XS')}
									className={`flex-1 py-2 text-sm font-roboto border border-solid border-gray-300 rounded-md  duration-200 ${!sizes.includes('XS') ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'}`}
								>
									XS
								</button>
								<button
									onClick={() => handleSizeSelect('S')}
									className={`flex-1 py-2 text-sm font-roboto border border-solid border-gray-300 rounded-md  duration-200 ${!sizes.includes('S') ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'}`}
								>
									S
								</button>
								<button
									onClick={() => handleSizeSelect('M')}
									className={`flex-1 py-2 text-sm font-roboto border border-solid border-gray-300 rounded-md  duration-200 ${!sizes.includes('M') ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'}`}
								>
									M
								</button>
							</div>
							<div className="w-full flex flex-row items-center gap-x-4">
								<button
									onClick={() => handleSizeSelect('L')}
									className={`flex-1 py-2 text-sm font-roboto border border-solid border-gray-300 rounded-md  duration-200 ${!sizes.includes('L') ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'}`}
								>
									L
								</button>
								<button
									onClick={() => handleSizeSelect('XL')}
									className={`flex-1 py-2 text-sm font-roboto border border-solid border-gray-300 rounded-md duration-200 ${!sizes.includes('XL') ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'}`}
								>
									XL
								</button>
								<button
									onClick={() => handleSizeSelect('XXL')}
									className={`flex-1 py-2 text-sm font-roboto border border-solid border-gray-300 rounded-md duration-200 ${!sizes.includes('XXL') ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'}`}
								>
									XXL
								</button>
							</div>
						</div>
					</div>
					<div className="w-full flex flex-col gap-2">
						<Field.Root required className="flex flex-col gap-2">
							<Field.Label className="text-sm md:text-base font-roboto">
								Product Price (in INR) <Field.RequiredIndicator color={'purple.500'} />
							</Field.Label>
						</Field.Root>
						<Input
							placeholder=""
							className="border border-solid border-gray-200 text-sm md:text-base rounded-sm pl-3 py-1"
							value={price}
							onChange={e => setPrice(e.target.value)}
						/>
					</div>
				</div>
				<div className="w-full flex justify-center sm:justify-start">
					<button
						onClick={handleCreateProduct}
						className="max-w-32 md:max-w-36 w-full bg-white text-black text-sm md:text-base font-roboto rounded-sm px-4 py-2 border border-solid border-purple-500 flex items-center justify-center"
					>
						{loading ? <Loader size={20} /> : 'Save Product'}
					</button>
				</div>
			</div>
		</div>
	);
}
