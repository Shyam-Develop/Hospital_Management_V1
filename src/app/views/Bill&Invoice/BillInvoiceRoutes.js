import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const BillingInvoice = Loadable(lazy(() => import('./BillingInvoice')));



const BillInvoiceRoutes = [
    { path: '/BillingInvoice/bill-invoice', element: <BillingInvoice /> },
  ];
  
  export default BillInvoiceRoutes;
  