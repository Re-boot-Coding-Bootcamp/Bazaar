import type { Meta, StoryObj } from "@storybook/react";

import ProductCard from "./ProductCard";

const meta: Meta<typeof ProductCard> = {
  title: "Components/ProductCard",
  component: ProductCard,
  parameters: {
    layout: "centered",
  },
  args: {
    productName: "Shoes/ئاياق",
    price: 99.23,
    imageUrl: "https://images.unsplash.com/photo-1520256862855-398228c41684",
    productUrl: "#",
    maxSize: "md",
  },
};

export default meta;

type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {};

export const SmallSize: Story = {
  args: {
    ...meta.args,
    maxSize: "sm",
  },
  name: "Small Size",
};

export const MediumSize: Story = {
  args: {
    ...meta.args,
    maxSize: "md",
  },
  name: "Medium Size",
};

export const LargeSize: Story = {
  args: {
    ...meta.args,
    maxSize: "lg",
  },
  name: "Large Size",
};
