import type { Meta, StoryObj } from "@storybook/react";
import { DesktopNavbar } from "./DesktopNavbar";

const meta = {
  title: "Components/DesktopNavbar",
  component: DesktopNavbar,
  tags: ["autodocs"],
  argTypes: {},
  decorators: [
    (Story) => (
      <div className="w-screen border border-black">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DesktopNavbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    categories: [
      {
        id: "1",
        name: "Category 1",
        description: null,
      },
      {
        id: "2",
        name: "Category 2",
        description: null,
      },
      {
        id: "3",
        name: "Category 3",
        description: null,
      },
      {
        id: "4",
        name: "Category 4",
        description: null,
      },
    ],
  },
};
