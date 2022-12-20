import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAppSelector } from "../stores";
import { selectAdmin } from "../stores/slices/auth";
import { Router } from "./Router";

function RouteAdmin() {
  const location = useLocation();

  const isAdmin = useAppSelector(selectAdmin);

  return isAdmin ? (
    <Outlet />
  ) : (
    <Navigate
      to={Router.signin}
      replace
      state={{
        from: isAdmin ? location : { ...location, pathname: Router.home },
      }}
    />
  );
}

export default RouteAdmin;
