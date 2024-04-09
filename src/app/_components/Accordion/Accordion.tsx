import React, { useState } from "react";
import { AccordionItem } from "../AccordionItem";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import type { AccordionChild } from "~/types";

interface AccordionProps {
  items: AccordionChild[];
  expandAllOption?: boolean;
}

const Accordion = ({ expandAllOption, items, ...props }: AccordionProps) => {
  const [expandAllAccordionItems, setExpandAllAccordionItems] = useState(false);

  return (
    <div id="accordion-main-container" className="flex flex-col" {...props}>
      {expandAllOption && (
        <button
          id="expand-collapse-all"
          className="flex w-fit items-center justify-center gap-1"
          onClick={() => setExpandAllAccordionItems(!expandAllAccordionItems)}
        >
          <span className="text-sm font-bold underline underline-offset-4">
            {expandAllAccordionItems ? "Collapse All" : "Expand All"}
          </span>
          <span>
            {expandAllAccordionItems ? (
              <MinusIcon className="h-4 w-4" />
            ) : (
              <PlusIcon className="h-4 w-4" />
            )}
          </span>
        </button>
      )}
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          child={item}
          expandAllAccordionItems={expandAllAccordionItems}
        />
      ))}
    </div>
  );
};

export { Accordion };
