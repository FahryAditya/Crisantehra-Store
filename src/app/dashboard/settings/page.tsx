"use client";

import { useState } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { useToastStore } from "@/stores/toast-store";
import { User, Phone, MapPin, Lock, Save, CheckCircle } from "lucide-react";

export default function SettingsPage() {
  const { user, updateUser } = useAuthStore();
  const { showToast } = useToastStore();

  const [name, setName] = useState(user?.name || "Alya Renanta");
  const [email, setEmail] = useState(user?.email || "alya.renanta@example.com");
  const [phone, setPhone] = useState(user?.phone || "+62 812-3456-7890");

  const [address, setAddress] = useState("Jl. Boulevard Duality No. 88, Cluster Nihilux");
  const [city, setCity] = useState("Jakarta Selatan");
  const [postalCode, setPostalCode] = useState("12340");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      updateUser({ name, phone });
      showToast("Profil berhasil diperbarui dan disinkronkan!", "success");
    }, 600);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);
      showToast("Alamat pengiriman stiker fisik berhasil disimpan!", "success");
    }, 600);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      showToast("Kata sandi baru minimal 6 karakter.", "error");
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setCurrentPassword("");
      setNewPassword("");
      showToast("Kata sandi berhasil diubah!", "success");
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Pengaturan Akun & Pengiriman</h2>
        <p className="text-xs text-slate-400">
          Kelola informasi identitas pribadi, alamat default stiker anime, dan keamanan akun kamu.
        </p>
      </div>

      {/* Profil Pribadi */}
      <div className="rounded-2xl border border-white/10 bg-[#151722] p-6 shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/10 mb-5">
          <User size={18} className="text-[#a1f68b]" />
          <h3 className="text-sm font-bold text-white">Informasi Pribadi</h3>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#181b28] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#a1f68b] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Nomor Telepon / WhatsApp</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#181b28] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#a1f68b] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Alamat Email</label>
            <input
              type="email"
              disabled
              value={email}
              className="w-full rounded-xl border border-white/5 bg-[#12141f] px-3.5 py-2.5 text-xs text-slate-400 cursor-not-allowed"
            />
            <span className="text-[11px] text-slate-500">Email akun terhubung dengan lisensi unduhan template kamu.</span>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-1.5 rounded-full bg-white text-slate-950 px-5 py-2 text-xs font-bold hover:bg-[#a1f68b] transition-all shadow-md active:scale-95"
            >
              <Save size={14} />
              <span>{isSaving ? "Menyimpan..." : "Simpan Profil"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Alamat Pengiriman Stiker Fisik */}
      <div className="rounded-2xl border border-white/10 bg-[#151722] p-6 shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/10 mb-5">
          <MapPin size={18} className="text-[#a1f68b]" />
          <h3 className="text-sm font-bold text-white">Alamat Pengiriman Stiker Fisik (Default)</h3>
        </div>

        <form onSubmit={handleSaveAddress} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Alamat Lengkap</label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#181b28] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#a1f68b] focus:outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Kota / Kabupaten</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#181b28] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#a1f68b] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Kode Pos</label>
              <input
                type="text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#181b28] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#a1f68b] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-1.5 rounded-full bg-white text-slate-950 px-5 py-2 text-xs font-bold hover:bg-[#a1f68b] transition-all shadow-md active:scale-95"
            >
              <Save size={14} />
              <span>{isSaving ? "Menyimpan..." : "Simpan Alamat"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Keamanan & Sandi */}
      <div className="rounded-2xl border border-white/10 bg-[#151722] p-6 shadow-xl backdrop-blur-xl">
        <div className="flex items-center gap-2.5 pb-4 border-b border-white/10 mb-5">
          <Lock size={18} className="text-[#a1f68b]" />
          <h3 className="text-sm font-bold text-white">Keamanan Akun</h3>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Kata Sandi Saat Ini</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-[#181b28] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#a1f68b] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Kata Sandi Baru</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full rounded-xl border border-white/10 bg-[#181b28] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#a1f68b] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-1.5 rounded-full border border-white/15 bg-[#181b28] text-white px-5 py-2 text-xs font-bold hover:bg-white hover:text-slate-950 transition-all shadow-md active:scale-95"
            >
              <span>Ubah Sandi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

