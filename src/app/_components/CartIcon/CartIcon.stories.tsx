import type { Meta, StoryObj } from "@storybook/react";
import { CartIcon } from "./CartIcon";

const meta: Meta<typeof CartIcon> = {
  title: "Component/CartIcon",
  component: CartIcon,
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: "object",
    },
  },
};

export default meta;

export const Default: StoryObj<typeof CartIcon> = {
  args: {},
};
