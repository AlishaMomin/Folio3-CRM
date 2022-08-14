import ClientRecievables from "../pages/ClientRecievables";
import ClientDashboard from '../pages/ClientDashboard';

const clientRoutes = [
    { path: '/client/dashboard', element: <ClientDashboard /> ,auth:'client'},
    { path: '/client/transactions', element: <ClientRecievables />,auth:'client'},
];

export default clientRoutes;