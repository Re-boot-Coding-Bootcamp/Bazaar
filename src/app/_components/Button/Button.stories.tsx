import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { XMarkIcon } from "@heroicons/react/24/solid";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

const ButtonStandardStory = () => {
  return (
    <Button onClick={() => alert("Button Clicked")} variant="standard">
      Hello
    </Button>
  );
};
const ButtonOutlineStory = () => {
  return (
    <Button onClick={() => alert("Button Clicked")} variant="outline">
      Hello
    </Button>
  );
};
const ButtonTextStory = () => {
  return (
    <Button onClick={() => alert("Button Clicked")} variant="text">
      Hello
    </Button>
  );
};
const ButtonIconStory = () => {
  return (
    <Button
      onClick={() => alert("Button Clicked")}
      variant="standard"
      startIcon={<XMarkIcon />}
    />
  );
};
const ButtonDisabledButtonStory = () => {
  return (
    <Button onClick={() => alert("Button Clicked")} variant="standard" disabled>
      Hello
    </Button>
  );
};
const ButtonDisabledTextStory = () => {
  return (
    <Button onClick={() => alert("Button Clicked")} variant="text" disabled>
      Hello
    </Button>
  );
};

export const Primary: Story = {
  render: () => <ButtonStandardStory />,
};
export const Outline: Story = {
  render: () => <ButtonOutlineStory />,
};
export const Text: Story = {
  render: () => <ButtonTextStory />,
};
export const Icon: Story = {
  render: () => <ButtonIconStory />,
};
export const DisabledButton: Story = {
  render: () => <ButtonDisabledButtonStory />,
};
export const DisabledText: Story = {
  render: () => <ButtonDisabledTextStory />,
};
