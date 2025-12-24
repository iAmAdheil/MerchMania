'use client'

import { Field, Input } from '@chakra-ui/react';

interface Props {
  userDetails: { firstName: string, lastName: string, email: string, phone: string };
  setUserDetails: (userDetails: { firstName: string, lastName: string, email: string, phone: string }) => void;
}

export default function UserDetails({ userDetails, setUserDetails }: Props) {
  return (
    <div>
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
                value={userDetails.firstName}
                onChange={e => setUserDetails({ ...userDetails, firstName: e.target.value })}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Field.Root required className="flex flex-col gap-2">
                <Field.Label className="text-sm md:text-base font-roboto">Last Name</Field.Label>
              </Field.Root>
              <Input
                placeholder="Doe"
                className="w-full border border-solid border-gray-300 text-sm md:text-base rounded-sm pl-3 py-1"
                value={userDetails.lastName}
                onChange={e => setUserDetails({ ...userDetails, lastName: e.target.value })}
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
                value={userDetails.email}
                onChange={e => setUserDetails({ ...userDetails, email: e.target.value })}
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
                value={userDetails.phone}
                onChange={e => setUserDetails({ ...userDetails, phone: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}