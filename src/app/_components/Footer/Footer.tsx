import React from "react";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="m-4 rounded-lg bg-white shadow dark:bg-gray-800">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-center gap-2 p-4 md:flex-row md:justify-between">
        <ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mt-0 dark:text-gray-400">
          <li>
            <a href="#" className="me-4 hover:underline md:me-6">
              About Us
            </a>
          </li>
          <li>
            <a href="#" className="me-4 hover:underline md:me-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact Us
            </a>
          </li>
        </ul>

        <span className="text-sm text-gray-500 sm:text-center">
          © {currentYear}{" "}
          <a href="/" className="hover:underline">
            Bazaar
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export { Footer };
