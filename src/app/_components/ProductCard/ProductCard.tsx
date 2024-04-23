/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { type ReactNode } from "react";

interface ProductCardProps {
  loadingOnly?: boolean;
  imageUrl?: string;
  productName?: ReactNode;
  price?: number;
  productUrl?: string;
}

const ProductCard = ({
  loadingOnly = false,
  imageUrl,
  productName,
  price,
  productUrl,
}: ProductCardProps): JSX.Element => {
  return (
    <Link
      href={productUrl ?? ""}
      className={`${loadingOnly ? "cursor-default" : "cursor-pointer"}`}
    >
      <div
        className={`${
          loadingOnly ? "animate-pulse" : "hover:scale-[1.01] hover:shadow-lg"
        } h-full w-full transform rounded-lg shadow-md transition duration-300 ease-in-out`}
      >
        {loadingOnly ? (
          <div className={`aspect-square w-full bg-gray-200`} />
        ) : (
          <img
            src={imageUrl ?? ""}
            alt={String(productName)}
            className="aspect-square w-full object-contain"
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
                  $
                  {price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
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
