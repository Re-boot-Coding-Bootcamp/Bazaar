/* eslint-disable @next/next/no-img-element */
"use client";

import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import { BreadCrumb, Button, ImageGallery } from "~/app/_components";
import {
  addToFavorite,
  removeFromFavorite,
  selectFavoritedItems,
  selectId,
  selectItems,
  updateCart,
  useAppDispatch,
  useAppSelector,
} from "~/lib";
import { map, uniqBy } from "lodash";
import type { ProductDetailsReturnType } from "~/types";
import { api } from "~/trpc/react";
import { enqueueSnackbar } from "notistack";

interface ProductDetailsPageViewProps {
  data: NonNullable<ProductDetailsReturnType>;
}

const ProductDetailsPageView = ({
  data: { product, ...productVariant },
}: ProductDetailsPageViewProps) => {
  const dispatch = useAppDispatch();
  const favoritedItems = useAppSelector(selectFavoritedItems);
  const cartItems = useAppSelector(selectItems);
  const cartId = useAppSelector(selectId);

  const { mutateAsync: addProductToCart } =
    api.cart.addProductToCart.useMutation();

  const { mutateAsync: updateProductQuantityInCart } =
    api.cart.updateProductQuantityInCart.useMutation();

  const favoritedItemIds = useMemo(
    () => favoritedItems.map((item) => item.selectedVariantId),
    [favoritedItems],
  );

  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    productVariant.id,
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    productVariant.color,
  );
  const [selectedSize, setSelectedSize] = useState<string>(productVariant.size);
  const [isFavorited, setIsFavorited] = useState(
    favoritedItemIds.includes(selectedVariantId),
  );
  const [isMutating, setIsMutating] = useState(false);

  const colorsAndImages = useMemo(
    () =>
      map(uniqBy(product.variants, "color"), (variant, index) => {
        return {
          id: index,
          color: variant.color,
          image: variant.images[0]?.url,
        };
      }),
    [product.variants],
  );

  const sizes = useMemo(
    () =>
      map(uniqBy(product.variants, "size"), (variant, index) => {
        return {
          id: index,
          size: variant.size,
        };
      }),
    [product.variants],
  );

  const selectedVariant = useMemo(() => {
    const targetVariant = product.variants.find(
      (variant) =>
        variant.size === selectedSize && variant.color === selectedColor,
    );

    if (targetVariant) {
      setSelectedVariantId(targetVariant.id);
    }

    return targetVariant;
  }, [product.variants, selectedColor, selectedSize]);

  useEffect(() => {
    setIsFavorited(favoritedItemIds.includes(selectedVariantId));
  }, [favoritedItemIds, selectedVariantId]);

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

  const handleAddToCart = async () => {
    if (cartId) {
      const existingCartItem = cartItems.find(
        (item) => item.productVariantId === selectedVariantId,
      );

      // if the selected variant is already in the cart
      if (existingCartItem) {
        if (existingCartItem.quantity < 10) {
          try {
            setIsMutating(true);
            const updateQuantityInCart = await updateProductQuantityInCart({
              cartId,
              cartItemId: existingCartItem.id,
              quantity: existingCartItem.quantity + 1,
            });
            if (updateQuantityInCart) {
              dispatch(updateCart({ items: updateQuantityInCart.items }));
              enqueueSnackbar("Product added to cart", { variant: "success" });
            } else {
              enqueueSnackbar("Failed to add product to cart", {
                variant: "error",
              });
            }
          } catch {
            enqueueSnackbar("Failed to add product to cart", {
              variant: "error",
            });
          } finally {
            setIsMutating(false);
          }
        } else {
          enqueueSnackbar(
            "You already have the maximum quantity of this item in your cart",
            {
              variant: "error",
            },
          );
        }
      } else {
        try {
          setIsMutating(true);
          const updatedCart = await addProductToCart({
            cartId,
            productVariantId: selectedVariantId,
          });
          if (updatedCart) {
            dispatch(updateCart({ items: updatedCart.items }));
            enqueueSnackbar("Product added to cart", { variant: "success" });
          } else {
            enqueueSnackbar("Failed to add product to cart", {
              variant: "error",
            });
          }
        } catch {
          enqueueSnackbar("Failed to add product to cart", {
            variant: "error",
          });
        } finally {
          setIsMutating(false);
        }
      }
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
          data={colorsAndImages}
          defaultColor={productVariant.color}
          selectedColor={selectedColor}
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
              <p className="text-lg font-semibold">{selectedColor}</p>
            </div>
            <div className="... mt-2 flex gap-4 truncate">
              {colorsAndImages.map((colorAndImage) => {
                return (
                  <button
                    key={colorAndImage.id}
                    onClick={() => {
                      setSelectedColor(colorAndImage.color);
                    }}
                  >
                    <div
                      className={`border-2 ${colorAndImage.color === selectedColor ? "border-black" : "border-transparent"} rounded`}
                    >
                      <img
                        src={colorAndImage.image}
                        alt={`${product.name} in ${colorAndImage.color}`}
                        className="h-16 w-16"
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {sizes.length > 1 && (
            <div className="mt-4" id="size-options-container">
              <p className="text-lg font-semibold">Select size</p>
              <div className="mt-2 flex gap-2">
                {sizes.map((sizeOption) => {
                  return (
                    <button
                      key={sizeOption.id}
                      onClick={() => {
                        setSelectedSize(sizeOption.size);
                      }}
                      className={`h-10 w-12 border-2 ${sizeOption.size === selectedSize ? "border-black" : "border-transparent"} rounded`}
                    >
                      {sizeOption.size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="actions-container mt-8 flex flex-col gap-4">
            <Button disabled={isMutating} onClick={handleAddToCart}>
              Add to cart
            </Button>
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
};

export { ProductDetailsPageView };
