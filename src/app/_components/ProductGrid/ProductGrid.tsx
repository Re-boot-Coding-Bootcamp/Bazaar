"use client";

import React, { useMemo } from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import type { ActiveFilterKey, ProductGridItemType } from "~/types";
import { isBefore } from "date-fns";
import { selectFilters, selectSortBy, useAppSelector } from "~/lib";
import { map, uniqBy } from "lodash";

interface ProductGridProps {
  products: ProductGridItemType[];
  isLoading?: boolean;
}

const isWithinPriceRange = (price: number, priceRange: string) => {
  if (priceRange.includes("+")) {
    return price >= parseInt(priceRange.replace("+", ""));
  }

  const [min, max] = priceRange.split("-");
  return price >= parseInt(min!) && price <= parseInt(max!);
};

const ProductGrid = ({
  products,
  isLoading = false,
}: ProductGridProps): JSX.Element => {
  const productIds = useMemo(
    () => map(uniqBy(products, "id"), (product) => product.id),
    [products],
  );

  const allProductVariants = products.flatMap((product) =>
    product.variants.map((variant) => ({
      ...variant,
      productName: product.name,
      productId: product.id,
    })),
  );

  const filters = useAppSelector(selectFilters);
  const sortBy = useAppSelector(selectSortBy);

  const filteredAndSortedProductVariants = useMemo(() => {
    const activeFilters: Record<ActiveFilterKey, string[]> = {
      color: [],
      size: [],
      price: [],
    };

    filters.forEach((filter) => {
      filter.options.forEach((option) => {
        if (option.checked) {
          activeFilters[filter.id as ActiveFilterKey].push(option.value);
        }
      });
    });

    let filteredProductVariants = allProductVariants;

    if (activeFilters.color.length) {
      filteredProductVariants = filteredProductVariants.filter(
        (productVariant) => activeFilters.color.includes(productVariant.color),
      );
    }

    if (activeFilters.size.length) {
      filteredProductVariants = filteredProductVariants.filter(
        (productVariant) => activeFilters.size.includes(productVariant.size),
      );
    }

    if (activeFilters.price.length) {
      filteredProductVariants = filteredProductVariants.filter(
        (productVariant) =>
          activeFilters.price.some((priceRange) =>
            isWithinPriceRange(productVariant.price, priceRange),
          ),
      );
    }

    const filteredAndSorted = filteredProductVariants.sort((a, b) => {
      if (sortBy === "price-low-to-high") {
        return a.price - b.price;
      }

      if (sortBy === "price-high-to-low") {
        return b.price - a.price;
      }

      return isBefore(a.createdAt, b.createdAt) ? -1 : 1;
    });

    return productIds.flatMap((productId) => {
      const variants = filteredAndSorted.filter(
        (item) => item.productId === productId,
      );
      return uniqBy(variants, "color");
    });
  }, [allProductVariants, filters, productIds, sortBy]);

  return (
    <div className="grid grid-cols-1 items-stretch justify-stretch gap-4 sm:grid-cols-2 md:grid-cols-3">
      {isLoading ? (
        Array.from({ length: 8 }, (_, index) => (
          <ProductCard key={index} loadingOnly={true} />
        ))
      ) : filteredAndSortedProductVariants.length > 0 ? (
        filteredAndSortedProductVariants.map((productVariant) => (
          <ProductCard
            key={productVariant.id}
            imageUrl={productVariant.images[0]?.url}
            productName={productVariant.productName}
            price={productVariant.price}
            productUrl={`/product/${productVariant.id}`}
          />
        ))
      ) : (
        <div className="col-span-full min-w-max">No result</div>
      )}
    </div>
  );
};

export { ProductGrid };
