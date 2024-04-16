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
  args: {},
};
