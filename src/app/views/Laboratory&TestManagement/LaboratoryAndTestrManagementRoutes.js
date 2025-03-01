import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const LaboratoryAndTestManagement = Loadable(lazy(() => import('./LaboratoryAndTestManagement')));



const LaboratoryandTestManagementRoutes = [
    { path: '/Lab/laboratory-and-test-management', element: <LaboratoryAndTestManagement /> },
  ];
  
  export default LaboratoryandTestManagementRoutes;
  