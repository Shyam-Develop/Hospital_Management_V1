import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const ElectronicHealthRecords = Loadable(lazy(() => import('./ElectronicHealthRecords')));



const ElectronicHealthRecordsRoutes = [
    { path: '/ERecords/electronic-health-records', element: <ElectronicHealthRecords /> },
  ];
  
  export default ElectronicHealthRecordsRoutes;
  