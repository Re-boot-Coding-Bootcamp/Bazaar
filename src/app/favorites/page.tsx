"use client";

import { BreadCrumb, ProductCard } from "../_components";
import { StorageFavoriteKey } from "~/constants";
import type { myFavorites } from "~/types";
import { Fragment, useEffect, useState } from "react";
export default function FavoritesPage() {
  const [favoriteData, setFavoriteData] = useState<myFavorites[]>([]);
  useEffect(() => {
    const localData = window.localStorage.getItem(StorageFavoriteKey);
    if (localData) {
      const localParsedData = JSON.parse(localData) as myFavorites[];
      setFavoriteData(localParsedData);
    }
  }, []);

  return (
    <div className="flex h-full w-full max-w-screen-xl flex-col gap-4 py-8">
      <BreadCrumb
        items={[
          { text: "Shop All", href: "/product-list/all" },
          { text: "Favorites" },
        ]}
      />
      <p className="text-3xl font-light">Favorites</p>
      <p className="text-gray-500">
        {favoriteData.length} {favoriteData.length === 1 ? "Item" : "Items"}
      </p>
      <div className="grid grid-cols-1 items-stretch justify-stretch gap-4 sm:grid-cols-2 md:grid-cols-3">
        {favoriteData.length === 0 ? (
          <p className="text-gray-500">No Results Found</p>
        ) : (
          favoriteData.map((item, index) => {
            return (
              <Fragment key={index}>
                <ProductCard
                  imageUrl={item.imageUrl}
                  productName={item.productName}
                  price={item.price}
                  productUrl={item.productUrl}
                />
              </Fragment>
            );
          })
        )}
      </div>
    </div>
  );
}
