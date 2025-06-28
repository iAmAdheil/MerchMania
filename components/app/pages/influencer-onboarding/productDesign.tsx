'use client';

import { Palette, Upload } from 'lucide-react';
import { Field, Input } from '@chakra-ui/react';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { ProductDetails } from './mainForm';

export default function ProductDesign({
	productDetails,
	setProductDetails,
}: {
	productDetails: ProductDetails;
	setProductDetails: Dispatch<SetStateAction<ProductDetails>>;
}) {
	return (
		<>
			<div className="flex flex-col justify-between items-center gap-3 w-full">
				<Palette className="h-16 w-16 mx-auto text-brand-purple" />
				<div className="flex flex-col items-center">
					<h2 className="text-2xl font-bold font-roboto">Upload Your Design</h2>
					<p className="text-sm text-gray-600 font-roboto">
						Upload your artwork and choose options
					</p>
				</div>
			</div>
			<div className="w-full flex flex-col gap-2">
				<p className="text-xs font-roboto ">
					Design Upload <span className="text-purple-500">*</span>
				</p>
				<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center flex justify-center items-center">
					{productDetails.design.length === 0 && (
						<div className='flex flex-col justify-cenetr items-center'>
							<Upload className="h-10 w-10 mx-auto text-gray-400 mb-4" />
							<div>
								<button
									onClick={() => document.getElementById('logo-upload')?.click()}
									className="px-3 py-2 rounded-md bg-white text-sm font-semibold font-roboto border border-solid border-gray-400 hover:bg-slate-100 duration-200"
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
													design: url,
												};
											});
										}
									}}
								/>
							</div>
							<p className="text-xs text-gray-500 mt-3">PNG, JPG up to 50MB</p>
						</div>
					)}
					{productDetails.design.length > 0 && <img src={productDetails.design} alt="product image" />}
				</div>
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
		</>
	);
}
