"use client";

import { BreadCrumb, ProductGrid } from "../_components";
import { StorageFavoriteKey } from "~/constants";
import type { MyFavorites } from "~/types";
import { useEffect, useState } from "react";
export default function FavoritesPage() {
  const [favoriteData, setFavoriteData] = useState<MyFavorites[]>([]);
  useEffect(() => {
    const localData = window.localStorage.getItem(StorageFavoriteKey);
    if (localData) {
      const localParsedData = JSON.parse(localData) as MyFavorites[];
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
      <ProductGrid favoriteProducts={favoriteData} />
    </div>
  );
}
