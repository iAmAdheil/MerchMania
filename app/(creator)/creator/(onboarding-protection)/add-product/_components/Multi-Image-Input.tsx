import { useState } from "react";

import { Field } from "@chakra-ui/react";
import { Upload, X } from "lucide-react";

function ImageInput({ images, setImages }: { images: string[], setImages: (images: string[]) => void }) {
  const [imageDragActive, setImageDragActive] = useState<boolean>(false);

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setImages([...images, url]);
  };

  const handleDragOver = (e: React.DragEvent, type: 'image') => {
    e.preventDefault();
    e.stopPropagation();
    if (type === 'image') {
      setImageDragActive(true);
    } else {
      setImageDragActive(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent, type: 'image') => {
    e.preventDefault();
    e.stopPropagation();
    if (type === 'image') {
      setImageDragActive(false);
    } else {
      setImageDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent, type: 'image') => {
    e.preventDefault();
    e.stopPropagation();
    if (type === 'image') {
      setImageDragActive(false);
    } else {
      setImageDragActive(false);
    }

    const file = e.dataTransfer.files?.[0];
    if (file && images.length < 5) {
      handleImageUpload(file);
    }
  };

  return (
    <Field.Root required className="flex flex-col gap-1">
      <Field.Label className="text-sm md:text-base font-roboto">
        Upload Images (Min 1, Max 5) <Field.RequiredIndicator color={'purple.500'} />
      </Field.Label>
      <div
        className={`p-6 w-full flex flex-col justify-center items-center text-center transition-colors border-2 border-dashed rounded-lg duration-200 ${imageDragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
          }`}
        onDragOver={e => handleDragOver(e, 'image')}
        onDragLeave={e => handleDragLeave(e, 'image')}
        onDrop={e => handleDrop(e, 'image')}
      >
        <Upload className="h-10 w-10 mx-auto mb-4 text-gray-400" />
        <p className="mb-4 text-sm md:text-base font-roboto">
          {imageDragActive ? 'Drop image here' : 'Drag and drop or click to upload'}
        </p>
        <button
          onClick={() => {
            document.getElementById('image-upload')?.click();
          }}
          className="px-3 py-2 text-sm font-semibold font-roboto bg-white border border-solid border-gray-400 rounded-md hover:bg-slate-100 duration-200"
        >
          Upload Images
        </button>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => {
            const img = e.target.files?.[0];
            if (img) {
              handleImageUpload(img);
            }
          }}
        />
        <div className="flex flex-col gap-2">
          <p className="mt-6 text-xs text-gray-500">Preferred dimensions: 500 x 500</p>
          <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
        </div>
      </div>
      {images.length > 0 && (
        <div className="mt-4 flex-wrap flex flex-row items-center gap-x-4 gap-y-4">
          {images.map((image, index) => (
            <div key={index} className="relative h-40 w-40 object-cover rounded-lg">
              <div
                className="p-1 absolute -top-3 -right-3 cursor-pointer bg-gray-50 rounded-full z-10"
                onClick={() => setImages(images.filter((_, i) => i !== index))}
              >
                <X className="h-3 md:h-4 w-3 md:w-4 text-gray-400" />
              </div>
              <img
                src={image}
                alt={`product image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
    </Field.Root>
  )
}

export default ImageInput