import React, { type ChangeEvent, useState } from "react";

const Sort = ({
  handleSort,
}: {
  handleSort: (selectedOption: string) => void;
}) => {
  const [selectedSort, setSelectedSort] = useState("price-low");

  const sortOptions = [
    { value: "price-low", label: "Price Low to High" },
    { value: "price-high", label: "Price High to Low" },
    { value: "popularity", label: "Popularity" },
    { value: "new-arrivals", label: "New Arrivals" },
    { value: "customer-reviews", label: "Customer Reviews" },
  ];

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setSelectedSort(selectedOption);
    handleSort(selectedOption);
  };

  return (
    <div className="flex items-center hover:text-red-500">
      <label htmlFor="sortOptions" className="font-bold">
        Sort:
      </label>
      <select
        id="sortOptions"
        className="block appearance-none px-1 focus:outline-none"
        value={selectedSort}
        onChange={handleSortChange}
        aria-label="Sort by"
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
