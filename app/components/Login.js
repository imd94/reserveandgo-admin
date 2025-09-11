import React, { useEffect } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import Page from './Page';
import { UseGlobalDispatch } from './Context/GlobalContext';
import { UseGlobalState } from './Context/GlobalContext';

function Login() {
  const { appDispatch } = UseGlobalDispatch();
  const { appState } = UseGlobalState();
  const navigate = useNavigate();
  const location = useLocation();

  if(appState.isLoggedIn) {
    return <Navigate to="/" />;
  }

  // fallback to home if no "from" is provided
  const from = location.state?.from?.pathname || "/";

  function handleLogin(e) {
    e.preventDefault();

    // your login logic here (e.g. set token, context, etc.)
    appDispatch({ type: 'login', value: true });

    // after login, redirect back
    navigate(from, { replace: true });
  }

  return (
    <Page title="Login" bodyClass="page-login">
      <div className="login-layout">
        <div className="login-box">
          <div className="login-logo__wrapper">
            <img src={ `${process.env.REACT_APP_FILE_PATH_DIST}assets/images/reserveandgo.svg` } alt="Reserve and Go" className="login-logo" width="200" height="42" />
          </div>

          <form className="login-form" onSubmit={ handleLogin }>
            <h1 className="login-heading">Uloguj se</h1>

            <div className="field-group">
              <label htmlFor="email">Email Address</label>
              <input type="text" id="email" name="email" className="input-field" placeholder="you@example.com" />
            </div>

            <div className="field-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" className="input-field" placeholder="••••••••" />
            </div>

            <button type="submit" className="button button--primary button--no-splash">Prijavi se</button>
          </form>
        </div>
      </div>
    </Page>
  )
}

export default Login;