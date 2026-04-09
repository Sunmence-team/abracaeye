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
  const shouldScroll = filteredLinks.length > 5;

  return (
    <motion.div className="fixed z-999 bottom-0 left-0 w-full bg-black rounded-t-4xl py-2 shadow-lg">
      <div className="w-full overflow-x-auto no-scrollbar">
        <div
          className={`flex items-center ${
            shouldScroll ? "justify-start gap-2 px-3" : "justify-around"
          }`}
        >
          {filteredLinks.map((navItem, idx) => {
            const isActive = location.pathname === navItem.pathName ? true : false;
            return (
              <NavLink
                to={navItem.pathName}
                key={idx}
                className={`flex flex-col items-center justify-center transition-colors ${
                  shouldScroll ? "shrink-0 min-w-[72px] py-1" : "flex-1 py-1"
                } ${isActive ? "text-light-red" : "text-white"}`}
              >
                <motion.div
                  className={`p-2 rounded-full text-[24px] ${
                    isActive ? "bg-white" : "hover:bg-white hover:text-light-red"
                  } animation`}
                >
                  {<navItem.icon size={15} />}
                </motion.div>
                <span className="mt-1 font-semibold text-[11px] whitespace-nowrap">
                  {navItem.altName || navItem.name}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default BottomNav;
