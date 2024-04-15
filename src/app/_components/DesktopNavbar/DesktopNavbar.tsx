import { Popover } from "@headlessui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import React from "react";

const DesktopNavbar = () => {
  return (
    <div id="navbar-container" className="h-full w-full p-6 text-black">
      <div className="flex items-center gap-10">
        <p className="text-5xl">Bazaar</p>
        <div className="mt-4 flex space-x-6 text-xl font-bold ">
          <Popover className="relative">
            <Popover.Button>
              <a href="#" className="hover:underline">
                Shoes
              </a>
            </Popover.Button>
            <Popover.Panel className="fixed size-80  bg-stone-300">
              Nike
            </Popover.Panel>
          </Popover>
          <Popover className="relative">
            <Popover.Button>
              <a href="#" className="hover:underline">
                Clothing
              </a>
            </Popover.Button>
            <Popover.Panel className="absolute size-80 bg-stone-300">
              Adidas
            </Popover.Panel>
          </Popover>
          <Popover className="relative">
            <Popover.Button>
              <a href="#" className="hover:underline">
                Accessories
              </a>
            </Popover.Button>
            <Popover.Panel className="absolute size-80 bg-stone-300">
              Bottle
            </Popover.Panel>
          </Popover>
          <Popover className="relative">
            <Popover.Button>
              <a href="#" className="hover:underline">
                Customs
              </a>
            </Popover.Button>
            <Popover.Panel className="absolute size-80 bg-stone-300">
              Nike
            </Popover.Panel>
          </Popover>
          <Popover className="relative">
            <Popover.Button>
              <a href="#" className="hover:underline">
                SALE
              </a>
            </Popover.Button>
            <Popover.Panel className="absolute size-80 bg-stone-300">
              Nike
            </Popover.Panel>
          </Popover>
        </div>
        <button className="ml-7 mt-3">
          <ShoppingCartIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default DesktopNavbar;
