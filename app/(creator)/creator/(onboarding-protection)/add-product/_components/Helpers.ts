import { blobUrlToFile } from "@/utils/blob-to-file";
import { saveProduct } from "@/actions/save";
import { fetchShopByUserId } from "@/actions/fetch";
import { ProductDetailsSchema, Sizes } from "@/types";

const SIZE_ORDER = ["XS", "S", "M", "L", "XL", "XXL"];

const sortSizes = (sizes: Sizes[]) => {
  return [...sizes].sort((a, b) => SIZE_ORDER.indexOf(a) - SIZE_ORDER.indexOf(b));
};

export const handleCreateProduct = async (
  ownerId: string,
  productName: string,
  productDescription: string,
  gender: 'male' | 'female' | 'unisex',
  images: string[],
  sizes: Sizes[],
  price: string,
) => {
  try {
    const shopDetails = await fetchShopByUserId(ownerId);
    const productDetails: ProductDetailsSchema = {
      name: productName,
      description: productDescription,
      gender: gender,
      images: images,
      sizes: sortSizes(sizes),
      price: price,
      inStock: true,
    };

    const imageFile1 = await blobUrlToFile(images[0], 'image1.png');
    const imageFile2 = await blobUrlToFile(images[1], 'image2.png');
    const imageFile3 = await blobUrlToFile(images[2], 'image3.png');
    const imageFile4 = await blobUrlToFile(images[3], 'image4.png');
    const imageFile5 = await blobUrlToFile(images[4], 'image5.png');
    const formData = new FormData();
    formData.append('productDetails', JSON.stringify(productDetails));
    formData.append('image1', imageFile1);
    formData.append('image2', imageFile2);
    formData.append('image3', imageFile3);
    formData.append('image4', imageFile4);
    formData.append('image5', imageFile5);
    formData.append('shopId', shopDetails?.id || '');

    const response = await saveProduct(formData);
    if (response === 1) {
      alert('Product created successfully');
    } else {
      alert('Failed to create product. Please try again.');
    }
  } catch (e) {
    console.log(e);
    alert('Failed to create product. Please try again.');
  }
};