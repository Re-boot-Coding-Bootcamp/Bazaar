import type { Meta, StoryObj } from "@storybook/react";
import { Filter } from "./Filter";

const meta: Meta = {
  title: "Components/Filter",
  component: Filter,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

const initialFilters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "tops", label: "Tops" },
      { value: "bottoms", label: "Bottoms" },
      { value: "shoes", label: "Shoes" },
      { value: "accessories", label: "Accessories" },
    ],
  },
  {
    id: "gender",
    name: "Gender",
    options: [
      { value: "women", label: "Women", checked: false },
      { value: "men", label: "Men", checked: false },
      { value: "kids", label: "Kids", checked: false },
      { value: "little kids", label: "Little Kids", checked: false },
    ],
  },
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false, color: "#FFFFFF" },
      { value: "beige", label: "Beige", checked: false, color: "#F5F5DC" },
      { value: "blue", label: "Blue", checked: false, color: "#0000FF" },
      { value: "green", label: "Green", checked: false, color: "#008000" },
      { value: "orange", label: "Orange", checked: false, color: "#FFA500" },
      { value: "red", label: "Red", checked: false, color: "#C63333" },
      { value: "purple", label: "Purple", checked: false, color: "#6E20E1" },
      { value: "yellow", label: "Yellow", checked: false, color: "#FFC300" },
      { value: "pink", label: "Pink", checked: false, color: "#F463EC" },
      { value: "brown", label: "Brown", checked: false, color: "#814427" },
      { value: "grey", label: "Grey", checked: false, color: "#727272" },
      { value: "black", label: "Black", checked: false, color: "#000" },
    ],
  },

  {
    id: "size",
    name: "Size",
    options: [
      { value: "s", label: "S", checked: false },
      { value: "m", label: "M", checked: false },
      { value: "l", label: "L", checked: false },
      { value: "xl", label: "XL", checked: false },
      { value: "2xl", label: "2XL", checked: false },
    ],
  },
  {
    id: "shoes size",
    name: "Shoes Size",
    options: [
      { value: "6", label: "6", checked: false },
      { value: "7", label: "7", checked: false },
      { value: "8", label: "8", checked: false },
      { value: "9", label: "9", checked: false },
      { value: "10", label: "10", checked: false },
      { value: "11", label: "11", checked: false },
      { value: "12", label: "12", checked: false },
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

export const Default: Story = {
  args: {
    filters: initialFilters,
    category: "Shoes",
  },
};
