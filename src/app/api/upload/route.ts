import { NextRequest, NextResponse } from "next/server";
import { uploadImage, uploadTemplateZip } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const uploadType = (formData.get("type") as string) || "image"; // 'image' | 'template'
    const customFolder = formData.get("folder") as string | undefined;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "File tidak ditemukan dalam request" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (uploadType === "template") {
      // Validate file extension
      if (!file.name.endsWith(".zip")) {
        return NextResponse.json(
          { success: false, error: "Template digital harus berupa file berekstensi .zip" },
          { status: 400 }
        );
      }

      const result = await uploadTemplateZip(
        buffer,
        file.name,
        customFolder || "crisanthera/templates"
      );

      return NextResponse.json({
        success: true,
        message: "File template Next.js berhasil diunggah ke Cloudinary",
        data: {
          public_id: result.public_id,
          secure_url: result.secure_url,
          bytes: result.bytes,
          format: result.format || "zip",
          created_at: result.created_at,
        },
      });
    }

    // Default: Image upload
    const result = await uploadImage(buffer, {
      folder: customFolder || "crisanthera/products",
      publicId: file.name.replace(/\.[^/.]+$/, ""),
    });

    return NextResponse.json({
      success: true,
      message: "Gambar produk berhasil diunggah ke Cloudinary",
      data: {
        public_id: result.public_id,
        secure_url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
      },
    });
  } catch (error: any) {
    console.error("Cloudinary Upload Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Terjadi kesalahan saat mengunggah ke Cloudinary",
      },
      { status: 500 }
    );
  }
}

