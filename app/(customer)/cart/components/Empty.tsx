import Link from "next/link";

export default function Empty() {
  return (
    <div className="p-4 w-full h-[20rem] flex flex-col justify-center items-center gap-4 border border-solid border-gray-200 rounded-md">
      <p className="text-base md:text-lg text-gray-500 font-medium">Why so Empty?</p>
      <Link href="/" className="px-4 py-2 text-sm md:text-base font-roboto text-black bg-white border border-solid border-purple-500 rounded-sm hover:opacity-60 active:bg-slate-100 duration-200">
        Continue Shopping
      </Link>
    </div>
  );
}