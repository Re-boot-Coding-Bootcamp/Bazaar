"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { selectId, updateCart, useAppDispatch, useAppSelector } from "~/lib";
import { api } from "~/trpc/react";
import type { ExtendedCartItem } from "~/types";

/* eslint-disable @next/next/no-img-element */

const CartItem: React.FC<{ cartItemData: ExtendedCartItem }> = ({
  cartItemData,
}) => {
  const {
    productVariant: {
      id: productVariantId,
      images: [image],
      price,
      color,
      size,
      product: { name },
    },
    quantity,
    id: cartItemId,
  } = cartItemData;

  const [isMutating, setIsMutating] = useState(false);
  const dispatch = useAppDispatch();
  const cartId = useAppSelector(selectId);

  const { mutate: updateProductQuantity } =
    api.cart.updateProductQuantityInCart.useMutation({
      onSuccess: (data, { quantity }) => {
        if (data) {
          dispatch(updateCart({ items: data.items }));
          if (quantity === 0) {
            enqueueSnackbar("Item removed from cart.", { variant: "success" });
          }
        }
        setIsMutating(false);
      },
      onError: () => {
        enqueueSnackbar("Failed to update cart.", { variant: "error" });
        setIsMutating(false);
      },
    });

  const incrementQty = () => {
    if (quantity < 10 && cartId) {
      setIsMutating(true);
      updateProductQuantity({ cartId, cartItemId, quantity: quantity + 1 });
    }
  };

  const decrementQty = () => {
    if (quantity > 1 && cartId) {
      setIsMutating(true);
      updateProductQuantity({ cartId, cartItemId, quantity: quantity - 1 });
    }
  };

  const totalPrice = price * quantity;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value <= 10 && value >= 1 && cartId) {
      setIsMutating(true);
      updateProductQuantity({ cartId, cartItemId, quantity: value });
    }
  };

  const handleRemoveItem = () => {
    if (cartId) {
      setIsMutating(true);
      updateProductQuantity({ cartId, cartItemId, quantity: 0 });
    }
  };

  return (
    <div
      id="cart-item-container"
      className="w-full rounded bg-white shadow-md md:flex"
    >
      <div id="image-container" className="md:shrink-0">
        <img
          src={image?.url}
          alt="image description"
          className="aspect-square w-full object-cover md:w-48"
        />
      </div>
      <div id="content-container" className="flex w-full justify-between p-4">
        <div
          id="content-left-container"
          className="flex flex-col justify-between gap-4"
        >
          <div>
            <Link
              href={`/product/${productVariantId}`}
              className="mb-2 text-xl font-bold"
            >
              {name}
            </Link>
            <p className="text-sm font-thin text-slate-500">{color}</p>
            <p className="text-sm font-thin text-slate-500">{size}</p>
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="round border border-black bg-white px-3 py-1 hover:bg-gray-100 focus:outline-none disabled:bg-gray-200"
              onClick={decrementQty}
              disabled={isMutating}
            >
              -
            </button>
            <input
              type="text"
              min={1}
              max={10}
              className={`max-w-8 border border-y-black py-1 text-center focus:outline-none disabled:bg-gray-200 disabled:text-gray-500`}
              value={quantity}
              onChange={handleQuantityChange}
              disabled={isMutating}
            />
            <button
              type="button"
              className="round border border-black bg-white px-3 py-1 hover:bg-gray-100 focus:outline-none disabled:bg-gray-200"
              onClick={incrementQty}
              disabled={isMutating}
            >
              +
            </button>
          </div>
        </div>
        <div
          id="content-right-container"
          className="flex flex-col items-end justify-between"
        >
          <p className="text-lg font-semibold">
            {totalPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
          <button
            className="flex underline hover:text-red-500"
            onClick={handleRemoveItem}
            disabled={isMutating}
          >
            <XMarkIcon className="h-6 w-6" />
            Remove item
          </button>
        </div>
      </div>
    </div>
  );
};

export { CartItem };
