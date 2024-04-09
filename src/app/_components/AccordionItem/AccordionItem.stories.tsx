import type { Meta, StoryObj } from "@storybook/react";
import { AccordionItem } from "./AccordionItem";

const meta = {
  title: "Example/AccordionItem",
  component: AccordionItem,
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
} satisfies Meta<typeof AccordionItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    child: {
      title: "Section 1",
      content: <div>This is the content of section 1.</div>,
    },
    expandAllAccordionItems: false,
  },
};
