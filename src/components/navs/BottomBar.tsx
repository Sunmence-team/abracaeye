import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { navItems } from "../../lib/items";

const BottomNav: React.FC = () => {
  const location = useLocation();
  return (
    <motion.div className="fixed bottom-0 left-0 w-full bg-black flex justify-around items-center rounded-t-4xl shadow-lg">
      {navItems.map((navItem, idx) => {
        const isActive = location.pathname === navItem.pathName;
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
              whileTap={{ scale: 0.9 }}
            >
              {<navItem.icon />}
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
