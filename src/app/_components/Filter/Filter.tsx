import React, { useEffect, useState } from "react";
import { Dialog, Disclosure } from "@headlessui/react";
import {
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

interface FilterOption {
  value: string;
  label: string;
  checked: boolean;
}

interface ColorFilterOption extends FilterOption {
  color: string;
}

function isColorFilterOption(
  option: FilterOption,
): option is ColorFilterOption {
  return (option as ColorFilterOption).color !== undefined;
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
      { value: "white", label: "White", checked: false, color: "#FFFFFF" },
      { value: "beige", label: "Beige", checked: false, color: "#F5F5DC" },
      { value: "blue", label: "Blue", checked: false, color: "#0000FF" },
      { value: "green", label: "Green", checked: false, color: "#008000" },
      { value: "orange", label: "Orange", checked: false, color: "#FFA500" },
      { value: "red", label: "Red", checked: false, color: "#C63333" },
      { value: "purple", label: "Purple", checked: false, color: "#6E20E1" },
      { value: "yellow", label: "Yellow", checked: false, color: "#FFC300" },
      { value: "pink", label: "Pink", checked: false, color: "#F463EC" },
      { value: "brown", label: "Brown", checked: false, color: "#814427" },
      { value: "grey", label: "Grey", checked: false, color: "#727272" },
      { value: "black", label: "Black", checked: false, color: "#000" },
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleFilterChange = (filterId: string, optionValue: string) => {
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

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  function renderFilters() {
    const colorFilters = filters.find((filter) => filter.id === "color");
    const otherFilters = filters.filter((filter) => filter.id !== "color");

    return (
      <>
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
        {colorFilters && (
          <Disclosure as="div" className="border-t border-gray-200 py-4">
            {({ open }) => (
              <>
                <Disclosure.Button className="text-md flex w-full justify-between px-4 py-2 font-bold text-gray-500 hover:text-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                  <span>{colorFilters.name}</span>
                  <ChevronDownIcon
                    style={{
                      transform: open ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease, color 0.2s ease",
                      color: open ? "red" : "gray",
                    }}
                    className=" h-5 w-5 text-gray-500 transition-transform duration-200"
                  />
                </Disclosure.Button>
                <Disclosure.Panel className=" pb-2 pt-4 text-sm text-gray-500">
                  <div className="justify-content-start ml-5 grid grid-cols-3 gap-1">
                    {colorFilters.options.map((option, idx) => (
                      <div
                        key={idx}
                        className="mb-2 flex flex-col items-center justify-center hover:opacity-70"
                      >
                        {isColorFilterOption(option) && (
                          <>
                            <div
                              className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full"
                              style={{
                                backgroundColor: option.color,
                                border: "1px solid #ccc",
                              }}
                              onClick={() =>
                                handleFilterChange(
                                  colorFilters.id,
                                  option.value,
                                )
                              }
                            >
                              {option.checked && (
                                <svg
                                  className="h-6 w-6 fill-current text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    fill={
                                      [
                                        "white",
                                        "beige",
                                        "orange",
                                        "yellow",
                                      ].includes(option.value)
                                        ? "black"
                                        : "currentColor"
                                    }
                                    d="M5.293 8.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                            <label
                              htmlFor={`${colorFilters.id}-${idx}`}
                              className="mt-2 text-center"
                            >
                              {option.label}
                            </label>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        )}
        {otherFilters.map((filter, index) => (
          <Disclosure
            key={index}
            as="div"
            className="border-t border-gray-200 py-4"
          >
            {({ open }) => (
              <>
                <Disclosure.Button className="text-md flex w-full justify-between px-4 py-2 font-bold text-gray-500 hover:text-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                  <span>{filter.name}</span>
                  <ChevronDownIcon
                    style={{
                      transform: open ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease, color 0.2s ease",
                      color: open ? "red" : "gray",
                    }}
                    className=" h-5 w-5 text-gray-500 transition-transform duration-200"
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="pb-2 pt-4 text-sm text-gray-500">
                  <div>
                    {filter.options.map((option, idx) => (
                      <div
                        key={idx}
                        className="ml-5 flex items-center justify-start space-x-3 py-0.5"
                        style={{ color: "grey" }}
                      >
                        <input
                          type="checkbox"
                          checked={option.checked}
                          onChange={() =>
                            handleFilterChange(filter.id, option.value)
                          }
                          id={`${filter.id}-${idx}`}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 "
                        />
                        <label
                          htmlFor={`${filter.id}-${idx}`}
                          className="text-center"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </>
    );
  }

  return (
    <div className="p-4">
      {isMobile ? (
        <>
          <button
            onClick={toggleDialog}
            className="fixed right-4 top-4 inline-flex items-center justify-center rounded-full border border-gray-300 px-3 py-1 font-medium text-gray-700 hover:border-gray-700 active:scale-95"
          >
            <AdjustmentsHorizontalIcon
              className="mr-2 h-6 w-6"
              aria-hidden="true"
            />
            Filter
          </button>

          <Dialog
            as="div"
            className="relative z-10 "
            open={isDialogOpen}
            onClose={toggleDialog}
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Dialog.Panel
                  className=" w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                  style={{ fontFamily: "roboto" }}
                >
                  {renderFilters()}
                  <div className="mx-5 flex items-center justify-center gap-12  ">
                    <button
                      onClick={resetFilters}
                      className="mt-4 w-[120px] rounded-lg bg-gray-700 px-4 py-2 text-sm text-white  active:scale-95 "
                    >
                      Reset Filters
                    </button>
                    <button
                      onClick={resetFilters}
                      className="mt-4 w-[120px] rounded-lg border-2 border-gray-900 px-3 py-1  text-gray-700 active:scale-95"
                    >
                      Apply Filters
                    </button>
                  </div>
                </Dialog.Panel>
              </div>
            </div>
          </Dialog>
        </>
      ) : (
        <>
          {renderFilters()}

          <button
            onClick={resetFilters}
            className="relative ml-1 mt-10 h-10 overflow-hidden rounded-full bg-gray-700 px-4 py-1 text-white transition-all duration-200 hover:bg-gray-600 hover:ring-offset-2 active:ring-2 active:ring-neutral-800"
          >
            Reset Filters
          </button>
        </>
      )}
    </div>
  );
};

export { Filter };
