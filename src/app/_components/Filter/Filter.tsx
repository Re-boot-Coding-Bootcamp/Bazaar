"use client";

import React, { useState } from "react";

interface FilterOption {
  value: string;
  lable: string;
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
      { value: "White", label: "white", checked: false },
      { value: "Beige", label: "Beige", checked: false },
      { value: "Blue", label: "Blue", checked: false },
      { value: "Green", label: "Green", checked: false },
      { value: "Orange", label: "Orange", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "Women", label: "women", checked: false },
      { value: "Men", label: "men", checked: false },
      { value: "Kids", label: "kids", checked: false },
      { value: "Little Kids", label: "little kids", checked: false },
    ],
  },
  {
    id: "Size",
    name: "Size",
    options: [
      { value: "S", label: "s", checked: false },
      { value: "M", label: "m", checked: false },
      { value: "L", label: "l", checked: false },
      { value: "XL", label: "xl", checked: false },
      { value: "2XL", label: "2xl", checked: false },
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
      </div>
    </div>
  );
};

export { Filter };
