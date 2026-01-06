'use client'

import { useEffect } from 'react';

import { Field, Input } from '@chakra-ui/react';
import { SavedAddress } from '@/types';

interface Props {
  addrType: 'new' | 'saved';
  setAddrType: (type: 'new' | 'saved') => void;
  savedAddresses: SavedAddress[];
  setSelectedAddr: (id: string) => void;
  selectedAddr: string;
  addr: {
    aptSuiteUnit: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  setAddr: (addr: {
    aptSuiteUnit: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }) => void;
}

export default function Address({ savedAddresses, addrType, setAddrType, setSelectedAddr, selectedAddr, addr, setAddr }: Props) {
  useEffect(() => {
    if (savedAddresses.length > 0) {
      setSelectedAddr(savedAddresses[0].id);
    }
  }, [savedAddresses]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddr({ ...addr, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full flex flex-col gap-4 md:gap-5">
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold font-roboto">Shipping Address</h1>
        {savedAddresses.length > 0 && (
          <button
            onClick={() => setAddrType(addrType === 'saved' ? 'new' : 'saved')}
            className="text-sm md:text-base text-purple-500 font-roboto hover:underline duration-200"
          >
            {addrType === 'saved' ? 'Use New Address' : 'Use Saved Address'}
          </button>
        )}
      </div>
      {addrType === 'saved' && savedAddresses.length > 0 && (
        <div className="w-full flex flex-row items-start gap-5 overflow-x-scroll pb-4">
          {savedAddresses.map((address: SavedAddress) => (
            <button
              key={address.id}
              onClick={() => setSelectedAddr(address.id)}
              className={`w-[150px] md:w-[200px] flex flex-col flex-shrink-0 gap-3 bg-white p-4 rounded-md border-solid items-start ${selectedAddr === address.id ? 'border-purple-500 border-2' : 'border-gray-300 border'}`}
            >
              <h2 className="text-base md:text-lg font-semibold font-roboto text-left">
                {address.label}
              </h2>
              <p className="text-sm md:text-base font-roboto text-left">{address.fullAddress}</p>
            </button>
          ))}
        </div>
      )}
      {addrType === 'new' && (
        <div className="w-full flex flex-col items-center gap-6">
          <Field.Root required className="flex flex-col gap-1">
            <Field.Label className="text-sm md:text-base font-roboto">
              Apartment/Suite/Unit <Field.RequiredIndicator color={'purple.500'} />
            </Field.Label>
            <Input
              name='aptSuiteUnit'
              value={addr.aptSuiteUnit}
              onChange={handleInputChange}
              placeholder="123, Buliding 1, Wing A"
              className="px-3 py-1 w-full text-sm md:text-base border border-solid border-gray-300 rounded-sm"
            />
          </Field.Root>
          <Field.Root required className="flex flex-col gap-1">
            <Field.Label className="text-sm md:text-base font-roboto">
              Street Address <Field.RequiredIndicator color={'purple.500'} />
            </Field.Label>
            <Input
              name='streetAddress'
              value={addr.streetAddress}
              onChange={handleInputChange}
              placeholder="123 Main St"
              className="px-3 py-1 w-full text-sm md:text-base border border-solid border-gray-300 rounded-sm"
            />
          </Field.Root>
          <div className="w-full flex flex-row items-center gap-8 md:gap-12">
            <Field.Root required className="flex flex-col gap-1">
              <Field.Label className="text-sm md:text-base font-roboto">
                City <Field.RequiredIndicator color={'purple.500'} />
              </Field.Label>
              <Input
                name='city'
                placeholder="Thane"
                className="px-3 py-1 w-full text-sm md:text-base border border-solid border-gray-300 rounded-sm"
                value={addr.city}
                onChange={handleInputChange}
              />
            </Field.Root>
            <Field.Root required className="flex flex-col gap-1">
              <Field.Label className="text-sm md:text-base font-roboto">
                State <Field.RequiredIndicator color={'purple.500'} />
              </Field.Label>
              <Input
                name='state'
                value={addr.state}
                onChange={handleInputChange}
                placeholder="Maharashtra"
                className="px-3 py-1 w-full text-sm md:text-base border border-solid border-gray-300 rounded-sm"
              />
            </Field.Root>
          </div>
          <Field.Root required className="flex flex-col gap-1">
            <Field.Label className="text-sm md:text-base font-roboto">
              Pincode <Field.RequiredIndicator color={'purple.500'} />
            </Field.Label>
            <Input
              name='zipCode'
              value={addr.zipCode}
              onChange={handleInputChange}
              placeholder="400001"
              className="px-3 py-1 w-full text-sm md:text-base border border-solid border-gray-300 rounded-sm"
            />
          </Field.Root>
        </div>
      )
      }
    </div >
  );
}
