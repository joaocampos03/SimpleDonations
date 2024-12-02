import "../index.css";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext"; // Importing AuthContext

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext); // Using AuthContext

  const handleNavigation = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    logout(); // Calls the logout function from AuthContext
    navigate("/"); // Redirects to home after logout
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
                className="block w-full text-left px-4 py-2 hover:text-gray-500"
                onClick={() => handleNavigation("/")}
              >
                Home
              </button>
            </li>
            <li>
              <button
                className="hover:text-gray-500"
                onClick={() => handleNavigation("/doacoes")}
              >
                Doações Disponíveis
              </button>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-6">
          {!isAuthenticated ? (
            <button
              className="bg-indigo-600 text-white px-3 py-1 rounded-full  hover:bg-indigo-500 md:px-5 md:py-2"
              onClick={() => handleNavigation("/cadastro")}
            >
              Nova Conta
            </button>
          ) : (
            <button
              className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-400 md:px-5 md:py-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

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
              <button
                className="block w-full text-left px-4 py-2 hover:bg-slate-200"
                onClick={() => handleNavigation("/doacoes")}
              >
                Doações Disponíveis
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
