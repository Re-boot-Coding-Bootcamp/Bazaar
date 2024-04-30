"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type { ProductVariant } from "~/types";
import { uniqBy } from "lodash";

interface ImageGalleryProps {
  variants: ProductVariant[];
  selectedId: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  variants,
  selectedId,
}) => {
  const [selectedVariantId, setSelectedVariantId] = useState<
    string | undefined
  >(selectedId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const variantsToDisplay = useMemo(() => {
    const selectedVariant = variants.find(
      (variant) => variant.id === selectedId,
    );

    const uniqueColorVariants = uniqBy(variants, "color");

    if (selectedVariant) {
      const selectedVariantColorIndex = uniqueColorVariants
        .map((variants) => {
          return variants.color;
        })
        .indexOf(selectedVariant.color);
      uniqueColorVariants.splice(selectedVariantColorIndex, 1, selectedVariant);
      return uniqueColorVariants;
    } else {
      return uniqueColorVariants;
    }
  }, [selectedId, variants]);

  useEffect(() => {
    setSelectedVariantId(selectedId);
  }, [selectedId]);

  const navigateImage = (direction: "left" | "right") => {
    if (variantsToDisplay.length === 0) return;

    setSelectedVariantId((previousId) => {
      const previousImageIndex = variantsToDisplay.findIndex(
        (variant) => variant.id === previousId,
      );
      if (direction === "left") {
        return previousImageIndex === 0
          ? variantsToDisplay[variantsToDisplay.length - 1]?.id
          : variantsToDisplay[previousImageIndex - 1]?.id;
      } else {
        return previousImageIndex === variantsToDisplay.length - 1
          ? variantsToDisplay[0]?.id
          : variantsToDisplay[previousImageIndex + 1]?.id;
      }
    });
  };

  const clickHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    direction: "left" | "right",
  ) => {
    e.stopPropagation();
    navigateImage(direction);
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

  const selectedVariant = variantsToDisplay.find(
    (variant) => variant.id === selectedVariantId,
  );

  return (
    <div className="grid w-full md:flex md:h-full md:w-fit md:items-center md:justify-center">
      <div className="row-start-2 flex flex-row space-x-1 overflow-x-auto md:mr-3 md:max-h-[60vh] md:flex-col md:items-end md:space-y-2 md:overflow-y-auto">
        {variantsToDisplay.map((variant) => (
          <img
            loading="lazy"
            key={variant.id}
            src={variant.images[0]?.url}
            alt={`Thumbnail ${variant.id + 1}`}
            className={`h-[100px] w-[100px] flex-shrink-0 cursor-pointer rounded-md object-cover md:h-[60px] md:w-[60px] ${
              variant.id === selectedVariantId ? "border-2 border-black" : ""
            }`}
            onMouseEnter={() => setSelectedVariantId(variant.id)}
          />
        ))}
      </div>

      {!isModalOpen && (
        <div className="relative md:m-0 md:w-2/3">
          <img
            loading="lazy"
            src={selectedVariant?.images[0]?.url}
            alt="Selected"
            className="mb-4 aspect-square w-full cursor-pointer rounded-lg object-contain md:m-0"
            onClick={toggleModal}
          />
          <div className="absolute bottom-4 right-1 flex space-x-2 p-3 md:bottom-1">
            <button
              className="rounded-full bg-gray-100 p-2 hover:bg-gray-300"
              onClick={(e) => clickHandler(e, "left")}
            >
              <ChevronLeftIcon className="h-3 w-3 text-gray-800 md:h-5 md:w-5" />
            </button>

            <button
              className="rounded-full bg-gray-100 p-2 hover:bg-gray-300"
              onClick={(e) => clickHandler(e, "right")}
            >
              <ChevronRightIcon className="h-3 w-3 text-gray-800 md:h-5 md:w-5" />
            </button>
          </div>
        </div>
      )}
      {isModalOpen && (
        <div
          className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-white"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="max-w-screen relative flex max-h-screen items-center justify-center">
            <button
              className="absolute left-0 top-1/2 ml-3 -translate-y-1/2 transform rounded-full bg-gray-100 p-2 opacity-80 hover:bg-gray-300"
              onClick={(e) => clickHandler(e, "left")}
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-800" />
            </button>
            <img
              loading="lazy"
              src={selectedVariant?.images[0]?.url}
              alt="Selected"
              className="max-w-screen max-h-screen"
              onClick={closeModal}
            />
            <button
              className="absolute right-0 top-1/2 mr-3 -translate-y-1/2 transform rounded-full bg-gray-100 p-2 opacity-80 hover:bg-gray-300"
              onClick={(e) => clickHandler(e, "right")}
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-800" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { ImageGallery };
