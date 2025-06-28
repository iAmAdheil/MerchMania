'use server';

import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { ShopDetails, ProductDetails } from '@/components/app/pages/influencer-onboarding/mainForm';

const saveImage = async (file: File, filename: string) => {
	cloudinary.config({
		cloud_name: 'dzaj1xdgz',
		api_key: process.env.CLOUDINARY_KEY,
		api_secret: process.env.CLOUDINARY_SECRET,
	});

	try {
		if (file && file.size > 0) {
			const arrayBuffer = await file.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);

			// Convert buffer to base64 data URI
			const base64 = buffer.toString('base64');
			const dataUri = `data:${file.type};base64,${base64}`;

			// Upload using data URI
			const uploadResult = await cloudinary.uploader.upload(dataUri, {
				resource_type: 'image',
				folder: 'shop-logos',
				public_id: filename,
				overwrite: false
			});
			console.log(uploadResult);

			console.log(`Upload success - ${uploadResult.public_id}`);
			return uploadResult.secure_url;
		}
	} catch (e: any) {
		return '';
	}
};

export const saveShopDetails = async (
	shopDetails: ShopDetails,
	productDetails: ProductDetails,
	shopLogo: File | null,
	productDesign: File | null
) => {
	try {
		if (!shopLogo || productDesign) {
			return {
				status: 404,
				msg: 'COuld not find image files'
			}
		}

		const shopLogoURL = await saveImage(shopLogo, shopDetails.name);
		const productDesignURL = await saveImage(shopLogo, shopDetails.name);

		if(!shopLogoURL || !productDesignURL || shopLogoURL.length === 0 || productDesignURL.length === 0) {
			return {
				status: 500,
				msg: 'Could not save images'
			}
		}

		// prisma.$transaction
	} catch(e: any) {

	}
};
