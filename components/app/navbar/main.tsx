'use server'

import { RxHamburgerMenu } from 'react-icons/rx';
import Link from 'next/link';
import Searchbar from './Search';
import Cart from './Cart';
import Profile from './Profile';
import { Roles } from '@/types/types';

async function Navbar({ role }: { role: Roles }) {
  return (
    <div className="border-b-[0.5px] border-solid border-gray-200 shadow-md flex flex-row justify-between items-center z-10">
      <div className="flex-1 flex flex-row items-center px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* phone navbar */}
        <div className="py-2 w-full flex flex-row items-center justify-between gap-4 sm:hidden">
          <Searchbar />
          {role === 'creator' && (
            <Profile />
          )}
          {role === 'customer' && (
            <div className="flex flex-row items-center gap-4">
              <Cart />
              <Profile />
            </div>
          )}
          {(role !== 'creator' && role !== 'customer') && (
            <div className="flex flex-row items-center gap-4">
              <Link
                href="/signin"
                className="text-xs font-semibold font-roboto text-white bg-purple-500 border-gray-600 px-4 rounded-md hover:opacity-80 active:opacity-60"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="text-xs font-semibold font-roboto bg-black text-white border border-solid border-gray-600 px-4 rounded-md hover:opacity-80 active:opacity-60"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
        {/* tablet navbar */}
        <div className="py-2 w-full hidden flex-row items-center justify-between gap-4 md:gap-6 sm:flex lg:hidden">
          <div className="flex flex-row items-center gap-4 md:gap-6">
            <RxHamburgerMenu className="h-4 w-4 md:h-[18px] md:w-[18px]" />
            <Link
              href="/"
              className="text-2xl font-roboto font-bold bg-gradient-to-r from-purple-600 to-purple-300 bg-clip-text text-transparent hover:cursor-pointer"
            >
              MerchMania
            </Link>
          </div>
          <Searchbar />
          {role === 'creator' && (
            <Profile />
          )}
          {role === 'customer' && (
            <div className="flex flex-row items-center gap-4 md:gap-6">
              <Cart />
              <Profile />
            </div>
          )}
          {(role !== 'creator' && role !== 'customer') && (
            <div className="flex flex-row items-center gap-4">
              <Link
                href="/signin"
                className="text-xs font-semibold font-roboto text-white bg-purple-500 border-gray-600 px-4 rounded-md hover:opacity-80 active:opacity-60"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="text-xs font-semibold font-roboto bg-black text-white border border-solid border-gray-600 px-4 rounded-md hover:opacity-80 active:opacity-60"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
        {/* computer navbar */}
        <div className="py-3 w-full hidden flex-row items-center lg:flex">
          <div className="w-full flex flex-row items-center justify-between gap-8">
            <Link
              href="/"
              className="text-3xl font-roboto font-bold bg-gradient-to-r from-purple-600 to-purple-300 bg-clip-text text-transparent hover:cursor-pointer"
            >
              MerchMania
            </Link>
            <Searchbar />
            {role !== 'creator' && (
              <div className="flex flex-row items-center justify-between gap-8 xl:gap-12">
                <button className="text-[15px] font-roboto text-gray-600 hover:text-purple-500 duration-200">
                  Explore
                </button>
                <button className="text-[15px] text-nowrap font-roboto text-gray-600 hover:text-purple-500 duration-200">
                  Our Influencers
                </button>
              </div>
            )}
            {role === 'creator' && (
              <>
                <div className="flex flex-row items-center gap-8 xl:gap-12">
                  <Link
                    className="text-sm px-2.5 py-1.5 border border-solid border-purple-600 bg-white text-black text-nowrap font-roboto font-medium rounded-sm hover:opacity-80 active:opacity-50 duration-200"
                    href="/creator/dashboard"
                  >
                    Dashboard
                  </Link>
                  <Link
                    className="text-sm px-2.5 py-1.5 border border-solid border-purple-600 bg-white text-black text-nowrap font-roboto font-medium rounded-sm hover:opacity-80 active:opacity-50 duration-200"
                    href="/creator/new-product"
                  >
                    Create New Product
                  </Link>
                </div>
                <Profile />
              </>
            )}
            {role === 'customer' && (
              <div className="flex flex-row items-center gap-8 xl:gap-12">
                <Cart />
                <Profile />
              </div>
            )}
            {(role === 'anonymous' || (role !== 'creator' && role !== 'customer')) && (
              <div className="flex flex-row items-center gap-4">
                <Link href="/signin">
                  <div
                    className="text-xs font-semibold font-roboto text-white bg-purple-500 border-gray-600 px-4 py-2 rounded-md hover:opacity-80 active:opacity-60"
                  >
                    Log In
                  </div>
                </Link>
                <Link href="/signup">
                  <div
                    className="text-xs font-semibold font-roboto bg-black text-white border border-solid border-gray-600 px-4 py-2 rounded-md hover:opacity-80 active:opacity-60"
                  >
                    Sign Up
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div >
  );
}

export default Navbar;