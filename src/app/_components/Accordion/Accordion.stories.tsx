import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";

const meta = {
  title: "Components/Accordion",
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
    items: [
      {
        title: "Section 1",
        content: <div>This is the content of section 1.</div>,
      },
      {
        title: "Section 2",
        content: <div>This is the content of section 2.</div>,
      },
    ],
    expandAllOption: false,
  },
};

export const WithExpandAllOptions: Story = {
  args: {
    items: [
      {
        title: "Section 1",
        content: <div>This is the content of section 1.</div>,
      },
      {
        title: "Section 2",
        content: <div>This is the content of section 2.</div>,
      },
    ],
    expandAllOption: true,
  },
};
