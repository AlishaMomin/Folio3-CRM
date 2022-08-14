import AddCompany from "../pages/AddCompany";
import CompaniesList from "../pages/companiesList";
import HostDashboard from "../pages/HostDashboard";
import ClientRecievables from "../pages/ClientRecievables";
import HostProduct from "../pages/HostProduct";

const hostRoutes = [
    { path: '/host/dashboard', element: <HostDashboard />,auth: 'host' },
    { path: '/host/products', element: <HostProduct /> ,auth: 'host'},
    { path: '/host/addcompany', element: <AddCompany /> ,auth: 'host'},
    { path: '/host/companies', element: <CompaniesList /> ,auth:'host'},
    { path: '/host/recievables', element: <ClientRecievables /> ,auth: 'host'},
];
export default hostRoutes;