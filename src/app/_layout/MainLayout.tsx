import React from "react";
import { Footer } from "../_components";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div id="navbar-container" className="w-full">
        <div className="h-28 w-full bg-black text-white">Fake Navbar</div>
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
