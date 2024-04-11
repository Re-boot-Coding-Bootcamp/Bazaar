import React from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

type Item = {
  name: string;
  href?: string;
  current?: boolean;
};

interface BreadCrumbProps {
  items: Item[];
  onClick?: (item: Item) => void;
}

const BreadCrumb = ({ items, onClick }: BreadCrumbProps) => (
  <nav aria-label="Breadcrumb">
    <ol className="flex flex-wrap items-center space-x-1 md:space-x-3">
      {items.map((item, index) => (
        <li key={`${item.name}-${index}`} className="flex items-center">
          {index > 0 && (
            <ChevronRightIcon className="mx-1 h-3 w-3 text-gray-400 md:mx-3" />
          )}
          <a
            href={!item.current ? item.href ?? "#" : undefined}
            onClick={(e) => {
              if (item.current ?? item.href === undefined) {
                e.preventDefault();
              } else {
                onClick?.(item);
              }
            }}
            className={`text-sm font-medium ${item.current ? "text-cyan-600" : "text-gray-700"}`}
            aria-current={item.current ? "page" : undefined}
            aria-label={!item.current ? `Go to ${item.name}` : undefined}
            style={
              item.current ? { pointerEvents: "none", cursor: "default" } : {}
            }
          >
            {item.name}
          </a>
        </li>
      ))}
    </ol>
  </nav>
);

export { BreadCrumb };
