import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const CartIcon = (): JSX.Element => {
  // needs to get the cart id and check how many items are in the items array probably an api call here
  const cart = { id: "csvsedsrsergfswe", items: ["1", "2", "3", "4"] };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const numberOfCartItems = cart.items.length;

  return (
    <Link href="/cart">
      <div className="relative w-fit">
        <div id="cart-icon-container" className="rounded p-1 hover:bg-gray-100">
          <ShoppingCartIcon className="h-8 w-8" />
        </div>
        {numberOfCartItems > 0 && (
          <div className="absolute right-0 top-0">
            <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
              {numberOfCartItems}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

export { CartIcon };
