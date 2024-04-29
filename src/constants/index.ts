import type { ProductFilter, SortOption } from "~/types";

const LocalStorageKeys = {
  CART_ID: "bazaar-cartId",
};

const FilterOptions: ProductFilter[] = [
  {
    id: "color",
    name: "Color",
    options: [
      {
        value: "White",
        label: "White",
        checked: false,
        color: "#FFFFFF",
        checkmarkColor: "#000",
      },
      {
        value: "Blue",
        label: "Blue",
        checked: false,
        color: "#1884EF",
      },
      { value: "Green", label: "Green", checked: false, color: "#4CB82A" },
      {
        value: "Light Gray",
        label: "Light Gray",
        checked: false,
        color: "#D7D7D7",
        checkmarkColor: "#000",
      },
      { value: "Gray", label: "Gray", checked: false, color: "#A0A0A0" },
      {
        value: "Dark Gray",
        label: "Dark Gray",
        checked: false,
        color: "#5D5D5D",
      },
      { value: "Black", label: "Black", checked: false, color: "#000" },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "XS", label: "XS", checked: false },
      { value: "S", label: "S", checked: false },
      { value: "M", label: "M", checked: false },
      { value: "L", label: "L", checked: false },
      { value: "XL", label: "XL", checked: false },
      { value: "2XL", label: "2XL", checked: false },
      { value: "3XL", label: "3XL", checked: false },
      { value: "OSFA", label: "One Size", checked: false },
    ],
  },
  {
    id: "price",
    name: "Price",
    options: [
      { value: "0-24.99", label: "$0 - $24.99", checked: false },
      { value: "25.00-49.99", label: "$25 - $49.99", checked: false },
      { value: "50.00-99.99", label: "$50 - $99.99", checked: false },
      { value: "100.00-149.99", label: "$100 - $149.99", checked: false },
      { value: "150.00+", label: "Over $150", checked: false },
    ],
  },
];

const SortOptions: SortOption[] = [
  { value: "new-arrivals", label: "New Arrivals" },
  { value: "price-low-to-high", label: "Price Low to High" },
  { value: "price-high-to-low", label: "Price High to Low" },
  // { value: "popularity", label: "Popularity" },
  // { value: "customer-reviews", label: "Customer Reviews" },
];

export { LocalStorageKeys, FilterOptions, SortOptions };
