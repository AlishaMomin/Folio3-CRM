import { Navigate, useLocation } from 'react-router-dom';

import useAuth from '../hooks/useAuth';
import { flat } from '../utils/utils';
import AllPages from '../routes';

const userHasPermission = (pathname, user, routes) => {
  if (!user) {
    return false;
  }
  const matched = routes.find((r) => r.path === pathname);

  const authenticated =
    matched && matched.auth && matched.auth.length ? matched.auth.includes(user.role) : true;
  return authenticated;
};

const AuthGuard = ({ children }) => {
  const {
    isAuthenticated,
    user
  } = useAuth();
  const { pathname } = useLocation();

    const routes = flat(AllPages);
    console.log(user)
    console.log(isAuthenticated,"sc")
    const hasPermission = userHasPermission(pathname, user, routes);
    const authenticated = isAuthenticated && hasPermission;

  // // IF YOU NEED ROLE BASED AUTHENTICATION,
  // // UNCOMMENT ABOVE LINES
  // // AND COMMENT OUT BELOW authenticated VARIABLE

  // let authenticated = isAuthenticated;

  return (
    <>
      {authenticated ? (
        children
      ) : (
        <Navigate replace to="/signin" state={{ from: pathname }} />
      )}
    </>
  );
};

export default AuthGuard;
