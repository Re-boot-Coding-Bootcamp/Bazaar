/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

type ImageGalleryProps = {
  imageUrls: string[];
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ imageUrls }) => {
  const validImageUrls = Array.isArray(imageUrls) ? imageUrls : [];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const clickLeft = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) =>
      prev === 0 ? validImageUrls.length - 1 : prev - 1,
    );
  };

  const clickRight = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedImageIndex((prevIndex) =>
      prevIndex === validImageUrls.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = (e: React.MouseEvent<HTMLImageElement>) => {
    if (isModalOpen) {
      e.stopPropagation();
      setIsModalOpen(false);
    }
  };

  const selectedImage = validImageUrls[selectedImageIndex] ?? "defaultImageUrl";

  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="relative flex h-[669px] w-[728px] p-1">
        <div
          className="mr-4 flex flex-col space-y-3 overflow-y-auto"
          style={{ height: "661" }}
        >
          {validImageUrls.map((url, index) => (
            <img
              loading="lazy"
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
            onClick={toggleModal}
          />
          {isModalOpen && (
            <div
              className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center "
              onClick={toggleModal}
            >
              <div className="max-w-screen flex max-h-screen items-center justify-center">
                <button
                  className="mr-2 rounded-full p-2 hover:bg-gray-200"
                  onClick={clickLeft}
                >
                  <ChevronLeftIcon className="h-6 w-6 text-gray-800" />
                </button>
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="max-w-screen max-h-screen"
                  onClick={closeModal}
                />
                <button
                  className="ml-2 rounded-full p-2 hover:bg-gray-200"
                  onClick={clickRight}
                >
                  <ChevronRightIcon className="h-6 w-6 text-gray-800" />
                </button>
              </div>
            </div>
          )}

          {!isModalOpen && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export { ImageGallery };
