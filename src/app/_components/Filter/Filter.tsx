"use client";

import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
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

interface FilterProps {
  filters: Filter[];
}

const Filter: React.FC<FilterProps> = ({ filters: initialFilters }) => {
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

  const applyFiltersAndCloseDrawer = () => {
    setIsDialogOpen(false);
  };

  function renderFilters() {
    const colorFilters = filters.find((filter) => filter.id === "color");
    const otherFilters = filters.filter((filter) => filter.id !== "color");

    return (
      <>
        <h1 className="mb-4 ml-3.5 text-xl font-bold text-gray-900">Filter</h1>

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
                                  viewBox="0 2 18 20"
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
                                    d="M5 11l2 2 6-6 2 2-8 8-4-4"
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
                          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 "
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
          <Transition.Root show={isDialogOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={toggleDialog}
              style={{ fontFamily: "roboto" }}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-y-full"
                    enterTo="translate-y-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-y-0"
                    leaveTo="translate-y-full"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      {renderFilters()}
                      <div className="mx-5 flex items-center justify-center gap-12">
                        <button
                          onClick={resetFilters}
                          className="mt-4 w-[120px] rounded-lg bg-gray-700 px-4 py-2 text-sm text-white active:scale-95"
                        >
                          Reset
                        </button>
                        <button
                          onClick={applyFiltersAndCloseDrawer}
                          className="mt-4 w-[120px] rounded-lg border-2 border-gray-900 px-3 py-1 text-gray-700 active:scale-95"
                        >
                          Apply
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
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
