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
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div id="navbar-container" className="w-full">
        <MobileNavbar categories={categories} />
        <DesktopNavbar categories={categories} />
      </div>
      <div id="content-container" className="w-full">
        {children}
      </div>
      <div id="footer-container" className="w-full">
        <Footer />
      </div>
    </main>
  );
};

export { MainLayout };
