"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/store";

interface WishlistState {
  items: Product[];
  toggleWishlist: (product: Product) => boolean; // returns true if added, false if removed
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getWishlistCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleWishlist: (product) => {
        const current = get().items;
        const exists = current.some((p) => p.id === product.id);

        if (exists) {
          set({ items: current.filter((p) => p.id !== product.id) });
          return false;
        } else {
          set({ items: [...current, product] });
          return true;
        }
      },
      isInWishlist: (productId) => {
        return get().items.some((p) => p.id === productId);
      },
      clearWishlist: () => set({ items: [] }),
      getWishlistCount: () => get().items.length,
    }),
    {
      name: "crisanthera-wishlist",
    }
  )
);

