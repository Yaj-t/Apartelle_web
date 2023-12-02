import React from 'react';
import Logo from '../../assets/logo.png';
import UserNavBarCSS from '../../styles/navbar/userNavBar.module.css';
import UserOptions from '../NavBars/Dropdown';
import { Link, useLocation } from 'react-router-dom';

function UserNavBar() {
  const auth = sessionStorage.getItem('accessToken');
  const { pathname } = useLocation();

  return (
    <div>
      <div className={UserNavBarCSS.navContainer}>
        <Link to='/'>
          <img src={Logo} alt='logo' width='70px' />
        </Link>

        {auth && !pathname.startsWith('/settings')? (
          <div className={UserNavBarCSS.navbarOnline}>
            <div className={UserNavBarCSS.links}>
              <ul>
                <Link to='/allRooms'> ROOMS </Link>
              </ul>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {auth ? (
          <UserOptions />
        ) : (
          <Link to='/login'>
            <button id={UserNavBarCSS.loginBtn}> LOGIN </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default UserNavBar;
