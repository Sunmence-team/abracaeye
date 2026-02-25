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
  },
  {
    icon: FaCircleUser,
    pathName: "/dashboard/profile",
    accessibility: ["all"],
    name: "Profile",
    role: ["user"],
  },
  {
    icon: FaUsers,
    pathName: "/dashboard/admin/users",
    accessibility: ["admin"],
    name: "All Users",
    role: ["admin"],
  },
  {
    icon: MdPermMedia,
    pathName: "/dashboard/admin/pending-posts",
    accessibility: ["admin"],
    name: "Blogs",
    role: ["admin"],
  },
  {
    icon: MdSubscriptions,
    pathName: "/dashboard/admin/subscribers",
    accessibility: ["admin"],
    name: "Subscribers",
    role: ["admin"],
  },
  {
    icon: MdContacts,
    pathName: "/dashboard/admin/contacts",
    accessibility: ["admin"],
    name: "All Contacts",
    role: ["admin"],
  },
];
