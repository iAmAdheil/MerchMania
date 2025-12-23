'use server';

import { generateUniqueId } from '@/utils/getCuid';
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { ProductDetailsSchema, ShopDetailsSchema } from '@/types/types';
import { SIZE } from '@/generated/prisma/client';

export const saveImage = async (file: File, filename: string, folder: string): Promise<string> => {
  try {
    cloudinary.config({
      cloud_name: 'dzaj1xdgz',
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Convert buffer to base64 data URI
      const base64 = buffer.toString('base64');
      const dataUri = `data:${file.type};base64,${base64}`;

      // Upload using data URI
      const uploadResult = await cloudinary.uploader.upload(dataUri, {
        resource_type: 'image',
        folder: folder,
        public_id: filename,
        overwrite: false,
      });
      return uploadResult.secure_url;
    } else {
      throw new Error('No file found to upload');
    }
  } catch (e) {
    console.log(e);
    return '';
  }
};

export const saveShop = async (formData: FormData) => {
  try {
    const sId = generateUniqueId();
    const logoFile = formData.get('logo') as File;
    const bannerFile = formData.get('banner') as File;
    const sdString = formData.get('shopDetails') as string;
    const ownerId = formData.get('ownerId') as string;

    const shopDetails = JSON.parse(sdString) as ShopDetailsSchema;
    const logoUrl = await saveImage(logoFile, `${sId}-logo.png`, 'shop-logos');
    if (logoUrl.length === 0) {
      throw new Error('Failed to save logo');
    }
    const bannerUrl = await saveImage(bannerFile, `${sId}-banner.png`, 'shop-banners');
    if (!bannerUrl || bannerUrl.length === 0) {
      throw new Error('Failed to save banner');
    }

    const shop = await prisma.shop.create({
      data: {
        id: sId,
        name: shopDetails.name,
        logo: logoUrl || '',
        banner: bannerUrl || '',
        description: shopDetails.description,
        location: shopDetails.location,
        contact: shopDetails.contact,
        socialLinks: shopDetails.socialLinks,
        ownerId: ownerId,
      },
    });
    if (!shop) {
      throw new Error('Failed to save creator shop');
    }
    const updateUser = await prisma.user.update({
      where: {
        id: ownerId,
      },
      data: {
        isOnboarded: true,
      },
    });
    if (!updateUser) {
      throw new Error('Failed to update user');
    }
    return 1;
  } catch (e) {
    console.log(e);
    return 0;
  }
};

export const saveProduct = async (formData: FormData) => {
  try {
    const pId = generateUniqueId();
    const images = [];

    const pdString = formData.get('productDetails') as string;
    const shopId = formData.get('shopId') as string;

    const productDetails = JSON.parse(pdString) as ProductDetailsSchema;
    const sizes = productDetails.sizes as unknown as SIZE[];

    for (let i = 1; i <= 5; i++) {
      const image = formData.get(`image${i}`) as File;
      const imageUrl = await saveImage(image, `${pId}-image${i}.png`, 'product-images');
      if (!imageUrl || imageUrl.length === 0) {
        throw new Error(`Failed to save image no. ${i}`);
      }
      images.push(imageUrl);
    }

    const product = await prisma.product.create({
      data: {
        id: pId,
        name: productDetails.name,
        description: productDetails.description,
        images: images,
        sizes: sizes,
        price: productDetails.price,
        inStock: productDetails.inStock,
        shopId: shopId,
      },
    });
    if (!product) {
      throw new Error('Failed to save new product');
    }
    return 1;
  } catch (e) {
    console.log(e);
    return 0;
  }
};