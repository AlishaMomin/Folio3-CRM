import { Navigate} from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
// Routes components
import publicRoutes from './allRoutes/publicRoutes';
import adminRoutes from './allRoutes/adminRoutes';
import hostRoutes from './allRoutes/hostRoutes';
import clientRoutes from './allRoutes/clientRoutes';
import AuthGuard from './auth/AuthGuard';

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
        ],
      },
      ...publicRoutes
];
export default routes;