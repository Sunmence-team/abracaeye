import { MdDashboard } from "react-icons/md";
import { AiFillFileAdd } from "react-icons/ai";
import { FaCircleUser } from "react-icons/fa6";
import { MdPermMedia } from "react-icons/md";
export const navItems = [
  {
    icon: MdDashboard,
    pathName: "/dashboard/overview",
    name: "My Dashboard",
    altName: "Dashboard",
  },
  {
    icon: AiFillFileAdd,
    pathName: "/dashboard/add-post",
    name: "Add New Post",
    altName: "New Post",
  },
  {
    icon: MdPermMedia,
    pathName: "/dashboard/posts",
    name: "My Posts",
  },
  {
    icon: FaCircleUser,
    pathName: "/dashboard/profile",
    name: "Profile",
  },
];
