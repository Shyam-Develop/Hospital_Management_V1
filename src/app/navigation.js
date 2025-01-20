import DescriptionIcon from "@mui/icons-material/Description";
import { authRoles } from "./auth/authRoles";

export const navigations = [
    {        
            name: "Book Appointment",
            path: '/patient/book-appointment',
            iconText: "V",
            accessID: null,
            icon: <DescriptionIcon fontSize="small" />,
            role: authRoles.patient,
          },
          {        
            name: "Appointment Histroy",
            path: '/patient/appointment-history',
            iconText: "V",
            accessID: null,
            icon: <DescriptionIcon fontSize="small" />,
            role: authRoles.patient,
          },
          {        
            name: "Prescriptions",
            path: '/patient/prescriptions',
            iconText: "V",
            accessID: null,
            icon: <DescriptionIcon fontSize="small" />,
            role: authRoles.patient,
          },
      
         
          {        
            name: "Appointments",
            path: '/doctor/appointments',
            iconText: "b",
            accessID: null,
            icon: <DescriptionIcon fontSize="small" />,
            role: authRoles.doctor,
          },
          {        
            name: "Prescription List",
            path: '/doctor/prescription-list',
            iconText: "c",
            accessID: null,
            icon: <DescriptionIcon fontSize="small" />,
            role: authRoles.doctor,
          },
      
 
        
              {
                name: "Doctor",
                path: "/admin/doctor",
                iconText: "V",
                accessID: null,
                icon: <DescriptionIcon fontSize="small" />,
                role: authRoles.admin,
              },
              {
                name: "Patient",
                path: "/admin/patient",
                iconText: "V",
                accessID: null,
                icon: <DescriptionIcon fontSize="small" />,
                role: authRoles.admin,
              },
         
        ]
