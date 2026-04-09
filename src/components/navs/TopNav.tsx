import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { FaRegUserCircle } from "react-icons/fa";
import { globals } from "../../constants";

const TopNav: React.FC = () => {
  const { isLoggedIn, user } = useUser();
  const firstName = user?.name?.split(" ")?.[0];
  const lastName = user?.name?.split(" ")?.[1];
  const userInitials = `${firstName?.split("")[0].toUpperCase()}${lastName ? lastName?.split("")[0].toUpperCase() : ""}`;

  return (
    <header className="w-full flex justify-between">
      <Link to={"/"} className="flex items-center gap-6">
        <div className="w-[35px] lg:w-[122px] h-[35px] lg:h-[50px]">
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
        <h3 className="hidden lg:inline-block text-black font-semibold text-[18px] capitalize">
          Hi, {firstName}
        </h3>
      </Link>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          <Link
            to={globals.marketPlaceURl}
            className="w-[30px] h-[35px]"
            title="Visit Our MarketPlace"
          >
            <img
              src={assets.health}
              alt="logo"
              className="w-full h-full cursor-pointer object-cover"
            />
          </Link>
          <Link
            to={"/dashboard/profile"}
            className="w-9 cursor-pointer h-9 uppercase flex items-center ring-2 ring-dark-red/20 font-bold bg-dark-red text-white text-center rounded-full justify-center p-2"
          >
            {!isLoggedIn ? (
              <span>
                <FaRegUserCircle size={20} />
              </span>
            ) : (
              <span>{userInitials}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
