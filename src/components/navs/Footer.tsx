import React from 'react';
import { assets } from '../../assets/assessts';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black flex flex-col items-center">
      {/* Main Content */}
      <div className="w-[90%] py-8 md:py-10 lg:py-12">
        {/* White Subscription Card */}
        <div className="w-full bg-white p-6 md:p-8 lg:p-12 rounded-lg shadow-xl mb-8 md:mb-10 lg:mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-24 items-center">
            {/* Text */}
            <div className="flex flex-col gap-3 md:gap-4">
              <h3 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-gray-900">
                Subscribe for the daily Updates
              </h3>
              <p className="text-xs md:text-sm lg:text-sm text-gray-600 leading-relaxed">
                Stay informed and never miss out! Subscribe now to receive the latest
                news, insights, and updates delivered straight to your inbox every day.
              </p>
            </div>

            {/* Form */}
            <div className="w-full">
              <div className="w-full bg-[#EBEAEA]/50 p-3 md:p-4 lg:p-4 rounded-lg">
                <div className="flex w-full h-10 md:h-12 lg:h-10">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="
                      flex-1 h-full px-3 md:px-4 lg:px-4 py-2
                      border border-gray-300 rounded-lg
                      text-gray-700 placeholder-gray-500 text-xs md:text-sm lg:text-sm
                      focus:outline-none focus:ring-2 focus:ring-light-red/30 focus:border-light-red
                      transition-all duration-200
                    "
                  />
                  <button
                    className="
                      h-full px-4 md:px-8 lg:px-12 py-2
                      bg-light-red text-white font-medium text-xs md:text-sm lg:text-sm
                      rounded-lg
                      hover:bg-light-red/90
                      focus:outline-none focus:ring-2 focus:ring-light-red/30
                      transition-all duration-200
                      whitespace-nowrap shadow-sm
                    "
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="w-full flex flex-col md:flex-row justify-between gap-6 md:gap-8 lg:gap-0 text-white">
          {/* Logo + Description + Social */}
          <div className="w-full md:w-[40%] lg:w-[20%] flex flex-col gap-3 md:gap-4">
            <img src={assets.logo} className="w-24 md:w-28 lg:w-32" alt="Logo" />
            <p className="text-xs md:text-sm lg:text-xs leading-relaxed">
              Stay informed with the latest stories, insights, and updates from around the world.
            </p>
            <div className="flex gap-3 md:gap-4">
              <FaInstagram className="text-lg md:text-xl lg:text-base text-white hover:text-dark-red cursor-pointer transition-colors" />
              <FaFacebook className="text-lg md:text-xl lg:text-base text-white hover:text-dark-red cursor-pointer transition-colors" />
              <FaTwitter className="text-lg md:text-xl lg:text-base text-white hover:text-dark-red cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Nav Links */}
          <div className="flex flex-row gap-4 md:gap-6 lg:gap-8 text-xs md:text-sm lg:text-sm">
            <p className="hover:text-dark-red cursor-pointer transition-colors">Blog</p>
            <p className="hover:text-dark-red cursor-pointer transition-colors">Market Place</p>
            <p className="hover:text-dark-red cursor-pointer transition-colors">Contact Us</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full bg-dark-red flex items-center justify-center py-3 md:py-4 lg:py-4">
        <p className="text-white text-xs md:text-sm lg:text-xs font-bold">
          AbrayaBlogNews@2025 All rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;