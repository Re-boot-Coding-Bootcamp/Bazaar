/* eslint-disable @next/next/no-img-element */
"use client";

import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { uniqBy } from "lodash";
import { useEffect, useState } from "react";
import { BreadCrumb, Button, ImageGallery } from "~/app/_components";
import { api } from "~/trpc/react";
import { StorageFavoriteKey } from "~/constants";
import type { myFavorites } from "~/types";

export default function ProductDetailsPage({
  params,
}: {
  params: { productVariantId: string };
}) {
  const { data: productData, isFetching: isFetchingProductDetails } =
    api.product.getProductDetails.useQuery({
      productVariantId: params.productVariantId,
    });

  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    params.productVariantId,
  );

  const [favoriteProduct, setFavoriteProduct] = useState(false);

  useEffect(() => {
    const localData = window.localStorage.getItem(StorageFavoriteKey);
    if (localData) {
      const localParsedData = JSON.parse(localData) as myFavorites[];
      const checkLocalData = localParsedData.filter((item) => {
        return item.selectedVariantId === selectedVariantId;
      });
      if (checkLocalData.length === 1) {
        setFavoriteProduct(true);
      } else {
        setFavoriteProduct(false);
      }
    } else {
      window.localStorage.setItem(StorageFavoriteKey, JSON.stringify([]));
    }
  }, [selectedVariantId]);

  if (isFetchingProductDetails) {
    // TODO: loading screen
    return <div>Loading...</div>;
  }

  if (!productData) {
    // TODO: 404 page
    return <div>Product not found</div>;
  }

  const { product } = productData;

  const selectedVariant = product.variants.find(
    (variant) => variant.id === selectedVariantId,
  );

  const uniqueColorVariants = uniqBy(product.variants, "color");

  const imageUrls = uniqueColorVariants.map(
    (variant) => variant.images[0]?.url ?? "",
  );

  const handleFavorited = () => {
    const localParsedData = JSON.parse(
      window.localStorage.getItem(StorageFavoriteKey) ?? "",
    ) as myFavorites[];
    if (!favoriteProduct) {
      window.localStorage.setItem(
        StorageFavoriteKey,
        JSON.stringify([
          ...localParsedData,
          {
            selectedVariantId: selectedVariantId,
            imageUrl: selectedVariant?.images[0]?.url,
            productName: product.name,
            price: selectedVariant?.price,
            productUrl: `/product/${selectedVariantId}`,
          },
        ]),
      );
      setFavoriteProduct(true);
    }
    if (favoriteProduct) {
      const newData = localParsedData.filter((item) => {
        return !(selectedVariantId === item.selectedVariantId);
      });
      window.localStorage.setItem(StorageFavoriteKey, JSON.stringify(newData));
      setFavoriteProduct(false);
    }
  };

  return (
    <div className="flex h-full w-full max-w-screen-xl flex-col gap-4 py-8">
      <div
        id="breadcrumb-and-sort-container"
        className="ml-4 flex items-center justify-between md:ml-0"
      >
        <BreadCrumb
          items={[
            { text: "Home", href: "/" },
            {
              text: product.category.name,
              href: `/product-list/${product.categoryId}`,
            },
            {
              text: product.name,
            },
          ]}
        />
      </div>
      <div
        id="product-details-container"
        className="flex flex-col md:flex-row md:gap-4"
      >
        <div className="min-w-2/3 w-full">
          <ImageGallery imageUrls={imageUrls} />
        </div>
        <div className="flex-grow">
          <p>{product.name}</p>
          <p>{product.description}</p>
          <p>{selectedVariant?.price}</p>
          <p>{selectedVariant?.color}</p>
          <p>{selectedVariant?.size}</p>

          <div id="color-options-contaner">
            <p>Colors:</p>
            <div className="flex gap-4">
              {uniqueColorVariants.map((variant) => {
                return (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariantId(variant.id)}
                  >
                    <div
                      className={`border-[1px] ${variant.id === selectedVariantId ? "border-black" : "border-transparent"} rounded`}
                    >
                      <img
                        src={variant.images[0]?.url}
                        alt={`${product.name} in ${variant.color}`}
                        className="h-16 w-16"
                      />
                    </div>
                    {variant.color}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="actions-container flex flex-col gap-1">
            <Button>Add to cart</Button>
            <Button
              variant="outline"
              endIcon={
                favoriteProduct ? (
                  <HeartIconSolid className="text-red-500" />
                ) : (
                  <HeartIconOutline />
                )
              }
              onClick={handleFavorited}
            >
              Add to favorites
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
