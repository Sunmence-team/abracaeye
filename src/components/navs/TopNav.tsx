import React from "react";
import { CiSearch } from "react-icons/ci";
import { assets } from "../../assets/assets";

const TopNav: React.FC = () => {
  return (
    <header>
      <nav className="flex justify-between">
        <div className="flex items-center gap-6">
          <div className="w-[177px] h-[50px]">
            <img
              src={assets.logo}
              alt="logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-black font-semibold text-[20px]">Hi, Alabi</h3>
            <h5 className="text-light-red font-medium text-sm">
              Ready to feed some eyes?
            </h5>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="hidden lg:flex text-black items-center justify-between px-5 gap-15 rounded-full border border-light-red">
            <input
              type="text"
              placeholder="Search"
              className="py-2 border-none outline-0"
            />
            <CiSearch />
          </div>
          <div className="flex items-center gap-1">
            <div className="w-[45px] h-[45px]">
              <img
                src={assets.health}
                alt="logo"
                className="w-full h-full cursor-pointer object-contain"
              />
            </div>
            <div className="w-10 cursor-pointer h-10 uppercase flex items-center border border-dark-red font-bold text-dark-red text-center rounded-full justify-center p-2">
              <span>ba</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default TopNav;
