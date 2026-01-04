'use server';

import prisma from '@/lib/prisma-client';
import {
  ProductDetailsSchema,
  ShopDetailsSchema,
  ProductCardSchema,
  CartItemSchema,
  ProductDisplaySchema
} from '@/types';

export const fetchProductById = async (productId: string): Promise<ProductDisplaySchema | null> => {
  try {
    const product: ProductDetailsSchema | null = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product || !product.shopId) {
      throw new Error('Product with Id not found');
    }
    const shop: ShopDetailsSchema | null = await prisma.shop.findUnique({
      where: {
        id: product.shopId,
      },
    });
    if (!shop) {
      throw new Error('Shop for product not found');
    }

    return {
      product: {
        id: product.id as string,
        name: product.name,
        description: product.description,
        gender: product.gender,
        sizes: product.sizes,
        images: product.images,
        price: product.price,
        inStock: product.inStock,
      },
      shop: {
        id: shop.id as string,
        name: shop.name,
        logo: shop.logo,
      },
    };
  } catch (e: any) {
    console.error('Error fetching product:', e);
    return null;
  }
};

export const fetchShopProductsById = async (shopId: string, count?: number): Promise<ProductCardSchema[]> => {
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

export const fetchShopByUserId = async (userId: string): Promise<ShopDetailsSchema | null> => {
  try {
    const shop = await prisma.shop.findUnique({
      where: {
        ownerId: userId,
      },
    });
    if (!shop) {
      throw new Error('Shop with Id not found');
    }
    return shop;
  } catch (e: any) {
    console.error('Error fetching shop:', e);
    return null;
  }
};

export const fetchShopByShopId = async (shopId: string): Promise<ShopDetailsSchema | null> => {
  try {
    const shop = await prisma.shop.findUnique({
      where: {
        id: shopId,
      },
    });
    if (!shop) {
      throw new Error('Shop with Id not found');
    }
    return shop;
  } catch (e: any) {
    console.error('Error fetching shop:', e);
    return null;
  }
};

export const fetchCartQty = async (userId: string): Promise<number> => {
  try {
    const quantity = await prisma.cartItem.count({
      where: {
        userId: userId,
      },
    });
    if (!quantity) {
      throw new Error('Cart quantity could not be fetched');
    }
    return quantity;
  } catch (e: any) {
    console.error('Error fetching cart quantity:', e);
    return 0;
  }
};

export const fetchCart = async (userId: string): Promise<CartItemSchema[]> => {
  try {
    const items = await prisma.cartItem.findMany({
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
      throw new Error('Cart items not found');
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