import Link from "next/link";
import React, { Fragment } from "react";

type Item = {
  text: string;
  href?: string;
};

interface BreadCrumbProps {
  items: Item[];
}

const BreadCrumb = ({ items }: BreadCrumbProps) => (
  <nav aria-label="Breadcrumb">
    <ol className="flex flex-wrap items-center gap-2">
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;

        return (
          <Fragment key={`${item.text}-${index}`}>
            <li className="flex items-center">
              <Link
                href={item.href ?? "#"}
                className={`pointer font-medium ${isLastItem ? "pointer-events-none text-gray-500" : "cursor-pointer font-semibold text-gray-950 underline-offset-2 hover:underline"}`}
                aria-current={isLastItem ? "page" : undefined}
                aria-label={!isLastItem ? `Go to ${item.text}` : undefined}
              >
                {item.text}
              </Link>
            </li>
            {index !== items.length - 1 && <>/</>}
          </Fragment>
        );
      })}
    </ol>
  </nav>
);

export { BreadCrumb };
