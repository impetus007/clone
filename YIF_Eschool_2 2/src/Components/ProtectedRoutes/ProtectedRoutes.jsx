import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router";
import { useDataLayerValue } from "../../DataLayer/DataLayer";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const [{ loggedIn }] = useDataLayerValue();
  const location = useLocation();

  return loggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

export default ProtectedRoute;
