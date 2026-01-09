import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
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
import { Toaster, toast } from "sonner";
import AllUsers from "./pages/admin/AllUsers";
// import { useScreenSize } from "./hook/useScreenSize";
// import MobileHome from "./pages/view/mobile/Home";
import Modal from "./components/modal/Modal";
import api from "./helpers/api";
import Blogs from "./pages/view/Blogs";
import AllContacts from "./pages/admin/AllContacts";
import AllSubscribers from "./pages/admin/AllSubscribers";

const App: React.FC = () => {
  // const { isMobile } = useScreenSize();
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); 

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedBefore");
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setShowNewsletter(true);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);
 
  const handleCloseNewsletter = () => {
    setShowNewsletter(false);
    localStorage.setItem("hasVisitedBefore", "true");
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const response = await api.post("/newsletter", { email });
      if (response.status === 200 || response.status === 201) {
        toast.success("Subscribed to newsletter successfully!");
        handleCloseNewsletter();  
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster />

      {showNewsletter && (
        <Modal onClose={handleCloseNewsletter}>
          <div className="text-center">
            <h2 className="md:text-2xl text-xl font-bold text-dark-red">Subscribe to our Newsletter</h2>
            <p className="mb-8 md:text-base text-sm text-gray-600">
              Stay updated with our latest news and offers!
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-dark-red text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-70"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </Modal>
      )}

      <Routes>
        {/* Main routes with navbar */}
        <Route path="/" element={<MainLayout children={<Home />} />} />
        <Route
          path="/blogs"
          element={<MainLayout children={<Blogs />} />}
        />
        <Route
          path="/contact"
          element={<MainLayout children={<Contact />} />}
        />
        <Route
          path="/blogdetails/:id"
          element={<MainLayout children={<Blogdetails />} />}
        />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

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
        <Route
          path="/dashboard/admin/users"
          element={
            <DashboardLayout>
              <AllUsers />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/admin/subscribers"
          element={
            <DashboardLayout>
              <AllSubscribers />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/admin/contacts"
          element={
            <DashboardLayout>
              <AllContacts />
            </DashboardLayout>
          }
        />
      </Routes>
    </>
  );
};

export default App;
