import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/view/Home";
import Contact from "./pages/view/Contact";
import Blogdetails from "./pages/view/Blogdetatails";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import DashboardLayout from "./layout/DashboardLayout";
import Profile from "./pages/client/Profile";
import Posts from "./pages/client/Posts";
import AddPost from "./pages/client/AddPost";
import Overview from "./pages/client/Overview";
import { Toaster } from "sonner";

const App: React.FC = () => {
  return (
    <>
      <Toaster />
      <Routes>
        {/* Main routes with navbar */}
        <Route path="/" element={<MainLayout children={<Home />} />} />
        <Route
          path="/contact"
          element={<MainLayout children={<Contact />} />}
        />
        <Route
          path="/blogdetails/:id"
          element={<MainLayout children={<Blogdetails />} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard/overview"
          element={
            <DashboardLayout>
              <Overview />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/add-post"
          element={
            <DashboardLayout>
              <AddPost />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/posts"
          element={
            <DashboardLayout>
              <Posts />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          }
        />
      </Routes>
    </>
  );
};

export default App;
