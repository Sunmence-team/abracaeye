import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import { motion } from "framer-motion";
import { navItems } from "../../lib/items";

const SideBar: React.FC = () => {
  const location = useLocation();
  return (
    <motion.div className="bg-black rounded-full h-[75vh] py-4 px-2 flex flex-col gap-6">
      {navItems.map((navItem, idx) => {
        const isActive = location.pathname === navItem.pathName ? true : false;
        return (
          <NavLink
            to={navItem.pathName}
            className={`${
              isActive
                ? "text-light-red"
                : "text-white hover:text-light-red transition-colors flex items-center"
            } cursor-pointer`}
            key={idx}
          >
            <div
              className={`${
                isActive ? "bg-white" : "hover:bg-white"
              } p-2 rounded-full text-[30px] animation`}
            >
              {<navItem.icon />}
            </div>
          </NavLink>
        );
      })}
    </motion.div>
  );
};

export default SideBar;
