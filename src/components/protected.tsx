import { storedAuthorizationAtom } from "@/state";
import { useAtom } from "jotai";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [auth] = useAtom(storedAuthorizationAtom);
  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
