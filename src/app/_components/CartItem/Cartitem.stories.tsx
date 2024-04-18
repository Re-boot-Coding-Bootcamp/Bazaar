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
    product: {
      name: "Awesome Shoes",
      image:
        "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/30d7afaa-343b-4439-b65d-bb544c65420e/revolution-7-road-running-shoes-dC34tK.png",
      price: 49.99,
      quantity: 2,
      color: "Black/True White",
      size: "5.5 Boys = 7.0 Women",
    },
  },
};
