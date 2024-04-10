import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Modal from "./Modal";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalStory = () => {
  const [isOpen, setisOpen] = useState(false);

  const onSubmit = () => {
    alert("Submitting from modal");
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setisOpen}
        title="Demo Title"
        description="Demo Description"
        onSubmit={onSubmit}
      />
      <button onClick={() => setisOpen(true)}>Open Modal</button>
    </>
  );
};

export const Primary: Story = {
  render: () => <ModalStory />,
};

const SearchModal = () => {
  const [isOpen, setisOpen] = useState(false);

  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setisOpen}
        title={
          <div className="relative mr-1.5 w-full">
            <input
              name="search-field"
              className="w-full rounded border border-black pl-7 pr-2 focus:outline-none"
            />
            <button className="absolute left-0 top-0 h-full px-2">
              <MagnifyingGlassIcon className="h-4 w-4 cursor-pointer" />
            </button>
          </div>
        }
      />
      <MagnifyingGlassIcon
        onClick={() => setisOpen(true)}
        className="h-6 w-6 cursor-pointer"
      />
    </>
  );
};

export const Search: Story = {
  render: () => <SearchModal />,
};
