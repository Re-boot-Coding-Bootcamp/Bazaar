/* eslint-disable @next/next/no-img-element */
"use client";

import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { uniqBy } from "lodash";
import { useEffect, useState } from "react";
import { BreadCrumb, Button, ImageGallery } from "~/app/_components";
import { api } from "~/trpc/react";
import { LocalStorageKeys.FAVORITED_PRODUCTS } from "~/constants";
import type { FavoritedItem } from "~/types";

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
    const localData = window.localStorage.getItem(LocalStorageKeys.FAVORITED_PRODUCTS);
    if (localData) {
      const localParsedData = JSON.parse(localData) as FavoritedItem[];
      const checkLocalData = localParsedData.filter((item) => {
        return item.selectedVariantId === selectedVariantId;
      });
      if (checkLocalData.length === 1) {
        setFavoriteProduct(true);
      } else {
        setFavoriteProduct(false);
      }
    } else {
      window.localStorage.setItem(LocalStorageKeys.FAVORITED_PRODUCTS, JSON.stringify([]));
    }
  }, [selectedVariantId]);

  const [selectedSize, setSelectedSize] = useState<string>();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>();

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
  const uniqueSizeVariantas = uniqBy(product.variants, "size");

  const imageUrls = uniqueColorVariants.map(
    (variant) => variant.images[0]?.url ?? "",
  );

  const handleFavorited = () => {
    const localParsedData = JSON.parse(
      window.localStorage.getItem(LocalStorageKeys.FAVORITED_PRODUCTS) ?? "",
    ) as FavoritedItem[];
    if (!favoriteProduct) {
      window.localStorage.setItem(
        LocalStorageKeys.FAVORITED_PRODUCTS,
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
      window.localStorage.setItem(LocalStorageKeys.FAVORITED_PRODUCTS, JSON.stringify(newData));
      setFavoriteProduct(false);
    }
  };

  return (
    <div className="flex h-full w-full max-w-screen-xl flex-col gap-4 py-8">
      <div
        id="breadcrumb-and-sort-container"
        className="flex items-center justify-between"
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
        className="flex w-full flex-col gap-4 md:flex-row"
      >
        <ImageGallery
          imageUrls={imageUrls}
          selectedImageIndex={selectedImageIndex}
        />
        <div className="flex-grow">
          <p className="text-xl font-bold">{product.name}</p>
          <p className="mt-2 text-gray-600">{product.description}</p>
          <p className="mt-4 text-lg font-semibold">
            {selectedVariant?.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>

          <div className="mt-4" id="color-options-contaner">
            <div className="felx-row flex gap-1">
              <p className="text-lg font-semibold">Colors:</p>
              <p className="text-lg font-semibold">{selectedVariant?.color}</p>
            </div>
            <div className="... mt-2 flex gap-4 truncate">
              {uniqueColorVariants.map((variant, index) => {
                return (
                  <button
                    key={variant.id}
                    onClick={() => {
                      setSelectedVariantId(variant.id);
                      setSelectedImageIndex(index);
                    }}
                  >
                    <div
                      className={`border-2 ${variant.id === selectedVariantId ? "border-black" : "border-transparent"} rounded`}
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

          <div className="mt-4" id="size-options-container">
            <p className="text-lg font-semibold">Select size</p>
            <div className="mt-2 flex gap-2">
              {uniqueSizeVariantas.map((variant) => {
                return (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedSize(variant.size)}
                    className={`h-10 w-12 border-2 ${variant.size === selectedSize ? "border-black" : "border-transparent"} rounded`}
                  >
                    {variant.size}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="actions-container mt-8 flex flex-col gap-4">
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
