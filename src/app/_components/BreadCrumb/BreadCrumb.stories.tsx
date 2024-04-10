import type { Meta, StoryObj } from "@storybook/react";
import { BreadCrumb } from "./BreadCrumb";

const meta: Meta = {
  title: "Component/BreadCrumb",
  component: BreadCrumb,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
