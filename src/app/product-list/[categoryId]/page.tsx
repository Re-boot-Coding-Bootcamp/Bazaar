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
    <div className="flex max-w-screen-xl flex-col gap-4 py-8">
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
      <div
        id="product-grid-and-filter-container"
        className="flex min-h-screen md:gap-4"
      >
        <div className="sticky top-0 max-h-[calc(100vh-20px)] overflow-y-auto md:min-w-[200px]">
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
  // {
  //   id: "gender",
  //   name: "Gender",
  //   options: [
  //     { value: "women", label: "Women", checked: false },
  //     { value: "men", label: "Men", checked: false },
  //     { value: "kids", label: "Kids", checked: false },
  //     { value: "little kids", label: "Little Kids", checked: false },
  //   ],
  // },
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false, color: "#FFFFFF" },
      { value: "blue", label: "Blue", checked: false, color: "#1884EF" },
      { value: "green", label: "Green", checked: false, color: "#4CB82A" },
      {
        value: "lightgray",
        label: "L. Gray",
        checked: false,
        color: "#D7D7D7 ",
      },
      { value: "gray", label: "Gray", checked: false, color: "#A0A0A0" },
      {
        value: "darkgray",
        label: "D. Gray",
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
      { value: "Xs", label: "XS", checked: false },
      { value: "s", label: "S", checked: false },
      { value: "m", label: "M", checked: false },
      { value: "l", label: "L", checked: false },
      { value: "xl", label: "XL", checked: false },
      { value: "2xl", label: "2XL", checked: false },
      { value: "3xl", label: "3XL", checked: false },
    ],
  },
  // {
  //   id: "shoes size",
  //   name: "Shoes Size",
  //   options: [
  //     { value: "6", label: "6", checked: false },
  //     { value: "7", label: "7", checked: false },
  //     { value: "8", label: "8", checked: false },
  //     { value: "9", label: "9", checked: false },
  //     { value: "10", label: "10", checked: false },
  //     { value: "11", label: "11", checked: false },
  //     { value: "12", label: "12", checked: false },
  //   ],
  // },
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
