'use server';

import prisma from '@/lib/prisma';
import { ProductDetailsSchema, ShopDetailsSchema, ProductCardSchema, CartItemSchema } from '@/types';
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

export const fetchShopDetailsByUserId = async (userId: string): Promise<ShopDetailsSchema | null> => {
	try {
		const shop = await prisma.shop.findUnique({
			where: {
				ownerId: userId,
			},
		});
		if (!shop) {
			throw new Error('Shop not found.');
		}
		return shop;
	} catch (e: any) {
		console.error('Error fetching shop details:', e);
		return null;
	}
};

export const fetchShopDetailsByShopId = async (shopId: string): Promise<ShopDetailsSchema | null> => {
	try {
		const shop = await prisma.shop.findUnique({
			where: {
				id: shopId,
			},
		});
		if (!shop) {
			throw new Error('Shop not found.');
		}
		return shop;
	} catch (e: any) {
		console.error('Error fetching shop details:', e);
		return null;
	}
};

export const fetchCartQuantity = async (userId: string): Promise<number> => {
	try {
		const quantity = await prisma.cart.count({
			where: {
				userId: userId,
			},
		});

		if (!quantity) {
			throw new Error('Cart quantity not found.');
		}

		return quantity;
	} catch (e: any) {
		console.error('Error fetching cart quantity:', e);
		return 0;
	}
};

export const fetchCartItems = async (userId: string): Promise<CartItemSchema[]> => {
	try {
		const items = await prisma.cart.findMany({
			where: {
				userId: userId
			},
			include: {
				product: {
					select: {
						id: true,
						name: true,
						images: true,
						price: true,
						shop: {
							select: {
								name: true
							}
						}
					}
				}
			}
		});

		if (!items) {
			throw new Error('Cart items not found.');
		}

		const cartItems = items.map(item => ({
			id: item.id,
			quantity: item.quantity,
			size: item.size,
			productId: item.productId,
			product: {
				id: item.product.id,
				name: item.product.name,
				image: item.product.images[0],
				price: item.product.price,
				shopName: item.product.shop.name
			}
		}));

		return cartItems;
	} catch (e: any) {
		console.error('Error fetching cart items:', e);
		return [];
	}
};