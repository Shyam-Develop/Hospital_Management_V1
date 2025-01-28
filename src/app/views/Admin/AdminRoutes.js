import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const Doctor = Loadable(lazy(() => import('./Doctor')));
const DoctorEdit = Loadable(lazy(() => import('./DoctorEdit')));
const Patient = Loadable(lazy(() => import('./Patient')));
const PatientEdit = Loadable(lazy(() => import('./PatientEdit')));


const AdminRoutes = [
    { path: '/admin/doctor', element: <Doctor /> },
    { path: '/admin/doctor-edit', element: <DoctorEdit /> },
    { path: '/admin/patient', element: <Patient /> },
    { path: '/admin/patient-edit', element: <PatientEdit /> },

  ];
  
  export default AdminRoutes;
  