'use client';

import { useState } from 'react';
import Navbar from '@/components/app/navbar/main';
import Footer from '@/components/app/ui/footer';
import { Field, Input, Textarea } from '@chakra-ui/react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const categories = [
	'T-Shirts',
	'Hoodies',
	'Tank Tops',
	'Long Sleeves',
	'Accessories',
	'Stickers',
	'Phone Cases',
	'Mugs',
];

const colorOptions = [
	{ name: 'Black', value: '#000000' },
	{ name: 'White', value: '#FFFFFF' },
	{ name: 'Navy', value: '#1E293B' },
	{ name: 'Gray', value: '#6B7280' },
	{ name: 'Red', value: '#EF4444' },
	{ name: 'Blue', value: '#3B82F6' },
	{ name: 'Green', value: '#10B981' },
	{ name: 'Purple', value: '#8B5CF6' },
	{ name: 'Yellow', value: '#F59E0B' },
	{ name: 'Pink', value: '#EC4899' },
];

const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const AddProduct = () => {
	const [images, setImages] = useState<File[]>([]);
	const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		if (images.length + files.length > 5) {
			// toast.error('Maximum 5 images allowed');
			return;
		}
		setImages([...images, ...files]);
	};

	const removeImage = (index: number) => {
		setImages(images.filter((_, i) => i !== index));
	};

	return (
		<div className="flex flex-col min-h-screen">
			{/* <Navbar /> */}
			<div>
				<div className="w-full flex flex-col gap-2">
					<Field.Root required className="flex flex-col gap-2">
						<Field.Label className="text-xs font-roboto">
							Product Name <Field.RequiredIndicator color={'purple.500'} />
						</Field.Label>
						<Input
							// value={productDetails.name}
							// onChange={e => {
							// 	setProductDetails(prevState => {
							// 		return {
							// 			...prevState,
							// 			name: e.target.value,
							// 		};
							// 	});
							// }}
							placeholder="eg. Cyber Ninja"
							className="border border-solid border-gray-200 text-xs font-light rounded-sm pl-3 py-1"
						/>
					</Field.Root>
					<p className="text-xs font-roboto text-gray-600">
						This will be your unique store URL
					</p>
				</div>
				<div className="w-full flex flex-col gap-2">
					<p className="text-xs font-roboto">
						Product Description <span className="text-purple-500">*</span>
					</p>
					<Textarea
						// value={productDetails.description}
						// onChange={e => {
						// 	setProductDetails(prevState => {
						// 		return {
						// 			...prevState,
						// 			description: e.target.value,
						// 		};
						// 	});
						// }}
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
							// value={productDetails.gender}
							label="Gender"
							// onChange={handleChange}
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
			</div>
			<Footer />
		</div>
	);
};

export default AddProduct;

{
	/* <div className="space-y-4">
										<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
											<Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
											<div>
												<Button
													type="button"
													variant="outline"
													onClick={() =>
														document
															.getElementById('image-upload')
															?.click()
													}
												>
													Upload Images
												</Button>
												<input
													id="image-upload"
													type="file"
													accept="image/*"
													multiple
													className="hidden"
													onChange={handleImageUpload}
												/>
											</div>
											<p className="text-sm text-gray-500 mt-2">
												PNG, JPG up to 10MB each ({images.length}/5)
											</p>
										</div>

										{images.length > 0 && (
											<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
												{images.map((image, index) => (
													<div key={index} className="relative group">
														<img
															src={URL.createObjectURL(image)}
															alt={`Product ${index + 1}`}
															className="w-full h-32 object-cover rounded-lg"
														/>
														<Button
															type="button"
															variant="destructive"
															size="icon"
															className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
															onClick={() => removeImage(index)}
														>
															<X className="h-4 w-4" />
														</Button>
														{index === 0 && (
															<Badge className="absolute bottom-2 left-2 bg-blue-600">
																Main
															</Badge>
														)}
													</div>
												))}
											</div>
										)}
									</div> */
}
