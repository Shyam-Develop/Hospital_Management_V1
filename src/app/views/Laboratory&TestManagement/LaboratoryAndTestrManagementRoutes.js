import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const TestGroup = Loadable(lazy(() => import('./TestGroup')));
const Test = Loadable(lazy(() => import('./Test')));
const Prescription = Loadable(lazy(() => import('./Prescription')));
const PrescriptionEdit = Loadable(lazy(() => import('./PrescriptionEdit')));





const LaboratoryandTestManagementRoutes = [
    { path: '/Lab/test-group', element: <TestGroup /> },
    { path: '/Lab/test', element: <Test /> },
    { path: '/Lab/prescription', element: <Prescription /> },
    { path: '/Lab/prescription-edit', element: <PrescriptionEdit /> },


  ];
  
  export default LaboratoryandTestManagementRoutes;
  