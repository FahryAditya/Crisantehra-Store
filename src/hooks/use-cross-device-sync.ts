"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { useToastStore } from "@/stores/toast-store";

export function useCrossDeviceSync() {
  const { user, isAuthenticated } = useAuthStore();
  const { items: cartItems, addItem } = useCartStore();
  const { items: wishlistItems, toggleWishlist } = useWishlistStore();
  const { addToast } = useToastStore();

  const isInitialSyncDone = useRef(false);
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Initial Pull on User Login
  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      isInitialSyncDone.current = false;
      return;
    }

    if (isInitialSyncDone.current) return;

    async function pullCloudState() {
      try {
        const res = await fetch(`/api/sync?userId=${user?.id}`);
        if (!res.ok) return;

        const result = await res.json();
        const cloudData = result.data;

        if (cloudData) {
          let mergedCount = 0;

          // Merge cloud cart items into local cart if not present
          if (Array.isArray(cloudData.cartItems) && cloudData.cartItems.length > 0) {
            cloudData.cartItems.forEach((cloudItem: any) => {
              const exists = cartItems.some((local) => local.id === cloudItem.id);
              if (!exists && cloudItem.product && cloudItem.selectedVariant) {
                addItem(cloudItem.product, cloudItem.selectedVariant, cloudItem.quantity);
                mergedCount++;
              }
            });
          }

          // Merge cloud wishlist items
          if (Array.isArray(cloudData.wishlist) && cloudData.wishlist.length > 0) {
            cloudData.wishlist.forEach((cloudProd: any) => {
              const exists = wishlistItems.some((local) => local.id === cloudProd.id);
              if (!exists && cloudProd.id) {
                toggleWishlist(cloudProd);
                mergedCount++;
              }
            });
          }

          if (mergedCount > 0) {
            addToast({
              title: "Sinkronisasi Berhasil",
              message: `Menyinkronkan ${mergedCount} item dari sesi perangkat Anda yang lain.`,
              type: "success",
            });
          }
        }
      } catch (err) {
        console.error("Gagal sinkronisasi data cloud:", err);
      } finally {
        isInitialSyncDone.current = true;
      }
    }

    pullCloudState();
  }, [isAuthenticated, user?.id, addItem, cartItems, toggleWishlist, wishlistItems, addToast]);

  // 2. Debounced Push to Cloud on local changes
  useEffect(() => {
    if (!isAuthenticated || !user?.id || !isInitialSyncDone.current) return;

    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }

    syncTimeoutRef.current = setTimeout(async () => {
      try {
        await fetch("/api/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: user.id,
            cartItems,
            wishlist: wishlistItems,
          }),
        });
      } catch (err) {
        console.error("Auto sync push error:", err);
      }
    }, 1500);

    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, [cartItems, wishlistItems, isAuthenticated, user?.id]);
}

