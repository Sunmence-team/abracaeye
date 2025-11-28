import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { navItems } from "../../lib/items";
import { useUser } from "../../context/UserContext";
import { toast } from "sonner";

interface UserRoles {
  vendor: boolean;
  blog: boolean;
}

const BottomNav: React.FC = () => {
  const { user } = useUser() as { user: UserRoles | null | undefined }; 
  const location = useLocation();

  const userRoles = ["all"];
  if (user?.vendor) {
    userRoles.push("vendor");
  }
  if (user?.blog) {
    userRoles.push("blog");
  }

  return (
    <motion.div className="fixed bottom-0 left-0 w-full bg-black flex justify-around items-center rounded-t-4xl shadow-lg">
      {navItems.map((navItem, idx) => {
        const isActive = location.pathname === navItem.pathName;

        const isAccessible = navItem.accessibility.some((role) => userRoles.includes(role));
        
        const disabledClass = isAccessible ? "" : "opacity-40 cursor-not-allowed pointer-events-none";

        const targetPath = isAccessible ? navItem.pathName : "#";

        return (
          <NavLink
            to={targetPath}
            key={idx}
            className={`flex flex-col items-center justify-center text-sm transition-colors ${
              isActive
                ? "text-light-red my-0"
                : "text-white transition-colors my-2 flex items-center"
            } ${disabledClass}`}
            onClick={(e) => {
              if (!isAccessible) {
                e.preventDefault();
                toast.error(`Access denied for: ${navItem.name}`);
              }
            }}
          >
            <motion.div
              className={`p-2 rounded-full text-[24px] ${
                isActive ? "bg-white" : "hover:bg-white hover:text-light-red"
              } animation`}
              whileTap={{ scale: isAccessible ? 0.9 : 1 }} // Disable tap animation if not accessible
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