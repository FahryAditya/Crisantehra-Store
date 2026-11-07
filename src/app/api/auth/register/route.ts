import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, signSessionToken, AUTH_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, phone } = body;

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Nama, email, dan kata sandi wajib diisi." },
        { status: 400 }
      );
    }

    const emailNormalized = email.trim().toLowerCase();

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Kata sandi minimal 8 karakter." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: emailNormalized },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Alamat email ini sudah terdaftar. Silakan login." },
        { status: 409 }
      );
    }

    // Hash password with Argon2
    const hashedPassword = await hashPassword(password);

    // Create user in Neon DB
    const newUser = await prisma.user.create({
      data: {
        name,
        email: emailNormalized,
        password: hashedPassword,
        phone: phone || null,
        role: "CUSTOMER",
      },
    });

    // Create JWT session token
    const token = signSessionToken({
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name || "Customer",
      role: newUser.role,
    });

    const response = NextResponse.json({
      success: true,
      message: "Registrasi akun berhasil!",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
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
    console.error("Register error:", error);
    return NextResponse.json(
      { error: error?.message || "Gagal melakukan registrasi." },
      { status: 500 }
    );
  }
}

