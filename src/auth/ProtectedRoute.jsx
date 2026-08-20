import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

const ONBOARDING_PATH = "/onboarding/profile";

function ProtectedRoute() {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const needsOnboarding = user?.role === "doctor" && user?.hasCompletedProfile === false;
  if (needsOnboarding && location.pathname !== ONBOARDING_PATH) {
    return <Navigate to={ONBOARDING_PATH} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
