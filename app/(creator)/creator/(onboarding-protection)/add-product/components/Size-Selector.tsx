import { Field } from "@chakra-ui/react"
import { Sizes } from '@/types';

function SizeSelect({ handleSizeSelect, sizes }: { handleSizeSelect: (size: Sizes) => void, sizes: Sizes[] }) {
  return (
    <Field.Root required className="flex flex-col gap-1">
      <Field.Label className="text-sm md:text-base font-roboto">
        Available Sizes <Field.RequiredIndicator color={'purple.500'} />
      </Field.Label>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex flex-row items-center gap-x-4">
          <button
            onClick={() => handleSizeSelect('XS')}
            className={`flex-1 py-2 text-sm font-roboto border border-solid border-gray-300 rounded-md  duration-200 ${!sizes.includes('XS') ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'}`}
          >
            XS
          </button>
          <button
            onClick={() => handleSizeSelect('S')}
            className={`flex-1 py-2 text-sm font-roboto border border-solid border-gray-300 rounded-md  duration-200 ${!sizes.includes('S') ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'}`}
          >
            S
          </button>
          <button
            onClick={() => handleSizeSelect('M')}
            className={`flex-1 py-2 text-sm font-roboto border border-solid border-gray-300 rounded-md  duration-200 ${!sizes.includes('M') ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'}`}
          >
            M
          </button>
        </div>
        <div className="w-full flex flex-row items-center gap-x-4">
          <button
            onClick={() => handleSizeSelect('L')}
            className={`flex-1 py-2 text-sm font-roboto border border-solid border-gray-300 rounded-md  duration-200 ${!sizes.includes('L') ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'}`}
          >
            L
          </button>
          <button
            onClick={() => handleSizeSelect('XL')}
            className={`flex-1 py-2 text-sm font-roboto border border-solid border-gray-300 rounded-md duration-200 ${!sizes.includes('XL') ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'}`}
          >
            XL
          </button>
          <button
            onClick={() => handleSizeSelect('XXL')}
            className={`flex-1 py-2 text-sm font-roboto border border-solid border-gray-300 rounded-md duration-200 ${!sizes.includes('XXL') ? 'hover:bg-slate-50' : 'text-white border-none bg-purple-500 hover:opacity-90'}`}
          >
            XXL
          </button>
        </div>
      </div>
    </Field.Root>
  )
}

export default SizeSelect