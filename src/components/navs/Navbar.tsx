"use client";

import React, { useState } from "react";
import { assets } from "../../assets/assessts";
import { Search, ShoppingBag } from "lucide-react";
import { useUser } from "../../context/UserContext";
import { Link, NavLink } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar: React.FC = () => {
  const { isLoggedIn, user, logout } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navItems = [
    { label: "Blog", href: "/blogs" },
    { label: "Marketplace", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  const firstName = user?.name?.split(" ")?.[0];
  const lastName = user?.name?.split(" ")?.[1];
  const userInitials =
    `${firstName?.split("")?.[0].toUpperCase() ?? "0"}${
      lastName ? lastName?.split("")[0].toUpperCase() ?? "0" : ""
    }` || "00";

  return (
    <>
      <nav className="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 w-[90%] bg-white backdrop-blur-xl border border-white/20 rounded-full py-3 px-5 md:px-4 items-center justify-between shadow-xl shadow-black/5 z-50 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10">
        {/* Logo */}
        <Link to={"/"} className="shrink-0">
          <img src={assets.logo} className="w-22 md:w-26" alt="Logo" />
        </Link>

        <div className="flex items-center gap-8">
          {/* Links */}
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                to={item.href}
                key={item.href}
                className={({ isActive }) => `
                  font-medium text-sm tracking-wide
                  transition-all duration-300
                  ${
                    isActive
                      ? "text-dark-red"
                      : "text-gray-700 hover:text-dark-red"
                  }
                `}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <Link
            to={isLoggedIn ? "/dashboard/profile" : "/auth/login"}
            title={isLoggedIn ? "Dashboard" : "Log In"}
            className="cursor-pointer text-gray-700 hover:text-dark-red"
          >
            {!isLoggedIn ? (
              <FaRegUserCircle size={20} />
            ) : (
              <div className="w-9 h-9 rounded-full bg-dark-red text-white flex items-center justify-center text-sm font-semibold ring-2 ring-dark-red/20">
                {userInitials}
              </div>
            )}
          </Link>
        </div>
      </nav>

      <nav className="md:hidden fixed top-0 left-2 right-0 flex items-center justify-between px-5 py-3 bg-white rounded-full shadow mt-3 w-100 z-60">
        {/* Logo Left */}
        <div className="shrink-0">
          <img src={assets.logo2} className="w-10" alt="Logo" />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button className="rounded-full hover:bg-gray-100 transition-colors">
            <Search size={22} className="text-dark-red" />
          </button>

          {/* Marketplace */}
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <ShoppingBag size={22} className="text-dark-red" />
          </button>

          {!isLoggedIn ? (
            <Link
              to="/auth/login"
              title="Log In"
              className="cursor-pointer text-gray-700 hover:text-dark-red"
            >
              <FaRegUserCircle size={20} />
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-9 h-9 rounded-full bg-dark-red text-white flex items-center justify-center text-sm font-semibold ring-2 ring-dark-red/20 cursor-pointer outline-none"
              >
                {userInitials}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-1 border border-gray-100 z-60">
                  <Link
                    to="/dashboard/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
