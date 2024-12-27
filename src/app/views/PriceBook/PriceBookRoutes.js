import Loadable from 'app/components/Loadable';
import { lazy } from 'react';


const ItemsList = Loadable(lazy(() => import('./items/ItemsList')));
const PriceList = Loadable(lazy(() => import('./price-list/PriceList')));
const PriceListEdit = Loadable(lazy(() => import('./price-list/PriceListEdit')));
const ItemAttributesEdit = Loadable(lazy(() => import('./price-list/ItemAttributesEdit')));
const PriceListItems = Loadable(lazy(() => import('./price-list/PriceListItems')));
const PriceListsGroup = Loadable(lazy(() => import('./price-lists-group/PriceListsGroup')));
const PriceListsGroupEdit = Loadable(lazy(() => import('./price-lists-group/PriceListsGroupEdit')));
const CustomerPriceLists = Loadable(lazy(() => import('./customer-price-lists/CustomerPriceLists')));
const CustomerPriceListsEdit = Loadable(lazy(() => import('./customer-price-lists/CustomerPriceListsEdit')));
const PPBCustomerItems = Loadable(lazy(() => import('./customer-price-lists/PPBCustomerItems')));
const RunGroup = Loadable(lazy(() => import('./run-group/RunGroup')));
const RunGroupEdit = Loadable(lazy(() => import('./run-group/RunGroupEdit')));


const pricebookRoutes = [
  { path: '/pages/items', element: <ItemsList /> },
  { path: '/pages/price-list', element: <PriceList /> },
  { path: '/pages/price-list/price-list-items', element: <PriceListItems /> },
  { path: '/pages/price-list/price-list-detail/:mode', element: <PriceListEdit /> },
  { path: '/pages/price-list/price-list-detail/:mode/item-attributes', element: <ItemAttributesEdit /> },
  { path: '/pages/price-lists-group', element: <PriceListsGroup /> },
  { path: '/pages/price-lists-group/price-lists-group-detail/:mode' , element: <PriceListsGroupEdit /> },
  { path: '/pages/customer-price-lists', element: <CustomerPriceLists /> },
  { path: '/pages/customer-price-lists/customer-price-lists-detail/:mode', element: <CustomerPriceListsEdit /> },
  { path: '/pages/customer-price-lists/customer-price-lists-detail/:mode/ppb-customer-items', element: <PPBCustomerItems /> },
  { path: '/pages/run-group', element: <RunGroup /> },
  { path: '/pages/run-group/run-group-getail/:mode', element: <RunGroupEdit /> },

];

export default pricebookRoutes;
