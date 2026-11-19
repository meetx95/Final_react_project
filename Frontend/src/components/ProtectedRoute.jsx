import { Navigate } from "react-router-dom";
import { useAuth } from "../contex/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="loading-page">Loading...</div>;
  } else {
    return user ? children : <Navigate to="/login" replace />;
  }
}
