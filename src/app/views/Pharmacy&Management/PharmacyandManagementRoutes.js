import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const PharmacyAndManagement = Loadable(lazy(() => import('./PharmacyAndManagement')));



const PharmacyandManagementRoutes = [
    { path: '/Pharmacy/pharmacy-and-management', element: <PharmacyAndManagement /> },
  ];
  
  export default PharmacyandManagementRoutes;
  