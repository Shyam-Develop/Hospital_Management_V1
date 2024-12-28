
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import { authRoles } from "./auth/authRoles";
export const navigations = [
    {
        name: "Main",
        icon: <FolderIcon fontSize="small" />,
        children: [
          {
            name: "Doctor",
            path: "/main/doctor",
            iconText: "V",
            accessID: null,
            icon: <DescriptionIcon fontSize="small" />,
            role: authRoles.user,
          },
        ],
      }

];


