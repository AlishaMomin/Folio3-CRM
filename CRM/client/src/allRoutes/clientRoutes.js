import Transactions from '../pages/Transactions';
import HostDashboard from '../pages/Dashboard';

const clientRoutes = [
    { path: '/client/dashboard', element: <HostDashboard /> ,auth:'client'},
    { path: '/client/transactions', element: <Transactions />,auth:'client'},
    
];

export default clientRoutes;