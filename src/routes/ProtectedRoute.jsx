import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, type }) => {
  const { user, partner } = useSelector((state) => state.auth);

  if (type === "user" && !user) {
    // Not logged in as user
    return <Navigate to="/user/login" replace />;
  }

  if (type === "partner" && !partner) {
    // Not logged in as partner
    return <Navigate to="/food-partner/login" replace />;
  }

  if (type === "both" && (!partner && !user)) {
    // Not logged in as partner
    return <Navigate to="/register" replace />;
  }

  // Logged in, render the component
  return children;
};

export default ProtectedRoute;
