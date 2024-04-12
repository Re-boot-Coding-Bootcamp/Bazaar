"use client";

import React, { useState } from "react";

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
    id: "category",
    name: "Category",
    options: [
      { value: "women", label: "Women", checked: false },
      { value: "men", label: "Men", checked: false },
      { value: "kids", label: "Kids", checked: false },
      { value: "little kids", label: "Little Kids", checked: false },
    ],
  },
  {
    id: "Size",
    name: "Size",
    options: [
      { value: "s", label: "S", checked: false },
      { value: "m", label: "M", checked: false },
      { value: "l", label: "L", checked: false },
      { value: "xl", label: "XL", checked: false },
      { value: "2xl", label: "2XL", checked: false },
    ],
  },
];

const Filter = () => {
  const [filters, setFilters] = useState(initialFilters);

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
        <h1 className="mb-4 text-2xl font-bold text-gray-900">Filters</h1>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
          <ul className="mb-6 list-disc pl-5">
            {subCategories.map((category, index) => (
              <li key={index} className="text-gray-700">
                {category.name}
              </li>
            ))}
          </ul>
        </div>
        {filters.map((filter, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {filter.name}
            </h3>
            <ul className="list-disc pl-5">
              {filter.options.map((option, idx) => (
                <li key={idx} className="text-gray-700">
                  <input
                    type="checkbox"
                    checked={option.checked}
                    onChange={() => handleFilterChange(filter.id, option.value)}
                    id={`${filter.id}-${idx}`}
                  />
                  <label htmlFor={`${filter.id}-${idx}`} className="ml-2">
                    {option.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <button
          onClick={resetFilters}
          type="button"
          className="relative overflow-hidden rounded-full bg-gray-700 px-5 py-2.5 text-white transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:-translate-y-1 active:scale-x-90 active:scale-y-110"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export { Filter };
