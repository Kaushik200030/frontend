import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem("token") ? true : false;

  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
