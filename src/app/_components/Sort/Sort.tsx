"use client";

import React, { type ChangeEvent, useState } from "react";

const sortOptions = [
  { value: "price-low", label: "Price Low to High" },
  { value: "price-high", label: "Price High to Low" },
  { value: "popularity", label: "Popularity" },
  { value: "new-arrivals", label: "New Arrivals" },
  { value: "customer-reviews", label: "Customer Reviews" },
];

const Sort = () => {
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]?.value);

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setSelectedSort(selectedOption);
    // TODOL we will use redux to handle sort
    // handleSort(selectedOption);
  };

  return (
    <div className="flex w-fit cursor-pointer items-center gap-1 border-b border-transparent  hover:border-black">
      <div className="font-bold">Sort:</div>
      <select
        id="sortOptions"
        className="block w-fit cursor-pointer appearance-none focus:outline-none"
        value={selectedSort}
        onChange={handleSortChange}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export { Sort };
