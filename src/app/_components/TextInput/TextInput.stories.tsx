import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TextInput from "./TextInput";

export default {
  title: "Components/TextInput",
  component: TextInput,
} as Meta<typeof TextInput>;

const Template: StoryObj<typeof TextInput> = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <TextInput
        {...args}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};

export const Default: StoryObj<typeof TextInput> = {
  ...Template,
  args: {
    id: "default-textinput",
    name: "default",
    placeholder: "Enter text...",
    value: "",
  },
};

export const WithError: StoryObj<typeof TextInput> = {
  ...Template,
  args: {
    ...Default.args,
    id: "error-textinput",
    errorMessage: "Error message",
  },
};

export const WithSuccess: StoryObj<typeof TextInput> = {
  ...Template,
  args: {
    ...Default.args,
    id: "success-textinput",
    successMessage: "Success message",
  },
};

export const Prefilled: StoryObj<typeof TextInput> = {
  ...Template,
  args: {
    ...Default.args,
    id: "prefilled-textinput",
    value: "Hello World",
  },
};
