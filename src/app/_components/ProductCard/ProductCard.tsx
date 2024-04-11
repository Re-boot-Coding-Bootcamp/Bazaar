import React, { useState, useRef, ReactNode } from "react";

interface ProductCardProps {
  imageUrl: string;
  productName: ReactNode;
  price: number;
  productUrl: string;
  maxSize?: "sm" | "md" | "lg";
}

const ProductCard = ({
  imageUrl,
  productName,
  price,
  productUrl,
  maxSize = "md",
}: ProductCardProps): JSX.Element => {
  const [isLoading, setLoading] = useState(true);
  const imageSizeRef = useRef<HTMLImageElement>(null);

  const imageSizeClass = {
    sm: "h-48 w-full object-cover",
    md: "h-56 w-full object-cover",
    lg: "h-64 w-full object-cover",
  }[maxSize];

  const handleImageLoad = () => setLoading(false);

  return (
    <div
      className={`max-w-${maxSize} transform overflow-hidden rounded-lg bg-gradient-to-r from-gray-50 to-gray-200 shadow-lg transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl`}
      onClick={() => (window.location.href = productUrl)}
    >
      {isLoading && (
        <div className={`${imageSizeClass} animate-pulse bg-gray-300`}></div>
      )}
      <img
        ref={imageSizeRef}
        src={imageUrl}
        alt={String(productName)}
        className={`${imageSizeClass} ${isLoading ? "hidden" : "block"}`}
        onLoad={handleImageLoad}
        style={{ cursor: "pointer" }}
      />
      <div className="p-4">
        <a
          href={productUrl}
          className="text-lg font-semibold hover:underline"
          style={{ display: "block", cursor: "pointer" }}
        >
          {productName}
        </a>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-bold text-gray-800">${price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
