'use server';

import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { generateUniqueId } from '@/utils/cuid';
import { ShopDetailsSchema } from '@/types';

export const saveImage = async (file: File, filename: string, folder: string) => {
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
				folder: folder,
				public_id: filename,
				overwrite: false,
			});
			console.log(uploadResult);

			console.log(`Upload success - ${uploadResult.public_id}`);
			return uploadResult.secure_url;
		}
	} catch (e) {
		console.log(e);
		return '';
	}
};

export const saveShopDetails = async (formData: FormData) => {
	try {
		const shopId = generateUniqueId();

		const logoFile = formData.get('logo') as File;
		const bannerFile = formData.get('banner') as File;

		const shopDetailsString = formData.get('shopDetails') as string;
		const shopDetails = JSON.parse(shopDetailsString) as ShopDetailsSchema;
		const ownerId = formData.get('ownerId') as string;

		const logoUrl = await saveImage(logoFile, `${shopId}-logo.png`, 'shop-logos');
		const bannerUrl = await saveImage(bannerFile, `${shopId}-banner.png`, 'shop-banners');

		const shop = await prisma.shop.create({
			data: {
				id: shopId,
				name: shopDetails.name,
				logo: logoUrl || '',
				banner: bannerUrl || '',
				description: shopDetails.description,
				location: shopDetails.location,
				contact: shopDetails.contact,
				socialLinks: shopDetails.socialLinks,
				ownerId: ownerId,
			},
		});

		const updateUser = await prisma.user.update({
			where: {
				id: ownerId,
			},
			data: {
				isOnboarded: true,
			},
		});
		if (shop && updateUser.isOnboarded) {
			return 1;
		}
		return 0;
	} catch (e) {
		console.log(e);
		return null;
	}
};