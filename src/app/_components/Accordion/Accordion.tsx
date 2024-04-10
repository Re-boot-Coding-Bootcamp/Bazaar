import React, { useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import type { AccordionItemType } from "~/types";
import { AccordionItem } from "./AccordionItem";

interface AccordionProps {
  items: AccordionItemType[];
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
          item={item}
          expandAllAccordionItems={expandAllAccordionItems}
        />
      ))}
    </div>
  );
};

export { Accordion };
