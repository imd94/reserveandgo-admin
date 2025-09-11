import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AdminDash from './AdminDash';
import { UseGlobalState } from './Context/GlobalContext';

function RootPage({ isLoggedIn  }) {
  const { appState } = UseGlobalState();
  const location = useLocation();

  if (!appState.isLoggedIn) {
    // redirect to /login but keep track of where the user wanted to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <AdminDash />;
}

export default RootPage;