"use server";

import React from "react";
import { DesktopNavbar, Footer, MobileNavbar } from "../_components";
import { api } from "~/trpc/server";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = async ({ children }: MainLayoutProps) => {
  const categories = await api.category.getAllCategories();

  return (
    <main id="main-container" className="flex min-h-screen flex-col">
      <div id="navbar-container" className="sticky top-0 z-50 h-full w-full">
        <MobileNavbar categories={categories} />
        <DesktopNavbar categories={categories} />
      </div>
      <div
        id="content-container"
        className="flex w-full flex-grow flex-col items-center px-4"
      >
        {children}
      </div>
      <div id="footer-container" className="w-full">
        <Footer />
      </div>
    </main>
  );
};

export { MainLayout };
