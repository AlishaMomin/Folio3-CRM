import { Navigate} from 'react-router-dom';
import NotFound from '../pages/Page404';
import Register from '../pages/Register';
import Signin from "../pages/Signin";
import Login from '../pages/Login';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';

const publicRoutes = [{
    path: '/',
        element: <LogoOnlyLayout />,
        children: [
          { path: '/', element: <Navigate to="/signin" /> },
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
          { path: 'signin', element: <Signin /> }, 
          { path: '404', element: <NotFound /> },
          { path: '*', element: <Navigate to="/404" /> },
        ],},
        { path: '*', element: <Navigate to="/404" replace /> },
  ];
  
  export default publicRoutes;