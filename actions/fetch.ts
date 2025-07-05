'use server';

import prisma from '@/lib/prisma';
import type { ProductCardSchema } from '@/types';

export const fetchShopProducts = async (shopId: string) => {
	try {
		const products = await prisma.product.findMany({
			where: {
				shopId: shopId,
			},
		});

		if (!products || products.length === 0) {
			throw new Error('No products found for this shop.');
		}

		const formattedProducts: ProductCardSchema[] = products.map(product => {
			return {
				id: product.id,
				name: product.name,
				image: product.design,
				price: product.price,
			};
		});

		return formattedProducts;
	} catch (error: any) {
		console.error('Error fetching products:', error);
		return [];
	}
};

export const fetchShopDetails = async (shopId: string) => {
	try {
		const shop = await prisma.shop.findUnique({
			where: {
				id: shopId,
			},
		});

		if (!shop) {
			throw new Error('Shop not found.');
		}

		return {
			id: shop.id,
			name: shop.name,
			logo: shop.logo,
		};
	} catch (error: any) {
		console.error('Error fetching shop details:', error);
		return null;
	}
};
