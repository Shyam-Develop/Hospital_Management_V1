import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const Users = Loadable(lazy(() => import('./Users')));




const UserRolesAndAccessConTrolRoutes = [
    { path: '/UAAM/users', element: <Users /> },

  ];
  
  export default UserRolesAndAccessConTrolRoutes;
  