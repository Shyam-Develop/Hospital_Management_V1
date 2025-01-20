import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const Doctor = Loadable(lazy(() => import('./Doctor')));
const Patient = Loadable(lazy(() => import('./Patient')));

const AdminRoutes = [
    { path: '/admin/doctor', element: <Doctor /> },
    { path: '/admin/patient', element: <Patient /> },
  ];
  
  export default AdminRoutes;
  