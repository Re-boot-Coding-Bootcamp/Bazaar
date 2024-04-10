import React, { HTMLInputAutoCompleteAttribute, useState } from "react";
import { Popover } from "@headlessui/react";

const MobileSearchBar = () => {
  const [searchItem, setSearchItem] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Popover className="relative">
      <Popover.Button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className=" h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </Popover.Button>

      <Popover.Panel className="absolute z-10">
        <input
          type="search"
          placeholder="Search Product"
          className=" w-fill border-b-2 border-gray-200 px-10 py-1"
        />
      </Popover.Panel>
    </Popover>
  );
};

export default MobileSearchBar;
