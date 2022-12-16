import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAppSelector } from "../stores";
import { selectAdmin } from "../stores/slices/auth";

function RouteAdmin() {
  const location = useLocation();

  const isAdmin = useAppSelector(selectAdmin);

  return isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace state={{ from: location }} />
  );
}

export default RouteAdmin;
