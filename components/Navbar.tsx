import Link from 'next/link';

import { RxHamburgerMenu } from 'react-icons/rx';
import { Roles } from '@/types';

import Searchbar from './ui/Search';
import Cart from './ui/Cart';
import Profile from './ui/Profile';

async function Navbar({ role }: { role: Roles }) {
  return (
    <div className="flex flex-row justify-between items-center border-b-[1px] border-solid border-gray-200 shadow-md z-10">
      <div className="flex-1 flex flex-row items-center px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* phone navbar */}
        <div className="py-2 w-full flex flex-row items-center justify-between gap-3 sm:hidden">
          <Searchbar />
          {role === 'creator' && (
            <Profile />
          )}
          {role === 'customer' && (
            <div className="flex flex-row items-center gap-3">
              <Cart />
              <Profile />
            </div>
          )}
          {(role !== 'creator' && role !== 'customer') && (
            <div className="flex flex-row items-center gap-3">
              <Link
                href="/login"
                className="px-3 py-2 text-xs text-white font-semibold font-roboto bg-purple-500 border-gray-600 rounded-md hover:opacity-80 active:opacity-60"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="px-3 py-2 text-xs text-white font-semibold font-roboto bg-black border border-solid border-gray-600 rounded-md hover:opacity-80 active:opacity-60"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* tablet navbar */}
        <div className="py-2 w-full hidden flex-row items-center justify-between gap-3 md:gap-6 sm:flex lg:hidden">
          <div className="flex flex-row items-center gap-3 md:gap-6">
            <RxHamburgerMenu className="h-4 w-4 md:h-[18px] md:w-[18px]" />
            <Link
              href="/"
              className="text-2xl text-transparent font-roboto font-bold bg-gradient-to-r from-purple-600 to-purple-300 bg-clip-text hover:cursor-pointer"
            >
              MerchMania
            </Link>
          </div>
          <Searchbar />
          {role === 'creator' && (
            <Profile />
          )}
          {role === 'customer' && (
            <div className="flex flex-row items-center gap-3 md:gap-6">
              <Cart />
              <Profile />
            </div>
          )}
          {(role !== 'creator' && role !== 'customer') && (
            <div className="flex flex-row items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-xs text-white font-semibold font-roboto bg-purple-500 border-gray-600 rounded-md hover:opacity-80 active:opacity-60"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-xs text-white font-semibold font-roboto bg-black border border-solid border-gray-600 rounded-md hover:opacity-80 active:opacity-60"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* computer navbar */}
        <div className="w-full py-3 flex-row items-center hidden lg:flex">
          <div className="w-full flex flex-row items-center justify-between gap-6">
            <Link
              href="/"
              className="text-3xl font-roboto font-bold text-transparent bg-gradient-to-r from-purple-600 to-purple-300 bg-clip-text hover:cursor-pointer"
            >
              MerchMania
            </Link>
            <Searchbar />
            {role !== "creator" && (
              <div className="flex flex-row items-center justify-between gap-6 xl:gap-12">
                <button className="text-base font-roboto text-gray-600 hover:text-purple-500 duration-200">
                  Explore
                </button>
                <button className="text-base text-nowrap font-roboto text-gray-600 hover:text-purple-500 duration-200">
                  Our Influencers
                </button>
              </div>
            )}
            <div className='flex flex-row items-center gap-6 xl:gap-12'>
              {role === 'creator' && (
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
              )}
              {role === 'creator' && (
                <Profile />
              )}
              {role === 'customer' && (
                <div className="flex flex-row items-center gap-8 xl:gap-12">
                  <Cart />
                  <Profile />
                </div>
              )}
              {(role === 'anonymous' || (role !== 'creator' && role !== 'customer')) && (
                <div className="flex flex-row items-center gap-4">
                  <Link href="/login">
                    <div
                      className="px-4 py-2 text-xs md:text-sm text-white font-roboto font-semibold bg-purple-500 border-gray-600 rounded-md hover:opacity-80 active:opacity-60"
                    >
                      Log In
                    </div>
                  </Link>
                  <Link href="/signup">
                    <div
                      className="px-4 py-2 text-xs md:text-sm text-white font-roboto font-semibold bg-black border border-solid border-gray-600 rounded-md hover:opacity-80 active:opacity-60"
                    >
                      Sign Up
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Navbar;