import {
  BreadCrumb,
  Filter,
  type ProductFilter,
  ProductGrid,
  Sort,
} from "~/app/_components";
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
          <Filter filters={FilterOptions} mobileButton={true} />
          <Sort />
        </div>
      </div>
      <div id="product-grid-and-filter-container" className="flex md:gap-4">
        <div className="sticky top-[148px] h-full md:min-w-[200px]">
          <Filter filters={FilterOptions} />
        </div>
        <div className="h-fit px-2 md:px-0">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}

const FilterOptions: ProductFilter[] = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "apparels", label: "Apparels", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
      { value: "stationary", label: "Stationary", checked: false },
    ],
  },
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false, color: "#FFFFFF" },
      { value: "blue", label: "Blue", checked: false, color: "#1884EF" },
      { value: "green", label: "Green", checked: false, color: "#4CB82A" },
      {
        value: "lightgray",
        label: "Light Gray",
        checked: false,
        color: "#D7D7D7",
      },
      { value: "gray", label: "Gray", checked: false, color: "#A0A0A0" },
      {
        value: "darkgray",
        label: "Dark Gray",
        checked: false,
        color: "#5D5D5D",
      },
      { value: "black", label: "Black", checked: false, color: "#000" },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "xs", label: "XS", checked: false },
      { value: "s", label: "S", checked: false },
      { value: "m", label: "M", checked: false },
      { value: "l", label: "L", checked: false },
      { value: "xl", label: "XL", checked: false },
      { value: "2xl", label: "2XL", checked: false },
      { value: "3xl", label: "3XL", checked: false },
    ],
  },
  {
    id: "by price",
    name: "By Price",
    options: [
      { value: "$0 - $25", label: "$0 - $25", checked: false },
      { value: "$25 - $50", label: "$25 - $50", checked: false },
      { value: "$50 - $100", label: "$50 - $100", checked: false },
      { value: "$100 - $150", label: "$100 - $150", checked: false },
      { value: "Over $150", label: "Over $150", checked: false },
    ],
  },
];
