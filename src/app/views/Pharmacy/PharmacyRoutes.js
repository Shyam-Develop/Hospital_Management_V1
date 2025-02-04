import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const Pharmacy = Loadable(lazy(() => import('./Pharmacy')));




const PharmacyRoutes = [
    { path: '/pharmacy/pharmacy', element: <Pharmacy /> },

  ];
  
  export default PharmacyRoutes;
  