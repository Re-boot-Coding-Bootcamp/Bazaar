import React, { type ChangeEvent, useState } from "react";

const sortOptions = [
  { value: "price-low", label: "Price Low to High" },
  { value: "price-high", label: "Price High to Low" },
  { value: "popularity", label: "Popularity" },
  { value: "new-arrivals", label: "New Arrivals" },
  { value: "customer-reviews", label: "Customer Reviews" },
];

const Sort = ({
  handleSort,
}: {
  handleSort: (selectedOption: string) => void;
}) => {
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]?.value);

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.value;
    setSelectedSort(selectedOption);
    handleSort(selectedOption);
  };

  return (
    <div className="flex w-fit cursor-pointer items-center gap-1 border-black underline-offset-4 hover:border-b">
      <div className="font-bold">Sort:</div>
      <select
        id="sortOptions"
        className="block w-fit appearance-none focus:outline-none"
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
