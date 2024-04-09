import type { Meta, StoryObj } from "@storybook/react";

import { ImageGallery } from "./ImageGallery";

const meta = {
  title: "Component/ImageGallery",
  component: ImageGallery,
  tags: ["autodocs"],
} satisfies Meta<typeof ImageGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
