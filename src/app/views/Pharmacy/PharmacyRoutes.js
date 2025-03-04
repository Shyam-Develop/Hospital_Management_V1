import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const Pharmacy = Loadable(lazy(() => import('./Pharmacy')));

const PharmacyPay = Loadable(lazy(() => import('./PharmacyPay')));


const PharmacyRoutes = [
    { path: '/pharmacy/pharmacy-edit', element: <Pharmacy /> },
    { path: '/pharmacy/pharmacy-pay', element: <PharmacyPay /> },

  ];
  
  export default PharmacyRoutes;
  