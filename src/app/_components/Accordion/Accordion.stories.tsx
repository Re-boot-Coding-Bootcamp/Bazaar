import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";
import Link from "next/link";

const meta = {
  title: "Example/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: [
      { title: "Section 1", content: <p>This is the content of section 1.</p> },
      { title: "Section 2", content: <p>This is the content of section 2.</p> },
    ],
    expandAllOption: false,
  },
};
export const WithExpandAllOptions: Story = {
  args: {
    children: [
      { title: "Section 1", content: <p>This is the content of section 1.</p> },
      { title: "Section 2", content: <p>This is the content of section 2.</p> },
    ],
    expandAllOption: true,
  },
};
