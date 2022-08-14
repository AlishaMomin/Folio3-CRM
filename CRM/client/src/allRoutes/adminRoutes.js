import CompaniesList from "../pages/companiesList";
import AddCompany from "../pages/AddCompany";

const adminRoutes = [
    { path: '/host/addcompany', element: <AddCompany /> ,auth:'admin'},
    { path: '/admin/home', element: <CompaniesList/> ,auth: 'admin'},
  ];
  export default adminRoutes;