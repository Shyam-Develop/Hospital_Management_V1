import Loadable from 'app/components/Loadable';
import { lazy } from 'react';


const Appointments = Loadable(lazy(() => import('./Appointments')));
const Prescriptions = Loadable(lazy(() => import('./Prescriptions')));

const DashBoardRoutes = [

    { path: '/doctor/appointments', element: <Appointments /> },
    { path: '/doctor/prescriptions', element: <Prescriptions /> },
  ];
  
  export default DashBoardRoutes;
  