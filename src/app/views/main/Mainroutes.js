import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const Doctor = Loadable(lazy(() => import('./Doctor')));

const Mainroutes = [

    { path: '/main/doctor', element: <Doctor /> },
  ];

  export default Mainroutes;
