import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/view/Home";
import Contact from "./pages/view/Contact";
import Blogdetails from "./pages/view/Blogdetatails";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { Toaster } from "sonner";

const App: React.FC = () => {
  return (
    <>
      <Toaster />
      <Routes>

        {/* Main routes with navbar */}
        <Route path="/" element={<MainLayout children={<Home />} />} />
        <Route path="/contact" element={<MainLayout children={<Contact />} />} />
        <Route path="/blogdetails/:id" element={<MainLayout children={<Blogdetails />} />} />
        <Route path="/auth/login" element={<Login />}  />
        <Route path="/auth/register" element={<Register  />} />

      </Routes>


    </>
  );
};

export default App;
