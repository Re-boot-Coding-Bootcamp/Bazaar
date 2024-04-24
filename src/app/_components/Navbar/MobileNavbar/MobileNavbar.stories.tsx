import type { Meta, StoryObj } from "@storybook/react";
import { MobileNavbar } from "./MobileNavbar";

const meta = {
  title: "Components/MobileNavbar",
  component: MobileNavbar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  decorators: [
    (Story) => (
      <div className="w-[768px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MobileNavbar>;

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
