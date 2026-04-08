import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { navItems } from "../../lib/items";
import { useUser } from "../../context/UserContext";
import { MdLogout } from "react-icons/md";

const SideBar: React.FC = () => {
  const { logout, user } = useUser();
  const location = useLocation();

  const filteredLinks = navItems.filter((item) =>
    item.role?.includes(user?.role ?? ""),
  );

  return (
    <motion.div className="bg-black w-full h-full py-8 px-4 flex flex-col justify-between gap-6">
      <div className="flex flex-col gap-4">
        {filteredLinks.map((navItem, idx) => {
          const isActive =
            location.pathname === navItem.pathName ? true : false;
          return (
            <NavLink
              to={navItem.pathName}
              className={`${
                isActive
                  ? "text-light-red bg-white"
                  : "text-white hover:bg-white hover:text-light-red transition-colors flex items-center"
              } cursor-pointer flex items-center gap-2 h-10 px-4 rounded-md text-xs`}
              key={idx}
            >
              {<navItem.icon />}
              <span className="">{navItem?.altName}</span>
            </NavLink>
          );
        })}
      </div>
      <button
        type="button"
        className={`h-10 text-xs gap-2 text-white hover:text-light-red hover:bg-white px-4 rounded-md transition-colors flex items-center cursor-pointer`}
        onClick={logout}
      >
        <MdLogout />
        <span>Logout</span>
      </button>
    </motion.div>
  );
};

export default SideBar;