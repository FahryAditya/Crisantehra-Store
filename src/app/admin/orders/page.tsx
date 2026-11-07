"use client";

import { useEffect, useState } from "react";
import { formatRupiah } from "@/data/mock-products";
import { useToastStore } from "@/stores/toast-store";
import {
  ShoppingBag,
  Truck,
  CheckCircle2,
  Clock,
  Package,
  Search,
  Filter,
  Save,
  MapPin,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function AdminOrdersPage() {
  const { showToast } = useToastStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Tracking number input state keyed by order id
  const [trackingInputs, setTrackingInputs] = useState<{ [id: string]: string }>({});
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setOrders(json.data);
      }
    } catch (err) {
      console.warn("Failed to fetch admin orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (
    orderId: string,
    newStatus: string,
    courier?: string
  ) => {
    setIsUpdating(orderId);
    const trackingCode = trackingInputs[orderId];

    try {
      await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          orderStatus: newStatus,
          shippingCourier: courier,
          trackingNumber: trackingCode,
        }),
      });

      setOrders((prev) =>
        prev.map((ord) =>
          ord.id === orderId
            ? { ...ord, orderStatus: newStatus, shippingCourier: courier || ord.shippingCourier }
            : ord
        )
      );

      showToast(`Status pesanan berhasil diubah menjadi ${newStatus}!`, "success");
    } catch {
      showToast("Gagal memperbarui status pesanan.", "error");
    } finally {
      setIsUpdating(null);
    }
  };

  const filteredOrders = orders.filter((ord) => {
    const matchesStatus =
      statusFilter === "all" ? true : ord.orderStatus === statusFilter;
    const matchesSearch =
      ord.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerEmail?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white sm:text-3xl tracking-tight">
          Manajemen Pesanan & Resi Pengiriman
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Proses pesanan stiker anime fisik, input nomor resi kurir, dan pantau status transaksi.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bento-card p-4">
        <div className="relative w-full sm:w-80">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari No. Pesanan, Nama, atau Email..."
            className="w-full rounded-xl border border-white/10 bg-[#181b28] pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-[#a1f68b] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
          {["all", "PROCESSING", "SHIPPED", "COMPLETED"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                statusFilter === st
                  ? "bg-white text-slate-950 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {st === "all"
                ? `Semua (${orders.length})`
                : st === "PROCESSING"
                ? "Perlu Dikirim"
                : st === "SHIPPED"
                ? "Dikirim"
                : "Selesai"}
            </button>
          ))}
        </div>
      </div>

      {/* Order Cards List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bento-card p-12 text-center text-slate-500 text-xs">
            Tidak ada pesanan yang sesuai dengan filter saat ini.
          </div>
        ) : (
          filteredOrders.map((ord) => {
            const isExpanded = expandedOrder === ord.id;
            const hasShipping = Boolean(ord.shippingAddress);

            return (
              <div
                key={ord.id}
                className="bento-card overflow-hidden transition-all duration-300"
              >
                {/* Header Summary Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#a1f68b]">
                      <Package size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-white">
                          {ord.orderNumber}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                            ord.orderStatus === "COMPLETED"
                              ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                              : ord.orderStatus === "SHIPPED"
                              ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {ord.orderStatus}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {ord.customerName} &bull; {ord.customerEmail}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 justify-between sm:justify-end">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-slate-500 block">Total Pembayaran</span>
                      <span className="text-sm font-black text-white">
                        {formatRupiah(ord.totalAmount)}
                      </span>
                    </div>

                    <button
                      onClick={() => setExpandedOrder(isExpanded ? null : ord.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:text-white"
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                {/* Collapsible Details */}
                {isExpanded && (
                  <div className="p-5 space-y-5 bg-[#0b0c12]/40 text-xs">
                    {/* Items Breakdown */}
                    <div className="space-y-2">
                      <span className="font-bold text-white block">Item Dipesan:</span>
                      <div className="space-y-1.5">
                        {ord.items?.map((item: any, idx: number) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between rounded-xl border border-white/5 bg-[#181b28] p-3"
                          >
                            <div>
                              <span className="font-bold text-white">{item.productName}</span>
                              <span className="text-slate-400 text-[11px] block">
                                Varian: {item.variantName} &times; {item.quantity}
                              </span>
                            </div>
                            <span className="font-bold text-white">
                              {formatRupiah(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Address for physical stickers */}
                    {hasShipping && (
                      <div className="rounded-xl border border-white/10 bg-[#151722] p-4 space-y-2">
                        <div className="flex items-center gap-2 text-white font-bold">
                          <MapPin size={14} className="text-[#a1f68b]" />
                          <span>Alamat Pengiriman Stiker Fisik</span>
                        </div>
                        <p className="text-slate-300">
                          {ord.shippingAddress}, {ord.shippingCity} ({ord.postalCode})
                        </p>
                        <div className="flex items-center gap-2 text-slate-400 text-[11px] pt-1">
                          <Truck size={12} />
                          <span>Kurir Dipilih: {ord.shippingCourier?.toUpperCase() || "JNE"}</span>
                          <span>&bull;</span>
                          <Phone size={12} />
                          <span>WhatsApp: {ord.customerPhone}</span>
                        </div>
                      </div>
                    )}

                    {/* Resi Tracking Input & Action Controls */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10">
                      {hasShipping ? (
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <input
                            type="text"
                            placeholder="Ketik No. Resi Kurir..."
                            value={trackingInputs[ord.id] || ""}
                            onChange={(e) =>
                              setTrackingInputs({ ...trackingInputs, [ord.id]: e.target.value })
                            }
                            className="rounded-xl border border-white/10 bg-[#181b28] px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-[#a1f68b] focus:outline-none"
                          />
                          <button
                            disabled={isUpdating === ord.id}
                            onClick={() => handleUpdateStatus(ord.id, "SHIPPED")}
                            className="flex items-center gap-1.5 rounded-xl bg-sky-500 px-4 py-2 font-bold text-white hover:bg-sky-600 transition-all text-xs"
                          >
                            <Truck size={13} />
                            <span>Kirim Resi</span>
                          </button>
                        </div>
                      ) : (
                        <div className="text-slate-400 text-[11px]">
                          Produk digital template Next.js — lisensi token aktif otomatis.
                        </div>
                      )}

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        {ord.orderStatus !== "COMPLETED" && (
                          <button
                            disabled={isUpdating === ord.id}
                            onClick={() => handleUpdateStatus(ord.id, "COMPLETED")}
                            className="flex items-center gap-1.5 rounded-full bg-white text-slate-950 px-4 py-2 font-bold hover:bg-[#a1f68b] transition-all text-xs"
                          >
                            <CheckCircle2 size={13} />
                            <span>Tandai Selesai</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

