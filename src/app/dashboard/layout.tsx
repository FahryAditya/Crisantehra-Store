"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  User,
  Download,
  Package,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { useToastStore } from "@/stores/toast-store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { showToast } = useToastStore();

  const displayName = user?.name || "Alya Renanta";
  const displayEmail = user?.email || "alya.renanta@example.com";

  const handleLogout = () => {
    logout();
    showToast("Anda telah keluar dari akun.", "info");
    router.push("/login");
  };

  const navItems = [
    { href: "/dashboard", label: "Ringkasan Akun", icon: <User size={16} /> },
    { href: "/dashboard/downloads", label: "Pustaka Template (ZIP)", icon: <Download size={16} /> },
    { href: "/dashboard/orders", label: "Riwayat Pesanan", icon: <Package size={16} /> },
    { href: "/dashboard/settings", label: "Pengaturan Profil", icon: <Settings size={16} /> },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header Profile Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#151722] p-6 shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#9df68c] to-[#76e4ca] text-slate-950 font-black shadow-[0_0_20px_rgba(161,246,139,0.3)]">
            <span className="text-xl uppercase">{displayName.charAt(0)}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">{displayName}</h1>
              <span className="rounded-full bg-[#a1f68b]/20 px-2.5 py-0.5 text-[10px] font-bold text-[#a1f68b] border border-[#a1f68b]/30">
                {user?.role === "ADMIN" ? "Admin Store" : "Member VIP"}
              </span>
            </div>
            <p className="text-xs text-slate-400">{displayEmail}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/catalog"
            className="flex items-center gap-1.5 rounded-full bg-[#a1f68b] px-4 py-2 text-xs font-bold text-slate-950 shadow-md hover:scale-105 transition-all"
          >
            <Sparkles size={13} /> Belanja Produk Lain
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#181b28] px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:border-white/20 transition-all"
          >
            <LogOut size={13} /> Keluar
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar + Child Content */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* Sidebar Nav */}
        <div className="space-y-1.5 md:col-span-3">
          <div className="rounded-2xl border border-white/10 bg-[#151722] p-3 space-y-1 shadow-md">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-white text-slate-950 shadow-md font-bold"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="md:col-span-9">{children}</div>
      </div>
    </div>
  );
}
