'use client'; // Remove if not using Next.js App Router

import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assessts'
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string>('/about');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navItems = [
    { label: 'Blog', href: '/about' },
    { label: 'Marketplace', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ];

  // Lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLinkClick = (href: string) => {
    setActiveLink(href);
    setIsOpen(false);
  };

  return (
    <>
      {/* ==================== MAIN NAVBAR ==================== */}
      <nav className="
        fixed top-4 left-1/2 -translate-x-1/2
        w-[92%] max-w-4xl
        bg-white backdrop-blur-xl border border-white/20
        rounded-full py-3 px-5 md:px-7
        flex items-center justify-between
        shadow-xl shadow-black/5
        z-50
        transition-all duration-300
        hover:shadow-2xl hover:shadow-black/10
      ">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img src={assets.logo} className="w-22 md:w-26" alt="Logo" />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10">
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

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="
            md:hidden p-2.5 rounded-full
            bg-gradient-to-br from-dark-red/10 to-dark-red/5
            hover:from-dark-red/20 hover:to-dark-red/10
            transition-all duration-300
            group
          "
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6">
            <Menu
              size={24}
              className={`absolute inset-0 text-dark-red transition-all duration-300
                ${isOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`}
            />
            <X
              size={24}
              className={`absolute inset-0 text-dark-red transition-all duration-300
                ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`}
            />
          </div>
        </button>
      </nav>

      {/* ==================== MOBILE MENU (Top Slide) ==================== */}
      <div
        className={`
          fixed inset-x-0 top-0 z-40
          transition-all duration-500 ease-out
          ${isOpen ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-lg"
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Panel */}
        <div className="
          relative bg-white/95 backdrop-blur-2xl
          rounded-b-3xl shadow-2xl
          pt-24 pb-12 px-6
          flex flex-col items-center space-y-10
          border-b border-white/20
        ">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="
              absolute top-7 right-6 p-3 rounded-full
              bg-dark-red/10 hover:bg-dark-red/20
              transition-all duration-300
            "
          >
            <X size={26} className="text-dark-red" />
          </button>
          {/* Logo */}
          <img src={assets.logo} className="w-28 opacity-80" alt="Logo" />

          {/* Links */}
          <div className="flex flex-col items-center space-y-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.href);
                }}
                className={`
                  text-3xl font-semibold tracking-wider
                  transition-all duration-300
                  ${activeLink === item.href
                    ? 'text-dark-red scale-110'
                    : 'text-gray-800 hover:text-dark-red hover:scale-105'
                  }
                `}
              >
                {item.label}
              </a>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;