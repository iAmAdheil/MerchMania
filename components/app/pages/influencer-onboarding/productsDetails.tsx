'use client';

import { useState } from 'react';
import { Shirt } from 'lucide-react';
import { Field, Input, Textarea } from '@chakra-ui/react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function ProductDetails() {
	const [gender, setGender] = useState('unisex');

	const handleChange = (event: SelectChangeEvent) => {
		setGender(event.target.value as string);
	};

	return (
		<>
			<div className="flex flex-col justify-between items-center gap-3 w-full">
				<Shirt className="h-16 w-16 mx-auto text-brand-purple" />
				<div className="flex flex-col items-center">
					<h2 className="text-2xl font-bold font-roboto">Product Details</h2>
					<p className="text-sm text-gray-600 font-roboto">
						Tell us about your first product
					</p>
				</div>
			</div>
			<div className="w-full flex flex-col gap-2">
				<Field.Root required className="flex flex-col gap-2">
					<Field.Label className="text-xs font-roboto">
						Product Name <Field.RequiredIndicator color={'purple.500'} />
					</Field.Label>
					<Input
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
					resize="none"
					placeholder=""
					className="text-xs py-1.5 px-2 border border-solid border-gray-300"
				/>
			</div>
			{/* <div className="w-full">
				<Box sx={{ minWidth: 120 }}>
					<FormControl fullWidth className='text-xs'>
						<InputLabel id="demo-simple-select-label" className='text-xs'>Gender</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							value={gender}
							label="Gender"
							onChange={handleChange}
							className='h-12 text-xs'
						>
							<MenuItem className='text-xs' value={'male'}>Male</MenuItem>
							<MenuItem value={'female'}>Female</MenuItem>
							<MenuItem value={'unisex'}>Unisex</MenuItem>
						</Select>
					</FormControl>
				</Box>
			</div> */}
		</>
	);
}
