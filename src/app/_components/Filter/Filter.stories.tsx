import type { Meta, StoryObj } from "@storybook/react";
import { Filter } from "./Filter";

const meta: Meta = {
  title: "Component/Filter",
  component: Filter,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
