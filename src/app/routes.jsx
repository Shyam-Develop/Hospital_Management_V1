import AuthGuard from "./auth/AuthGuard";
import AppLayout from "./components/appLayout/AppLayout";
import sessionRoutes from "./views/sessions/SessionRoutes";
import { Navigate } from "react-router-dom";
import NotFound from "./views/sessions/NotFound";
import HomePage from "./views/Home/Home";
import UnderDevelopment from "./views/sessions/UnderDevelopment";
import DoctorRoutes from "./views/Doctor/DoctorRoutes";
import AdminRoutes from "./views/Admin/AdminRoutes";
import PatientRoutes from "./views/Patient/PatientRoutes";
import PharmacyRoutes from "./views/Pharmacy/PharmacyRoutes";
import BillInvoiceRoutes from "./views/Bill&Invoice/BillInvoiceRoutes";
import PharmacyandManagementRoutes from "./views/Pharmacy&Management/PharmacyandManagementRoutes";
import LaboratoryandTestManagementRoutes from "./views/Laboratory&TestManagement/LaboratoryAndTestrManagementRoutes";
import ElectronicHealthRecordsRoutes from "./views/ElectronicHealthRecords/ElectronicHealthRecordsRoutes";
import UserRolesAndAccessConTrolRoutes from "./views/UserRoles&AccessControl/UserRolesAndAccessControlRoutes";

const routes = [
  {
    element: (
      <AuthGuard>
        <AppLayout />
      </AuthGuard>
    ),
    children: [
      { path: "/home", element: <HomePage /> },
      ...DoctorRoutes,
      ...AdminRoutes,
      ...PatientRoutes,
      ...PharmacyRoutes,
      ...BillInvoiceRoutes,
      ...PharmacyandManagementRoutes,
      ...LaboratoryandTestManagementRoutes,
      ...ElectronicHealthRecordsRoutes,
      ...UserRolesAndAccessConTrolRoutes,
      
      
      { path: "*", element: <UnderDevelopment /> },
    ],
  },
  ...sessionRoutes,
  { path: "/", element: <Navigate to="/session/signin" /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
