"use client";

import React, { useState } from "react";
import LogoImage from "~/assets/logo/bazaar-logo.png";
import { MobileSearchBar } from "../../SearchBar";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import { Favorites } from "../../Favorites";
import { CartIcon } from "../../CartIcon";

const MobileNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <nav className="flex w-full items-center justify-between px-4 text-black shadow-md lg:hidden ">
      <MobileSearchBar
        onSubmit={(searchTerm: string) => {
          alert(`Searching for ${searchTerm}...`);
        }}
      />
      <Link href="/" id="logo-container" className="ml-20">
        <Image src={LogoImage} alt={"bazaar-logo"} width={100} height={100} />
      </Link>
      <div
        id="right-side-actions-container"
        className="flex items-center justify-center gap-4"
      >
        <Favorites />
        <CartIcon />
        <Bars3Icon
          className="h-10 w-10 cursor-pointer rounded p-1 hover:bg-gray-100"
          onClick={() => setDrawerOpen(true)}
        />
      </div>

      <div
        id="mobile-drawer"
        className={`fixed right-0 top-0 z-10 min-h-dvh w-full transform shadow-lg transition-all duration-500 ${drawerOpen ? "translate-x-0" : "-translate-x-[-1536px]"} bg-white`}
      >
        <div
          id="header"
          className="flex items-center justify-center border-b border-black"
        >
          <Link href="/" id="logo-container">
            <Image
              src={LogoImage}
              alt={"bazaar-logo"}
              width={100}
              height={100}
            />
          </Link>
          <button
            onClick={() => setDrawerOpen(false)}
            className="fixed right-4 top-6 rounded p-1 hover:bg-gray-100"
          >
            <XMarkIcon className="h-8 w-8" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export { MobileNavbar };
