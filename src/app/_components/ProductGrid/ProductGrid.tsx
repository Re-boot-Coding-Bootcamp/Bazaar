import React from "react";
import { ProductCard } from "../ProductCard/ProductCard";
import type { ProductGridItemType } from "~/types";
import { uniqBy } from "lodash";

interface ProductGridProps {
  products: ProductGridItemType[];
  isLoading?: boolean;
}

const ProductGrid = ({
  products,
  isLoading = false,
}: ProductGridProps): JSX.Element => {
  const productVariants = products.flatMap((product) => {
    return uniqBy(product.variants, "color").map((variant) => ({
      ...variant,
      productName: product.name,
    }));
  });

  return (
    <div className="grid grid-cols-1 items-stretch justify-stretch gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {isLoading
        ? Array.from({ length: 8 }, (_, index) => (
            <ProductCard key={index} loadingOnly={true} />
          ))
        : productVariants.map((productVariant) => (
            <ProductCard
              key={productVariant.id}
              imageUrl={productVariant.images[0]?.url}
              productName={productVariant.productName}
              price={productVariant.price}
              productUrl={`/product/${productVariant.id}`}
            />
          ))}
    </div>
  );
};

export { ProductGrid };
