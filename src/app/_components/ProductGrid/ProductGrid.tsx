"use client";

import React from "react";
import { ProductCard } from "../ProductCard/ProductCard";

interface Product {
  id: string;
  imageUrl: string;
  name: string;
  price: number;
  url: string;
}

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
}

const ProductGrid = ({
  products,
  isLoading,
}: ProductGridProps): JSX.Element => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {isLoading
        ? Array.from({ length: 8 }, (_, index) => (
            <ProductCard key={index} loadingOnly={true} maxSize="md" />
          ))
        : products.map((product) => (
            <ProductCard
              key={product.id}
              imageUrl={product.imageUrl}
              productName={product.name}
              price={product.price}
              productUrl={product.url}
              maxSize="md"
            />
          ))}
    </div>
  );
};

export default ProductGrid;
