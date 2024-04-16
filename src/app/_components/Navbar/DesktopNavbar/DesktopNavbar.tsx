"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import LogoImage from "~/assets/logo/bazaar-logo.png";
import { DesktopSearchBar } from "~/app/_components/SearchBar";
import { Favorites } from "~/app/_components/Favorites";
import NavItem from "./NavItem";
import type { Category } from "@prisma/client";
import { CartIcon } from "../../CartIcon";

interface DesktopNavbarProps {
  categories: Category[];
}

const DesktopNavbar = ({ categories }: DesktopNavbarProps) => {
  return (
    <div
      id="navbar-container"
      className="mx-auto hidden w-full justify-center bg-white p-4 text-black shadow-md lg:flex"
    >
      <div
        id="xl-container"
        className="flex w-full max-w-screen-xl items-end gap-4"
      >
        <Link href="/" id="logo-container">
          <Image src={LogoImage} alt={"bazaar-logo"} width={100} height={100} />
        </Link>
        <div className="mb-2 flex w-full justify-between text-lg font-bold">
          <div id="nav-items-container" className="flex items-center gap-4">
            {categories.map((category) => (
              <NavItem category={category} key={category.id} />
            ))}
          </div>
          <div
            id="cart-and-search-container"
            className="flex items-center gap-4"
          >
            <DesktopSearchBar
              onSubmit={(searchTerm: string) => {
                console.log("searching for: ", searchTerm);
              }}
            />
            <Favorites />
            <CartIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export { DesktopNavbar };
