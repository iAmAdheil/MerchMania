'use client';

import 'react-international-phone/style.css';

import { useState } from 'react';

import { PhoneInput } from 'react-international-phone';
import { Store, X } from 'lucide-react';
import {
  Field,
  Input,
  Textarea,
} from '@chakra-ui/react';

import { handleShopCreate } from './Helpers';
import SocialLink from './Social-Link';
import ImgInput from '@/components/ui/Image-Input';
import Loader from '@/components/Loader';

export type Details = {
  shopName: string;
  description: string;
  contact: string;
};

export default function Main({ userId: ownerId }: { userId: string }) {
  const [shopDetails, setShopDetails] = useState<Details>({
    shopName: '',
    description: '',
    contact: '',
  });
  const [socialLinks, setSocialLinks] = useState<{ [key: string]: string }>({});
  const [platform, setPlatform] = useState<string>('');
  const [link, setLink] = useState<string>('');

  const [logoUrl, setLogoUrl] = useState<string>('');
  const [bannerUrl, setBannerUrl] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShopDetails(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  const handleAdd = () => {
    if (platform === '' || link === '') {
      alert('Please choose platform and add link');
      return;
    }
    setSocialLinks(prevState => {
      return {
        ...prevState,
        [platform]: link,
      };
    });
    setLink('');
    setPlatform('');
  }

  return (
    <div className="w-full md:py-10 bg-gray-50">
      <div className="bg-gray-50 w-full py-16 md:py-6 px-6 md:px-10 max-w-5xl mx-auto flex flex-col justify-center items-center gap-8 rounded-lg">
        <div className="w-full flex flex-col gap-4">
          <Store className="h-16 w-16 mx-auto text-brand-purple" />
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold font-roboto">Set Up Your Store</h2>
            <p className="text-sm md:text-base text-gray-600 font-roboto">
              Let&apos;s create your unique brand identity
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-6">
          <Field.Root required className="flex flex-col gap-1">
            <Field.Label className="text-sm md:text-base font-roboto">
              Shop Name <Field.RequiredIndicator color={'purple.500'} />
            </Field.Label>
            <Input
              name="shopName"
              value={shopDetails.shopName}
              onChange={handleInputChange}
              placeholder="Cyber Ninja"
              className="pl-3 py-1 w-full text-sm md:text-base border border-solid border-gray-300 rounded-sm"
            />
          </Field.Root>
          <Field.Root required className="flex flex-col gap-1">
            <Field.Label className="text-sm md:text-base font-roboto">
              Description <Field.RequiredIndicator color={'purple.500'} />
            </Field.Label>
            <Textarea
              name="description"
              value={shopDetails.description}
              onChange={handleInputChange}
              minH="3lh"
              maxH="8lh"
              placeholder="Cyber Ninja is a brand that sells cyber ninja products"
              className="py-1.5 px-2 text-sm md:text-base placeholder:text-gray-400 border border-solid border-gray-300 rounded-sm"
              autoresize
            />
          </Field.Root>
          <ImgInput title="Logo" url={logoUrl} setURL={setLogoUrl} />
          <ImgInput title="Banner" url={bannerUrl} setURL={setBannerUrl} />
          <div className="w-full flex flex-col mt-6 gap-10">
            <Field.Root required className="flex flex-col gap-1">
              <Field.Label className="text-sm md:text-base font-roboto">
                Contact Details <Field.RequiredIndicator color={'purple.500'} />
              </Field.Label>
              <PhoneInput
                name='contact'
                value={shopDetails.contact}
                onChange={contact => setShopDetails({ ...shopDetails, contact })}
                countrySelectorStyleProps={{
                  buttonStyle: { paddingLeft: 15, paddingRight: 15, height: 45 },
                  dropdownStyleProps: { style: { marginTop: 10, borderRadius: 5 } },
                }}
                inputStyle={{
                  width: '100%',
                  fontSize: 15,
                  paddingLeft: 10,
                  paddingRight: 10,
                  height: 45,
                  backgroundColor: '#f9fafb',
                }}
              />
            </Field.Root>
            <div className="flex flex-col gap-2">
              <Field.Root required className="flex flex-col gap-1">
                <Field.Label className="text-sm md:text-base font-roboto">
                  Social Links (at least 1) <Field.RequiredIndicator color={'purple.500'} />
                </Field.Label>
                <div className="w-full flex flex-row items-center gap-3 md:gap-6">
                  <SocialLink
                    link={link}
                    platform={platform}
                    setLink={setLink}
                    setPlatform={setPlatform}
                  />
                  <button
                    onClick={handleAdd}
                    className="text-xs sm:text-sm font-roboto font-semibold cursor-pointer bg-purple-500 text-white px-3 sm:px-4 py-3 sm:py-2 rounded-sm"
                  >
                    Add
                  </button>
                </div>
              </Field.Root>
              <div className="mt-2 md:mt-3 flex flex-col gap-2 md:gap-3">
                {Object.keys(socialLinks).map(key => (
                  <div className="w-full flex flex-row items-center justify-between" key={key}>
                    <div className="flex flex-row items-center gap-3">
                      <p className="text-sm md:text-base font-roboto">{key}</p>
                      <p className="text-sm md:text-base font-roboto">
                        {socialLinks[key].length > 30
                          ? socialLinks[key].slice(0, 30) + '...'
                          : socialLinks[key]}
                      </p>
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setSocialLinks(prevState => {
                          const newState = { ...prevState } as { [key: string]: string };
                          delete newState[key];
                          return newState;
                        });
                      }}
                    >
                      <X className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center sm:justify-start">
          <button
            onClick={() => handleShopCreate(shopDetails, ownerId, logoUrl, bannerUrl, socialLinks)}
            className="max-w-28 md:max-w-32 w-full px-4 py-2 flex justify-center items-center text-black text-sm md:text-base font-roboto bg-white border border-solid border-purple-500 rounded-sm"
          >
            {loading ? <Loader size={16} /> : 'Create Shop'}
          </button>
        </div>
      </div>
    </div >
  );
}