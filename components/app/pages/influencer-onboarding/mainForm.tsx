'use client';

import { useState, useEffect } from 'react';
import { Progress } from '@chakra-ui/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import StoreDetailsForm from './storeDetailsForm';
import ProductDetails from './productsDetails';

export default function OnboardingForm() {
	const [progressValue, setProgressValue] = useState(25);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [progressValue]);

	return (
		<div className="py-10 flex justify-center bg-slate-50">
			<div className="w-[40rem] flex flex-col gap-10">
				<div className="flex flex-col gap-3">
					<div className="flex flex-row justify-between items-end">
						<h2 className="text-3xl font-bold">Store setup steps</h2>
						<p className="text-xs text-gray-600">Step 1 of 4</p>
					</div>
					<Progress.Root
						max={100}
						min={0}
						defaultValue={25}
						value={progressValue}
						colorPalette={'purple'}
						variant="outline"
						className="w-full"
					>
						<Progress.Track className="rounded-xl h-2">
							<Progress.Range />
						</Progress.Track>
					</Progress.Root>
				</div>
				<div className="bg-white w-full flex flex-col items-center py-6 px-16 gap-5">
					{/* <StoreDetailsForm /> */}
					<ProductDetails />
					<div className="w-full flex flex-row justify-between mt-2">
						<button
							onClick={() => {
								setProgressValue(prevValue => prevValue - 25);
							}}
							className={`flex flex-row items-center gap-2 text-sm font-semibold border border-solid border-gray-200 px-3 py-1 rounded-md ${progressValue === 25 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-100'}`}
							disabled={progressValue === 25 ? true : false}
						>
							<ArrowLeft className="h-3 w-3" />
							Back
						</button>
						<button
							onClick={() => {
								setProgressValue(prevValue => prevValue + 25);
							}}
							className="flex flex-row items-center gap-2 text-sm text-white font-semibold bg-purple-500 py-1 px-3 rounded-md hover:opacity-80"
						>
							Next
							<ArrowRight className="h-3 w-3" color="white" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
