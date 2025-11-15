import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/view/Home";
import Contact from "./pages/view/Contact";
import Blogdetails from "./pages/view/Blogdetatails";

const App: React.FC = () => {
  return (
    <>

      <Routes>

        {/* Main routes with navbar */}
        <Route path="/" element={<MainLayout children={<Home />} />} />
        <Route path="/contact" element={<MainLayout children={<Contact />} />} />
        <Route path="/blogdetails" element={<MainLayout children={<Blogdetails />} />} />




      </Routes>


    </>
  );
};

export default App;
