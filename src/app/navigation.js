
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import { authRoles } from "./auth/authRoles";
export const navigations = [
    {
      name: "Book My Appoinment",
      path: "/pages/book-my-appointment",
      iconText: "B",
      accessID: null,
      icon: <DescriptionIcon fontSize="small" />,
      role: authRoles.user,
    },
    {
      name: "Appoinment History ",
      path: "/pages/appointment-history",
      iconText: "B",
      accessID: null,
      icon: <DescriptionIcon fontSize="small" />,
      role: authRoles.user,
    },
    {
      name: "Prescriptions",
      path: "/pages/prescriptions",
      iconText: "B",
      accessID: null,
      icon: <DescriptionIcon fontSize="small" />,
      role: authRoles.user,
    },
    {
      name: "Appointments ",
      path: "/doctor/appointments",
      iconText: "c",
      accessID: null,
      icon: <DescriptionIcon fontSize="small" />,
      role: authRoles.doctor,
    },
    {
      name: "Prescriptions",
      path: "/doctor/prescriptions",
      iconText: "d",
      accessID: null,
      icon: <DescriptionIcon fontSize="small" />,
      role: authRoles.doctor,
    }

];


