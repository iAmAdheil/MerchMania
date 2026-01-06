'use client'

import { Dispatch, SetStateAction } from 'react';
import Link from 'next/link';

import { Users, ArrowRight, Star } from 'lucide-react';

import { Display } from './Main';

export default function Options({
  setDisplay,
}: {
  setDisplay: Dispatch<SetStateAction<Display>>;
}) {
  return (
    <div className="max-w-[30rem] px-6 py-5 flex flex-col items-center gap-6 rounded-md shadow-xl">
      <div className="">
        <h2 className="text-3xl text-black font-bold">Create Account</h2>
        <p className="text-base text-gray-600 font-roboto">
          Choose how you&apos;d like to join our community
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => setDisplay('customer')}
          className="px-4 py-4 flex flex-row justify-between items-center gap-10 border-2 border-solid border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 duration-200"
        >
          <div className="flex flex-row items-center gap-3">
            <div className="bg-purple-200 p-2 rounded-lg opacity-90">
              <Users className="w-4 h-4" color="purple" />
            </div>
            <div className="flex flex-col text-left">
              <p className="text-base md:text-lg font-roboto font-semibold text-black">
                Join as Customer
              </p>
              <p className="text-sm font-roboto text-gray-600">
                Shop exclusive creator merchandise
              </p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4" />
        </button>
        <button
          onClick={() => setDisplay('creator')}
          className="px-4 py-4 flex flex-row justify-between items-center gap-10 border-2 border-solid border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 duration-200"
        >
          <div className="flex flex-row items-center gap-4">
            <div className="bg-orange-200 p-2 rounded-lg opacity-90">
              <Star className="w-4 h-4" color="red" />
            </div>
            <div className="flex flex-col text-left">
              <p className="text-base md:text-lg text-black font-roboto font-semibold">
                Join as Creator
              </p>
              <p className="text-sm text-gray-600 font-roboto">
                Start selling your merchandise
              </p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <p className="text-xs md:text-sm text-gray-600 font-roboto">
        Already have an account?{' '}
        <Link href="/login">
          <span className="text-sm md:text-base font-semibold text-purple-600 decoration-purple-600 cursor-pointer hover:underline">
            Sign in
          </span>
        </Link>
      </p>
    </div >
  );
}
