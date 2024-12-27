
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import { authRoles } from "./auth/authRoles";
export const navigations = [
  {
    name: "Price Book",
    icon: <FolderIcon fontSize="small" />,
    children: [
      {
        name: "Items",
        path: "/pages/items",
        iconText: "V",
        accessID: null,
        icon: <DescriptionIcon fontSize="small" />,
        role: authRoles.user,
      },
      {
        name: " Price List",
        path: "/pages/price-list",
        iconText: "B",
        accessID: null,
        icon: <DescriptionIcon fontSize="small" />,
        role: authRoles.user,
      },
      {
        name: "Print Group",
        path: "/pages/price-lists-group ",
        iconText: "C",
        accessID: null,
        icon: <DescriptionIcon fontSize="small" />,
        role: authRoles.user,
      },
      {
        name: "Customer Price Lists",
        path: "/pages/customer-price-lists",
        iconText: "D",
        accessID: null,
        icon: <DescriptionIcon fontSize="small" />,
        role: authRoles.user,
      },
      {
        name: "Run Group",
        path: "/pages/run-group ",
        iconText: "E",
        accessID: null,
        icon: <DescriptionIcon fontSize="small" />,
        role: authRoles.user,
      },
    ],
  },
 
  {
    name: "Security",
    icon: <FolderIcon fontSize="small" />,
    children: [
      {
        name: "Company",
        path: "/pages/company",
        iconText: "V",
        accessID: null,
        icon: <DescriptionIcon fontSize="small" />,
        role: authRoles.user,
      },
      {
        name: "Application",
        path: "/pages/application",
        iconText: "B",
        accessID: null,
        icon: <DescriptionIcon fontSize="small" />,
        role: authRoles.user,
      },
      {
        name: "UserGroup",
        path: "/pages/user-group",
        iconText: "B",
        accessID: null,
        icon: <DescriptionIcon fontSize="small" />,
        role: authRoles.user,
      },
      {
        name: "User",
        path: "/pages/user",
        iconText: "B",
        accessID: null,
        icon: <DescriptionIcon fontSize="small" />,
        role: authRoles.user,
      },
    ],
  },
  

];
