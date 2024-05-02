import type { Meta, StoryObj } from "@storybook/react";
import { CartItem } from "./CartItem";

const meta = {
  title: "Components/CartItem",
  component: CartItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof CartItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    cartItemData: {
      productVariant: {
        product: {
          name: "Product Name",
        },
        id: "123",
        price: 100,
        size: "M",
        color: "Black",
        stock: 10,
        images: [
          {
            url: "https://via.placeholder.com/150",
          },
        ],
      },
      id: "123",
      cartId: "123",
      productVariantId: "123",
      quantity: 1,
    },
  },
};
