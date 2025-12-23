'use client'

import { useEffect, useState } from 'react';
import { Field, Input } from '@chakra-ui/react';
import { SavedAddress } from '@/app/checkout/page';

export default function Details({ savedAddresses }: { savedAddresses: SavedAddress[] }) {
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [addressType, setAddressType] = useState<'new' | 'saved'>('new');

  useEffect(() => {
    if (savedAddresses.length > 0) {
      setAddressType('saved');
      setSelectedAddress(savedAddresses[0].id);
    }
  }, [savedAddresses]);

  return (
    <div className="w-full flex flex-col gap-12 md:gap-16">
      <div className="w-full flex flex-col gap-4 md:gap-5">
        <h1 className="text-2xl md:text-3xl font-bold font-roboto">Contact Information</h1>
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex flex-row items-center gap-8 md:gap-12">
            <div className="w-full flex flex-col gap-2">
              <Field.Root required className="flex flex-col gap-2">
                <Field.Label className="text-sm md:text-base font-roboto">
                  First Name <Field.RequiredIndicator color={'purple.500'} />
                </Field.Label>
              </Field.Root>
              <Input
                placeholder="John"
                className="w-full border border-solid border-gray-300 text-sm md:text-base rounded-sm pl-3 py-1"
              // value={shopName}
              // onChange={e => setShopName(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Field.Root required className="flex flex-col gap-2">
                <Field.Label className="text-sm md:text-base font-roboto">Last Name</Field.Label>
              </Field.Root>
              <Input
                placeholder="Doe"
                className="w-full border border-solid border-gray-300 text-sm md:text-base rounded-sm pl-3 py-1"
              // value={shopName}
              // onChange={e => setShopName(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full flex flex-row items-center gap-8 md:gap-12">
            <div className="w-full flex flex-col gap-2">
              <Field.Root required className="flex flex-col gap-2">
                <Field.Label className="text-sm md:text-base font-roboto">Email</Field.Label>
              </Field.Root>
              <Input
                placeholder="john@example.com"
                className="w-full border border-solid border-gray-300 text-sm md:text-base rounded-sm pl-3 py-1"
              // value={shopName}
              // onChange={e => setShopName(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Field.Root required className="flex flex-col gap-2">
                <Field.Label className="text-sm md:text-base font-roboto">
                  Phone Number <Field.RequiredIndicator color={'purple.500'} />
                </Field.Label>
              </Field.Root>
              <Input
                placeholder="+91 9876543210"
                className="w-full border border-solid border-gray-300 text-sm md:text-base rounded-sm pl-3 py-1"
              // value={shopName}
              // onChange={e => setShopName(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 md:gap-5">
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold font-roboto">Shipping Address</h1>
          {savedAddresses.length > 0 && (
            <button
              onClick={() => setAddressType(addressType === 'saved' ? 'new' : 'saved')}
              className="text-sm md:text-base font-roboto text-purple-500 hover:underline duration-200"
            >
              {addressType === 'saved' ? 'Use New Address' : 'Use Saved Address'}
            </button>
          )}
        </div>
        {addressType === 'saved' && savedAddresses.length > 0 && (
          <div className="w-full flex flex-row items-start gap-5 overflow-x-scroll pb-4">
            {savedAddresses.map((address: SavedAddress) => (
              <button
                key={address.id}
                onClick={() => setSelectedAddress(address.id)}
                className={`w-[150px] md:w-[200px] flex flex-col flex-shrink-0 gap-3 bg-white p-4 rounded-md border-solid items-start ${selectedAddress === address.id ? 'border-purple-500 border-2' : 'border-gray-300 border'}`}
              >
                <h2 className="text-base md:text-lg font-semibold font-roboto text-left">
                  {address.label}
                </h2>
                <p className="text-sm md:text-base font-roboto text-left">{address.fullAddress}</p>
              </button>
            ))}
          </div>
        )}
        {addressType === 'new' && (
          <div className="w-full gap-6">
            <div className="w-full flex flex-col items-center gap-6">
              <div className="w-full flex flex-col gap-2">
                <Field.Root required className="flex flex-col gap-2">
                  <Field.Label className="text-sm md:text-base font-roboto">
                    Apartment/Suite/Unit <Field.RequiredIndicator color={'purple.500'} />
                  </Field.Label>
                </Field.Root>
                <Input
                  placeholder="123, Buliding 1, Wing A"
                  className="w-full border border-solid border-gray-300 text-sm md:text-base rounded-sm pl-3 py-1"
                // value={shopName}
                // onChange={e => setShopName(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Field.Root required className="flex flex-col gap-2">
                  <Field.Label className="text-sm md:text-base font-roboto">
                    Street Address <Field.RequiredIndicator color={'purple.500'} />
                  </Field.Label>
                </Field.Root>
                <Input
                  placeholder="123 Main St"
                  className="w-full border border-solid border-gray-300 text-sm md:text-base rounded-sm pl-3 py-1"
                // value={shopName}
                // onChange={e => setShopName(e.target.value)}
                />
              </div>
              <div className="w-full flex flex-row items-center gap-8 md:gap-12">
                <div className="w-full flex flex-col gap-2">
                  <Field.Root required className="flex flex-col gap-2">
                    <Field.Label className="text-sm md:text-base font-roboto">
                      City <Field.RequiredIndicator color={'purple.500'} />
                    </Field.Label>
                  </Field.Root>
                  <Input
                    placeholder="Thane"
                    className="w-full border border-solid border-gray-300 text-sm md:text-base rounded-sm pl-3 py-1"
                  // value={shopName}
                  // onChange={e => setShopName(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <Field.Root required className="flex flex-col gap-2">
                    <Field.Label className="text-sm md:text-base font-roboto">
                      State <Field.RequiredIndicator color={'purple.500'} />
                    </Field.Label>
                  </Field.Root>
                  <Input
                    placeholder="Maharashtra"
                    className="w-full border border-solid border-gray-300 text-sm md:text-base rounded-sm pl-3 py-1"
                  // value={shopName}
                  // onChange={e => setShopName(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-2">
                <Field.Root required className="flex flex-col gap-2">
                  <Field.Label className="text-sm md:text-base font-roboto">
                    Pincode <Field.RequiredIndicator color={'purple.500'} />
                  </Field.Label>
                </Field.Root>
                <Input
                  placeholder="400001"
                  className="w-full border border-solid border-gray-300 text-sm md:text-base rounded-sm pl-3 py-1"
                // value={shopName}
                // onChange={e => setShopName(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
