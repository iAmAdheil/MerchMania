import Link from "next/link";

export default function Empty() {
  return (
    <div className="h-[20rem] w-full flex flex-col justify-center items-center gap-4 border border-solid border-gray-200 rounded-md p-4">
      <p className="text-gray-500 text-base md:text-lg font-medium">Why so Empty?</p>
      <Link href="/" className="px-4 py-2 text-sm md:text-base font-roboto bg-white text-black rounded-sm border border-solid border-purple-500 sm:hover:opacity-60 active:bg-slate-100 duration-200">
        Continue Shopping
      </Link>
    </div>
  );
}