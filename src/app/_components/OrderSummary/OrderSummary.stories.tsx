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
  decorators: [
    (Story) => (
      <div style={{ width: "300px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OrderSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    subtotal: 95.0,
  },
};
