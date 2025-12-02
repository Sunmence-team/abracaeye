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
    <div className="flex flex-col gap-2 relative w-screen h-screen relative z-1">
       <div className='absolute -z-1 top-0 left-0 bg-[#FF7979]/10 rounded-br-full rounded-bl w-64 h-64 md:w-150 md:h-150'></div>
      <div className={`px-7 lg:px-12 py-3 lg:py-5 bg-white`}>
        <TopNav />
      </div>

      <section className="flex items-start gap-8 px-7 lg:px-12 py-3 lg:py-5 h-full lg:overflow-hidden overflow-y-scroll w-full">
        <aside className="lg:flex hidden">
          <SideBar />
        </aside>
        <main className="flex flex-col gap-5 h-full lg:overflow-y-auto w-full noScrollBar pb-3">
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
        </main>
      </section>
      <footer className="lg:hidden flex">
        <BottomNav />
      </footer>
    </div>
  );
};

export default DashboardLayout;
