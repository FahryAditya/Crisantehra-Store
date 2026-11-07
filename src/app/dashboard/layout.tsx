"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Download,
  Package,
  Settings,
  LogOut,
  Sparkles,
  Layers,
  ArrowRight,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Ringkasan Akun", icon: <User size={16} /> },
    { href: "/dashboard/downloads", label: "Pustaka Template (ZIP)", icon: <Download size={16} /> },
    { href: "/dashboard/orders", label: "Riwayat Pesanan", icon: <Package size={16} /> },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header Profile Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border bg-surface p-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_0_20px_var(--primary-glow)]">
            <User size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-foreground">Alya Renanta</h1>
              <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary">
                Member VIP
              </span>
            </div>
            <p className="text-xs text-muted">alya.renanta@example.com</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/catalog"
            className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white shadow-md hover:opacity-90 transition-all"
          >
            <Sparkles size={13} /> Belanja Produk Lain
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-xl border border-border bg-surface-secondary px-4 py-2 text-xs font-bold text-muted hover:text-foreground hover:bg-surface-hover transition-all"
          >
            <LogOut size={13} /> Keluar
          </Link>
        </div>
      </div>

      {/* Main Grid: Sidebar + Child Content */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {/* Sidebar Nav */}
        <div className="space-y-1.5 md:col-span-3">
          <div className="rounded-2xl border border-border bg-surface p-3 space-y-1 shadow-md">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-primary text-white shadow-[0_0_15px_var(--primary-glow)]"
                      : "text-muted hover:bg-surface-secondary hover:text-foreground"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-secondary p-4 text-xs space-y-2 mt-4">
            <span className="font-bold text-foreground block">Butuh Bantuan?</span>
            <p className="text-muted text-[11px] leading-relaxed">
              Punya pertanyaan seputar lisensi template atau pengiriman stiker? Tim kurator kami siap membantu.
            </p>
            <a
              href="mailto:support@crisanthera.store"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline"
            >
              Hubungi Support <ArrowRight size={11} />
            </a>
          </div>
        </div>

        {/* Content Area */}
        <div className="md:col-span-9">{children}</div>
      </div>
    </div>
  );
}

