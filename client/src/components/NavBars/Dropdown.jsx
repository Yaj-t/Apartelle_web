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
    sessionStorage.clear();
    let url = '/';
    console.log(url);
    window.location.reload(true);
    navigate('/');
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
            <Link to='/manage-account'>
              <li>
                <PersonIcon />
                Manage Account
              </li>
            </Link>
            <Link to='settings/reservation'>
              <li>
                <LibraryBooksIcon />
                Reservations
              </li>
            </Link>
            <Link to='/settings'>
              <li>
                <SettingsIcon />
                Settings
              </li>
            </Link>

            <Link>
              <li onClick={logout}>
                <LogoutIcon id={DropdownCSS.logoutIcon} />
                Log Out
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
