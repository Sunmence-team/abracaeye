import React from "react";
import { CiSearch } from "react-icons/ci";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useUser } from '../../context/UserContext';
import { FaRegUserCircle } from 'react-icons/fa';

const TopNav: React.FC = () => {
  const { isLoggedIn, user } = useUser()
  const firstName = user?.name?.split(" ")?.[0]
  const lastName = user?.name?.split(" ")?.[1]
  const userInitials = `${firstName?.split("")[0].toUpperCase()}${lastName ? lastName?.split("")[0].toUpperCase() : ''}`

  return (
    <header className="flex flex-col">
      <nav className="flex justify-between">
        <Link to={"/"} className="flex items-center gap-6">
          <div className="w-[35px] lg:w-[177px] h-[35px] lg:h-[50px]">
            <img
              src={assets.logo}
              alt="logo"
              className="w-full h-full object-contain lg:block hidden"
            />
            <img
              src={assets.logo2}
              alt="logo"
              className="w-full h-full object-contain block lg:hidden"
            />
          </div>
          <div className="hidden lg:flex flex-col">
            <h3 className="text-black font-semibold text-[18px] capitalize">Hi, {firstName}</h3>
            <h5 className="text-light-red font-medium text-xs">
              Ready to feed some eyes?
            </h5>
          </div>
        </Link>
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
            <div className="w-[30px] lg:w-10 h-[35px] lg:h-10" title="Market place coming soon">
              <img
                src={assets.health}
                alt="logo"
                className="w-full h-full cursor-pointer object-cover"
              />
            </div>
            <Link to={"/dashboard/profile"} className="w-9 lg:w-10 cursor-pointer h-9 lg:h-10 uppercase flex items-center ring-2 ring-dark-red/20 font-bold bg-dark-red text-white text-center rounded-full justify-center p-2">
              {!isLoggedIn ? (
                <span><FaRegUserCircle size={20}/></span>
              ) : <span>{userInitials}</span>}
            </Link>
          </div>
        </div>
      </nav>
      
    </header>
  );
};

export default TopNav;
