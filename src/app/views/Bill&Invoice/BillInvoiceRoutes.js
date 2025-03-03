import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const BillingInvoice = Loadable(lazy(() => import('./BillingInvoice')));
const BillandInvoiceEdit = Loadable(lazy(() => import('./BillandInvoiceEdit')));




const BillInvoiceRoutes = [
    { path: '/BillingInvoice/bill-invoice', element: <BillingInvoice /> },
    { path: '/BillingInvoice/bill-and-invoice-edit', element: <BillandInvoiceEdit /> },

  ];
  
  export default BillInvoiceRoutes;
  