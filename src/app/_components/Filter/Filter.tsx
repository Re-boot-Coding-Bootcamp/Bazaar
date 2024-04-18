"use client";

import React, { Fragment, useState, useCallback } from "react";
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

interface Filter {
  id: string;
  name: string;
  options: FilterOption[];
}

interface FilterProps {
  filters: Filter[];
}

interface ChevronIconProps {
  isOpen: boolean;
}

function isColorFilterOption(
  option: FilterOption,
): option is ColorFilterOption {
  return "color" in option;
}

const ChevronIcon: React.FC<ChevronIconProps> = ({ isOpen }) => {
  return (
    <ChevronDownIcon
      className={`h-5 w-5 transition-transform duration-200 ${
        isOpen ? "rotate-180 text-red-500" : "rotate-0 text-gray-500"
      }`}
    />
  );
};
const Filter: React.FC<FilterProps> = ({ filters: initialFilters }) => {
  const [filters, setFilters] = useState(initialFilters);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFilterChange = useCallback(
    (filterId: string, optionValue: string) => {
      setFilters((currentFilters) =>
        currentFilters.map((filter) =>
          filter.id === filterId
            ? {
                ...filter,
                options: filter.options.map((option) =>
                  option.value === optionValue
                    ? { ...option, checked: !option.checked }
                    : option,
                ),
              }
            : filter,
        ),
      );
    },
    [],
  );

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const applyFiltersAndCloseDrawer = () => {
    setIsDialogOpen(false);
  };

  function renderFilters() {
    const colorFilters = filters.find((filter) => filter.id === "color");
    const shoesSizeFilters = filters.find(
      (filter) => filter.id === "shoes size",
    );
    const otherFilters = filters.filter(
      (filter) => filter.id !== "color" && filter.id !== "shoes size",
    );

    return (
      // main container; takes 1/4 of screen for filter orientation
      <main
        className={`md:w-1/4 ${isDialogOpen ? "block" : "hidden md:block"}`}
      >
        <h1 className="mb-4 ml-3.5 text-xl font-bold text-gray-900">Filter</h1>

        {/* colorFilter  */}
        {colorFilters && (
          <Disclosure as="div" className="border-t border-gray-200 py-4">
            {({ open }) => (
              <>
                <Disclosure.Button className="text-md flex w-full justify-between px-4 py-2 font-bold text-gray-500 hover:text-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                  <span>{colorFilters.name}</span>
                  <ChevronIcon isOpen={open} />
                </Disclosure.Button>
                <Disclosure.Panel className="pb-2 pt-4 text-sm text-gray-500">
                  <div className="ml-2 grid grid-cols-3 gap-1">
                    {colorFilters.options.map((option, idx) => (
                      <div
                        key={idx}
                        className="mb-2 flex flex-col items-center justify-center hover:opacity-70"
                      >
                        {isColorFilterOption(option) && (
                          <>
                            {/* circled color options */}
                            <div
                              className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-full`}
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
                              {/* custom checkmark */}
                              {option.checked && (
                                <svg
                                  className="h-6 w-6 fill-current text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 2 18 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5 11l2 2 6-6 2 2-8 8-4-4"
                                    clipRule="evenodd"
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
                                  />
                                </svg>
                              )}
                            </div>
                            <label
                              htmlFor={`${colorFilters.id}-${option.value}-${idx}`}
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

        {/* filter for category, gender, size, by price */}
        {otherFilters.map((filter, idx) => (
          <Disclosure
            key={idx}
            as="div"
            className="border-t border-gray-200 py-4"
          >
            {({ open }) => (
              <>
                <Disclosure.Button className="text-md flex w-full justify-between px-4 py-2 font-bold text-gray-500 hover:text-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                  <span>{filter.name}</span>
                  <ChevronIcon isOpen={open} />
                </Disclosure.Button>
                <Disclosure.Panel className="pb-2 pt-4 text-sm text-gray-500">
                  <div>
                    {filter.options.map((option, idx) => (
                      <div
                        key={idx}
                        className="ml-2 flex items-center justify-start space-x-3 py-1"
                      >
                        <input
                          type="checkbox"
                          checked={option.checked}
                          onChange={() =>
                            handleFilterChange(filter.id, option.value)
                          }
                          id={`${filter.id}-${option.value}-${idx}`}
                          className="hidden"
                        />
                        <label
                          htmlFor={`${filter.id}-${option.value}-${idx}`}
                          className="flex cursor-pointer items-center"
                        >
                          {/* custom checkbox */}
                          <span
                            className={`mr-2 flex h-5 w-5 items-center justify-center rounded border-2 ${
                              option.checked
                                ? "border-gray-700 bg-gray-700"
                                : "border border-gray-400 bg-white"
                            }`}
                          >
                            {option.checked && (
                              <svg
                                className="h-6 w-6 fill-current text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="1 2 15 20"
                              >
                                <path d="M5 11l2 2 6-6 2 2-8 8-4-4" />
                              </svg>
                            )}
                          </span>
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

        {/* shoes size filter */}
        {shoesSizeFilters && (
          <Disclosure as="div" className="border-t border-gray-200 py-4">
            {({ open }) => (
              <>
                <Disclosure.Button className="text-md flex w-full justify-between px-4 py-2 font-bold text-gray-500 hover:text-gray-900 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                  <span>{shoesSizeFilters.name}</span>
                  <ChevronIcon isOpen={open} />
                </Disclosure.Button>
                <Disclosure.Panel className="pb-2 pt-4 text-sm text-gray-500">
                  <div className="grid grid-cols-3 gap-2 px-4">
                    {shoesSizeFilters.options.map((option, idx) => (
                      // custom checkbox
                      <button
                        key={idx}
                        className={`rounded-md border px-4 py-2 ${
                          option.checked ? "bg-gray-700 text-white" : "bg-white"
                        }`}
                        onClick={() =>
                          handleFilterChange(shoesSizeFilters.id, option.value)
                        }
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        )}

        {/* reset button for desktop */}
        <button
          onClick={resetFilters}
          className={`relative ml-2.5 mt-10 hidden h-10 overflow-hidden rounded-full bg-gray-700 px-4 py-1 text-white transition-all duration-200 hover:bg-gray-600 hover:ring-offset-2 active:ring-2 active:ring-neutral-800 md:block`}
        >
          Reset
        </button>
      </main>
    );
  }

  // mobile UI
  return (
    <div className="p-4">
      {/* filter button for mobile */}
      <button
        onClick={toggleDialog}
        className="fixed right-4 top-8 inline-flex items-center justify-center rounded-full border border-gray-300 px-3 py-1 font-medium text-gray-700 hover:border-gray-700 active:scale-95 md:hidden"
      >
        <AdjustmentsHorizontalIcon
          className="mr-2 h-6 w-6"
          aria-hidden="true"
        />
        Filter
      </button>

      {/* drawer effect  */}
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
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-[90vh] w-screen max-w-sm flex-col overflow-y-auto rounded-lg bg-white px-2 py-4 shadow-xl">
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
      {!isDialogOpen && <>{renderFilters()}</>}
    </div>
  );
};

export { Filter };
