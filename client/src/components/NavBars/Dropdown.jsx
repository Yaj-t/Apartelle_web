import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReorderIcon from '@mui/icons-material/Reorder';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import PersonIcon from '@mui/icons-material/Person';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DropdownCSS from '../../styles/navbar/dropdown.module.css';

function Dropdown() {
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
      <div className={DropdownCSS.dropdown} ref={menuRef}>
        <button onClick={toggleMenu}>
          <ReorderIcon />
          <AccountCircleRoundedIcon />
        </button>

        <div
          className={`${DropdownCSS.dropdownMenu} ${
            menuVisible ? DropdownCSS.visible : ''
          }`}>
          <ul>
            <li onClick={() => navigate('/settings/manage-account')}>
              <PersonIcon />
              Manage Account
            </li>
            <li onClick={() => navigate('/settings/reservation')}>
              <LibraryBooksIcon />
              Reservations
            </li>
            <li onClick={() => navigate('/settings/')}>
              <SettingsIcon />
              Settings
            </li>
            <li onClick={logout}>
              <LogoutIcon id={DropdownCSS.logoutIcon} />
              Log Out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
