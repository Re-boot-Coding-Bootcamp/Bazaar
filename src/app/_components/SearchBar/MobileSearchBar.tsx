"use client";

import React, { useRef, useState } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Modal } from "../Modal";
import { useRouter } from "next/navigation";

const MobileSearchBar = (): JSX.Element => {
  const router = useRouter();
  const [isOpen, setisOpen] = useState(false);
  const [searchFieldValue, setSearchFieldValue] = useState("");
  const searchFieldRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    setisOpen(false);
    router.push(`/search?q=${searchFieldValue.trim()}`);
    setSearchFieldValue("");
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setisOpen}
        title={
          <div className="relative mr-1.5 w-full">
            <input
              ref={searchFieldRef}
              name="search-field"
              className="w-full rounded border border-black pl-7 pr-2 focus:outline-none"
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
        }
      />
      <MagnifyingGlassIcon
        onClick={() => {
          setisOpen(true);
          setTimeout(() => searchFieldRef.current?.focus(), 0);
        }}
        className="h-5 w-5 cursor-pointer"
      />
    </>
  );
};

export { MobileSearchBar };
