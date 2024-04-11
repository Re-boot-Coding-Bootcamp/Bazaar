import type { Meta, StoryObj } from "@storybook/react";
import { DesktopSearchBar } from "./DesktopSearchBar";

const meta = {
  title: "Example/DesktopSearchBar",
  component: DesktopSearchBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof DesktopSearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    onSubmit: (searchTerm: string) => {
      alert(`Searching for ${searchTerm}...`);
    },
  },
};
