'use client'

import { useState } from "react";

import { Upload } from "lucide-react";
import { Field } from "@chakra-ui/react";

export default function ImgInput({ title, url, setURL }: { title: string, url: string, setURL: (url: string) => void }) {
  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleImageUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const u = URL.createObjectURL(file);
      setURL(u);
    }
  };

  const handleImageInputUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files?.[0];
    if (img) {
      handleImageUpload(img);
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  return (
    <Field.Root required className="flex flex-col gap-1">
      <Field.Label className="text-sm md:text-base font-roboto">
        {title} <Field.RequiredIndicator color={'purple.500'} />
      </Field.Label>
      <div
        className={`p-6 w-full flex flex-col justify-center items-center text-center border-2 border-dashed rounded-lg transition-colors duration-200 ${dragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
          }`}
        onDragOver={e => handleDragOver(e)}
        onDragLeave={e => handleDragLeave(e)}
        onDrop={e => handleDrop(e)}
      >
        {url ? (
          <div className="flex flex-col items-center gap-4">
            <img
              src={url}
              alt="Logo preview"
              className="max-w-[200px] max-h-[200px] object-contain rounded-lg"
            />
            <button
              onClick={() => {
                document.getElementById('logo-upload')?.click();
              }}
              className="px-3 py-2 rounded-md bg-white text-sm font-semibold font-roboto border border-solid border-gray-400 hover:bg-slate-100 duration-200"
            >
              Change Logo
            </button>
          </div>
        ) : (
          <>
            <Upload className="h-10 w-10 mx-auto text-gray-400 mb-4" />
            <p className="text-sm md:text-base font-roboto mb-4">
              {dragActive ? 'Drop image here' : 'Drag and drop or click to upload'}
            </p>
            <button
              onClick={() => {
                document.getElementById('logo-upload')?.click();
              }}
              className="px-3 py-2 rounded-md bg-white text-sm font-semibold font-roboto border border-solid border-gray-400 hover:bg-slate-100 duration-200"
            >
              Upload Logo
            </button>
          </>
        )}
        <input
          id="logo-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageInputUpload}
        />
        <div className="flex flex-col gap-2">
          <p className="text-xs text-gray-500 mt-6">Preferred dimensions: 200 x 200</p>
          <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
        </div>
      </div>
    </Field.Root>
  )
}