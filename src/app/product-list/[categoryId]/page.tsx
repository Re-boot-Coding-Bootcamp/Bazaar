import { BreadCrumb, Filter, ProductGrid, Sort } from "~/app/_components";
import { api } from "~/trpc/server";

export default async function ProductListForCategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const { categoryId } = params;
  const isShopAll = categoryId === "all";
  const products = await api.product.getProducts({
    categoryId: isShopAll ? undefined : categoryId,
  });

  const categoryName = isShopAll
    ? "Shop All"
    : (await api.category.getCategoryById({ id: categoryId }))?.name ?? "";

  return (
    <div className="flex h-full max-w-screen-xl flex-col gap-4 py-8">
      <div
        id="breadcrumb-and-sort-container"
        className="ml-4 flex items-center justify-between md:ml-0"
      >
        <BreadCrumb
          items={[{ text: "Home", href: "/" }, { text: categoryName }]}
        />
        <div className="mr-1 flex gap-4">
          <Filter mobileButton={true} />
          <Sort />
        </div>
      </div>
      <div id="product-grid-and-filter-container" className="flex md:gap-4">
        <div className="sticky top-[148px] h-full md:min-w-[200px]">
          <Filter />
        </div>
        <div className="h-fit px-2 md:px-0">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
