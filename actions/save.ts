'use server';

import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import type { ShopDetailsSchema, ProductDetailsSchema } from '@/types';

type Sizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

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
				overwrite: false,
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
	shopDetails: ShopDetailsSchema,
	productDetails: ProductDetailsSchema,
	shopLogo: File | null,
	productDesign: File | null,
	userId: string
) => {
	try {
		if (userId.length === 0) {
			return {
				status: 404,
				msg: 'Invalid user',
			};
		}

		if (!shopLogo || !productDesign) {
			return {
				status: 404,
				msg: 'Could not find image files',
			};
		}

		const shopLogoURL = await saveImage(shopLogo, shopDetails.name);
		const productDesignURL = await saveImage(shopLogo, shopDetails.name);

		if (
			!shopLogoURL ||
			!productDesignURL ||
			shopLogoURL.length === 0 ||
			productDesignURL.length === 0
		) {
			const e = {
				status: 500,
				msg: 'Could not save images',
			};
			throw e;
		}

		const shopId = await prisma.$transaction(async tx => {
			const newShop = await tx.shop.create({
				data: {
					userId: userId,
					name: shopDetails.name,
					logo: shopLogoURL,
					products: { create: [] },
				},
			});

			const sizesArray: Sizes[] = [];

			Object.keys(productDetails.sizes).forEach((size: string) => {
				const i: Sizes = size as Sizes;
				if (productDetails.sizes[i]) {
					sizesArray.push(i);
				}
			});

			const newProduct = await tx.product.create({
				data: {
					name: productDetails.name,
					design: productDesignURL,
					shopId: newShop.id,
					description: productDetails.description,
					gender: productDetails.gender,
					sizes: sizesArray,
					price: productDetails.price,
					tags: [],
				},
			});

			await tx.user.update({
				where: {
					id: userId,
				},
				data: {
					isOnboarded: true,
				},
			});

			return newShop.id;
		});

		console.log('Shop Id:', shopId);

		return {
			status: 200,
			shopId: shopId,
		};
	} catch (e: any) {
		console.log(e);
		if (e.status === 500 || e.msg === 'Could not save images') {
			// delete any image that gto stored
			return {
				status: 500,
				msg: e.message || "Something went wrong",
			}
		}
	}
};
