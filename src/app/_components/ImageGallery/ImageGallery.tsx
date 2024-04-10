/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type ImageGalleryProps = {
  imageUrls: string[];
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ imageUrls }) => {
  const validImageUrls = Array.isArray(imageUrls) ? imageUrls : [];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageViewRef = useRef<HTMLImageElement>(null);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const adjustThumbnailHeight = () => {
      const imageView = imageViewRef.current;
      const thumbnailContainer = thumbnailContainerRef.current;
      if (imageView && thumbnailContainer) {
        thumbnailContainer.style.height = `${imageView.clientHeight}px`;
      }
    };

    adjustThumbnailHeight();
    window.addEventListener("resize", adjustThumbnailHeight);

    return () => window.removeEventListener("resize", adjustThumbnailHeight);
  }, [selectedImageIndex]);

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
    <div className="flex h-screen w-screen items-center justify-center ">
      <div
        ref={thumbnailContainerRef}
        className="mr-3 flex flex-col space-y-2 overflow-y-auto "
      >
        {validImageUrls.map((url, index) => (
          <img
            id="thumbnail-container"
            loading="lazy"
            key={index}
            src={url}
            alt={`Thumbnail ${index + 1}`}
            className="h-[60px] w-[60px] cursor-pointer rounded-md"
            onClick={() => setSelectedImageIndex(index)}
          />
        ))}
      </div>

      <div className="relative  ">
        <img
          id="image-viewer"
          ref={imageViewRef}
          src={selectedImage}
          alt="Selected"
          className="max-h-[60vh] w-auto rounded-lg object-contain"
          onClick={toggleModal}
          style={{ cursor: "pointer" }}
        />
        {isModalOpen && (
          <div
            className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center"
            onClick={toggleModal}
          >
            <div className="max-w-screen relative flex max-h-screen items-center justify-center">
              <button
                className="absolute left-0 top-1/2 ml-3 -translate-y-1/2 transform rounded-full bg-gray-100 p-2 opacity-80 hover:bg-gray-300"
                onClick={clickLeft}
              >
                <ChevronLeftIcon className="h-5 w-5 text-gray-800" />
              </button>
              <img
                src={selectedImage}
                alt="Selected"
                className="max-w-screen max-h-screen"
                onClick={closeModal}
              />
              <button
                className="absolute right-0 top-1/2 mr-3 -translate-y-1/2 transform rounded-full bg-gray-100 p-2 opacity-80 hover:bg-gray-300"
                onClick={clickRight}
              >
                <ChevronRightIcon className="h-5 w-5 text-gray-800" />
              </button>
            </div>
          </div>
        )}

        {!isModalOpen && (
          <div className="absolute bottom-2 right-2 flex space-x-2 p-4">
            <button
              className="rounded-full bg-gray-100 p-2 hover:bg-gray-300"
              onClick={clickLeft}
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-800" />
            </button>
            <button
              className="rounded-full bg-gray-100 p-2 hover:bg-gray-300"
              onClick={clickRight}
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-800" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export { ImageGallery };
