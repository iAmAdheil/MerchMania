'use client'

import { Field, Input } from '@chakra-ui/react';

interface Props {
  userDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  setUserDetails: (userDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => void;
}

export default function UserDetails({ userDetails, setUserDetails }: Props) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <div className="w-full flex flex-col gap-4 md:gap-5">
        <h1 className="text-2xl md:text-3xl font-roboto font-bold">Contact Information</h1>
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex flex-row items-center gap-8 md:gap-12">
            <Field.Root required className="flex flex-col gap-1">
              <Field.Label className="text-xs md:text-sm font-roboto">
                First Name <Field.RequiredIndicator color={'purple.500'} />
              </Field.Label>
              <Input
                name='firstName'
                value={userDetails.firstName}
                onChange={handleInputChange}
                placeholder="John"
                className="px-3 py-1 w-full text-sm md:text-base border border-solid border-gray-300 rounded-sm"
              />
            </Field.Root>
            <Field.Root required className="flex flex-col gap-1">
              <Field.Label className="text-xs md:text-sm font-roboto">
                Last Name
              </Field.Label>
              <Input
                name='lastName'
                value={userDetails.lastName}
                onChange={handleInputChange}
                placeholder="Doe"
                className="px-3 py-1 w-full text-sm md:text-base border border-solid border-gray-300 rounded-sm"
              />
            </Field.Root>
          </div>
          <div className="w-full flex flex-row items-center gap-8 md:gap-12">
            <Field.Root required className="w-full flex flex-col gap-1">
              <Field.Label className="text-xs md:text-sm font-roboto">
                Email <Field.RequiredIndicator color={'purple.500'} />
              </Field.Label>
              <Input
                name='email'
                value={userDetails.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className="px-3 py-1 w-full text-sm md:text-base border border-solid border-gray-300 rounded-sm"
              />
            </Field.Root>
            <Field.Root required className="w-full flex flex-col gap-1">
              <Field.Label className="text-xs md:text-sm font-roboto">
                Phone Number <Field.RequiredIndicator color={'purple.500'} />
              </Field.Label>
              <Input
                name='phone'
                placeholder="+91 9876543210"
                className="px-3 py-1 w-full text-sm md:text-base border border-solid border-gray-300 rounded-sm"
                value={userDetails.phone}
                onChange={handleInputChange}
              />
            </Field.Root>
          </div>
        </div>
      </div>
    </div >
  )
}