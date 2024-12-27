import Loadable from 'app/components/Loadable';
import { lazy } from 'react';


const CustomerList = Loadable(lazy(() => import('./cutomers/CustomerList')));
const CompanyList = Loadable(lazy(() => import('./company/CompanyList')));


const mastersRoutes = [
  { path: '/pages/company-list', element: <CompanyList /> },
  { path: '/pages/customer-list', element: <CustomerList /> },
];

export default mastersRoutes;
