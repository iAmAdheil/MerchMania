import { create } from 'zustand';

export const useCartQuantityStore = create<{
	quantity: number;
	setQuantity: (q: number) => void;
}>((set) => ({
	quantity: 0,
	setQuantity: (q: number) => set({ quantity: q }),
}));