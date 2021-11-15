import { Icon } from "@iconify/react";
import pieChart2Fill from "@iconify/icons-eva/pie-chart-2-fill";
import peopleFill from "@iconify/icons-eva/people-fill";
import shoppingBagFill from "@iconify/icons-eva/shopping-bag-fill";
import fileTextFill from "@iconify/icons-eva/file-text-fill";
import lockFill from "@iconify/icons-eva/lock-fill";
import personAddFill from "@iconify/icons-eva/person-add-fill";
import alertTriangleFill from "@iconify/icons-eva/alert-triangle-fill";

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: getIcon(pieChart2Fill),
  },
  {
    title: "my aadhaar",
    path: "/dashboard/details",
    icon: getIcon(fileTextFill),
  },
  {
    title: "update address",
    path: "/dashboard/update",
    icon: getIcon(shoppingBagFill),
  },
  {
    title: "requests",
    path: "/dashboard/requests",
    icon: getIcon(fileTextFill),
  },
  {
    title: "login",
    path: "/login",
    icon: getIcon(lockFill),
  },
  {
    title: "register",
    path: "/register",
    icon: getIcon(personAddFill),
  },
  {
    title: "logs",
    path: "/dashboard/logs",
    icon: getIcon(fileTextFill),
  },
];

export default sidebarConfig;
