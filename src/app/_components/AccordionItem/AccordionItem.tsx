import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React, {  ReactNode, useEffect, useState } from "react";

interface Child {
  title: string;
  content: ReactNode;
}

interface AccordionItemProps {
  child: Child;
  expandAllAccordionItems: boolean;
}
const AccordionItem = ({
  child,
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
        <span id="accordion-title" className="my-2">
          {child.title}
        </span>
        <span id="accordion-actions-icon">
          <ChevronDownIcon
            className={`h-5 w-5 ${accordionOpen ? "rotate-180 transition-transform duration-500" : "rotate-0 transition-transform duration-300"}`}
          />
        </span>
      </button>
      <div
        id="accordion-content-container"
        className={`grid overflow-hidden text-sm text-slate-600 transition-all duration-500 ease-in-out ${accordionOpen ? `grid-rows-[1fr] opacity-100` : `grid-rows-[0fr] opacity-0`}`}
      >
        <div id="accordion-content" className={`overflow-hidden`}>
          {child.content}
        </div>
      </div>
    </div>
  );
};

export { AccordionItem };
