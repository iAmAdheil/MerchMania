export type ProductDetailsSchema = {
	name: string;
	description: string;
	gender: 'female' | 'male' | 'unisex';
	design: string;
	sizes: SizesSchema;
	price: string;
};

export type ShopDetailsSchema = {
	name: string;
	logo: string;
};

export type SizesSchema = {
	XS: boolean;
	S: boolean;
	M: boolean;
	L: boolean;
	XL: boolean;
	XXL: boolean;
};

export type ProductCardSchema = {
	id: string;
	name: string;
	image: string;
	price: string;
	brand?: string;
	brandImage?: string;
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
