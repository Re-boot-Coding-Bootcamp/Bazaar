"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { BreadCrumb, ProductCard } from "../_components";
import { api } from "~/trpc/react";
import { LoadingPage } from "../_pageView";
import { map, uniqBy } from "lodash";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchTerm = searchParams.get("q");

  if (!searchTerm) {
    router.replace("/");
    return;
  }

  const { data: searchResults, isFetching } =
    api.search.searchProducts.useQuery({
      searchInput: searchTerm,
    });

  if (isFetching) {
    return <LoadingPage />;
  }

  const getOrganizedSearchResults = () => {
    if (searchResults && searchResults.length > 0) {
      const uniqProductIds = map(
        uniqBy(searchResults, (result) => result.product.id),
        (item) => item.product.id,
      );

      return uniqProductIds.flatMap((productId) => {
        return uniqBy(
          searchResults.filter((result) => result.product.id === productId),
          "color",
        );
      });
    }
    return [];
  };

  return (
    <div className="flex h-full w-full max-w-screen-xl flex-col gap-4 py-8">
      <div
        id="breadcrumb-and-sort-container"
        className="flex items-center justify-between"
      >
        <BreadCrumb
          items={[
            { text: "Home", href: "/" },
            {
              text: `Search results for "${searchTerm}"`,
            },
          ]}
        />
      </div>
      <div
        id="product-details-container"
        className="flex w-full flex-col gap-4"
      >
        {searchResults && searchResults.length > 0 ? (
          <div className="grid grid-cols-1 items-stretch justify-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {searchResults.length === 0 ? (
              <p className="text-gray-500">{`There's nothing here yet 👀`}</p>
            ) : (
              getOrganizedSearchResults().map((searchResult) => {
                return (
                  <ProductCard
                    key={searchResult.id}
                    imageUrl={searchResult.images[0]?.url}
                    productName={searchResult.product.name}
                    price={searchResult.price}
                    productUrl={`/product/${searchResult.id}`}
                  />
                );
              })
            )}
          </div>
        ) : (
          <>No result found for {searchTerm} 👀</>
        )}
      </div>
    </div>
  );
}
