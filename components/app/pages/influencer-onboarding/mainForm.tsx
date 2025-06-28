'use client';

import { useState, useEffect } from 'react';
import { Progress } from '@chakra-ui/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import StoreDetailsForm from './storeDetailsForm';
import ProductDetails from './productsDetails';
import ProductDesign from './productDesign';
import ProductPrice from './productPrice';
import { useRouter } from 'next/navigation';
import { blobUrlToFile } from '@/utils/blobtoFIle';
import { useSession } from '@/auth/auth-client';
import { saveShopDetails } from '@/actions/save';

export type ShopDetails = {
	name: string;
	logo: string;
};

type Sizes = {
	XS: boolean;
	S: boolean;
	M: boolean;
	L: boolean;
	XL: boolean;
	XXL: boolean;
};

const initialSizes = {
	XS: false,
	S: false,
	M: false,
	L: false,
	XL: false,
	XXL: false,
};

export type ProductDetails = {
	name: string;
	description: string;
	gender: string;
	design: string;
	sizes: Sizes;
	price: string;
};

export default function OnboardingForm() {
	const router = useRouter();

	const [progressValue, setProgressValue] = useState(25);
	const [isNextDisabled, setIsNextDisabled] = useState(true);
	const [shopDetails, setShopDetails] = useState({
		name: '',
		logo: '',
	});
	const [productDetails, setProductDetails] = useState<ProductDetails>({
		name: '',
		description: '',
		gender: 'unisex',
		sizes: initialSizes,
		design: '',
		price: '',
	});

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [progressValue]);

	useEffect(() => {		
		if (progressValue === 25 && shopDetails.name.length > 0 && shopDetails.logo.length > 0) {
			setIsNextDisabled(false);
		} else if (
			progressValue === 50 &&
			productDetails.name.length > 0 &&
			productDetails.description.length > 0
		) {
			setIsNextDisabled(false);
		} else if (progressValue === 75 && productDetails.design.length > 0) {
			setIsNextDisabled(false);
		} else if (progressValue === 100 && productDetails.price.length > 0) {
			setIsNextDisabled(false);
		} else {
			setIsNextDisabled(true);
		}
	}, [shopDetails, productDetails, progressValue]);

	const handleCreateShop = async () => {
		try {
			let shopLogo: File | null = null;
			let productDesign: File | null = null;

			if (shopDetails.logo.length > 0 && shopDetails.logo.startsWith('blob:')) {
				shopLogo = await blobUrlToFile(shopDetails.logo, 'shop-logo.jpg');
			}
			if (productDetails.design.length > 0 && productDetails.design.startsWith('blob:')) {
				productDesign = await blobUrlToFile(productDetails.design, 'product-design.jpg');
			}

			if (!shopLogo || !productDesign) {
				// show error that something went wrong
				return;
			}

			const res = await saveShopDetails(shopDetails, productDetails, shopLogo, productDesign);
			console.log(res);
		} catch (e: any) {
			console.log(e);
		}
	};

	return (
		<div className="py-10 flex justify-center bg-slate-50">
			<div className="w-[40rem] flex flex-col gap-10">
				<div className="flex flex-col gap-3">
					<div className="flex flex-row justify-between items-end">
						<h2 className="text-3xl font-bold">Store setup steps</h2>
						<p className="text-xs text-gray-600">Step {progressValue / 25} of 4</p>
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
					{progressValue === 25 && (
						<StoreDetailsForm
							shopDetails={shopDetails}
							setShopDetails={setShopDetails}
						/>
					)}
					{progressValue === 50 && (
						<ProductDetails
							productDetails={productDetails}
							setProductDetails={setProductDetails}
						/>
					)}
					{progressValue === 75 && (
						<ProductDesign
							productDetails={productDetails}
							setProductDetails={setProductDetails}
						/>
					)}
					{progressValue === 100 && (
						<ProductPrice
							productDetails={productDetails}
							setProductDetails={setProductDetails}
						/>
					)}
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
						<div className="flex flex-row gap-3">
							<button
								onClick={() => {
									if (progressValue < 100) {
										setProgressValue(prevValue => prevValue + 25);
									} else {
										handleCreateShop();
									}
								}}
								className={`flex flex-row items-center gap-2 text-sm text-white font-semibold bg-purple-500 py-1 px-3 rounded-md ${isNextDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-80 duration-200'}`}
								// disabled={isNextDisabled}
								disabled={false}
							>
								{progressValue !== 100 ? 'Next' : 'Save'}
								<ArrowRight className="h-3 w-3" color="white" />
							</button>
							{/* <button
								onClick={() => {
									router.push('/');
								}}
								className="flex flex-row items-center bg-white text-sm text-black font-semibold border border-solid border-purple-500 py-1 px-3 rounded-md hover:bg-slate-100 duration-200"
							>
								Skip Store Setup
							</button> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
