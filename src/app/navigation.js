import DescriptionIcon from "@mui/icons-material/Description";
import { authRoles } from "./auth/authRoles";
export const navigations = [
    {        
            name: "Book Appointment",
            path: '/pages/bookappointment',
            iconText: "V",
            accessID: null,
            icon: <DescriptionIcon fontSize="small" />,
            role: authRoles.user,
          },
          {        
            name: "Appointment Histroy",
            path: '/pages/appointmenthistroy',
            iconText: "V",
            accessID: null,
            icon: <DescriptionIcon fontSize="small" />,
            role: authRoles.user,
          },
          {        
            name: "Prescriptions",
            path: '/pages/perscriptions',
            iconText: "V",
            accessID: null,
            icon: <DescriptionIcon fontSize="small" />,
            role: authRoles.user,
          },
     
        ]
