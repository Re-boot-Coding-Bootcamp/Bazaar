/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

type ImageGalleryProps = {
  imageUrls: string[];
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ imageUrls }) => {
  const validImageUrls = Array.isArray(imageUrls) ? imageUrls : [];

  const [selectedImage, setSelectedImage] = useState<string>(
    validImageUrls[0] ?? "defaultImageUrl",
  );

  return (
    <div className="flex h-[669px] w-[728px]">
      <div className="ml-2 mt-12 flex flex-col space-y-2.5 pl-12">
        {validImageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Thumbnail ${index + 1}`}
            className="h-[60px] w-[60px] cursor-pointer"
            onClick={() => setSelectedImage(url)}
          />
        ))}
      </div>

      <div className="flex-grow">
        <img src={selectedImage} alt="Selected" className="h-full w-full" />
      </div>
    </div>
  );
};

export { ImageGallery };
