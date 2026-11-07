import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MOCK_PRODUCTS } from "@/data/mock-products";

// GET: List all products from Neon DB
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        variants: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (products.length > 0) {
      return NextResponse.json({ success: true, data: products });
    }

    // Fallback to mock products if DB table is empty
    return NextResponse.json({ success: true, data: MOCK_PRODUCTS, fallback: true });
  } catch (error: any) {
    console.warn("Prisma products fetch fallback:", error?.message);
    return NextResponse.json({ success: true, data: MOCK_PRODUCTS, fallback: true });
  }
}

// POST: Create a new product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      slug,
      type,
      tagline,
      description,
      price,
      originalPrice,
      stock,
      images,
      tags,
      themeAura,
      dimensions,
      finish,
      waterproof,
      framework,
      version,
      techStack,
      demoUrl,
      variants,
    } = body;

    const autoSlug =
      slug ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const newProduct = await prisma.product.create({
      data: {
        name,
        slug: autoSlug,
        type: type === "template" ? "TEMPLATE" : "STICKER",
        tagline: tagline || "",
        description: description || "",
        price: Number(price) || 0,
        originalPrice: originalPrice ? Number(originalPrice) : null,
        stock: Number(stock) || 0,
        images: Array.isArray(images) ? images : [images || "/placeholder.jpg"],
        tags: Array.isArray(tags) ? tags : [],
        themeAura: themeAura || "nihilux",
        dimensions: dimensions || null,
        finish: finish || null,
        waterproof: waterproof ?? true,
        framework: framework || null,
        version: version || null,
        techStack: Array.isArray(techStack) ? techStack : [],
        demoUrl: demoUrl || null,
        variants: {
          create: (variants || []).map((v: any) => ({
            name: v.name,
            priceOffset: Number(v.priceOffset) || 0,
            sku: v.sku || null,
          })),
        },
      },
      include: {
        variants: true,
      },
    });

    return NextResponse.json({ success: true, data: newProduct });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to create product" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing product
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "Product id is required" }, { status: 400 });
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...updates,
        price: updates.price ? Number(updates.price) : undefined,
        stock: updates.stock !== undefined ? Number(updates.stock) : undefined,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a product
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product id is required" }, { status: 400 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to delete product" },
      { status: 500 }
    );
  }
}

