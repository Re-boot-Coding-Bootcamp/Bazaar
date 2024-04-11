import React from "react";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="flex w-full justify-center">
      <span className="text-sm text-gray-500 sm:text-center">
        © {currentYear}{" "}
        <a href="https://vans.com/" className="hover:underline">
          Bazaar
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
};

export { Footer };
