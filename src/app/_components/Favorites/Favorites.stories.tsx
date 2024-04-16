import type { Meta, StoryObj } from "@storybook/react";
import { Favorites } from "./Favorites";

const meta: Meta<typeof Favorites> = {
  title: "Component/Favorites",
  component: Favorites,
  tags: ["autodocs"],
  argTypes: {
    items: {
      control: "object",
    },
  },
};

export default meta;

export const Default: StoryObj<typeof Favorites> = {
  args: {},
};
