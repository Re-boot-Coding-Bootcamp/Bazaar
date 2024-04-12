import type { Meta, StoryObj } from "@storybook/react";
import { BreadCrumb } from "./BreadCrumb";

const meta: Meta<typeof BreadCrumb> = {
  title: "Component/BreadCrumb",
  component: BreadCrumb,
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: "object",
    },
  },
};

export default meta;

export const Default: StoryObj<typeof BreadCrumb> = {
  args: {
    items: [
      { text: "Home", href: "/home" },
      { text: "Kids", href: "/home/kids" },
      { text: "Shoes", href: "/home/kids/shoes" },
      { text: "Boy" },
    ],
  },
};
