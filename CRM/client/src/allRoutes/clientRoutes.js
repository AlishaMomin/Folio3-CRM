import AddCompany from "../pages/AddCompany";
import CompaniesList from "../pages/companiesList";
import ClientRecievables from "../pages/ClientRecievables";
import ClientDashboard from '../pages/ClientDashboard';

const clientRoutes = [
    { path: 'clientdashboard', element: <ClientDashboard /> },
    { path: 'clientcompanies', element: <CompaniesList /> },
    { path: 'addclientcompany', element: <AddCompany /> },
    { path: 'clienttransactions', element: <ClientRecievables />},
];

export default clientRoutes;