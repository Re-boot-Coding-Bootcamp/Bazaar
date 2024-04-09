import type { Meta, StoryObj } from "@storybook/react";
import Sample from "./Sample";

const meta = {
  title: "Example/Sample",
  component: Sample,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Sample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
