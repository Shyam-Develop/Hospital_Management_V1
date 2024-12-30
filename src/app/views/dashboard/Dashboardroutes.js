import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const BookAppointment = Loadable(lazy(() => import('./BookAppointment')));
const AppointmentHistroy = Loadable(lazy(() => import('./AppointmentHistroy')));
const Perscriptions = Loadable(lazy(() => import('./Perscriptions')));

const Dashboardroutes = [

    { path: '/pages/bookappointment', element: <BookAppointment /> },
    { path: '/pages/appointmenthistroy', element: <AppointmentHistroy /> },
    { path: '/pages/perscriptions', element: <Perscriptions /> },
  ];

  export default Dashboardroutes;
