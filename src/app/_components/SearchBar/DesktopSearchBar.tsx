import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

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
    </div>
  );
};

export { DesktopSearchBar };
