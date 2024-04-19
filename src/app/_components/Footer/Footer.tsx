import Link from "next/link";
import React from "react";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="w-full bg-white shadow">
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-center gap-2 p-4">
        <span className="text-sm text-gray-500 sm:text-center">
          © {currentYear}{" "}
          <Link href="/" className="hover:underline">
            Bazaar
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export { Footer };
