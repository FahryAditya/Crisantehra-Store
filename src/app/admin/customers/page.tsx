"use client";

import { useState } from "react";
import { formatRupiah } from "@/data/mock-products";
import {
  Users,
  Search,
  Mail,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "CUSTOMER" | "ADMIN";
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
  isVip?: boolean;
}

const mockCustomers: Customer[] = [
  {
    id: "cust-1",
    name: "Alya Renanta",
    email: "alya.renanta@example.com",
    phone: "+62 812-3456-7890",
    role: "CUSTOMER",
    totalOrders: 5,
    totalSpent: 875000,
    joinedDate: "12 Okt 2026",
    isVip: true,
  },
  {
    id: "cust-2",
    name: "Kenjiro Takahashi",
    email: "kenjiro@studio-flow.dev",
    phone: "+62 818-9999-1234",
    role: "CUSTOMER",
    totalOrders: 3,
    totalSpent: 897000,
    joinedDate: "18 Okt 2026",
    isVip: true,
  },
  {
    id: "cust-3",
    name: "Dimas Aditya Pratama",
    email: "dimas.aditya@techwave.id",
    phone: "+62 856-1122-3344",
    role: "CUSTOMER",
    totalOrders: 2,
    totalSpent: 135000,
    joinedDate: "24 Okt 2026",
  },
  {
    id: "cust-4",
    name: "Fahry Aditya (Store Owner)",
    email: "admin@crisanthera.store",
    phone: "+62 811-0000-8888",
    role: "ADMIN",
    totalOrders: 14,
    totalSpent: 3450000,
    joinedDate: "01 Sep 2026",
    isVip: true,
  },
];

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white sm:text-3xl tracking-tight">
          Direktori Pelanggan & Pembeli
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Pantau daftar akun terdaftar, frekuensi checkout, dan total nilai belanja (*Lifetime Value*).
        </p>
      </div>

      {/* Search Bar */}
      <div className="bento-card p-4">
        <div className="relative w-full sm:w-80">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama atau email pelanggan..."
            className="w-full rounded-xl border border-white/10 bg-[#181b28] pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-[#a1f68b] focus:outline-none"
          />
        </div>
      </div>

      {/* Customer Table */}
      <div className="bento-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] bg-[#12141f] text-slate-400">
                <th className="py-3.5 px-4 font-semibold">Pelanggan</th>
                <th className="py-3.5 px-4 font-semibold">Kontak</th>
                <th className="py-3.5 px-4 font-semibold">Role Akun</th>
                <th className="py-3.5 px-4 font-semibold">Total Pesanan</th>
                <th className="py-3.5 px-4 font-semibold">Nilai Belanja (LTV)</th>
                <th className="py-3.5 px-4 font-semibold">Bergabung</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filtered.map((cust) => (
                <tr key={cust.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#9df68c] to-[#76e4ca] font-black text-slate-950 text-xs">
                        {cust.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-white">{cust.name}</span>
                          {cust.isVip && (
                            <span className="rounded-full bg-[#a1f68b]/20 px-1.5 py-0.2 text-[9px] font-bold text-[#a1f68b] border border-[#a1f68b]/30">
                              VIP
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400">{cust.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-300">
                    <div className="flex items-center gap-1 text-[11px]">
                      <Phone size={12} className="text-slate-400" />
                      <span>{cust.phone}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        cust.role === "ADMIN"
                          ? "bg-[#c084fc]/15 text-[#c084fc] border border-[#c084fc]/30"
                          : "bg-white/10 text-slate-300"
                      }`}
                    >
                      {cust.role}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-bold text-white">
                    {cust.totalOrders} Pesanan
                  </td>

                  <td className="py-3.5 px-4 font-black text-[#a1f68b]">
                    {formatRupiah(cust.totalSpent)}
                  </td>

                  <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                    {cust.joinedDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

