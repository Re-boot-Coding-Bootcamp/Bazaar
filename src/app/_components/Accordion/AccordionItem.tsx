"use client";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import type { AccordionItemType } from "~/types";

interface AccordionItemProps {
  item: AccordionItemType;
  expandAllAccordionItems: boolean;
}

const AccordionItem = ({
  item,
  expandAllAccordionItems,
}: AccordionItemProps) => {
  const [accordionOpen, setAccordionOpen] = useState(false);
  useEffect(() => {
    setAccordionOpen(expandAllAccordionItems);
  }, [expandAllAccordionItems]);

  return (
    <div className="container border-b border-solid border-black  py-2">
      <button
        id="accordion-item"
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex w-full items-center justify-between"
      >
        <span
          id="accordion-title"
          className="my-2"
          aria-label={
            typeof item.title === "string" ? `${item.title}` : undefined
          }
        >
          {item.title}
        </span>
        <span id="accordion-actions-icon">
          <ChevronDownIcon
            className={`h-5 w-5 ${accordionOpen ? "rotate-180 transition-transform duration-200" : "rotate-0 transition-transform duration-200"}`}
          />
        </span>
      </button>
      <div
        id="accordion-content-container"
        className={`grid overflow-hidden transition-all duration-200 ease-in-out ${accordionOpen ? `grid-rows-[1fr] opacity-100` : `grid-rows-[0fr] opacity-0`}`}
      >
        <div id="accordion-content" className={`overflow-hidden`}>
          {item.content}
        </div>
      </div>
    </div>
  );
};

export { AccordionItem };
