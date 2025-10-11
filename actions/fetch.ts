'use server';

import prisma from '@/lib/prisma';
import { ProductDetailsSchema, ShopDetailsSchema, ProductCardSchema } from '@/types';
import { Details } from '@/components/app/pages/product/productDetails';

export const fetchProductDetails = async (productId: string): Promise<Details | null> => {
	try {
		const product: ProductDetailsSchema | null = await prisma.product.findUnique({
			where: {
				id: productId,
			},
		});

		if (!product) {
			throw new Error('Product not found.');
		}

		const shop: ShopDetailsSchema | null = await prisma.shop.findUnique({
			where: {
				id: product.shopId || '',
			},
		});

		if (!shop) {
			throw new Error('Shop not found.');
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
				id: shop.id || '',
				name: shop.name,
				logo: shop.logo,
			},
		};
	} catch (e: any) {
		console.error('Error fetching product details:', e);
		return null;
	}
};

export const fetchShopProducts = async (shopId: string, count?: number): Promise<ProductCardSchema[]> => {
	try {
		const products = await prisma.product.findMany({
			where: {
				shopId: shopId,
			},
			take: count,
		});

		return products.map(product => ({
			id: product.id,
			name: product.name,
			image: product.images[0],
			price: product.price,
		}));
	} catch (e: any) {
		console.error('Error fetching shop products:', e.message);
		return [];
	}
};