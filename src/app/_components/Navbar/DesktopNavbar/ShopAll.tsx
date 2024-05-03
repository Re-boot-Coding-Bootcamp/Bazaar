import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { resetFiltersAndSortBy, useAppDispatch } from "~/lib";

const ShopAll = () => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const isActive = pathname === "/product-list/all";

  return (
    <Link
      href={`/product-list/all`}
      className="group relative box-border"
      id="nav-item-container"
      onClick={() => {
        dispatch(resetFiltersAndSortBy());
      }}
    >
      <p
        className={`cursor-pointer border-b-2 hover:border-black ${isActive ? "border-black" : "border-transparent"}`}
      >
        Shop All
      </p>
    </Link>
  );
};

export default ShopAll;
