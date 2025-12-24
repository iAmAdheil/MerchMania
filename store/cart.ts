import { create } from 'zustand';

export const useCartQty = create<{
  qty: number;
  setQty: (q: number) => void;
}>((set) => ({
  qty: 0,
  setQty: (q: number) => set({ qty: q }),
}));