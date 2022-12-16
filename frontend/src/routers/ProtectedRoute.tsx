import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAppSelector } from "../stores";
import { isAuthenticated } from "../stores/slices/auth";

function ProtectedRoute() {
  const location = useLocation();

  const isAuthen = useAppSelector(isAuthenticated);

  return isAuthen ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace state={{ from: location }} />
  );
}

export default ProtectedRoute;
