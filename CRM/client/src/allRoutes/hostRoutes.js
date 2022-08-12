import AddCompany from "../pages/AddCompany";
import CompaniesList from "../pages/companiesList";
import HostDashboard from "../pages/HostDashboard";
import ClientRecievables from "../pages/ClientRecievables";
import HostProduct from "../pages/HostProduct";

const hostRoutes = [
    { path: 'hostdashboard', element: <HostDashboard /> },
    { path: 'hostproducts', element: <HostProduct /> },
    { path: 'addhostcompany', element: <AddCompany /> },
    { path: 'clientrecievables', element: <ClientRecievables /> },
];
export default hostRoutes;