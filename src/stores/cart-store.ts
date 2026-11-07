"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product, ProductVariant } from "@/types/store";

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  
  // Actions
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;

  // Getters
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      addItem: (product, variant, quantity = 1) => {
        const itemId = `${product.id}-${variant.id}`;
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex((item) => item.id === itemId);

        if (existingIndex > -1) {
          const updated = [...currentItems];
          const newQty = updated[existingIndex].quantity + quantity;
          // limit max quantity to available stock (or 99 for digital)
          const maxAllowed = product.type === "template" ? 99 : Math.min(product.stock, 50);
          updated[existingIndex].quantity = Math.min(newQty, maxAllowed);
          set({ items: updated, isDrawerOpen: true });
        } else {
          set({
            items: [
              ...currentItems,
              {
                id: itemId,
                product,
                selectedVariant: variant,
                quantity: Math.max(1, quantity),
              },
            ],
            isDrawerOpen: true,
          });
        }
      },

      removeItem: (itemId) => {
        set({
          items: get().items.filter((item) => item.id !== itemId),
        });
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        const updated = get().items.map((item) => {
          if (item.id === itemId) {
            const maxAllowed = item.product.type === "template" ? 99 : Math.min(item.product.stock, 50);
            return { ...item, quantity: Math.min(quantity, maxAllowed) };
          }
          return item;
        });

        set({ items: updated });
      },

      clearCart: () => set({ items: [] }),
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set({ isDrawerOpen: !get().isDrawerOpen }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const basePrice = item.product.price;
          const offset = item.selectedVariant.priceOffset || 0;
          return total + (basePrice + offset) * item.quantity;
        }, 0);
      },
    }),
    {
      name: "crisanthera-cart",
    }
  )
);

