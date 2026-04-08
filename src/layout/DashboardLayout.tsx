import type { ReactNode } from "react";
import SideBar from "../components/navs/SideBar";
import TopNav from "../components/navs/TopNav";
import type React from "react";
import { useLocation } from "react-router-dom";
import { navItems } from "../lib/items";
import BottomNav from "../components/navs/BottomBar";
import { useScreenSize } from "../hook/useScreenSize";

interface DashboardLayoutProps {
  children: ReactNode;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const screen = useScreenSize();
  const location = useLocation();
  const currentPage = navItems.find((nav) => {
    return location.pathname === nav.pathName;
  });

  return (
    <div className="flex flex-col relative w-screen h-screen overflow-hidden z-1">
      <div className="absolute -z-1 top-0 left-0 bg-[#FF7979]/10 rounded-br-full rounded-bl w-64 h-64 md:w-150 md:h-150"></div>
      <section className="flex items-start h-full lg:overflow-hidden overflow-y-scroll w-full">
        <aside className="w-1/5 lg:flex hidden h-full">
          <SideBar />
        </aside>
        <main className="w-4/5 flex flex-col h-full">
          <div className={`px-6 py-2 bg-white shadow`}>
            <TopNav />
          </div>
          <div className="px-6 space-y-4 py-4 lg:overflow-y-auto noScrollBar relative">
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
      <footer className="lg:hidden flex">
        <BottomNav />
      </footer>
    </div>
  );
};

export default DashboardLayout;