import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsAdminCSS from '../../styles/navbar/dropdownAdmin.module.css';

function DropdownDashboardSettings() {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  let menuRef = useRef();

  useEffect(() => {
    let handler = e => {
      if (!menuRef.current.contains(e.target)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener('mousedown', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });
  const logout = () => {
    let url = '/';
    console.log(url);
    navigate('/');
    sessionStorage.clear();
    window.location.reload(true);
  };
  return (
    <div>
      <div className={SettingsAdminCSS.dropdownContainer} ref={menuRef}>
        <button onClick={toggleMenu}>
          <SettingsIcon />
        </button>

        <div
          className={`${SettingsAdminCSS.dropdownMenu} ${
            menuVisible ? SettingsAdminCSS.visible : ''
          }`}>
          <ul>
            <li onClick={logout}>
              <LogoutIcon id={SettingsAdminCSS.logoutIcon} />
              Log Out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DropdownDashboardSettings;
