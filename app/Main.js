import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route } from "react-router-dom";
import Axios from 'axios';

// Styles
import './assets/styles/styles.scss';

Axios.defaults.baseURL = process.env.REACT_APP_API_URL;
Axios.defaults.withCredentials = true;

// Components
import { GlobalProvider } from './components/Context/GlobalContext';
import Root from './components/Root';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Reservations from './components/Reservations';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import LoadingSpinner from './components/LoadingSpinner';

function App(props) {

  return (
    <GlobalProvider>

      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Dashboard />} />
            <Route path='/reservations' element={<Reservations />} />
            <Route path='/profile/:id' element={<Profile />} />
          </Route>

          <Route path='/login' element={<Login />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

    </GlobalProvider>
  );
}

const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<App />);