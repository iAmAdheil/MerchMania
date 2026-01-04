'use client'

import { useEffect } from 'react';
import { Field, Input } from '@chakra-ui/react';
import { SavedAddress } from '@/types';

interface Props {
  savedAddresses: SavedAddress[];
  addrType: 'new' | 'saved';
  setAddrType: (type: 'new' | 'saved') => void;
  setSelectedAddr: (id: string) => void;
  selectedAddr: string;
  addr: { aptSuiteUnit: string, streetAddress: string, city: string, state: string, zipCode: string, country: string };
  setAddr: (addr: { aptSuiteUnit: string, streetAddress: string, city: string, state: string, zipCode: string, country: string }) => void;
}

export default function Details({ savedAddresses, addrType, setAddrType, setSelectedAddr, selectedAddr, addr, setAddr }: Props) {
  useEffect(() => {
    if (savedAddresses.length > 0) {
      setSelectedAddr(savedAddresses[0].id);
    }
  }, [savedAddresses]);

  return (
    <>
      <div className="w-full flex flex-col gap-4 md:gap-5">
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold font-roboto">Shipping Address</h1>
          {savedAddresses.length > 0 && (
            <button
              onClick={() => setAddrType(addrType === 'saved' ? 'new' : 'saved')}
              className="text-sm md:text-base font-roboto text-purple-500 hover:underline duration-200"
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
                  value={addr.aptSuiteUnit}
                  onChange={e => setAddr({ ...addr, aptSuiteUnit: e.target.value })}
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
                  value={addr.streetAddress}
                  onChange={e => setAddr({ ...addr, streetAddress: e.target.value })}
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
                    value={addr.city}
                    onChange={e => setAddr({ ...addr, city: e.target.value })}
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
                    value={addr.state}
                    onChange={e => setAddr({ ...addr, state: e.target.value })}
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
                  value={addr.zipCode}
                  onChange={e => setAddr({ ...addr, zipCode: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
