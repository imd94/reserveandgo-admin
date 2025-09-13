import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import Page from './Page';
import { UseGlobalDispatch } from './Context/GlobalContext';
import { UseGlobalState } from './Context/GlobalContext';
import axios from "axios";

function Login() {
  const { appDispatch } = UseGlobalDispatch();
  const { appState } = UseGlobalState();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // fallback to home if no "from" is provided
  const from = location.state?.from?.pathname || location.state?.from || "/";

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await axios.post('/login', { email: loginEmail, password: loginPassword});
      if(response.data.user) {
        appDispatch({ type: 'login' });
        appDispatch({ type: "getUser", value: response.data.user.id });
        appDispatch({ type: 'flashMessage', value: 'Welcome to your admin panel.', class: 'success' });
      }
    } catch(error) {
      console.log(error);
      appDispatch({ type: 'flashMessage', value: error.response.data.message, class: 'danger' });
    }
  }

  if(appState.isLoggedIn) {
    return <Navigate to={from} replace />;
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
              <input onChange={ (e) => setLoginEmail(e.target.value) } value={ loginEmail } type="text" id="email" name="email" className="input-field" placeholder="you@example.com" />
            </div>

            <div className="field-group">
              <label htmlFor="password">Password</label>
              <input onChange={ (e) => setLoginPassword(e.target.value) } value={ loginPassword } type="password" id="password" name="password" className="input-field" placeholder="••••••••" />
            </div>

            <button type="submit" className="button button--primary button--no-splash">Prijavi se</button>
          </form>
        </div>
      </div>
    </Page>
  )
}

export default Login;