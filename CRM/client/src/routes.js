import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import Signin from "./pages/Signin";
import AddHostCompany from "./pages/AddHostCompany";
import AddClientCompany from './pages/AddClientCompany';
import AdminHome from "./pages/AdminHome";
import HostDashboard from "./pages/HostDashboard";
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'hostdashboard', element: <HostDashboard /> },
        { path: 'user', element: <User /> },
        { path: 'adminhome', element: <AdminHome /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'signin', element: <Signin /> },
        { path: 'addhostcompany', element: <AddHostCompany /> },
        { path: 'addclientcompany', element: <AddClientCompany /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
