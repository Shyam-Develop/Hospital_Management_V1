import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const Users = Loadable(lazy(() => import('./Users')));
const UserRoles = Loadable(lazy(() => import('./UserList')));




const UserRolesAndAccessConTrolRoutes = [
    { path: '/UAAM/users', element: <Users /> },
    { path: '/UAAM/user-List', element: <UserRoles /> },

  ];
  
  export default UserRolesAndAccessConTrolRoutes;
  