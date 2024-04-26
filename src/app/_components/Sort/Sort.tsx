"use client";

import React, { type ChangeEvent, useState } from "react";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import { SortOptions } from "~/constants";
import {
  selectSortBy,
  updateSortBy,
  useAppDispatch,
  useAppSelector,
} from "~/lib";

const Sort = () => {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector(selectSortBy);
  const [mobileSortOpen, setMobileSortOpen] = useState(false);

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    dispatch(updateSortBy(selectedOption));
    setMobileSortOpen(false);
  };

  const toggleMobileSort = () => {
    setMobileSortOpen(!mobileSortOpen);
  };

  return (
    <div className="flex w-fit cursor-pointer items-center gap-1 hover:border-black md:border-b  md:border-transparent">
      <div className="hidden font-bold md:flex">Sort:</div>
      <div className="relative md:hidden">
        <ArrowsUpDownIcon
          className="mr-2 h-7 w-7 hover:text-gray-400"
          onClick={toggleMobileSort}
        />
        {mobileSortOpen && (
          <div className="absolute right-1 top-full z-10 mt-4 w-[170px] rounded-lg border bg-white shadow-xl">
            {SortOptions.map((option) => (
              <div
                key={option.value}
                className="cursor-pointer rounded-md px-4 py-2 hover:bg-gray-100"
                onClick={() => {
                  dispatch(updateSortBy(option.value));
                  setMobileSortOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      <select
        id="sortOptions"
        className="hidden w-fit cursor-pointer appearance-none focus:outline-none md:block"
        value={sortBy}
        onChange={handleSortChange}
      >
        {SortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export { Sort };
