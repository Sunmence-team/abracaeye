import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import DashboardLayout from "./layout/DashboardLayout";
import Overview from "./pages/client/Overview";
import AddPost from "./pages/client/AddPost";
import Profile from "./pages/client/Profile";
import Posts from "./pages/client/Posts";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
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
}

export default App;
