import type { Meta, StoryObj } from "@storybook/react";
import { BreadCrumb } from "./BreadCrumb";

const meta: Meta<typeof BreadCrumb> = {
  title: "Components/BreadCrumb",
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
      { name: "Home", href: "/home" },
      { name: "Kids", href: "/home/kids" },
      { name: "Shoes", href: "/home/kids/shoes" },
      { name: "Boy", current: true },
    ],
  },
};
