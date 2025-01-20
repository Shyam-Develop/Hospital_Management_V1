import Loadable from 'app/components/Loadable';
import { lazy } from 'react';


const Appointments = Loadable(lazy(() => import('./Appointments')));
const PrescriptionList = Loadable(lazy(() => import('./PrescriptionList')));

const DoctorRoutes = [

    { path: '/doctor/appointments', element: <Appointments /> },
    { path: '/doctor/prescription-list', element: <PrescriptionList /> },
  ];
  
  export default DoctorRoutes;
  