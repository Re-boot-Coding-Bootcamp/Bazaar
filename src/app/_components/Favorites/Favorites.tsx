import { HeartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const Favorites = () => {
  // needs to get the array of productIds from local storage
  const favorites = ["csvsedsrsergfswe", "csvsedsrsergf131"];
  const favoritesCount = favorites.length;

  return (
    <Link href="/favorites">
      <div className="relative w-fit">
        <div id="cart-icon-container" className="rounded p-1 hover:bg-gray-100">
          <HeartIcon className="h-8 w-8" />
        </div>
        {favoritesCount > 0 && (
          <div className="absolute right-0 top-0">
            <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
              {favoritesCount}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

export { Favorites };
