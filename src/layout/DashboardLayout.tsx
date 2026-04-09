import { useState, type ReactNode } from "react";
import SideBar from "../components/navs/SideBar";
import TopNav from "../components/navs/TopNav";
import type React from "react";
import { useLocation } from "react-router-dom";
import { navItems } from "../lib/items";
import { useScreenSize } from "../hook/useScreenSize";
import { FaBars } from "react-icons/fa6";

interface DashboardLayoutProps {
  children: ReactNode;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const screen = useScreenSize();
  const location = useLocation();
  const currentPage = navItems.find((nav) => {
    return location.pathname === nav.pathName;
  });
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <div className="flex flex-col relative w-screen h-screen overflow-hidden z-1">
      <div className="absolute -z-1 top-0 left-0 bg-[#FF7979]/10 rounded-br-full rounded-bl w-64 h-64 md:w-150 md:h-150"></div>
      <section className="flex items-start h-full overflow-x-hidden overflow-y-scroll w-full">
        <aside
          className={`h-full ${openSideBar ? "absolute z-100 w-full bg-black/50" : "lg:flex w-1/5 hidden"}`}
          onClick={() => setOpenSideBar(false)}
        >
          <SideBar isOpen={openSideBar} />
        </aside>
        <main className="lg:w-4/5 w-full flex flex-col h-full">
          <div
            className={`lg:px-6 px-4 py-2 bg-white shadow flex items-center gap-2`}
          >
            <button
              type="button"
              className="lg:hidden inline-block"
              onClick={() => setOpenSideBar(true)}
            >
              <FaBars size={18} />
            </button>
            <TopNav />
          </div>
          <div className="lg:px-6 px-4 space-y-4 py-4 overflow-y-auto noScrollBar relative">
            <h2 className="lg:block hidden text-black font-semibold text-xl">
              {currentPage?.name}
            </h2>
            {(screen.isMobile || screen.isTablet) &&
            currentPage?.name !== "My Dashboard" ? (
              <h2 className="text-black font-semibold text-xl">
                {currentPage?.name}
              </h2>
            ) : null}

            {children}
          </div>
        </main>
      </section>
    </div>
  );
};

export default DashboardLayout;
