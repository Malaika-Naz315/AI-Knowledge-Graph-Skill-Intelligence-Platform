import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({
  children,
  requiredRole = null,
}) {
  const {
    user,
    loading,
    isAuthenticated,
  } = useAuth();

  const location = useLocation();

  // Restore authentication first
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-2xl bg-white px-8 py-6 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />

            <span className="font-medium text-slate-700">
              Loading...
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Not logged in
  if (!isAuthenticated()) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Role protection
  if (
    requiredRole &&
    user?.role?.toUpperCase() !==
      requiredRole.toUpperCase()
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;