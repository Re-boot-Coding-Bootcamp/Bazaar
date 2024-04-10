import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Modal } from "../Modal";

const DesktopSearchBar = () => {
  const onSubmit = () => {
    alert("Submitting from modal");
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Search Product"
        className=" w-fill hidden border-b-2 border-gray-200 px-7 py-3 md:flex"
      />
      <button
        type="submit"
        className="absolute left-0 top-0 h-full px-2"
        onClick={onSubmit}
      >
        <MagnifyingGlassIcon className="ml-2 h-4 w-4 cursor-pointer" />
      </button>
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="-mt-9 ml-1 mr-1 hidden size-0 h-5 w-5 md:flex"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg> */}
    </div>
  );
};

export { DesktopSearchBar };
