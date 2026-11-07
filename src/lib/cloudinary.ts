import "server-only";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "ddjyrcrvz",
  api_key: process.env.CLOUDINARY_API_KEY || "294827284196317",
  api_secret: process.env.CLOUDINARY_API_SECRET || "fLMXicNUz8Ofdm_TlrMZfZdUYyQ",
  secure: true,
});

export { cloudinary };

/**
 * Upload gambar produk (stiker / banner / thumbnail template)
 */
export async function uploadImage(
  fileBuffer: Buffer,
  options?: {
    folder?: string;
    publicId?: string;
  }
): Promise<UploadApiResponse> {
  const folder = options?.folder || "crisanthera/products";

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        public_id: options?.publicId,
        transformation: [{ quality: "auto:best", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Upload gambar ke Cloudinary gagal"));
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
}

/**
 * Upload template digital Next.js (file ZIP / raw asset)
 */
export async function uploadTemplateZip(
  fileBuffer: Buffer,
  filename: string,
  folder = "crisanthera/templates"
): Promise<UploadApiResponse> {
  const cleanFilename = filename.replace(/\.[^/.]+$/, ""); // strip extension for public_id

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "raw", // 'raw' adalah tipe khusus Cloudinary untuk file non-media seperti .zip
        public_id: `${cleanFilename}.zip`,
        use_filename: true,
        unique_filename: false,
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Upload file template ZIP ke Cloudinary gagal"));
        } else {
          resolve(result);
        }
      }
    );

    uploadStream.end(fileBuffer);
  });
}

/**
 * Menghasilkan URL unduhan berbatas waktu (Signed URL) untuk template Next.js
 * Memastikan file digital tidak dapat diakses publik tanpa izin.
 */
export function getSignedDownloadUrl(
  publicId: string,
  expiresInSeconds: number = 3600
): string {
  const expiresAt = Math.floor(Date.now() / 1000) + expiresInSeconds;

  return cloudinary.utils.private_download_url(publicId, "zip", {
    resource_type: "raw",
    type: "upload",
    expires_at: expiresAt,
  });
}

/**
 * Hapus aset dari Cloudinary berdasarkan public_id
 */
export async function deleteAsset(
  publicId: string,
  resourceType: "image" | "raw" = "image"
) {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
}

