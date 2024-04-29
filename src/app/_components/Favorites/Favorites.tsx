"use client";
import { HeartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { StorageFavoriteKey } from "~/constants";
import type { MyFavorites } from "~/types";

const Favorites = () => {
  const initialState = () => {
    const localData = window.localStorage.getItem(StorageFavoriteKey);
    if (localData) {
      const localParsedData = JSON.parse(localData) as MyFavorites[];
      return localParsedData.length;
    } else {
      return 0;
    }
  };
  const [numOfFavorites, setNumOfFavorites] = useState(initialState);

  useEffect(() => {
    const localData = window.localStorage.getItem(StorageFavoriteKey);
    if (localData) {
      const localParsedData = JSON.parse(localData) as MyFavorites[];
      setNumOfFavorites(localParsedData.length);
    }
  }, []);

  return (
    <Link href="/favorites">
      <div className="relative w-fit">
        <div id="cart-icon-container" className="rounded p-1 hover:bg-gray-100">
          <HeartIcon className="h-6 w-6 md:h-8 md:w-8" />
        </div>
        {numOfFavorites > 0 && (
          <div className="absolute right-0 top-0">
            <p className="flex h-1 w-1 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white md:h-2 md:w-2">
              {numOfFavorites}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
};

export { Favorites };
