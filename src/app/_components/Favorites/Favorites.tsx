"use client";

import { HeartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { selectFavoriteCount, useAppSelector } from "~/lib";

const Favorites = () => {
  const favCount = useAppSelector(selectFavoriteCount);

  return (
    <Link href="/favorites">
      <div className="relative w-fit">
        <div id="cart-icon-container" className="rounded p-1 hover:bg-gray-100">
          <HeartIcon className="h-6 w-6 md:h-8 md:w-8" />
        </div>
        {favCount > 0 && (
          <div className="absolute right-0 top-0">
            <p className="flex h-1 w-1 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white md:h-2 md:w-2">
              {favCount}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

export { Favorites };
