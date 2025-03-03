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
              {
                name: "Pharmacy",
                path: "/pharmacy/pharmacy",
                iconText: "V",
                accessID: null,
                icon: <DescriptionIcon fontSize="small" />,
                role: authRoles.User,
              },
              {
                name: "Billing & Invoice",
                path: "/BillingInvoice/bill-invoice",
                iconText: "V",
                accessID: null,
                icon: <DescriptionIcon fontSize="small" />,
                role: authRoles.billinvoice,
              },
              {
                name: "Pharmacy & Management",
                path: "/Pharmacy/pharmacy-and-management",
                iconText: "V",
                accessID: null,
                icon: <DescriptionIcon fontSize="small" />,
                role: authRoles.pharmacyandmanagement,
              },
              {
                name: "Lab & TestManagement",
                path: "/Lab/laboratory-and-test-management",
                iconText: "V",
                accessID: null,
                icon: <DescriptionIcon fontSize="small" />,
                role: authRoles.laboratoryandtestmanagement,
              },
              {
                name: "ElectronicHealthRecords",
                path: "/ERecords/electronic-health-records",
                iconText: "V",
                accessID: null,
                icon: <DescriptionIcon fontSize="small" />,
                role: authRoles.electtrnichealthrecords,
              },
              {
                name: "Users",
                path: "/UAAM/users",
                iconText: "V",
                accessID: null,
                icon: <DescriptionIcon fontSize="small" />,
                role: authRoles.userrolesandaccesscontrol,
              },
             
              
        ]
