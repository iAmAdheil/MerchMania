'use server';

import prisma from '@/lib/prisma';
import { ProductDetailsSchema } from '@/types';
import { Details, ReqShopDetailsSchema } from '@/components/app/pages/product/productDetails';

export const fetchProductDetails = async (productId: string, shopId: string): Promise<Details | null> => {
	try {
		const [product, shop]: [ProductDetailsSchema | null, ReqShopDetailsSchema | null] = await Promise.all([
			prisma.product.findUnique({
				where: {
					id: productId,
				},
			}),
			prisma.shop.findUnique({
				where: {
					id: shopId,
				},
			})
		]);

		if (!product || !shop) {
			throw new Error('Product or shop not found.');
		}

		return {
			product: {
				id: product.id,
				name: product.name,
				description: product.description,
				gender: product.gender,
				sizes: product.sizes,
				images: product.images,
				price: product.price,
				inStock: product.inStock,
			},
			shop: {
				id: shop.id,
				name: shop.name,
				logo: shop.logo,
			},
		};
	} catch (e: any) {
		console.error('Error fetching product details:', e);
		return null;
	}
};
