import type { Meta, StoryObj } from "@storybook/react";
// import { Sample } from "./MobileSearchBar";
import { MobileSearchBar } from "./MobileSearchBar";

const meta = {
  title: "Example/MobileSearchBar",
  component: MobileSearchBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MobileSearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
