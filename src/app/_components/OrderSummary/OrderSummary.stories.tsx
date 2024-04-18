import type { Meta, StoryObj } from "@storybook/react";
import { OrderSummary } from "./OrderSummary";

const meta = {
  title: "Components/OrderSummary",
  component: OrderSummary,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof OrderSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    price: {
      subtotal: 550.0,
      tax: 0,
      total: 555,
    },
  },
};
