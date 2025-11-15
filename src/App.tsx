import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/view/Home";

const App: React.FC = () => {
  return (
    <>

      <Routes>

        {/* Main routes with navbar */}
        <Route path="/" element={<MainLayout children={<Home />} />} />





      </Routes>


    </>
  );
};

export default App;
