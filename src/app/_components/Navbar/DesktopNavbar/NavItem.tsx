import type { Category } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavItemProps {
  category: Category;
  children?: React.ReactNode;
}

const NavItem = ({ category, children }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname.includes(category.id);

  return (
    <Link
      href={`/product-list/${category.id}`}
      className="group relative box-border"
      id="nav-item-container"
    >
      <p
        className={`cursor-pointer border-b-2 hover:border-black ${isActive ? "border-black" : "border-transparent"}`}
      >
        {category.name}
      </p>
      {children && (
        <div
          className="absolute z-10 hidden w-48 bg-white p-2 shadow-lg group-hover:block"
          id="nav-item-dropdown"
        >
          {children}
        </div>
      )}
    </Link>
  );
};

export default NavItem;
