import { Navigate } from "react-router";

export default function ProtectedRoute({ children }: any) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
}
