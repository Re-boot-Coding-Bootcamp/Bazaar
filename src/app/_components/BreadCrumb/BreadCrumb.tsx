import React from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

interface BreadCrumbProps {
  items: Array<{
    name: string;
    href?: string;
    current?: boolean;
    onClick?: () => void;
  }>;
}

const BreadCrumb = ({ items }: BreadCrumbProps) => (
  <nav aria-label="Breadcrumb">
    <ol className="flex flex-wrap items-center space-x-1 md:space-x-3">
      {items.map((item, index) => (
        <li key={`${item.name}-${index}`} className="flex items-center">
          {index > 0 && (
            <ChevronRightIcon className="mx-1 h-3 w-3 text-gray-400 md:mx-3" />
          )}
          <a
            href={item.current ? undefined : item.href ?? "#"}
            onClick={(e) => {
              if (item.href === undefined) {
                e.preventDefault();
                item.onClick && item.onClick();
              }
            }}
            className={`text-sm font-medium ${item.current ? "text-cyan-600" : "text-gray-700"}`}
            aria-current={item.current ? "page" : undefined}
            aria-label={!item.current ? `Go to ${item.name}` : undefined}
          >
            {item.name}
          </a>
        </li>
      ))}
    </ol>
  </nav>
);

export { BreadCrumb };
