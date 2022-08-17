import { Navigate} from 'react-router-dom';
import NotFound from '../pages/Page404';
import Signin from "../pages/Signin";
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';

const publicRoutes = [{
    path: '/',
        element: <LogoOnlyLayout />,
        children: [
          { path: '/', element: <Navigate to="/signin" /> },
          { path: 'signin', element: <Signin /> }, 
          { path: '404', element: <NotFound /> },
          { path: '*', element: <Navigate to="/404" /> },
        ],},
        { path: '*', element: <Navigate to="/404" replace /> },
  ];
  
  export default publicRoutes;