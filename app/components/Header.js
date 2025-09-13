import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseGlobalState } from './Context/GlobalContext';
import { UseGlobalDispatch } from './Context/GlobalContext';
import UseClickOutside from './Hooks/UseClickOutside';
import axios from "axios";

function Header() {
  const { appState } = UseGlobalState();
  const { appDispatch } = UseGlobalDispatch();
  const [ menuOpen, setMenuOpen ] = useState(true);
  const [ profileDropdownOpen, setProfileDropdownOpen ] = useState(false);
  const [logOut, setLogOut] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Use the custom hook
  UseClickOutside(dropdownRef, () => {
    if (profileDropdownOpen) {
      setProfileDropdownOpen(false);
    }
  });

  useEffect(() => {
    if(logOut) {
      const ourRequest = axios.CancelToken.source();

      async function fetchLogOut() {
        try {
          const response = await axios.get("/logout", { cancelToken: ourRequest.token, withCredentials: true });
          if(response.data.status === 'success') {
            appDispatch({ type: 'logout' });
            appDispatch({ type: 'flashMessage', value: 'You have been successfully logged out.', class: 'success' });
            navigate('/login');
          }
        } catch (e) {
          console.log("There was a problem in logout request or the request was cancelled.")
        }
      }
      fetchLogOut();

      return () => {
        ourRequest.cancel();
        setLogOut(false);
      }
    }
  }, [logOut]);

  return (
    <header className="app-header">
      <div className="app-header__logo-wrapper">
        <img src={ `${process.env.REACT_APP_FILE_PATH_DIST}assets/images/reserveandgo.svg` } alt="Reserve and Go" className="app-header__logo" width="200" height="42" />
      </div>

      <div className="app-header__top-bar">
        <div className="app-header__info">
          <h1 className="page-title">{ appState.pageInfo.title }</h1>
          <span className="page-subtext">{ appState.pageInfo.description }</span>
          
          <span className={`menu-toggler ${menuOpen ? 'active' : ''}`} onClick={ () => setMenuOpen(!menuOpen) }>
            <svg className="menu-icon" xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="var(--primary)"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>

            <svg className="menu-icon-open" xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="var(--primary)"><path d="M120-240v-80h520v80H120Zm664-40L584-480l200-200 56 56-144 144 144 144-56 56ZM120-440v-80h400v80H120Zm0-200v-80h520v80H120Z"/></svg>
          </span>
        </div>

        <nav className="top-nav">
          <ul className="top-nav-list">
            <li className="top-nav__item">
              <div className={`dropdown-item dropdown-item--right ${profileDropdownOpen ? 'active' : ''}`} onClick={ () => setProfileDropdownOpen(!profileDropdownOpen) } ref={dropdownRef}>
                <div className="avatar-info">
                  <img src={ `${!appState.isLoggedIn ? '' : process.env.REACT_APP_FILE_PATH_DIST + 'assets/images/avatar-placeholder.svg'}` } alt="User Avatar" className="avatar-photo" width="62" height="62" />

                  <div className="avatar-meta">
                    <span className="avatar-name d-block">Ivan Mirkovic</span>
                    <span className="avatar-role d-block">Owner</span>
                  </div>
                </div>

                <div className="dropdown-item__menu" style={{ '--dropdown-menu-top-offset': '150%' }}>
                  <Link to="/profile/1" className="dropdown-item__link">
                    <span className="dropdown-item__icon-wrapper">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary)"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
                    </span>
                    Profile
                  </Link>

                  <button onClick={ () => setLogOut(true) } className="dropdown-item__link">
                    <span className="dropdown-item__icon-wrapper">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--primary)"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                    </span>
                    Odjavi se
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header;