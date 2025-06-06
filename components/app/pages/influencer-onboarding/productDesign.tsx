'use client'

import { Palette, Upload } from "lucide-react"
import { Field, Input } from "@chakra-ui/react"
import { useState } from "react"


export default function ProductDesign() {
	const [sizes, setSizes] = useState({
		'XS': false,
		'S': false,
		'M': false,
		'L': false,
		'XL': false,
		'XXL': false,
	});

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
				<p className='text-xs font-roboto '>Design Upload <span className='text-purple-500'>*</span></p>
				<div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
					<Upload className="h-10 w-10 mx-auto text-gray-400 mb-4" />
					<div>
						<button							
							onClick={() => document.getElementById('logo-upload')?.click()}
							className='px-3 py-2 rounded-md bg-white text-sm font-semibold font-roboto border border-solid border-gray-400 hover:bg-slate-100 duration-200'
						>
							Upload Designs
						</button>
						<input
							id="logo-upload"
							type="file"
							accept="image/*"
							className="hidden"
							// onChange={e => handleFileUpload(e, 'logo')}
						/>
					</div>
					<p className="text-xs text-gray-500 mt-3">PNG, JPG up to 50MB</p>
					{/* {formData.logo && (
						<Badge className="mt-2 bg-green-100 text-green-800">
							{formData.logo.name} uploaded
						</Badge>
					)} */}
				</div>
			</div>
			<div className="w-full flex flex-col gap-2">
				<p className='text-xs font-roboto '>Available Sizes <span className='text-purple-500'>*</span></p>
				<div className="w-full grid grid-cols-3 gap-y-3">
					<button
						onClick={() => {
							setSizes(prevState => {
								const prevValue = prevState.XS;
								return {
									...prevState,
									'XS': !prevValue
								}
							})
						}}						
						className={`w-[10rem] py-2 text-xs font-roboto border border-solid border-gray-300 rounded-md ${!sizes.XS ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'} duration-200`}
					>
						XS
					</button>
					<button
						onClick={() => {
							setSizes(prevState => {
								const prevValue = prevState.S;
								return {
									...prevState,
									'S': !prevValue
								}
							})
						}}
						className={`w-[10rem] py-2 text-xs font-roboto border border-solid border-gray-300 rounded-md ${!sizes.S ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'} duration-200`}
					>
						S
					</button>
					<button
						onClick={() => {
							setSizes(prevState => {
								const prevValue = prevState.M;
								return {
									...prevState,
									'M': !prevValue
								}
							})
						}}
						className={`w-[10rem] py-2 text-xs font-roboto border border-solid border-gray-300 rounded-md ${!sizes.M ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'} duration-200`}
					>
						M
					</button>
					<button
						onClick={() => {
							setSizes(prevState => {
								const prevValue = prevState.L;
								return {
									...prevState,
									'L': !prevValue
								}
							})
						}}
						className={`w-[10rem] py-2 text-xs font-roboto border border-solid border-gray-300 rounded-md ${!sizes.L ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'} duration-200`}
					>
						L
					</button>
					<button
						onClick={() => {
							setSizes(prevState => {
								const prevValue = prevState.XL;
								return {
									...prevState,
									'XL': !prevValue
								}
							})
						}}
						className={`w-[10rem] py-2 text-xs font-roboto border border-solid border-gray-300 rounded-md ${!sizes.XL ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'} duration-200`}
					>
						XL
					</button>
					<button
						onClick={() => {
							setSizes(prevState => {
								const prevValue = prevState.XXL;
								return {
									...prevState,
									'XXL': !prevValue
								}
							})
						}}
						className={`w-[10rem] py-2 text-xs font-roboto border border-solid border-gray-300 rounded-md ${!sizes.XXL ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'} duration-200`}
					>
						XXL
					</button>
				</div>
			</div>
		</>
	)
}