"use client";

import React, { Fragment, useState, useCallback } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import {
  resetFilters,
  selectFilters,
  updateFilters,
  useAppDispatch,
  useAppSelector,
} from "~/lib";

interface ChevronIconProps {
  isOpen: boolean;
}

const ChevronIcon: React.FC<ChevronIconProps> = ({ isOpen }) => {
  return (
    <ChevronDownIcon
      className={`h-5 w-5 transition-transform duration-200 ${
        isOpen ? "rotate-180 text-red-500" : "rotate-0 text-black"
      }`}
    />
  );
};

export const Filter: React.FC<{ mobileButton?: boolean }> = ({
  mobileButton = false,
}) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFilterChange = useCallback(
    (filterId: string, optionValue: string) => {
      dispatch(updateFilters({ filterId, optionValue }));
    },
    [dispatch],
  );

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const applyFiltersAndCloseDrawer = () => {
    setIsDialogOpen(false);
  };

  function renderFilters() {
    const colorFilters = filters.find((filter) => filter.id === "color");

    const otherFilters = filters.filter(
      (filter) => filter.id !== "color" && filter.id !== "shoes size",
    );

    return (
      <div className={`${isDialogOpen ? "block" : "hidden md:block"}`}>
        <h1 className="mb-4 text-xl font-bold text-gray-900">Filter</h1>

        {/* filter for category, gender, size, by price */}
        {otherFilters.map((filter, idx) => (
          <Disclosure
            key={idx}
            as="div"
            className="border-t border-gray-200 py-4"
          >
            {({ open }) => (
              <>
                <Disclosure.Button className="text-md flex w-full justify-between px-4 py-2 font-bold text-black hover:text-gray-500 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                  <span>{filter.name}</span>
                  <ChevronIcon isOpen={open} />
                </Disclosure.Button>
                <Disclosure.Panel className="pb-2 pt-4 text-sm text-gray-900">
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
                                ? "border-black bg-black"
                                : "border border-black bg-white"
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

        {colorFilters && (
          <Disclosure as="div" className="border-t border-gray-200 py-4">
            {({ open }) => (
              <>
                <Disclosure.Button className="text-md flex w-full justify-between px-4 py-2 font-bold text-black hover:text-gray-500 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                  <span>{colorFilters.name}</span>
                  <ChevronIcon isOpen={open} />
                </Disclosure.Button>
                <Disclosure.Panel className="pb-2 pt-4 text-sm text-black">
                  <div className="ml-2 grid grid-cols-2 gap-1">
                    {colorFilters.options.map((option, idx) => (
                      <div
                        key={idx}
                        className="mb-2 flex flex-col items-center justify-center hover:opacity-70"
                      >
                        {option.color && (
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
                                      option.checkmarkColor ?? "currentColor"
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

        {/* reset button for desktop */}
        <button
          onClick={() => dispatch(resetFilters())}
          className={`relative ml-2.5 mt-10 hidden h-10 overflow-hidden rounded-full bg-black px-4 py-1 text-white transition-all duration-200 hover:bg-gray-600 hover:ring-offset-2 active:ring-2 active:ring-neutral-800 md:block`}
        >
          Reset
        </button>
      </div>
    );
  }

  // mobile UI
  return (
    <>
      {mobileButton && (
        <button onClick={toggleDialog} id="filter-button" className="md:hidden">
          <AdjustmentsHorizontalIcon
            className="h-7 w-7 hover:text-gray-400"
            aria-hidden="true"
          />
        </button>
      )}

      {/* drawer effect  */}
      <Transition.Root show={isDialogOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toggleDialog}>
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
                      onClick={() => dispatch(resetFilters())}
                      className="mt-4 w-[120px] rounded-lg bg-black px-4 py-2 text-sm text-white active:scale-95"
                    >
                      Reset
                    </button>
                    <button
                      onClick={applyFiltersAndCloseDrawer}
                      className="mt-4 w-[120px] rounded-lg border-2 border-gray-900 px-3 py-1 text-black active:scale-95"
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
      {!isDialogOpen && mobileButton === false && <>{renderFilters()}</>}
    </>
  );
};
