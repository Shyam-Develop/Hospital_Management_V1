import Loadable from 'app/components/Loadable';
import { lazy } from 'react';


const NotFound = Loadable(lazy(() => import('./NotFound')));
const ForgotPassword = Loadable(lazy(() => import('./ForgotPassword')));
const ResetPassword = Loadable(lazy(() => import('./ResetPassword')));
const JwtLogin = Loadable(lazy(() => import('./JwtLogin')));
const Patient = Loadable(lazy(() => import('./Patient')));
const Doctor = Loadable(lazy(() => import('./Doctor')));
const Admin = Loadable(lazy(() => import('./Admin')));
const Pharmacy = Loadable(lazy(() => import('./Pharmacy')));
const JwtRegister = Loadable(lazy(() => import('./JwtRegister')));
const UnlockPassword = Loadable(lazy(() => import('./UnLockPassword')));
const Notification = Loadable(lazy(() => import('./Notificaion')));
const LoginUser = Loadable(lazy(() => import('./Login')));
const BillandInvoice = Loadable(lazy(() => import('./BillandInvoice')));
const LaboratoryandTestManagement = Loadable(lazy(() => import('./LaboratoryandTestManagement')));
const ElectronicHealthRecords = Loadable(lazy(() => import('./ElectronicHealthRecords')));
const UserRolesandAccessControl = Loadable(lazy(() => import('./UserRolesandAccessControl')));

const sessionRoutes = [
{path:'/session/signin' ,element:<LoginUser/>},
  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/login', element: <JwtLogin /> },
  { path: '/session/patient', element: <Patient /> },
  { path: '/session/doctor', element: <Doctor /> },
  { path: '/session/admin', element: <Admin /> },
  { path: '/session/pharmacy', element: <Pharmacy /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },
  { path: '/session/reset-password', element: <ResetPassword /> },
  { path: '/session/unlock-password', element: <UnlockPassword /> },
  { path: '/session/unlock-password/:notificationName', element: <Notification/> },
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/billing-and-invoice', element: <BillandInvoice /> },
  { path: '/session/laboratory-and-test-management', element: <LaboratoryandTestManagement /> },
  { path: '/session/electronic-health-records', element: <ElectronicHealthRecords /> },
  { path: '/session/user-roles-and-access-control', element: <UserRolesandAccessControl /> },
 
];

export default sessionRoutes;
