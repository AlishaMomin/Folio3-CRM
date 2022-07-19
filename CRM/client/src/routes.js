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
import ClientDashboard from './pages/ClientDashboard';
import AddCompany from "./pages/AddCompany";
import ClientTransactions from "./pages/ClientTransactions"
import ClientRecievables from "./pages/ClientRecievables"
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'hostdashboard', element: <HostDashboard /> },
        { path: 'clientdashboard', element: <ClientDashboard /> },
        { path: 'user', element: <User /> },
        { path: 'adminhome', element: <AdminHome /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'addhostcompany', element: <AddHostCompany /> },
        { path: 'addclientcompany', element: <AddClientCompany /> },
        { path: 'addcompany', element: <AddCompany /> },
        { path: 'clienttransactions', element: <ClientTransactions />},
        { path: 'clientrecievables', element: <ClientRecievables /> },
        
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
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
