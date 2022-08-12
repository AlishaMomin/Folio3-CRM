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
// import DashboardApp from './pages/DashboardApp';
import Signin from "./pages/Signin";
import AddCompany from "./pages/AddCompany";
import CompaniesList from "./pages/companiesList";
import HostDashboard from "./pages/HostDashboard";
import ClientDashboard from './pages/ClientDashboard';
import ClientRecievables from "./pages/ClientRecievables";
import HostProduct from "./pages/HostProduct";
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        // { path: 'app', element: <DashboardApp /> },
        { path: 'hostdashboard', element: <HostDashboard /> },
        { path: 'clientdashboard', element: <ClientDashboard /> },
        { path: 'user', element: <User /> },
        { path: 'adminhome', element: <CompaniesList /> },
        { path: 'clientcompanies', element: <CompaniesList /> },
        { path: 'products', element: <Products /> },
        { path: 'hostproducts', element: <HostProduct /> },
        { path: 'blog', element: <Blog /> },
        { path: 'addhostcompany', element: <AddCompany /> },
        { path: 'addclientcompany', element: <AddCompany /> },
        { path: 'clienttransactions', element: <ClientRecievables />},
        { path: 'clientrecievables', element: <ClientRecievables /> },
        
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/signin" /> },
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
