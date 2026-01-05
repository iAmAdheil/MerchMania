import { blobUrlToFile } from '@/utils/blob-to-file';
import { saveShop } from '@/actions/save';
import { ShopDetailsSchema } from '@/types';
import { Details } from './Main';

export const handleShopCreate = async (details: Details, ownerId: string, logoUrl: string, bannerUrl: string, socialLinks: { [key: string]: string }) => {
  try {
    const formData = new FormData();
    const shopDetails: ShopDetailsSchema = {
      name: details.shopName,
      description: details.description,
      location: 'USA',
      logo: logoUrl,
      banner: bannerUrl,
      contact: details.contact,
      socialLinks: socialLinks,
    };
    formData.append('shopDetails', JSON.stringify(shopDetails));
    const logoFile = await blobUrlToFile(logoUrl, 'logo.png');
    formData.append('logo', logoFile);
    if (bannerUrl.length > 0) {
      const bannerFile = await blobUrlToFile(bannerUrl, 'banner.png');
      formData.append('banner', bannerFile);
    }
    formData.append('ownerId', ownerId);

    const response = await saveShop(formData);
    if (response === 1) {
      alert('Shop created successfully');
    } else {
      alert('Failed to create shop, please try again');
    }
  } catch (e: any) {
    console.log(e.message);
    alert(`Failed to create shop, please try again: ${e.message}`);
  }
};