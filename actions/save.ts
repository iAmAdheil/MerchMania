'use server';

import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import type { ShopDetailsSchema, InputProductDetailsSchema } from '@/types';
import { generateUniqueId } from '@/utils/cuid';

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
		console.log(e);
		return '';
	}
};

export const saveShopDetails = async (
	shopDetails: ShopDetailsSchema,
	productDetails: InputProductDetailsSchema,
	shopLogo: File | null,
	productDesign: File | null,
	userId: string
) => {
	try {
		const productId = generateUniqueId();
		const shopId = generateUniqueId();

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

		const shopLogoURL = await saveImage(shopLogo, shopDetails.name + '_' + shopId);
		const productDesignURL = await saveImage(
			shopLogo,
			productDetails.name + '_' + productId + '_' + '1'
		);

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

		await prisma.$transaction(async tx => {
			await tx.shop.create({
				data: {
					id: shopId,
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

			await tx.product.create({
				data: {
					id: productId,
					name: productDetails.name,
					designs: [productDesignURL],
					shopId: shopId,
					description: productDetails.description,
					gender: productDetails.gender,
					sizes: sizesArray,
					price: productDetails.price,
					tags: [],
					inStock: false,
					remainingStock: 0,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			});

			await tx.user.update({
				where: {
					id: userId,
				},
				data: {
					isOnboarded: true,
					shopId: shopId,
				},
			});
		});

		console.log('Shop Id:', shopId);

		return {
			status: 200,
			shopId: shopId,
		};
	} catch (e: any) {
		console.log(e);
		if (e.status === 500 || e.msg === 'Could not save images') {
			// delete any image that got stored
			return {
				status: 500,
				msg: e.message || 'Something went wrong',
			};
		}
	}
};

export const saveProductDetails = async (
	productDetails: InputProductDetailsSchema,
	shopId: string,
	productDesigns: File[]
) => {
	const uploadedDesigns: string[] = [];

	for (const design of productDesigns) {
		const url = await saveImage(design, productDetails.name + Date.now());
		if (!url || url.length === 0) {
			throw new Error('Could not upload product design');
		} else {
			uploadedDesigns.push(url);
		}
	}

	const sizesArray: Sizes[] = [];

	Object.keys(productDetails.sizes).forEach((size: string) => {
		const i: Sizes = size as Sizes;
		if (productDetails.sizes[i]) {
			sizesArray.push(i);
		}
	});

	try {
		const product = await prisma.product.create({
			data: {
				name: productDetails.name,
				description: productDetails.description,
				gender: productDetails.gender,
				sizes: sizesArray,
				price: productDetails.price,
				inStock: parseInt(productDetails.remainingStock) > 0,
				remainingStock: parseInt(productDetails.remainingStock),
				shopId: shopId,
				designs: uploadedDesigns,
			},
		});

		return {
			status: 200,
			productId: product.id,
		};
	} catch (e: any) {
		console.log(e);
		return {
			status: 500,
			msg: e.message || 'Something went wrong',
		};
	}
};
