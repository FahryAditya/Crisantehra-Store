import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MOCK_PRODUCTS } from "@/data/mock-products";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");

    const where: any = {};
    if (category && category !== "all") {
      where.type = category.toUpperCase();
    }
    if (tag) {
      where.tags = { has: tag };
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        variants: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (products.length > 0) {
      // Map Prisma uppercase types (STICKER/TEMPLATE) to lowercase (sticker/template) for UI compatibility
      const mapped = products.map((p) => ({
        ...p,
        type: p.type.toLowerCase(),
      }));
      return NextResponse.json({ success: true, data: mapped });
    }

    return NextResponse.json({ success: true, data: MOCK_PRODUCTS, fallback: true });
  } catch (error: any) {
    console.warn("Public products query fallback:", error?.message);
    return NextResponse.json({ success: true, data: MOCK_PRODUCTS, fallback: true });
  }
}

