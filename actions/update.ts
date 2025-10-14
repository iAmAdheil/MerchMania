'use server'

import { Sizes } from "@/types";
import prisma from "@/lib/prisma";

export const addToCart = async (userId: string, productId: string, size: Sizes, quantity: number) => {
	try {
		const data = {
			userId: userId,
			productId: productId,
			size: size,
			quantity: quantity,
		}

		const cart = await prisma.cart.create({
			data: data
		});

		if (!cart) {
			throw new Error('Failed to add to cart');
		}

		return 1;
	} catch (error) {
		console.error('Error adding to cart:', error);
		return 0;
	}
}

export const updateCart = async (id: string, quantity: number) => {
	try {
		await prisma.cart.update({
			where: { id: id },
			data: { quantity: quantity }
		});

		return 1;
	} catch (e: any) {
		console.error('Error updating cart:', e.message);
		return 0;
	}
}

export const deleteCartItem = async (id: string) => {
	try {
		await prisma.cart.delete({
			where: { id: id }
		});

		return 1;
	} catch (e: any) {
		console.error('Error deleting cart item:', e.message);
		return 0;
	}
}