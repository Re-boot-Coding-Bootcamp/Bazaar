import React, { useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Modal from "../Modal";

const MobileSearchBar = () => {
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

export default MobileSearchBar;
