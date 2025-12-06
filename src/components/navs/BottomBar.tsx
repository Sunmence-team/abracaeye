import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { navItems } from "../../lib/items";
import { useUser } from "../../context/UserContext";


// interface UserRoles {
//   vendor: boolean;
//   blog: boolean;
// }

const BottomNav: React.FC = () => {
  const { user } = useUser(); 
  const location = useLocation();

  const filteredLinks = navItems.filter(item => item.role?.includes(user?.role ?? ""))

  const userRoles = ["all"];
  if (user?.vendor) {
    userRoles.push("vendor");
  }
  if (user?.blog) {
    userRoles.push("blog");
  }

  return (
    <motion.div className="fixed z-999 bottom-0 left-0 w-full bg-black flex justify-around items-center rounded-t-4xl py-2 shadow-lg">
      {filteredLinks.map((navItem, idx) => {
        const isActive = location.pathname === navItem.pathName ? true : false;
        return (
          <NavLink
            to={navItem.pathName}
            key={idx}
            className={`flex flex-col items-center justify-center text-sm transition-colors ${
              isActive
                ? "text-light-red my-0"
                : "text-white transition-colors my-2 flex items-center"
            }`}
          >
            <motion.div
              className={`p-2 rounded-full text-[24px] ${
                isActive ? "bg-white" : "hover:bg-white hover:text-light-red"
              } animation`}
            >
              {<navItem.icon size={15} />}
            </motion.div>
            <span className="mt-1 font-semibold text-xs">
              {navItem.altName || navItem.name}
            </span>
          </NavLink>
        );
      })}
    </motion.div>
  );
};

export default BottomNav;