import Loadable from 'app/components/Loadable';
import { lazy } from 'react';



const ViewDirectory=Loadable(lazy(()=>import('./viewDirectory')))
const AddNewContact=Loadable(lazy(()=>import('./newContact')))
const CustomerInfo=Loadable(lazy(()=>import('./customerInfo')))


const priceBookDirectoryRoutes = [

  { path: '/pages/view-directory', element: <ViewDirectory /> },
  { path: '/pages/add-new-contact', element: < AddNewContact/> },
  { path: '/pages/view-directory/customer-info', element: < CustomerInfo/> },
];

export default priceBookDirectoryRoutes;