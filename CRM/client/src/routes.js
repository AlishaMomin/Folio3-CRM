import { Navigate} from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
// Routes components
import publicRoutes from './allRoutes/publicRoutes';
import adminRoutes from './allRoutes/adminRoutes';
import hostRoutes from './allRoutes/hostRoutes';
import clientRoutes from './allRoutes/clientRoutes';
import AuthGuard from './auth/AuthGuard';

//
import Blog from './pages/Blog';
import User from './pages/User';
import Products from './pages/Products';
// ----------------------------------------------------------------------

// export default function Router() {
  
const routes = [
      {
        element: <AuthGuard>
          <DashboardLayout />
        </AuthGuard>,
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
];
export default routes;