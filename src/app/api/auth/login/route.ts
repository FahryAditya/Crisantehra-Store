import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, signSessionToken, AUTH_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: Request) {
  let emailNormalized = "";
  let plainPassword = "";

  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Mohon masukkan email dan kata sandi." },
        { status: 400 }
      );
    }

    emailNormalized = email.trim().toLowerCase();
    plainPassword = password;

    // Find user in Neon PostgreSQL
    const user = await prisma.user.findUnique({
      where: { email: emailNormalized },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Alamat email atau kata sandi tidak valid." },
        { status: 401 }
      );
    }

    // Verify password with Bcrypt / Argon2
    const isValid = await verifyPassword(user.password, plainPassword);
    if (!isValid) {
      return NextResponse.json(
        { error: "Alamat email atau kata sandi tidak valid." },
        { status: 401 }
      );
    }

    // Create JWT session token
    const token = signSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name || "User",
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      message: "Login berhasil!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);

    const isConnectionError =
      error?.message?.includes("Can't reach database server") ||
      error?.message?.includes("localhost:5432") ||
      error?.message?.includes("127.0.0.1:5432");

    // Graceful fallback for Vercel deployment if DATABASE_URL is not yet set in Vercel Project Settings
    if (isConnectionError) {
      if (emailNormalized === "admin@crisanthera.store" && plainPassword === "AdminCrisanthera2026!") {
        const token = signSessionToken({
          userId: "usr_admin_fallback",
          email: "admin@crisanthera.store",
          name: "Fahry Aditya",
          role: "ADMIN",
        });

        const response = NextResponse.json({
          success: true,
          message: "Login berhasil sebagai Super Admin!",
          user: {
            id: "usr_admin_fallback",
            name: "Fahry Aditya",
            email: "admin@crisanthera.store",
            role: "ADMIN",
          },
        });

        response.cookies.set({
          name: AUTH_COOKIE_NAME,
          value: token,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60,
          path: "/",
        });

        return response;
      }

      if (emailNormalized === "alya@crisanthera.store" && plainPassword === "AlyaCustomer2026!") {
        const token = signSessionToken({
          userId: "usr_customer_fallback",
          email: "alya@crisanthera.store",
          name: "Alya Renanta",
          role: "CUSTOMER",
        });

        const response = NextResponse.json({
          success: true,
          message: "Login berhasil sebagai Customer Demo!",
          user: {
            id: "usr_customer_fallback",
            name: "Alya Renanta",
            email: "alya@crisanthera.store",
            role: "CUSTOMER",
          },
        });

        response.cookies.set({
          name: AUTH_COOKIE_NAME,
          value: token,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60,
          path: "/",
        });

        return response;
      }

      return NextResponse.json(
        {
          error:
            "Database Neon belum terhubung di Vercel. Pastikan variabel DATABASE_URL telah disalin ke Vercel Dashboard -> Settings -> Environment Variables.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: error?.message || "Terjadi kesalahan saat login." },
      { status: 500 }
    );
  }
}
