"use client";

import React, { type Dispatch, type SetStateAction, useState } from "react";
import LogoImage from "~/assets/logo/bazaar-logo.png";
import { MobileSearchBar } from "../../SearchBar";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import { Favorites } from "../../Favorites";
import { CartIcon } from "../../CartIcon";
import type { Category } from "@prisma/client";

interface MobileNavbarProps {
  categories: Category[];
}

const MobileNavbar = ({ categories }: MobileNavbarProps): JSX.Element => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <nav className="flex w-full items-center justify-between px-4 text-black shadow-md lg:hidden">
      <MobileSearchBar
        onSubmit={(searchTerm: string) => {
          alert(`Searching for ${searchTerm}...`);
        }}
      />
      <Link href="/" id="logo-container" className="ml-[84px]">
        <Image
          src={LogoImage}
          alt={"bazaar-logo"}
          width={60}
          height={60}
          onClick={() => setDrawerOpen(false)}
        />
      </Link>
      <div
        id="right-side-actions-container"
        className="flex items-center justify-center gap-1"
      >
        <Favorites />
        <CartIcon />
        <Bars3Icon
          className="h-8 w-8 cursor-pointer rounded p-1 hover:bg-gray-100 md:h-10 md:w-10"
          onClick={() => setDrawerOpen(true)}
        />
      </div>
      <Drawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        categories={categories}
      />
    </nav>
  );
};

export { MobileNavbar };

interface DrawerProps {
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
  categories: Category[];
}

const Drawer = ({ drawerOpen, setDrawerOpen, categories }: DrawerProps) => {
  return (
    <div
      id="mobile-drawer"
      className={`fixed right-0 top-0 z-30 min-h-dvh w-full transform shadow-lg transition-all duration-300 ${drawerOpen ? "translate-x-0" : "-translate-x-[-1536px]"} bg-white`}
    >
      <div
        id="header"
        className="flex items-center justify-center border-b border-black"
      >
        <Link href="/" id="logo-container" onClick={() => setDrawerOpen(false)}>
          <Image src={LogoImage} alt={"bazaar-logo"} width={60} height={60} />
        </Link>
        <button
          onClick={() => setDrawerOpen(false)}
          className="fixed right-4 top-3 rounded p-1 hover:bg-gray-100"
        >
          <XMarkIcon className="h-8 w-8" />
        </button>
      </div>
      {categories.map((category) => (
        <Link
          key={category.id}
          onClick={() => setDrawerOpen(false)}
          href={`/product-list/${category.id}`}
        >
          <div className="border-b border-black p-4 text-lg font-medium">
            {category.name}
          </div>
        </Link>
      ))}
    </div>
  );
};
