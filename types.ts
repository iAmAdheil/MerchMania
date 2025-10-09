// COMMON

export type Roles = 'anonymous' | 'creator' | 'customer' | 'admin';

// SHOP

export type ShopDetailsSchema = {
	id?: string;
	name: string;
	logo: string;
	banner?: string;
	description: string;
	location: string;
	contact: string;
	socialLinks: { [key: string]: string };
};

// PRODUCT

export type Sizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type ProductCardSchema = {
	id: string;
	name: string;
	image: string;
	price: string;
};

export type ProductDetailsSchema = {
	id?: string;
	name: string;
	description: string;
	gender: 'female' | 'male' | 'unisex';
	images: string[];
	sizes: Sizes[];
	price: string;
	inStock: boolean;
};