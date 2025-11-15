import type { ReactNode } from "react";
import SideBar from "../components/navs/SideBar";
import TopNav from "../components/navs/TopNav";
import type React from "react";
import { useLocation } from "react-router-dom";
import { navItems } from "../lib/items";

interface DashboardLayoutProps {
  children: ReactNode;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPage = navItems.find((nav) => {
    return location.pathname === nav.pathName;
  });

  return (
    <div className="flex flex-col gap-2 relative bg-light-red/10 w-screen h-screen">
      <div className="bg-white  px-12 py-5">
        <TopNav />
      </div>
      <section className="flex items-start gap-8 px-7 lg:px-12 py-3 lg:py-5 h-full overflow-hidden">
        <aside className="lg:flex hidden">
          <SideBar />
        </aside>
        <main className="flex flex-col gap-5 h-full overflow-y-auto w-full noScrollBar pb-3">
          <h2 className="text-black font-semibold text-xl">
            {currentPage?.name}
          </h2>
          {children}
        </main>
      </section>
    </div>
  );
};

export default DashboardLayout;
