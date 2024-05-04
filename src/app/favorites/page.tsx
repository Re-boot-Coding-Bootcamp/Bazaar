"use client";

import { BreadCrumb, ProductCard } from "../_components";
import { selectFavoritedItems, useAppSelector } from "~/lib";

export default function FavoritesPage() {
  const favoritedItems = useAppSelector(selectFavoritedItems);

  return (
    <div className="flex h-full w-full max-w-screen-xl flex-col gap-4 py-8 px-4">
      <BreadCrumb
        items={[
          { text: "Shop All", href: "/product-list/all" },
          { text: "Favorites" },
        ]}
      />
      <div className="flex items-center gap-1">
        <p className="text-2xl font-light">Favorites</p>
        <p className="pt-1 text-gray-500">
          ({favoritedItems.length}{" "}
          {favoritedItems.length === 1 ? "Item" : "Items"})
        </p>
      </div>
      <div className="grid grid-cols-1 items-stretch justify-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {favoritedItems.length === 0 ? (
          <p className="text-gray-500">{`There's nothing here yet 👀`}</p>
        ) : (
          favoritedItems.map((item) => {
            return (
              <ProductCard
                key={item.selectedVariantId}
                imageUrl={item.imageUrl}
                productName={item.productName}
                price={item.price}
                productUrl={item.productUrl}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
