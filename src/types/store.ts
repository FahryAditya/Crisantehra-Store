export type CharacterTheme = 'nihilux' | 'aha';

export type ProductType = 'sticker' | 'template';

export interface ProductVariant {
  id: string;
  name: string; // e.g. "Holographic 7cm", "Matte Die-Cut 5cm", "Single Site License", "Commercial Unlimited"
  priceOffset?: number; // e.g. +5000 or +150000
  sku?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  type: ProductType;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  stock: number; // for physical stickers; digital templates can have 999
  images: string[];
  tags: string[];
  variants: ProductVariant[];
  themeAura?: CharacterTheme; // matches visual vibe of Nihilux or Aha
  // Template-specific fields
  techStack?: string[];
  demoUrl?: string;
  version?: string;
  framework?: string;
  // Sticker-specific fields
  dimensions?: string;
  finish?: string;
  waterproof?: boolean;
}

export interface CartItem {
  id: string; // unique item id: product.id + '-' + variant.id
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
}

