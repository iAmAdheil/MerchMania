'use server';

import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { ShopDetails, ProductDetails } from '@/components/app/pages/influencer-onboarding/mainForm';

export const saveShopDetails = async (
	shopDetails: ShopDetails,
	productDetails: ProductDetails,
	shopLogo: File | null,
	productDesign: File | null
) => {
	cloudinary.config({
		cloud_name: 'dzaj1xdgz',
		api_key: process.env.CLOUDINARY_KEY,
		api_secret: process.env.CLOUDINARY_SECRET,
	});

	try {
		if (shopLogo && shopLogo.size > 0) {
			const arrayBuffer = await shopLogo.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);

			// Convert buffer to base64 data URI
			const base64 = buffer.toString('base64');
			const dataUri = `data:${shopLogo.type};base64,${base64}`;

			// Upload using data URI
			const uploadResult = await cloudinary.uploader.upload(dataUri, {
				resource_type: 'image',
				folder: 'shop-logos',
				public_id: shopDetails.name,
			});
			console.log(uploadResult);

			console.log(`Upload success - ${uploadResult.public_id}`);
			return uploadResult.secure_url;
		}
	} catch (e: any) {
		console.log(e);
	}
};
