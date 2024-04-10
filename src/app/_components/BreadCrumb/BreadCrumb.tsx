import React from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

const BreadCrumb = () => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <a
            href="#"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-cyan-600"
          >
            <ChevronRightIcon className="h-4 w-4 text-gray-800  " />
            Home
          </a>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRightIcon className="h-4 w-4 text-gray-800  " />
            <a
              href="#"
              className="ms-1 text-sm font-medium text-gray-700 hover:text-cyan-600 "
            >
              Projects
            </a>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <ChevronRightIcon className="h-4 w-4 text-gray-800  " />
            <span className="ms-1 text-sm font-medium text-cyan-600">
              Flowbite
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
};

export { BreadCrumb };
