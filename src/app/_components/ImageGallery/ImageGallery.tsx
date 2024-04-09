/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/outline";

type ImageGalleryProps = {
  imageUrls: string[];
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ imageUrls }) => {
  const validImageUrls = Array.isArray(imageUrls) ? imageUrls : [];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const clickLeft = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? validImageUrls.length - 1 : prev - 1,
    );
  };

  const clickRight = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === validImageUrls.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const selectedImage = validImageUrls[selectedImageIndex] ?? "defaultImageUrl";

  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="relative flex h-[669px] w-[728px]">
        <div className="mr-4 flex flex-col space-y-2.5 pl-12">
          {validImageUrls.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Thumbnail ${index + 1}`}
              className="h-[60px] w-[60px] cursor-pointer rounded-md"
              onClick={() => setSelectedImageIndex(index)}
            />
          ))}
        </div>

        <div className="relative flex-grow">
          <img
            src={selectedImage}
            alt="Selected"
            className="h-full w-full rounded-md object-cover"
          />
          <div className="absolute bottom-0 right-0 flex space-x-2 p-4">
            <button
              className="rounded-full p-2 hover:bg-gray-200"
              onClick={clickLeft}
            >
              <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
            </button>
            <button
              className="rounded-full p-2 hover:bg-gray-200"
              onClick={clickRight}
            >
              <ChevronRightIcon className="h-6 w-6 text-gray-800" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ImageGallery };
