import React from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

const Sample = () => {
  return (
    <div className="container flex cursor-pointer items-center gap-1 rounded border border-black bg-neutral-50 p-2 hover:bg-neutral-100">
      <PaperAirplaneIcon className="h-5 w-5 text-green-500" />
      <span className="">Send</span>
    </div>
  );
};

export default Sample;
