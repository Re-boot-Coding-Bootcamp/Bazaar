import { ProductGrid } from "~/app/_components";
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

  return (
    <div className="max-w-screen-xl">
      <p>ProductListPage - Shop all</p>
      <div className="w-full max-w-screen-xl" id="product-grid-container">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
