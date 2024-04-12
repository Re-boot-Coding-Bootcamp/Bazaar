import type { Meta, StoryObj } from "@storybook/react";
import { Sort } from "./Sort";

const meta = {
  title: "Component/Sort",
  component: Sort,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Sort>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    handleSort: (selectedOption: string) => {
      console.log("Sorting by:", selectedOption);
    },
  },
};
