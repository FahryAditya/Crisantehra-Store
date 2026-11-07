"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatRupiah } from "@/data/mock-products";
import {
  TrendingUp,
  Package,
  ShoppingBag,
  Download,
  AlertTriangle,
  ArrowRight,
  Plus,
  Cloud,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
} from "lucide-react";

interface AdminStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  stickerCount: number;
  templateCount: number;
  lowStockCount: number;
  downloadsCount: number;
  recentOrders: any[];
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/stats");
        const json = await res.json();
        if (json.success) {
          setStats(json.data);
        }
      } catch (err) {
        console.error("Failed to load admin stats:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  const totalRevenue = stats?.totalRevenue || 3450000;
  const totalOrders = stats?.totalOrders || 14;
  const totalProducts = stats?.totalProducts || 8;
  const lowStockCount = stats?.lowStockCount || 1;
  const downloadsCount = stats?.downloadsCount || 18;
  const recentOrders = stats?.recentOrders || [];

  return (
    <div className="space-y-8">
      {/* Header & Quick Action CTAs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white sm:text-3xl tracking-tight">
            Ringkasan Penjualan
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Pantau arus transaksi stiker anime vinyl dan unduhan template Next.js secara live.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/products"
            className="flex items-center gap-1.5 rounded-full bg-[#a1f68b] px-4 py-2 text-xs font-bold text-slate-950 shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            <Plus size={14} /> Tambah Produk
          </Link>
          <Link
            href="/admin/assets"
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#181b28] px-4 py-2 text-xs font-semibold text-white hover:border-white/20 hover:bg-white/10 transition-all"
          >
            <Cloud size={14} /> Upload Aset Cloudinary
          </Link>
        </div>
      </div>

      {/* 4 Bento Metric Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1: Total Revenue */}
        <div className="bento-card p-5 space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Pendapatan</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#a1f68b]/15 text-[#a1f68b]">
              <TrendingUp size={16} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white tracking-tight">
              {formatRupiah(totalRevenue)}
            </div>
            <div className="flex items-center gap-1 mt-1 text-[11px] text-emerald-400 font-semibold">
              <span>+18.4%</span>
              <span className="text-slate-500 font-normal">dari bulan lalu</span>
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-[#a1f68b]/5 blur-2xl group-hover:bg-[#a1f68b]/10 transition-all" />
        </div>

        {/* Metric 2: Total Orders */}
        <div className="bento-card p-5 space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Pesanan</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#c084fc]/15 text-[#c084fc]">
              <ShoppingBag size={16} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white tracking-tight">{totalOrders} Pesanan</div>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
              <span className="text-[#a1f68b] font-bold">Stiker Fisik</span>
              <span>&bull;</span>
              <span className="text-[#c084fc] font-bold">Template Digital</span>
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-[#c084fc]/5 blur-2xl group-hover:bg-[#c084fc]/10 transition-all" />
        </div>

        {/* Metric 3: Products & Stock Alerts */}
        <div className="bento-card p-5 space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Katalog Aktif</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500/15 text-sky-400">
              <Package size={16} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white tracking-tight">{totalProducts} Produk</div>
            <div className="flex items-center gap-1.5 mt-1 text-[11px]">
              {lowStockCount > 0 ? (
                <span className="text-amber-400 font-semibold flex items-center gap-1">
                  <AlertTriangle size={12} /> {lowStockCount} stiker perlu restock
                </span>
              ) : (
                <span className="text-emerald-400 font-semibold">Semua stok aman</span>
              )}
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-sky-500/5 blur-2xl group-hover:bg-sky-500/10 transition-all" />
        </div>

        {/* Metric 4: Template Downloads */}
        <div className="bento-card p-5 space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Unduhan Template</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#ff6e6e]/15 text-[#ff6e6e]">
              <Download size={16} />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white tracking-tight">{downloadsCount}x Diunduh</div>
            <div className="mt-1 text-[11px] text-slate-400">
              Cloudinary RAW ZIP Delivery
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-[#ff6e6e]/5 blur-2xl group-hover:bg-[#ff6e6e]/10 transition-all" />
        </div>
      </div>

      {/* Composition & Recent Orders Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Recent Orders Table (8 cols) */}
        <div className="bento-card p-6 space-y-5 lg:col-span-8">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
            <div>
              <h2 className="text-base font-bold text-white">Pesanan Terbaru Masuk</h2>
              <p className="text-xs text-slate-400">Transaksi checkout otomatis yang perlu diproses.</p>
            </div>
            <Link
              href="/admin/orders"
              className="flex items-center gap-1 text-xs font-bold text-[#a1f68b] hover:underline"
            >
              Lihat Semua <ArrowRight size={13} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/[0.06] text-slate-400">
                  <th className="pb-3 font-semibold">No. Pesanan</th>
                  <th className="pb-3 font-semibold">Pelanggan</th>
                  <th className="pb-3 font-semibold">Total</th>
                  <th className="pb-3 font-semibold">Status Bayar</th>
                  <th className="pb-3 font-semibold">Pengiriman</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      Belum ada pesanan terbaru tercatat.
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((ord: any) => (
                    <tr key={ord.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 font-mono font-bold text-white">
                        {ord.orderNumber}
                      </td>
                      <td className="py-3.5">
                        <div className="font-semibold text-white">{ord.customerName}</div>
                        <div className="text-[10px] text-slate-400">{ord.customerEmail}</div>
                      </td>
                      <td className="py-3.5 font-bold text-white">
                        {formatRupiah(ord.totalAmount)}
                      </td>
                      <td className="py-3.5">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 size={11} /> {ord.paymentStatus}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            ord.orderStatus === "COMPLETED"
                              ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                              : ord.orderStatus === "SHIPPED"
                              ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          <Clock size={11} /> {ord.orderStatus}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sales Distribution & Quick Summary (4 cols) */}
        <div className="space-y-6 lg:col-span-4">
          {/* Bento Card: Kategori Distribusi */}
          <div className="bento-card p-6 space-y-4">
            <h3 className="text-sm font-bold text-white">Distribusi Pendapatan Toko</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-semibold">Stiker Anime Vinyl</span>
                  <span className="text-[#a1f68b] font-bold">58%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#9df68c] to-[#76e4ca] w-[58%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-semibold">Template Next.js</span>
                  <span className="text-[#c084fc] font-bold">42%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#c084fc] to-[#e879f9] w-[42%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card: Akses Cepat */}
          <div className="bento-card p-6 space-y-3">
            <h3 className="text-sm font-bold text-white">Aksi Cepat Admin</h3>
            <div className="space-y-2">
              <Link
                href="/admin/products"
                className="flex items-center justify-between rounded-xl border border-white/5 bg-[#181b28] p-3 text-xs text-slate-300 hover:text-white hover:border-white/15 transition-all"
              >
                <span>Kelola Stok & Harga Katalog</span>
                <ArrowRight size={13} className="text-[#a1f68b]" />
              </Link>
              <Link
                href="/admin/orders"
                className="flex items-center justify-between rounded-xl border border-white/5 bg-[#181b28] p-3 text-xs text-slate-300 hover:text-white hover:border-white/15 transition-all"
              >
                <span>Input Resi Pengiriman Stiker</span>
                <ArrowRight size={13} className="text-[#a1f68b]" />
              </Link>
              <Link
                href="/admin/assets"
                className="flex items-center justify-between rounded-xl border border-white/5 bg-[#181b28] p-3 text-xs text-slate-300 hover:text-white hover:border-white/15 transition-all"
              >
                <span>Unggah ZIP Template Baru</span>
                <ArrowRight size={13} className="text-[#a1f68b]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

