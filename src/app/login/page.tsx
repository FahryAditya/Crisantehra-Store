"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, Lock, Mail, ArrowRight, Eye, EyeOff, ShieldCheck, User } from "lucide-react";
import { useAuthStore } from "@/stores/auth-store";
import { useToastStore } from "@/stores/toast-store";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const { login } = useAuthStore();
  const { addToast } = useToastStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Login gagal. Periksa email dan kata sandi Anda.");
        setIsLoading(false);
        return;
      }

      // Update client session store
      login(data.user);

      addToast({
        title: "Login Berhasil",
        message: `Selamat datang kembali, ${data.user.name}!`,
        type: "success",
      });

      // Role-based or callback redirect
      if (callbackUrl) {
        router.push(callbackUrl);
      } else if (data.user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setErrorMsg("Terjadi gangguan koneksi ke server. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  // Demo Credentials Helper
  const fillAdminCredentials = () => {
    setEmail("admin@crisanthera.store");
    setPassword("AdminCrisanthera2026!");
    setErrorMsg("");
  };

  const fillCustomerCredentials = () => {
    setEmail("alya@crisanthera.store");
    setPassword("AlyaCustomer2026!");
    setErrorMsg("");
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-14rem)] max-w-md items-center justify-center px-4 py-12">
      <div className="w-full space-y-6 bento-card p-6 sm:p-8 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#a1f68b]">
            <Sparkles size={22} />
          </div>
          <h1 className="text-2xl font-black text-white">Masuk ke Akun</h1>
          <p className="text-xs text-slate-400">
            Akses pustaka template digital dan riwayat pesanan stiker anime kamu.
          </p>
        </div>

        {errorMsg && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-400">
            {errorMsg}
          </div>
        )}

        {/* Demo Accounts Quick-fill Pills */}
        <div className="rounded-2xl border border-white/5 bg-[#0b0c12]/60 p-3 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Demo Akun Tersedia (Klik Cepat):
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={fillAdminCredentials}
              className="flex items-center gap-1 rounded-lg border border-[#c084fc]/30 bg-[#c084fc]/10 px-2.5 py-1 text-[11px] font-semibold text-[#c084fc] hover:bg-[#c084fc]/20 transition-all"
            >
              <ShieldCheck size={12} /> Super Admin
            </button>
            <button
              type="button"
              onClick={fillCustomerCredentials}
              className="flex items-center gap-1 rounded-lg border border-[#a1f68b]/30 bg-[#a1f68b]/10 px-2.5 py-1 text-[11px] font-semibold text-[#a1f68b] hover:bg-[#a1f68b]/20 transition-all"
            >
              <User size={12} /> Customer Demo
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-slate-300 font-semibold">Alamat Email</label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-white/10 bg-[#181b28] pl-10 pr-3.5 py-2.5 text-white placeholder-slate-500 focus:border-[#a1f68b] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-slate-300 font-semibold">Kata Sandi</label>
              <Link href="/forgot-password" className="text-[11px] text-[#a1f68b] hover:underline">
                Lupa sandi?
              </Link>
            </div>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-[#181b28] pl-10 pr-10 py-2.5 text-white placeholder-slate-500 focus:border-[#a1f68b] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#a1f68b] py-3 text-xs font-bold text-slate-950 shadow-md hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
          >
            <span>{isLoading ? "Memproses Autentikasi..." : "Masuk ke Akun"}</span>
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          Belum memiliki akun?{" "}
          <Link href="/register" className="font-semibold text-[#a1f68b] hover:underline">
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center text-xs text-slate-400">Memuat form login...</div>}>
      <LoginForm />
    </Suspense>
  );
}

