import AuthGuard from "./auth/AuthGuard";
import AppLayout from "./components/appLayout/AppLayout";
import sessionRoutes from "./views/sessions/SessionRoutes";
import { Navigate } from "react-router-dom";
import NotFound from "./views/sessions/NotFound";
import HomePage from "./views/Home/Home";
import UnderDevelopment from "./views/sessions/UnderDevelopment";
import Dashboardroutes from "./views/dashboard/Dashboardroutes";



const routes = [
  {
    element: (
      <AuthGuard>
        <AppLayout />
      </AuthGuard>
    ),
    children: [
      { path: "/home", element: <HomePage /> },
      ...Dashboardroutes,
      
      { path: "*", element: <UnderDevelopment /> },
    ],
  },
  ...sessionRoutes,
  { path: "/", element: <Navigate to="/session/signin" /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
