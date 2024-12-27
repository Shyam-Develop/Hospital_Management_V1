import AuthGuard from "./auth/AuthGuard";
import AppLayout from "./components/appLayout/AppLayout";
import sessionRoutes from "./views/sessions/SessionRoutes";
import { Navigate } from "react-router-dom";
import NotFound from "./views/sessions/NotFound";
import HomePage from "./views/Home/Home";
import priceBookDirectoryRoutes from "./views/priceBookDirectory/priceBookDirectoryRoutes";
import UnderDevelopment from "./views/sessions/UnderDevelopment";
import profileRoutes from "./views/profile/ProfileRoutes";
import pricebookRoutes from "./views/PriceBook/PriceBookRoutes";
import SecurityRoutes from "./views/Security/SecurityRoutes";


const routes = [
  {
    element: (
      <AuthGuard>
        <AppLayout />
      </AuthGuard>
    ),
    children: [
      { path: "/home", element: <HomePage /> },
      ...priceBookDirectoryRoutes,
      ...profileRoutes,
      ...pricebookRoutes,
      ...SecurityRoutes,
      { path: "*", element: <UnderDevelopment /> },
    ],
  },
  ...sessionRoutes,
  { path: "/", element: <Navigate to="/session/signin" /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
