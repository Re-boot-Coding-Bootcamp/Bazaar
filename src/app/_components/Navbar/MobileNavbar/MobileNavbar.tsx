"use client";

import React, { useState } from "react";
import LogoImage from "~/assets/logo/bazaar-logo.png";
import { MobileSearchBar } from "../../SearchBar";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";

const MobileNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <nav className="flex w-full items-center justify-between px-4 text-black shadow-md lg:hidden ">
      <MobileSearchBar
        onSubmit={(searchTerm: string) => {
          alert(`Searching for ${searchTerm}...`);
        }}
      />
      <Logo />
      <Bars3Icon
        className="h-6 w-6 cursor-pointer"
        onClick={() => setDrawerOpen(true)}
      />
      <div
        id="mobile-drawer"
        className={`fixed right-0 top-0 z-10 min-h-dvh w-full transform bg-slate-600 bg-white shadow-lg transition-all duration-500 ${drawerOpen ? "translate-x-0" : "-translate-x-[-1536px]"} bg-white`}
      >
        <div
          id="header"
          className="flex items-center justify-center border-b border-black"
        >
          <Logo />
        </div>
        <button
          onClick={() => setDrawerOpen(false)}
          className="fixed right-4 top-6 rounded p-1 hover:bg-gray-100"
        >
          <XMarkIcon className="h-8 w-8" />
        </button>
      </div>
    </nav>
  );
};

export { MobileNavbar };

const Logo = () => {
  return (
    <Link href="/" id="logo-container">
      <Image src={LogoImage} alt={"bazaar-logo"} width={100} height={100} />
    </Link>
  );
};
