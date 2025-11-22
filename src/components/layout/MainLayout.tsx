 import React from "react";
import type { ReactNode } from "react";
import Navbar from "../navs/Navbar";
import Footer from "../navs/Footer";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <Navbar />
      </div>

      {/* Main Content (adds top padding to clear navbar height) */}
      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
};

export default MainLayout;
