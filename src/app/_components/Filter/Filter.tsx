import React from "react";

const subCategories = [
  { name: "Clothes" },
  { name: "Shoes" },
  { name: "Accessories" },
];

const filters = [
  {
    name: "Color",
    options: ["White", "Beige", "Blue", "Brown", "Green", "Orange"],
  },
  {
    name: "Category",
    options: ["Women", "Men", "Kids", "Little Kids"],
  },
  {
    name: "Size",
    options: ["S", "M", "L", "XL", "2XL"],
  },
];

const Filter = () => {
  return (
    <div className="bg-white p-4">
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
                  {option}
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
