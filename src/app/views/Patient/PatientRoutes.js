import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const AppointmentHistory = Loadable(lazy(() => import('./AppointmentHistory')));
const Prescriptions = Loadable(lazy(() => import('./Prescriptions')));
const BookAppointment = Loadable(lazy(() => import('./BookAppointment')));


const PatientRoutes = [

    { path: '/patient/appointment-history', element: <AppointmentHistory /> },
    { path: '/patient/prescriptions', element: <Prescriptions /> },
    { path: '/patient/book-appointment', element: <BookAppointment /> },

  ];

  export default PatientRoutes;
