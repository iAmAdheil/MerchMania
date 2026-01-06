import Link from 'next/link';
import { Plus, Settings } from 'lucide-react';

export default function Header({ name }: { name: string }) {
  return (
    <div className="px-6 md:px-8 lg:px-12 py-6 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-y-6">
      <div>
        <h1 className="text-3xl font-bold font-roboto">Dashboard</h1>
        <p className="mt-1 text-base text-gray-600 font-roboto">Welcome back, {name}!</p>
      </div>
      <div className="flex flex-row gap-8">
        <Link
          href="/creator/add-product"
          className="flex flex-row gap-2 items-center text-xs sm:text-sm font-semibold font-roboto px-4 py-2 rounded-lg border-[0.5px] border-solid border-gray-400 hover:bg-slate-50 hover:text-purple-500 duration-150"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
        <Link
          href="/creator/settings"
          className="px-5 py-2.5 flex flex-row items-center gap-2 text-xs sm:text-sm text-white font-semibold font-roboto bg-purple-500 rounded-lg hover:opacity-80"
        >
          <Settings className="h-4 w-4" color="white" />
          Store Settings
        </Link>
      </div>
    </div>
  );
}
