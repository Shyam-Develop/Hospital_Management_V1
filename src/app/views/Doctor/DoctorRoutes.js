import Loadable from 'app/components/Loadable';
import { lazy } from 'react';


const Appointments = Loadable(lazy(() => import('./Appointments')));
const PrescriptionEdit = Loadable(lazy(() => import('./PrescriptionEdit')));
const PrescriptionList = Loadable(lazy(() => import('./PrescriptionList')));

const DoctorRoutes = [
    { path: '/doctor/appointments', element: <Appointments /> },
    { path: '/doctor/prescriptionedit', element: <PrescriptionEdit /> },
    { path: '/doctor/prescription-list', element: <PrescriptionList /> },
  ];
  
  export default DoctorRoutes;
  