import Transactions from '../pages/Transactions';
import ClientDashboard from '../pages/ClientDashboard';

const clientRoutes = [
    { path: '/client/dashboard', element: <ClientDashboard /> ,auth:'client'},
    { path: '/client/transactions', element: <Transactions />,auth:'client'},
    
];

export default clientRoutes;