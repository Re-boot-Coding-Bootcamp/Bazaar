"use client";

import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface DesktopSearchBarProps {
  onSubmit: (searchTerm: string) => void;
}

const DesktopSearchBar = ({ onSubmit }: DesktopSearchBarProps): JSX.Element => {
  const [searchFieldValue, setSearchFieldValue] = useState("");

  const handleSubmit = () => {
    onSubmit(searchFieldValue);
    setSearchFieldValue("");
  };

  return (
    <div id="desktop-search-container" className="relative w-full">
      <input
        name="search-field"
        className="w-full rounded border border-black py-1 pl-7 pr-2 focus:outline-none"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
        value={searchFieldValue}
        onChange={(e) => setSearchFieldValue(e.target.value)}
      />
      <button
        type="submit"
        className="absolute left-0 top-0 h-full px-2"
        onClick={handleSubmit}
      >
        <MagnifyingGlassIcon className="h-4 w-4 cursor-pointer" />
      </button>
    </div>
  );
};

export { DesktopSearchBar };
