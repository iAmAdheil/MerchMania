// COMMON

import { JsonValue } from '../generated/prisma/runtime/library';

export type Roles = 'anonymous' | 'creator' | 'customer' | 'staff';
export type Gender = 'male' | 'female' | 'unisex';
export type ProductCardSchema = {
  id: string;
  name: string;
  image: string;
  price: string;
};
export interface SavedAddress {
  id: string;
  label: string;
  fullAddress: string;
  isDefault?: boolean;
}

// SHOP

export type ShopDetailsSchema = {
  id?: string;
  name: string;
  logo: string;
  banner: string;
  description: string;
  location: string;
  contact: string;
  socialLinks: JsonValue;
};

// PRODUCT

export type Sizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type ProductDetailsSchema = {
  id?: string;
  name: string;
  description: string;
  gender: Gender;
  images: string[];
  sizes: Sizes[];
  price: string;
  inStock: boolean;
  shopId?: string;
};

// CART

export type CartItemSchema = {
  id: string;
  quantity: number;
  size: Sizes;
  productId: string;
  product: {
    id: string;
    name: string;
    image: string;
    price: string;
    shopName: string;
  };
};

// PAGES
// PRODUCT PAGE
export type ProductDisplaySchema = {
  product: {
    id: string,
    name: string,
    description: string,
    gender: Gender,
    sizes: Sizes[],
    images: string[],
    price: string,
    inStock: boolean,
  },
  shop: {
    id: string,
    name: string,
    logo: string,
  },
}