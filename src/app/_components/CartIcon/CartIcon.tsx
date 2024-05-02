"use client";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { selectItems, useAppSelector } from "~/lib";

const CartIcon = (): JSX.Element => {
  const cartItems = useAppSelector(selectItems);
  const numberOfCartItems = cartItems.length;

  return (
    <Link href="/cart">
      <div className="relative w-fit">
        <div id="cart-icon-container" className="rounded p-1 hover:bg-gray-100">
          <ShoppingCartIcon className="h-6 w-6 md:h-8 md:w-8" />
        </div>
        {numberOfCartItems > 0 && (
          <div className="absolute right-0 top-0">
            <p className="flex h-1 w-1 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white md:h-2 md:w-2">
              {numberOfCartItems}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

export { CartIcon };
