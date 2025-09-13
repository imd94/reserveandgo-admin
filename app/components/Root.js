import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UseGlobalState } from './Context/GlobalContext';
import AdminDash from './AdminDash';
import LoadingSpinner from './LoadingSpinner';

function RootPage() {
  const { appState } = UseGlobalState();
  const location = useLocation();

  if(appState.globalLoaderActive) {
    return <LoadingSpinner />;
  }

  if(appState.isLoggedIn && !appState.globalLoaderActive) {
    return <AdminDash />;
  }

  if(!appState.isLoggedIn && !appState.globalLoaderActive) {
    // redirect to /login but keep track of where the user wanted to go
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>; // can't use flash message with this
  }
}

export default RootPage;