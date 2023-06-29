import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext.js";


const PrivateAdminRoute = ({ Component }) => {
const { user } = useContext(AuthContext);

  // Check if the user is logged in and is a superuser
  const isSuperuser = user && user?.is_superuser;

  // Check if the user object exists
  const isAuthenticated = user !== null;

  return isAuthenticated ? (
    !isSuperuser ? (
      <Navigate to="/dashboard" />
    ) : (
      Component
    )
  ) : (
    <Navigate to="/" />
  );
};
export default PrivateAdminRoute;
