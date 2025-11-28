'use client';

import React, { useState } from 'react';
import { assets } from '../../assets/assessts';
import { Search, ShoppingBag } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const { isLoggedIn, user } = useUser()
  const [activeLink, setActiveLink] = useState<string>('/about');

  const navItems = [
    { label: 'Blog', href: '/about' },
    { label: 'Marketplace', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ];

  const firstName = user?.name.split(" ")?.[0]
  const lastName = user?.name.split(" ")?.[1]
  const userInitials = `${firstName?.split("")?.[0]}${lastName?.split("")?.[0]}`;

  return (
    <>
      <nav className="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 w-[90%] bg-white backdrop-blur-xl border border-white/20 rounded-full py-3 px-5 md:px-4 items-center justify-between shadow-xl shadow-black/5 z-50 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10">
        {/* Logo */}
        <div className="shrink-0">
          <img src={assets.logo} className="w-22 md:w-26" alt="Logo" />
        </div>

        <div className="flex items-center gap-8">
          {/* Links */}
          <div className="flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveLink(item.href);
                }}
                className={`
                  font-medium text-sm tracking-wide
                  transition-all duration-300
                  ${activeLink === item.href ? 'text-dark-red' : 'text-gray-700 hover:text-dark-red'}
                `}
              >
                {item.label}
              </a>
            ))}
          </div>
          <Link
            to={isLoggedIn ? "/dashboard/profile" : "/auth/login"}
            title={isLoggedIn ? "Dashboard" : "Log In"}
            className='cursor-pointer text-gray-700 hover:text-dark-red'
          >
            {
              !isLoggedIn 
                ? (
                <FaRegUserCircle size={20} />
              ) : (
                <div className="w-9 h-9 rounded-full bg-dark-red text-white flex items-center justify-center text-sm font-semibold ring-2 ring-dark-red/20">
                  {userInitials}
                </div>
              )
            }
          </Link>
        </div>
      </nav>

      <nav className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between px-5 py-4 z-50">
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

          <Link
            to={isLoggedIn ? "/dashboard/profile" : "/auth/login"}
            title={isLoggedIn ? "Dashboard" : "Log In"}
            className='cursor-pointer text-gray-700 hover:text-dark-red'
          >
            {
              !isLoggedIn 
                ? (
                <FaRegUserCircle size={20} />
              ) : (
                <div className="w-9 h-9 rounded-full bg-dark-red text-white flex items-center justify-center text-sm font-semibold ring-2 ring-dark-red/20">
                  {userInitials}
                </div>
              )
            }
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;