/* eslint-disable @next/next/no-img-element */
"use client";

import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { uniqBy } from "lodash";
import { useEffect, useState } from "react";
import { BreadCrumb, Button, ImageGallery } from "~/app/_components";
import { api } from "~/trpc/react";
import {
  addToFavorite,
  removeFromFavorite,
  selectFavoritedItems,
  useAppDispatch,
  useAppSelector,
} from "~/lib";

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

  const dispatch = useAppDispatch();
  const favoritedItems = useAppSelector(selectFavoritedItems);
  const favoritedItemIds = favoritedItems.map((item) => item.selectedVariantId);
  const [isFavorited, setIsFavorited] = useState(
    favoritedItemIds.includes(selectedVariantId),
  );

  useEffect(() => {
    setIsFavorited(favoritedItemIds.includes(selectedVariantId));
  }, [favoritedItemIds, selectedVariantId]);

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

  const handleFavorited = () => {
    if (!isFavorited) {
      const newFav = {
        selectedVariantId: selectedVariantId,
        imageUrl: selectedVariant?.images[0]?.url ?? "",
        productName: product.name,
        price: selectedVariant?.price ?? 0,
        productUrl: `/product/${selectedVariantId}`,
      };
      dispatch(addToFavorite({ item: newFav }));
    } else {
      dispatch(removeFromFavorite(selectedVariantId));
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
          variants={product.variants}
          selectedId={selectedVariantId}
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
              {uniqueColorVariants.map((variant) => {
                return (
                  <button
                    key={variant.id}
                    onClick={() => {
                      setSelectedVariantId(variant.id);
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
                    onClick={() => {
                      setSelectedVariantId(variant.id);
                    }}
                    className={`h-10 w-12 border-2 ${variant.id === selectedVariantId ? "border-black" : "border-transparent"} rounded`}
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
                isFavorited ? (
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
