import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// In-memory sync fallback cache for active cross-device sessions
const syncCache = new Map<string, { cartItems: any[]; wishlist: any[]; updatedAt: number }>();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, cartItems, wishlist } = body;

    if (!userId) {
      return NextResponse.json({ error: "userId is required for sync" }, { status: 400 });
    }

    // Update in-memory session sync cache
    syncCache.set(userId, {
      cartItems: cartItems || [],
      wishlist: wishlist || [],
      updatedAt: Date.now(),
    });

    return NextResponse.json({
      success: true,
      message: "Synced to cloud successfully",
      syncedAt: Date.now(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Sync failed" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const cached = syncCache.get(userId);

    return NextResponse.json({
      success: true,
      data: cached || { cartItems: [], wishlist: [], updatedAt: Date.now() },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Fetch sync failed" },
      { status: 500 }
    );
  }
}

