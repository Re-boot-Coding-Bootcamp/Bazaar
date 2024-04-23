import { uniqBy } from "lodash";
import { ProductCard } from "~/app/_components";
import { api } from "~/trpc/server";

export default async function ProductListForCategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const { categoryId } = params;
  const products = await api.product.getProducts({
    categoryId: categoryId === "all" ? undefined : categoryId,
  });

  const productVariants = products.flatMap((product) => {
    return uniqBy(product.variants, "color").map((variant) => ({
      ...variant,
      productName: product.name,
    }));
  });

  return (
    <div className="flex w-full flex-col items-center px-4">
      <p>ProductListPage - Shop all</p>
      <div className="grid w-full max-w-screen-xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {productVariants.map((productVariant) => (
          <ProductCard
            key={productVariant.id}
            imageUrl={productVariant.images[0]?.url}
            productName={productVariant.productName}
            price={productVariant.price}
            productUrl={`/product/${productVariant.id}`}
            maxSize="md"
          />
        ))}
      </div>
    </div>
  );
}
