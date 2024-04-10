import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { XMarkIcon } from "@heroicons/react/24/solid";

const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "outline",
    children: "hello",
    startIcon: <XMarkIcon />,
    endIcon: <XMarkIcon />,
  },
};
