import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner" />
        <span>Loading…</span>
      </div>
    );

  if (!user) return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;

  if (role && user.role !== role) return <Navigate to="/" replace />;

  return children;
}
