import Link from 'next/link';

import { FiShoppingCart } from 'react-icons/fi';

export default function Header() {
  return (
    <div className="px-3 w-full flex flex-row justify-between items-center">
      <div className="flex flex-row items-center gap-5">
        <FiShoppingCart className="text-gray-600 dark:text-white" size={26} />
        <h1 className="text-3xl font-bold">Your Cart</h1>
      </div>
      <Link
        href="/checkout"
        className="px-3 sm:px-4 py-2 w-fit text-xs sm:text-sm lg:text-base text-white font-semibold bg-purple-500 rounded-md"
      >
        Checkout
      </Link>
    </div>
  );
}
