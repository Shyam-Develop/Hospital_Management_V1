import Loadable from 'app/components/Loadable';
import { lazy } from 'react';


const AppointmentHistory = Loadable(lazy(() => import('./AppointmentHistory')));
const BookMyAppointment = Loadable(lazy(() => import('./BookMyAppoinment')));
const Prescriptions = Loadable(lazy(() => import('./Prescriptions')));

const DashBoardRoutes = [

    { path: '/pages/appointment-history', element: <AppointmentHistory /> },
    { path: '/pages/book-my-appointment', element: <BookMyAppointment /> },
    { path: '/pages/prescriptions', element: <Prescriptions /> },
  ];
  
  export default DashBoardRoutes;
  