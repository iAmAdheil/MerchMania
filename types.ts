export type Roles = 'STRANGER' | 'CREATOR' | 'CUSTOMER' | 'ADMIN';

export type InputProductDetailsSchema = {
	name: string;
	description: string;
	gender: 'female' | 'male' | 'unisex';
	designs: string[];
	sizes: SizesSchema;
	price: string;
	remainingStock: string;
};

export type ProductCardSchema = {
	id: string;
	name: string;
	image: string;
	price: string;
};

export type ProductPageDetailsSchema = {
	id: string;
	name: string;
	description: string;
	designs: string[];
	price: string;
	shop: {
		id: string;
		name: string;
		logo: string;
	};
};

export type ProductDetailsSchema = {
	id?: string;
	name: string;
	description: string;
	gender: 'female' | 'male' | 'unisex';
	designs: string[];
	sizes: SizesSchema;
	price: string;
	inStock: boolean;
	remainingStock: number;
	brand?: string;
	brandImage?: string;
};

export type SizesSchema = {
	XS: boolean;
	S: boolean;
	M: boolean;
	L: boolean;
	XL: boolean;
	XXL: boolean;
};

export type ShopDetailsSchema = {
	name: string;
	logo: string;
};

export type InfluencerDetailsSchema = {
	id: string;
	name: string;
	logo: string;
};

export type InfluencerHeaderProps = {
	name: string;
	handle?: string;
	logo: string;
	coverImage?: string;
	bio?: string;
	followers?: string;
	products?: number;
	location?: string;
	website?: string;
	joinedDate?: string;
	verified?: boolean;
	socialLinks?: {
		youtube?: string;
		twitter?: string;
		instagram?: string;
		twitch?: string;
	};
};
