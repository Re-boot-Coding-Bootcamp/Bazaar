"use client";

import React, { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import {
  ChevronUpIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

interface FilterOption {
  value: string;
  label: string;
  checked: boolean;
}

interface Filter {
  id: string;
  name: string;
  options: FilterOption[];
}

const subCategories = [
  { name: "Clothes" },
  { name: "Shoes" },
  { name: "Accessories" },
];

const initialFilters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "orange", label: "Orange", checked: false },
    ],
  },
  {
    id: "gender",
    name: "Gender",
    options: [
      { value: "women", label: "Women", checked: false },
      { value: "men", label: "Men", checked: false },
      { value: "kids", label: "Kids", checked: false },
      { value: "little kids", label: "Little Kids", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "s", label: "S", checked: false },
      { value: "m", label: "M", checked: false },
      { value: "l", label: "L", checked: false },
      { value: "xl", label: "XL", checked: false },
      { value: "2xl", label: "2XL", checked: false },
    ],
  },
  {
    id: "shop by price",
    name: "Shop by Price",
    options: [
      { value: "$0 - $25", label: "$0 - $25", checked: false },
      { value: "$25 - $50", label: "$25 - $50", checked: false },
      { value: "$50 - $100", label: "$50 - $100", checked: false },
      { value: "$100 - $150", label: "$100 - $150", checked: false },
      { value: "Over $150", label: "Over $150", checked: false },
    ],
  },
];

const Filter = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleFilterChange = (filterId: string, optionValue: string): void => {
    const newFilters = filters.map((filter) => {
      if (filter.id === filterId) {
        return {
          ...filter,
          options: filter.options.map((option) => {
            if (option.value === optionValue) {
              return { ...option, checked: !option.checked };
            }
            return option;
          }),
        };
      }
      return filter;
    });
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <div className="p-4">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-4 text-2xl font-bold text-gray-900">Categories</h1>
        <div>
          <ul className="mb-6 list-none pl-1 font-bold">
            {subCategories.map((category, index) => (
              <li key={index} className="text-gray-700">
                {category.name}
              </li>
            ))}
          </ul>
        </div>
        {filters.map((filter, index) => (
          <Disclosure
            key={index}
            as="div"
            className="border-t border-gray-200  py-4"
          >
            {({ open }) => (
              <>
                <Disclosure.Button className="text-md text-md flex w-full justify-between px-4 py-2 font-bold text-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                  <span>{filter.name}</span>
                  <ChevronUpIcon
                    style={{
                      transform: open ? "rotate(-180deg)" : "rotate(0deg)",
                    }}
                    className="h-5 w-5 text-gray-500 transition-transform duration-200"
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                  {filter.options.map((option, idx) => (
                    <div key={idx} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={option.checked}
                        onChange={() =>
                          handleFilterChange(filter.id, option.value)
                        }
                        id={`${filter.id}-${idx}`}
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor={`${filter.id}-${idx}`}>
                        {option.label}
                      </label>
                    </div>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
        {isMobile && (
          <button className="fixed right-4 top-4 inline-flex items-center justify-center rounded-full border border-gray-300 px-3 py-1 font-medium text-gray-700 hover:border-gray-700 active:scale-95">
            <AdjustmentsHorizontalIcon
              className="mr-2 h-6 w-6"
              aria-hidden="true"
            />
            Filter
          </button>
        )}

        <button
          onClick={resetFilters}
          type="button"
          className="relative mt-5 overflow-hidden rounded-full bg-gray-700 px-4 py-2 text-sm text-white transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:-translate-y-1 active:scale-x-90 active:scale-y-110"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export { Filter };
