import { Navigate} from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
// Routes components
import publicRoutes from './allRoutes/publicRoutes';
import adminRoutes from './allRoutes/adminRoutes';
import hostRoutes from './allRoutes/hostRoutes';
import clientRoutes from './allRoutes/clientRoutes';

//
import Blog from './pages/Blog';
import User from './pages/User';
import Products from './pages/Products';
// import DashboardApp from './pages/DashboardApp';
import Signin from "./pages/Signin";
// import AddCompany from "./pages/AddCompany";
// import CompaniesList from "./pages/companiesList";
// import ClientRecievables from "./pages/ClientRecievables";
// import ClientDashboard from './pages/ClientDashboard';

// import HostDashboard from "./pages/HostDashboard";
// import HostProduct from "./pages/HostProduct";
// ----------------------------------------------------------------------

// export default function Router() {
  
const routes = [
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          ...adminRoutes,
          ...hostRoutes,
          ...clientRoutes,

          { path: 'user', element: <User /> },
          { path: 'products', element: <Products /> },
          { path: 'blog', element: <Blog /> },
          
        ],
      },
      ...publicRoutes
      // {
      //   path: '/',
      //   element: <LogoOnlyLayout />,
      //   children: [
      //     { path: '/', element: <Navigate to="/signin" /> },
      //     { path: 'login', element: <Login /> },
      //     { path: 'register', element: <Register /> },
      //     { path: 'signin', element: <Signin /> }, 
      //     { path: '404', element: <NotFound /> },
      //     { path: '*', element: <Navigate to="/404" /> },
      //   ],
      // },
      // { path: '*', element: <Navigate to="/404" replace /> },
];  
// const routes = [
//   {
//     element: (
//       <AuthGuard>
//         <MatxLayout />
//       </AuthGuard>
//     ),
//     children: [...dashboardRoutes, ...chartsRoute, ...materialRoutes],
//   },
//   ...sessionRoutes,
//   { path: '/', element: <Navigate to="dashboard/default" /> },
//   { path: '*', element: <NotFound /> },
// ];

export default routes;