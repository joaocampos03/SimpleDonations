import "../index.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Step 4: useNavigate hook

  const handleNavigation = (path) => {
    setIsOpen(false); // Optionally close the menu if it's open
    navigate(path);
  };

  return (
    <header className="bg-white fixed top-0 left-0 w-full z-10 shadow-md">
      <nav className="flex justify-between items-center w-[92%] mx-auto h-16">
        <div>
          <a
            className="text-2xl font-bold cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            SimpleDonations
          </a>
        </div>

        <div className="hidden md:flex nav-links duration-500">
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
            <li>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-slate-200"
                onClick={() => handleNavigation("/")}
              >
                Home
              </button>
            </li>
            <li>
              <a className="hover:text-gray-500" href="componentes">
                Comp. (Placeholder)
              </a>
            </li>
            <li>
              <a className="hover:text-gray-500" href="#">
                Contato
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-6">
          <button
            className="bg-[#a6c1ee] text-white px-3 py-1 rounded-full hover:bg-[#87acec] md:px-5 md:py-2"
            onClick={() => handleNavigation("/cadastro")}
          >
            Nova Conta
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-3xl cursor-pointer"
          >
            {isOpen ? (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden nav-links duration-500 absolute bg-white w-full left-0 top-16">
          <ul className="flex flex-col items-center">
            <li>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-slate-200"
                onClick={() => handleNavigation("/")}
              >
                Home
              </button>
            </li>
            <li>
              <a
                className="block w-full text-left px-4 py-2 hover:bg-slate-200"
                href="#"
              >
                About
              </a>
            </li>
            <li>
              <a
                className="block w-full text-left px-4 py-2 hover:bg-slate-200"
                href="#"
              >
                Services
              </a>
            </li>
            <li>
              <a
                className="block w-full text-left px-4 py-2 hover:bg-slate-200"
                href="#"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
