import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, signSessionToken, AUTH_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Mohon masukkan email dan kata sandi." },
        { status: 400 }
      );
    }

    const emailNormalized = email.trim().toLowerCase();

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

    // Verify password with Argon2
    const isValid = await verifyPassword(user.password, password);
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
    return NextResponse.json(
      { error: error?.message || "Terjadi kesalahan saat login." },
      { status: 500 }
    );
  }
}

