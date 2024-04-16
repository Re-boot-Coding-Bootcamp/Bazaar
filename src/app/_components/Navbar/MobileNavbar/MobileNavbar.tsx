import React, { useEffect, useRef, useState } from "react";
import { MobileSearchBar } from "../../SearchBar";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";

const MobileNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="w-full">
      <nav className="flex w-full items-center justify-between bg-slate-400 p-4 lg:hidden ">
        <MobileSearchBar
          onSubmit={(searchTerm: string) => {
            alert(`Searching for ${searchTerm}...`);
          }}
        />
        <Link href="" id="logo-container">
          <img
            alt="logo"
            className="h-11 w-96 object-contain"
            src="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg"
          />
        </Link>

        <Bars3Icon
          className="h-5 w-5 cursor-pointer"
          onClick={() => setDrawerOpen(true)}
        >
          open drawer
        </Bars3Icon>
      </nav>
      <div
        id="mobile-drawer"
        className={`fixed right-0 top-0 z-10 min-h-dvh w-[500px] bg-slate-600 ${drawerOpen ? "" : "hidden"} bg-white`}
      >
        <div style={{ position: "fixed", zIndex: 3, width: "100%" }}>
          <div className="logo" />
          <ul>
            <li key="1">Home</li>
            <li key="2">Custom Drawer</li>
            <li key="3">Contact Us</li>
          </ul>
        </div>
        <div
          className="site-layout"
          style={{ padding: "0 50px", marginTop: 64 }}
        >
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380 }}
          >
            <button onClick={() => setDrawerOpen(false)}>close drawer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MobileNavbar };
