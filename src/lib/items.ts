import { MdDashboard } from "react-icons/md";
import { AiFillFileAdd } from "react-icons/ai";
import { FaCircleUser, FaUsers } from "react-icons/fa6";
import { MdPermMedia } from "react-icons/md";
import { MdContacts, MdSubscriptions } from "react-icons/md";

export const navItems = [
  {
    icon: MdDashboard,
    pathName: "/dashboard/overview",
    accessibility: ["vendor"],
    name: "My Dashboard",
    role: ["user"],
    altName: "Dashboard",
  },
  {
    icon: AiFillFileAdd,
    pathName: "/dashboard/add-post",
    accessibility: ["blog"],
    name: "Add New Post",
    role: ["user", "admin"],
    altName: "New Post",
  },
  {
    icon: MdPermMedia,
    pathName: "/dashboard/posts",
    accessibility: ["blog"],
    name: "My Posts",
    role: ["user", "admin"],
    altName: "My Posts",
  },
  {
    icon: FaCircleUser,
    pathName: "/dashboard/profile",
    accessibility: ["all"],
    name: "Profile",
    role: ["user"],
    altName: "My Profile",
  },
  {
    icon: FaUsers,
    pathName: "/dashboard/admin/users",
    accessibility: ["admin"],
    name: "All Users",
    role: ["admin"],
    altName: "All Users",
  },
  {
    icon: MdPermMedia,
    pathName: "/dashboard/admin/pending-posts",
    accessibility: ["admin"],
    name: "Blogs",
    role: ["admin"],
    altName: "Manage Blogs",
  },
  {
    icon: MdSubscriptions,
    pathName: "/dashboard/admin/subscribers",
    accessibility: ["admin"],
    name: "Subscribers",
    role: ["admin"],
    altName: "Subscribers",
  },
  {
    icon: MdContacts,
    pathName: "/dashboard/admin/contacts",
    accessibility: ["admin"],
    name: "All Contacts",
    role: ["admin"],
    altName: "Contacts",
  },
];
