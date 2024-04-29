import React from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import type { ProductGridItemType, MyFavorites, ProductVariant } from "~/types";
import { uniqBy } from "lodash";

interface ProductGridProps {
  products?: ProductGridItemType[];
  favoriteProducts?: MyFavorites[];
  isLoading?: boolean;
}

const ProductGrid = ({
  products,
  favoriteProducts,
  isLoading = false,
}: ProductGridProps): JSX.Element => {
  let productVariants: ProductVariant[] | MyFavorites[] = [];

  if (products) {
    productVariants = products.flatMap((product) => {
      return uniqBy(product.variants, "color").map((variant) => ({
        ...variant,
        productName: product.name,
      }));
    });
  }

  if (favoriteProducts) {
    productVariants = favoriteProducts;
  }

  return (
    <div className="grid grid-cols-1 items-stretch justify-stretch gap-4 sm:grid-cols-2 md:grid-cols-3">
      {isLoading
        ? Array.from({ length: 8 }, (_, index) => (
            <ProductCard key={index} loadingOnly={true} />
          ))
        : products
          ? (productVariants as ProductVariant[]).map((productVariant) => (
              <ProductCard
                key={productVariant.id}
                imageUrl={productVariant.images[0]?.url}
                productName={productVariant.productName}
                price={productVariant.price}
                productUrl={`/product/${productVariant.id}`}
              />
            ))
          : (productVariants as MyFavorites[]).map((productVariant) => (
              <ProductCard
                key={productVariant.selectedVariantId}
                imageUrl={productVariant.imageUrl}
                productName={productVariant.productName}
                price={productVariant.price}
                productUrl={productVariant.productUrl}
              />
            ))}
    </div>
  );
};

export { ProductGrid };
