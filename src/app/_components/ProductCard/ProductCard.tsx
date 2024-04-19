"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef, type ReactNode } from "react";

interface ProductCardProps {
  loadingOnly?: boolean;
  imageUrl?: string;
  productName?: ReactNode;
  price?: number;
  productUrl?: string;
  maxSize?: "sm" | "md" | "lg";
}

const ProductCard = ({
  loadingOnly = false,
  imageUrl,
  productName,
  price,
  productUrl,
  maxSize = "md",
}: ProductCardProps): JSX.Element => {
  const imageSizeRef = useRef<HTMLImageElement>(null);

  const imageSize = {
    sm: {
      class: "h-48 w-48",
      px: 192,
    },
    md: {
      class: "h-56 w-56",
      px: 224,
    },
    lg: {
      class: "h-64 w-64",
      px: 256,
    },
  }[maxSize];

  return (
    <Link
      href={productUrl ?? ""}
      className={`${loadingOnly ? "cursor-default" : "cursor-pointer"}`}
    >
      <div
        className={`${loadingOnly ? "animate-pulse" : "hover:scale-[1.01] hover:shadow-lg"} max-w-${maxSize} transform overflow-hidden rounded-lg shadow-md transition duration-300 ease-in-out`}
      >
        {loadingOnly ? (
          <div className={`${imageSize.class} bg-gray-200`} />
        ) : (
          <Image
            width={imageSize.px}
            height={imageSize.px}
            ref={imageSizeRef}
            src={imageUrl ?? ""}
            alt={String(productName)}
            className={`${imageSize.class} w-full object-cover`}
            style={{ cursor: "pointer" }}
          />
        )}

        <div className="flex flex-col gap-2 p-4">
          {loadingOnly ? (
            <>
              <div className="h-6 w-2/3 rounded bg-gray-200" />
              <div className="h-6 w-1/3 rounded bg-gray-200" />
            </>
          ) : (
            <>
              <span
                className="text-lg font-semibold hover:underline"
                style={{ display: "block", cursor: "pointer" }}
              >
                {productName}
              </span>
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-800">
                  ${price?.toFixed(2)}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export { ProductCard };
