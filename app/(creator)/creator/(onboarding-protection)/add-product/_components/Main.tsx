'use client';

import { useState } from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Field, Input, Textarea } from '@chakra-ui/react';
import { Shirt } from 'lucide-react';
import { handleCreateProduct } from './Helpers';
import { Sizes } from '@/types';

import ImageInput from './Multi-Image-Input';
import SizeSelect from './Size-Selector';
import Loader from '@/components/Loader';

export default function Main({ userId: ownerId }: { userId: string }) {
  const [loading, setLoading] = useState<boolean>(false);

  const [productName, setProductName] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female' | 'unisex'>('unisex');
  const [price, setPrice] = useState<string>('');
  const [sizes, setSizes] = useState<Sizes[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const handleSizeSelect = (size: Sizes) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter(s => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  return (
    <div className="md:py-10 w-full bg-gray-50">
      <div className="py-16 md:py-6 px-6 md:px-10 max-w-5xl mx-auto w-full flex flex-col justify-center items-center gap-8 bg-gray-50 rounded-lg">
        <div className="w-full flex flex-col gap-4">
          <Shirt className="h-16 w-16 mx-auto text-brand-purple" />
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-roboto font-bold">Product Details</h2>
            <p className="text-sm md:text-base text-gray-600 font-roboto">
              Let&apos;s create your first product
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-6">
          <Field.Root required className="flex flex-col gap-1">
            <Field.Label className="text-sm md:text-base font-roboto">
              Product Name <Field.RequiredIndicator color={'purple.500'} />
            </Field.Label>
            <Input
              placeholder="Cyber Ninja"
              className="pl-3 py-1 w-full text-sm md:text-base placeholder:text-gray-400 border border-solid border-gray-300 rounded-sm"
              value={productName}
              onChange={e => setProductName(e.target.value)}
            />
          </Field.Root>
          <Field.Root required className="flex flex-col gap-2">
            <Field.Label className="text-sm md:text-base font-roboto">
              Product Description <Field.RequiredIndicator color={'purple.500'} />
            </Field.Label>
            <Textarea
              minH="3lh"
              maxH="8lh"
              placeholder="Cyber Ninja is a brand that sells cyber ninja products"
              className="py-1.5 px-2 text-sm md:text-base placeholder:text-gray-400 border border-solid border-gray-300 rounded-sm"
              autoresize
              value={productDescription}
              onChange={e => setProductDescription(e.target.value)}
            />
          </Field.Root>
          <Field.Root required className="flex flex-col gap-1">
            <Field.Label className="text-sm md:text-base font-roboto">
              Select Gender <Field.RequiredIndicator color={'purple.500'} />
            </Field.Label>
            <FormControl
              sx={{ width: '100%', justifyItems: 'center', justifyContent: 'center' }}
              size="small"
            >
              <InputLabel sx={{ fontSize: 15, paddingTop: 1, color: '#9ca3af' }}>Gender</InputLabel>
              <Select
                label="Gender"
                sx={{ paddingY: 1 }}
                value={gender}
                onChange={e => setGender(e.target.value)}
              >
                <MenuItem sx={{ fontSize: 15 }} value={'male'}>
                  Male
                </MenuItem>
                <MenuItem sx={{ fontSize: 15 }} value={'female'}>
                  Female
                </MenuItem>
                <MenuItem sx={{ fontSize: 15 }} value={'unisex'}>
                  Unisex
                </MenuItem>
              </Select>
            </FormControl>
          </Field.Root>
          <ImageInput images={images} setImages={setImages} />
          <SizeSelect handleSizeSelect={handleSizeSelect} sizes={sizes} />
          <Field.Root required className="flex flex-col gap-1">
            <Field.Label className="text-sm md:text-base font-roboto">
              Product Price (in INR) <Field.RequiredIndicator color={'purple.500'} />
            </Field.Label>
            <Input
              placeholder=""
              className="border border-solid border-gray-200 text-sm md:text-base rounded-sm pl-3 py-1"
              value={price}
              onChange={e => setPrice(e.target.value)}
            />
          </Field.Root>
        </div>
        <div className="w-full flex justify-center sm:justify-start">
          <button
            onClick={() => handleCreateProduct(ownerId, productName, productDescription, gender, images, sizes, price)}
            className="max-w-32 md:max-w-36 w-full bg-white text-black text-sm md:text-base font-roboto rounded-sm px-4 py-2 border border-solid border-purple-500 flex items-center justify-center"
          >
            {loading ? <Loader size={20} /> : 'Save Product'}
          </button>
        </div>
      </div>
    </div >
  );
}
