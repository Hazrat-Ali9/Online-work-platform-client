import { BiSolidDashboard } from "react-icons/bi";
import { IoStorefrontSharp } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { VscFeedback } from "react-icons/vsc";
import { TbCategory } from "react-icons/tb";
import { RiFeedbackLine } from "react-icons/ri";

export const sideBarMenu = (role: string = "admin") => {
  const isSeller = role === "seller";
  const isAdmin = role === "admin";
  const isSuperAdmin = role === "super_admin";
  const isBuyer = role === "buyer";

  const sellerAndAdminMenu = [
    {
      id: 5,
      name: "Manage Orders",
      slug: `/dashboard/manage-orders`,
      icon: <CiViewList size={22} />,
    },
    {
      id: 8,
      name: "Tasks",
      slug: `/dashboard/manage-tasks`,
      icon: <CiViewList size={22} />,
    },
  ];

  const adminMenu = [
    {
      id: 2,
      name: "Manage Sellers",
      slug: `/dashboard/manage-sellers`,
      icon: <IoStorefrontSharp size={22} />,
    },
    {
      id: 3,
      name: "Manage Buyers",
      slug: `/dashboard/manage-buyers`,
      icon: (
        <svg
          className="w-6 h-6 stroke-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      id: 6,
      name: "Manage Reviews",
      slug: `/dashboard/manage-reviews`,
      icon: <VscFeedback size={22} />,
    },
    {
      id: 7,
      name: "Categories",
      slug: `/dashboard/categories`,
      icon: <TbCategory size={22} />,
    },
  ];

  const superAdminMenu = [
    {
      id: 4,
      name: "Manage Admins",
      slug: `/dashboard/manage-admins`,
      icon: <MdAdminPanelSettings size={28} />,
    },
  ];

  const publicMenu = [
    {
      id: 1,
      name: "Dashboard",
      slug: `/dashboard/`,
      icon: <BiSolidDashboard size={22} />,
    },
    {
      id: 2,
      name: "Add Feedback",
      slug: `/dashboard/add-feedback`,
      icon: <RiFeedbackLine size={22} />,
    },
  ];

  return [
    ...publicMenu,
    ...(isSeller ? sellerAndAdminMenu : []),
    ...(isAdmin ? [...sellerAndAdminMenu, ...adminMenu] : []),
    ...(isSuperAdmin
      ? [...sellerAndAdminMenu, ...adminMenu, ...superAdminMenu]
      : []),
  ].sort((a, b) => a.id - b.id);
};
