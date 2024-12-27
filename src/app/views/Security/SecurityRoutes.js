import Loadable from 'app/components/Loadable';
import { lazy } from 'react';


const Company = Loadable(lazy(() => import('./company/Company')));
const CompanyEdit = Loadable(lazy(() => import('./company/CompanyEdit')));
const User = Loadable(lazy(() => import('./user/User')));
const UserEdit = Loadable(lazy(() => import('./user/UserEdit')));
const UserGroup = Loadable(lazy(() => import('./user-group/UserGroup')));
const UserGroupEdit = Loadable(lazy(() => import('./user-group/UserGroupEdit')));
// const CompanyAccess = Loadable(lazy(() => import('./user-group/Companyaccess')));
// const ApplicationAccess = Loadable(lazy(() => import('./user-group/Applicationaccess')));
const Application = Loadable(lazy(() => import('./application/Application')));
const ApplicationEdit = Loadable(lazy(() => import('./application/ApplicationEdit')));


const SecurityRoutes = [
  { path: '/pages/company', element: <Company /> },
  { path: '/pages/company/company-edit-detail/:mode', element: <CompanyEdit /> },
  { path: '/pages/user', element: <User /> },
  { path: '/pages/user/user-edit-detail/:mode', element: <UserEdit /> },
  { path: '/pages/user-group', element: <UserGroup /> },
  { path: '/pages/user-group/user-edit-Group-detail/:mode', element: <UserGroupEdit /> },
  // { path: '/pages/user-group/companyaccess/:mode', element: <CompanyAccess /> },
  // { path: '/pages/user-group/applicationaccess/:mode', element: <ApplicationAccess /> },
  { path: '/pages/application', element: <Application /> },
  { path: '/pages/application-edit-detail/:mode', element: <ApplicationEdit /> },
];

export default SecurityRoutes;
