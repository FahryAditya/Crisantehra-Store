"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Heart, ShoppingBag, User } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";

export function MobileBottomBar() {
  const pathname = usePathname();
  const { toggleDrawer, getTotalItems } = useCartStore();
  const { getWishlistCount } = useWishlistStore();

  const totalItems = getTotalItems();
  const totalWishlist = getWishlistCount();

  // On Product Detail page, let the sticky buy action bar take priority
  if (pathname.startsWith("/product/")) {
    return null;
  }

  const navItems = [
    {
      label: "Beranda",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      label: "Katalog",
      href: "/catalog",
      icon: Compass,
      isActive: pathname.startsWith("/catalog"),
    },
    {
      label: "Wishlist",
      href: "/wishlist",
      icon: Heart,
      isActive: pathname === "/wishlist",
      badge: totalWishlist > 0 ? totalWishlist : undefined,
      badgeColor: "bg-[#ff6e6e] text-white",
    },
    {
      label: "Keranjang",
      isAction: true,
      onClick: toggleDrawer,
      icon: ShoppingBag,
      isActive: false,
      badge: totalItems > 0 ? totalItems : undefined,
      badgeColor: "bg-[#a1f68b] text-slate-950",
    },
    {
      label: "Akun",
      href: "/dashboard",
      icon: User,
      isActive: pathname.startsWith("/dashboard") || pathname === "/login" || pathname === "/register",
    },
  ];

  return (
    <div className="fixed bottom-3 left-3 right-3 z-40 md:hidden max-w-md mx-auto pointer-events-auto">
      <nav className="flex items-center justify-around rounded-full border border-white/10 bg-[#151722]/95 px-2 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.isAction) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={item.onClick}
                className="relative flex flex-col items-center justify-center py-1 px-3 text-slate-400 transition-all duration-200 active:scale-90 hover:text-white"
                title={item.label}
              >
                <div className="relative">
                  <Icon size={20} />
                  {item.badge !== undefined && (
                    <span
                      className={`absolute -top-1.5 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-black shadow-md ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="mt-1 text-[10px] font-medium tracking-tight">
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href!}
              className={`relative flex flex-col items-center justify-center py-1 px-3 transition-all duration-200 active:scale-90 ${
                item.isActive
                  ? "text-[#a1f68b] font-semibold"
                  : "text-slate-400 hover:text-white font-medium"
              }`}
            >
              <div className="relative">
                <Icon size={20} className={item.isActive ? "scale-110 transition-transform" : ""} />
                {item.badge !== undefined && (
                  <span
                    className={`absolute -top-1.5 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-black shadow-md ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="mt-1 text-[10px] tracking-tight">{item.label}</span>
              {item.isActive && (
                <span className="absolute bottom-0 h-1 w-1 rounded-full bg-[#a1f68b] shadow-[0_0_6px_#a1f68b]" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
