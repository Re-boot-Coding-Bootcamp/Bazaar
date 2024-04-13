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
      <div className="w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MobileNavbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
