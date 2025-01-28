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


const sessionRoutes = [

  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/patient', element: <Patient /> },
  { path: '/session/doctor', element: <Doctor /> },
  { path: '/session/admin', element: <Admin /> },
  { path: '/session/pharmacy', element: <Pharmacy /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },
  { path: '/session/reset-password', element: <ResetPassword /> },
  { path: '/session/unlock-password', element: <UnlockPassword /> },
  { path: '/session/unlock-password/:notificationName', element: <Notification/> },
  { path: '/session/404', element: <NotFound /> },
 
];

export default sessionRoutes;
